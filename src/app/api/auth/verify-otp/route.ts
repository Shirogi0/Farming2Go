import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  const { email, otp } = await req.json()

  try {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user || user.otp !== otp) {
      return NextResponse.json({ message: 'Invalid OTP' }, { status: 400 })
    }

    await prisma.user.update({
      where: { email },
      data: { otp: null },
    })

    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '1h' })

    const response = NextResponse.json({ token, role: user.role }, { status: 200 })
    response.cookies.set('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' })

    return response
  } catch (error) {
    return NextResponse.json({ message: 'Error verifying OTP' }, { status: 500 })
  }
}

