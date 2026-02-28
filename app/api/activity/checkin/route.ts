import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { employeeId } = await req.json();

  const employee = await prisma.employee.findUnique({
    where: { id: employeeId },
  });

  if (!employee) {
    return NextResponse.json(
      { error: "Employee not found" },
      { status: 404 }
    );
  }

  const existing = await prisma.activity.findFirst({
    where: { employeeId, checkOut: null },
  });

  if (existing) {
    return NextResponse.json(
      { error: "Employee already checked in" },
      { status: 400 }
    );
  }

  const activity = await prisma.activity.create({
    data: {
      employeeId,
      checkIn: new Date(),
    },
  });

  // Count active employees
  const totalActive = await prisma.activity.count({
    where: { checkOut: null },
  });

  return NextResponse.json({
    message: "Access Granted",
    employeeName: employee.name,
    totalActive,
  });
}