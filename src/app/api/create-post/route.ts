import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const prisma = new PrismaClient()
  const body = await req.json()
  const link = randomString()
  try {
    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        link,
        author: {
          connect: {
            email: body.email,
          },
        },
      },
    })

    return NextResponse.json(post.link)
  } catch (error) {
    return NextResponse.json({ message: "Post not created" })
  }
}

const randomString = () => {
  let randomValue = ""

  for (let i = 0; i < 2; i++) {
    randomValue += Math.floor(Math.random() * 10)

    randomValue += String.fromCharCode(97 + Math.floor(Math.random() * 26))
  }

  for (let i = 0; i < 2; i++) {
    randomValue += Math.floor(Math.random() * 10)

    randomValue += String.fromCharCode(65 + Math.floor(Math.random() * 26))
  }

  return randomValue
}