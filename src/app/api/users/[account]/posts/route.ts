import { PrismaClient } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const prisma = new PrismaClient()
  const email = getParams(req.nextUrl.pathname)

  try {
    const userPosts = await prisma.user.findFirst({
      where: {
        email,
      },
      include: {
        posts: true,
      }
    })
    return NextResponse.json(userPosts?.posts)
  } catch (error) {
    return NextResponse.json({ message: "Cannot get posts" })
  }
}

const getParams = (pathname: string) => {
  const segments = pathname.split("/")
  return segments[segments.length - 2]
}