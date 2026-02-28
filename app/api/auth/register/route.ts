import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.employee.create({
    data: { name, email, password: hashed }
  });

  return NextResponse.json(user);
}