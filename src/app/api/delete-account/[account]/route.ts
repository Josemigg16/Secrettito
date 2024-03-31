import { PrismaClient } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

export async function DELETE(req: NextRequest) {
  const prisma = new PrismaClient()
  const email = getParams(req.nextUrl.pathname)

  try {
    await prisma.user.delete({
      where: {
        email,
      },
    })
    return NextResponse.json({ message: "User deleted" })
  } catch (error) {
    return NextResponse.json({ message: "User not deleted" })
  }
}

const getParams = (pathname: string) => {
  const segments = pathname.split("/")
  return segments[segments.length - 1]
}
  