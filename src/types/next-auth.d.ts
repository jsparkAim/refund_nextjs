import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    phone_number: string | null;
    name: string | null;
    birth_date: Date | null;
    gender: string | null;
  }

  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    phone_number: string | null;
    name: string | null;
    birth_date: Date | null;
    gender: string | null;
  }
}
