import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await prisma.employee.findUnique({
    where: { email },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" });
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    return NextResponse.json({ error: "Invalid password" });
  }

  return NextResponse.json({
    id: user.id,
    name: user.name,
  });
}