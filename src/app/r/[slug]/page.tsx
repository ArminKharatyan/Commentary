import MiniCreatePost from "@/components/MiniCreatePost";
import PostFeed from "@/components/PostFeed";
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    slug: string;
  }; 
}

const page = async ({ params }: PageProps) => {
  const { slug } = params;

  const session = await getAuthSession();

  const subboard = await db.subboard.findFirst({
   where: { slug: decodeURIComponent(slug) },
    include: {
      posts: {
        include: {
          author: true,
          votes: true,
          comments: true,
          subboard: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: INFINITE_SCROLL_PAGINATION_RESULTS,
      },
    },
  });

  if (!subboard) return notFound();

  return (
    <>
      <h1 className="font-bold text-3xl md:text-4xl h-14">
        Community About {subboard.name}
      </h1>
      <MiniCreatePost session={session} />
      <PostFeed initialPosts={subboard.posts} subboardName={subboard.name} />
    </>
  );
};

export default page;
