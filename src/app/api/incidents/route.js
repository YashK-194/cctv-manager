import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const incidents = await prisma.incident.findMany({
      include: {
        camera: true,
        video: true,
      },
      orderBy: { createdAt: "desc" },
      take: 50, // Limit to most recent 50 incidents
    });

    return NextResponse.json(incidents);
  } catch (error) {
    console.error("Error fetching incidents:", error);
    return NextResponse.json(
      { error: "Failed to fetch incidents" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { cameraId, videoId, type, severity, description, timestamp } = body;

    const incident = await prisma.incident.create({
      data: {
        cameraId,
        videoId,
        type,
        severity,
        description,
        timestamp,
      },
      include: {
        camera: true,
        video: true,
      },
    });

    return NextResponse.json(incident, { status: 201 });
  } catch (error) {
    console.error("Error creating incident:", error);
    return NextResponse.json(
      { error: "Failed to create incident" },
      { status: 500 }
    );
  }
}
