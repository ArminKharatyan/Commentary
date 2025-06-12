import type { DefaultSession, DefaultUser } from "next-auth";

type UserId = string;

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId;
    sub: UserId;
    username?: string | null;
    name?: string | null;
    email?: string | null;
    picture?: string | null;
  }
}

declare module "next-auth" {
  interface Session {
    user: {
      id: UserId;
      username?: string | null;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    username?: string | null;
  }
}
