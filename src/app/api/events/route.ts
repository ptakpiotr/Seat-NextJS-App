import { NextRequest, NextResponse } from "next/server";
import { EventType } from "../../../../validation";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";

export async function POST(request: NextRequest) {
  const client = new PrismaClient();
  const session = await getServerSession();
  const event = (await request.json()) as EventType;

  await client.event.create({
    data: {
      end: event.end,
      start: event.start,
      info: event.info,
      author: {
        connectOrCreate: {
          create: {
            id: session!.user!.email!,
            name: session!.user!.name!,
          },
          where: {
            id: session!.user!.email!,
          },
        },
      },
      people: {
        connectOrCreate: {
          create: {
            id: session!.user!.email!,
            name: session!.user!.name!,
          },
          where: {
            id: session!.user!.email!,
          },
        },
      },
    },
  });

  return NextResponse.json({}, { status: 200 });
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  const client = new PrismaClient();

  if (!id) {
    return NextResponse.json({}, { status: 400 });
  }

  await client.event.delete({
    where: {
      id: parseInt(id),
    },
  });

  return NextResponse.json(null, { status: 204 });
}
