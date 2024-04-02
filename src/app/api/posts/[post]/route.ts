import { PrismaClient } from '@prisma/client'
import { type NextRequest, NextResponse } from 'next/server'
const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
  const url = getParams(req.nextUrl.pathname)

  try {
    const post = await prisma.post.findFirst({
      where: {
        url,
      },
      include: {
        author: true,
        messages: true,
      },
    })
    return NextResponse.json(post)
  } catch (error) {
    return NextResponse.json({ message: 'Cannot get post' })
  }
}

export async function PATCH(req: NextRequest) {
  const id = getParams(req.nextUrl.pathname)
  const body = await req.json()
  try {
    await prisma.post.update({
      where: {
        id,
      },
      data: {
        messages: {
          create: {
            content: body.message,
          },
        },
      },
    })
    return NextResponse.json('success')
  } catch (error) {
    return NextResponse.json({ message: 'Cannot update post' })
  }
}

export async function DELETE(req: NextRequest) {
  const id = getParams(req.nextUrl.pathname)
  try {
    await prisma.post.delete({
      where: {
        id,
      },
    })
    return NextResponse.json({ message: 'Post deleted successfully' })
  } catch (error) {
    return NextResponse.json({ message: 'Cannot delete post' })
  }
}

const getParams = (pathname: string) => {
  const segments = pathname.split('/')
  return segments[segments.length - 1]
}
