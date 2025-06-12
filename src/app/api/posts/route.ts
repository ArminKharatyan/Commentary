import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

export async function GET(req: Request) {
  const url = new URL(req.url);

  const session = await getAuthSession();

  let followedCommunitiesIds: string[] = [];

  if (session) {
    const followedCommunities = await db.subscription.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        subboard: true,
      },
    });

    followedCommunitiesIds = followedCommunities.map((sub) => sub.subboard.id);
  }

  try {
    const { limit, page, subboardName } = z
      .object({
        limit: z.string(),
        page: z.string(),
        subboardName: z.string().nullish().optional(),
      })
      .parse({
        subboardName: url.searchParams.get("subboardName"),
        limit: url.searchParams.get("limit"),
        page: url.searchParams.get("page"),
      });

    let whereClause = {};

    if (subboardName) {
      whereClause = {
        subboard: {
          name: subboardName,
        },
      };
    } else if (session) {
      whereClause = {
        subboard: {
          id: {
            in: followedCommunitiesIds,
          },
        },
      };
    }

    const posts = await db.post.findMany({
      take: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit),
      orderBy: {
        createdAt: "desc",
      },
      include: {
        subboard: true,
        votes: true,
        author: true,
        comments: true,
      },
      where: whereClause,
    });

    return new Response(JSON.stringify(posts));
  } catch {
    return new Response("Could not fetch posts", { status: 500 });
  }
}
