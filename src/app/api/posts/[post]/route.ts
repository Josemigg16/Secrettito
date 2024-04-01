import { PrismaClient } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const prisma = new PrismaClient()
  const link = getParams(req.nextUrl.pathname)

  try {
    const post = await prisma.post.findFirst({
      where: {
        link,
      },
      include: {
        author: true,
        messages: true,
      },
    })
    return NextResponse.json(post)
  } catch (error) {
    return NextResponse.json({ message: "Cannot get post" })
  }
}

const getParams = (pathname: string) => {
  const segments = pathname.split("/")
  return segments[segments.length - 1]
}
