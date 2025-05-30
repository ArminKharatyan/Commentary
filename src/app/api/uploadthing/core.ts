import { getToken } from "next-auth/jwt";
import { createUploadthing, type FileRouter } from "uploadthing/server";
import type { NextRequest } from "next/server";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "8MB" } })
    .middleware(async ({ req }) => {
      const token = await getToken({ req: req as NextRequest });

      if (!token || !token.sub) {
        throw new Error("Unauthorized");
      }

      return { userId: token.sub };
    })
    .onUploadComplete(async () => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
