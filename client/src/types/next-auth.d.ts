import "next-auth";

declare module "next-auth" {
  interface Session {
    directusToken?: string;
  }
  interface User {
    directusToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    directusToken?: string;
  }
}
