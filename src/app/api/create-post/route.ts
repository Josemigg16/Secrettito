import makeURL from "@/helpers/makeURL"
import randomString from "@/helpers/randomString"
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const prisma = new PrismaClient()
  const body = await req.json()
  try {
    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        author: {
          connect: {
            email: body.email,
          },
        },
        link: randomString(),
      },
    })

    return NextResponse.json(post.link)
  } catch (error) {
    return NextResponse.json({ message: "Post not created" })
  }
}
