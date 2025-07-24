import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clean up existing data
  await prisma.incident.deleteMany();
  await prisma.video.deleteMany();
  await prisma.camera.deleteMany();

  // Create cameras
  const camera1 = await prisma.camera.create({
    data: {
      id: "camera-01",
      name: "Camera - 01",
      location: "Entrance",
      hasUnauthorizedAccess: true,
      hasFaceRecognised: true,
      hasGunThreat: true,
    },
  });

  const camera2 = await prisma.camera.create({
    data: {
      id: "camera-02",
      name: "Camera - 02",
      location: "Reception",
      hasUnauthorizedAccess: true,
      hasMultipleEvents: true,
    },
  });

  const camera3 = await prisma.camera.create({
    data: {
      id: "camera-03",
      name: "Camera - 03",
      location: "Store",
      hasTrafficCongestion: true,
    },
  });

  // Create videos
  const video1 = await prisma.video.create({
    data: {
      cameraId: camera1.id,
      filename: "enterance.mp4",
      path: "/videos/enterance.mp4",
      duration: 1800, // 30 minutes
      recordedAt: new Date("2025-07-17T08:00:00Z"),
    },
  });

  const video2 = await prisma.video.create({
    data: {
      cameraId: camera2.id,
      filename: "reception.mp4",
      path: "/videos/reception.mp4",
      duration: 1800,
      recordedAt: new Date("2025-07-17T08:00:00Z"),
    },
  });

  const video3 = await prisma.video.create({
    data: {
      cameraId: camera3.id,
      filename: "store.mp4",
      path: "/videos/store.mp4",
      duration: 1800,
      recordedAt: new Date("2025-07-17T08:00:00Z"),
    },
  });

  // Create incidents
  await prisma.incident.createMany({
    data: [
      {
        cameraId: camera1.id,
        videoId: video1.id,
        type: "UNAUTHORIZED_ACCESS",
        severity: "HIGH",
        description: "Unauthorised person detected at entrance",
        timestamp: 875, // 14:35 in seconds
        processed: false,
      },
      {
        cameraId: camera2.id,
        videoId: video2.id,
        type: "FACE_RECOGNISED",
        severity: "MEDIUM",
        description: "Known person identified in reception area",
        timestamp: 742, // 12:22 in seconds
        processed: false,
      },
      {
        cameraId: camera2.id,
        videoId: video2.id,
        type: "MULTIPLE_EVENTS",
        severity: "MEDIUM",
        description: "Multiple activities detected simultaneously",
        timestamp: 555, // 09:15 in seconds
        processed: false,
      },
      {
        cameraId: camera1.id,
        videoId: video1.id,
        type: "GUN_THREAT",
        severity: "CRITICAL",
        description: "Weapon detected - immediate response required",
        timestamp: 1005, // 16:45 in seconds
        processed: false,
      },
      {
        cameraId: camera3.id,
        videoId: video3.id,
        type: "TRAFFIC_CONGESTION",
        severity: "LOW",
        description: "Heavy foot traffic in store area",
        timestamp: 320, // 05:20 in seconds
        processed: false,
      },
    ],
  });

  console.log("Database has been seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
