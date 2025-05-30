import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { SubboardSubscriptionValidator } from "@/lib/validators/subboard";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { subboardId } = SubboardSubscriptionValidator.parse(body);

    // check if user has already subscribed or not
    const subscriptionExists = await db.subscription.findFirst({
      where: {
        subboardId,
        userId: session.user.id,
      },
    });

    if (!subscriptionExists) {
      return new Response(
        "You've not been subscribed to this subboard, yet.",
        {
          status: 400,
        }
      );
    }

    // create subboard and associate it with the user
    await db.subscription.delete({
      where: {
        userId_subboardId: {
          subboardId,
          userId: session.user.id,
        },
      },
    });

    return new Response(subboardId);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response(
      "Could not unsubscribe from subboard at this time. Please try later",
      { status: 500 }
    );
  }
}
