import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const prisma = new PrismaClient()
  const { name, username, email } = await req.json()
  if (!username && !email) return NextResponse.json({ status: 400 })
  try {
    const exists = await prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    })
    if (exists) return NextResponse.json({ message: "User already exists" })
    await prisma.user.create({
      data: {
        name,
        username,
        email,
      },
    })
    return NextResponse.json({ message: "created user!" })
  } catch (error) {
    return NextResponse.json({ message: "An error has been ocurred" })
  }
}
