import type { User } from "next-auth";

type UserId = string;

declare module "next-auth/jwt" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface JWT {
    id: UserId;
    username?: string | null;
  }
}

declare module "next-auth" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Session {
    user: User & {
      id: UserId;
      username?: string | null;
    };
  }
}
