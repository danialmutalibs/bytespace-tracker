import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const activeEmployees = await prisma.activity.findMany({
    where: { checkOut: null },
    include: { employee: true },
  });

  const logs = await prisma.activity.findMany({
    orderBy: { checkIn: "desc" },
    include: { employee: true },
  });

  return NextResponse.json({
    totalActive: activeEmployees.length,
    activeEmployees,
    logs,
  });
}