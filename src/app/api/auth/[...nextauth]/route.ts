import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaClient } from "@prisma/client"

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/",
  },
  callbacks: {
    async session({ session }) {
      const prisma = new PrismaClient()
      const name = session.user!.name
      const email = session.user!.email
      const username = "user" + Math.floor(Math.random() * 100000).toString()
      try {
        const exists = await prisma.user.findFirst({
          where: {
            OR: [{ username }, { email }],
          },
        })
        if (exists) return session
        await prisma.user.create({
          data: {
            name,
            username,
            email,
          },
        })
      } catch (error) {
        return session
      }
      return session
    },
  },
})

export { handler as GET, handler as POST }
