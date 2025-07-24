import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cameras = await prisma.camera.findMany({
      include: {
        videos: {
          orderBy: { recordedAt: "desc" },
          take: 1,
        },
        incidents: {
          orderBy: { createdAt: "desc" },
          take: 5,
        },
      },
      orderBy: { name: "asc" },
    });

    return NextResponse.json(cameras);
  } catch (error) {
    console.error("Error fetching cameras:", error);
    return NextResponse.json(
      { error: "Failed to fetch cameras" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, location } = body;

    const camera = await prisma.camera.create({
      data: {
        name,
        location,
      },
    });

    return NextResponse.json(camera, { status: 201 });
  } catch (error) {
    console.error("Error creating camera:", error);
    return NextResponse.json(
      { error: "Failed to create camera" },
      { status: 500 }
    );
  }
}
