import { PrismaClient } from '@prisma/client'
import { type NextRequest, NextResponse } from 'next/server'
const prisma = new PrismaClient()

export async function DELETE(req: NextRequest) {
  const email = getParams(req.nextUrl.pathname)

  try {
    await prisma.user.delete({
      where: {
        email,
      },
    })
    return NextResponse.json({ message: 'User deleted' })
  } catch (error) {
    return NextResponse.json({ message: 'User not deleted' })
  }
}

const getParams = (pathname: string) => {
  const segments = pathname.split('/')
  return segments[segments.length - 1]
}

export async function PATCH(req: NextRequest) {
  const email = getParams(req.nextUrl.pathname)
  const body = await req.json()
  try {
    const user = await prisma.user.update({
      where: {
        email,
      },
      data: {
        username: body.username,
      },
    })
    console.log(user)
    return NextResponse.json(user.username)
  } catch (error) {
    return NextResponse.json({ message: 'Username not updated' })
  }
}
export async function GET(req: NextRequest) {
  const email = getParams(req.nextUrl.pathname)
  try {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    })
    return NextResponse.json(user?.username)
  } catch (error) {
    return NextResponse.json({ message: 'User not deleted' })
  }
}
