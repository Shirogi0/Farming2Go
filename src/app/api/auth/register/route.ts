import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import nodemailer from 'nodemailer'

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  const { email, password, name } = await req.json()

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        otp,
      },
    })

    // Send OTP via email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    })

    await transporter.sendMail({
      from: "Farming2Go <farming2go@gmail.com>",
      to: email,
      subject: 'Your OTP for registration in Farming2Go',
      text: `Your OTP is: ${otp}`,
    })

    return NextResponse.json({ message: 'User registered. Please verify OTP.' }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'Error registering user' }, { status: 500 })
  }
}

