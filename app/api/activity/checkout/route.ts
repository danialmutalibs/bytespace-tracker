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

  const active = await prisma.activity.findFirst({
    where: {
      employeeId,
      checkOut: null,
    },
  });

  if (!active) {
    return NextResponse.json(
      { error: "Employee not currently checked in" },
      { status: 400 }
    );
  }

  await prisma.activity.update({
    where: { id: active.id },
    data: { checkOut: new Date() },
  });

  const totalActive = await prisma.activity.count({
    where: { checkOut: null },
  });

  return NextResponse.json({
    message: "Check-Out Successful",
    employeeName: employee.name,
    totalActive,
  });
}