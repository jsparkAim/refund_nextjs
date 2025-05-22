import { prisma } from "./prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { User } from "@/types/user";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phoneNumber: {
          label: "Phone Number",
          type: "text",
          placeholder: "01012345678",
        },
        name: {
          label: "Name",
          type: "text",
        },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.phoneNumber) {
          throw new Error("핸드폰번호를 입력해주세요.");
        }

        if (!credentials?.name) {
          throw new Error("이름을 입력해주세요.");
        }

        const user = await prisma.test_user.findFirst({
          where: {
            phone_number: credentials.phoneNumber,
            name: credentials.name,
          },
          select: {
            id: true,
            name: true,
            phone_number: true,
            birth_date: true,
            gender: true,
          },
        });

        console.log("user >> ", user);

        if (!user) {
          throw new Error("존재하지 않는 유저입니다.");
        }

        return {
          ...user,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      if (token.id && typeof token.id === "string") {
        session.user.id = token.id;
        session.user.phone_number = token.phone_number;
        session.user.name = token.name;
        session.user.birth_date = token.birth_date;
        session.user.gender = token.gender;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.phone_number = user.phone_number ?? null;
        token.name = user.name ?? null;
        token.birth_date = user.birth_date ?? null;
        token.gender = user.gender ?? null;
      }
      return token;
    },
  },
};
