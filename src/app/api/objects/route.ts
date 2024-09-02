import { PrismaClient, ObjectMode as DbObjectMode } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import {
  ICircleDimensions,
  IObject,
  IRectDimensions,
  ObjectMode,
} from "../../../../Types";
import { getServerSession } from "next-auth";
import { mapDbObjectToAppObject } from "@/misc/objectMapper";

const prismaClient = new PrismaClient();

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const eventId = searchParams.get("event_id");

  if (eventId) {
    const objects = await prismaClient.object.findMany({
      include: {
        coords: true,
        dimensions: true,
        reservation: true,
      },
      where: {
        eventId: parseInt(eventId),
      },
    });

    const appObjects = objects.map((obj) => mapDbObjectToAppObject(obj));

    return NextResponse.json(appObjects, { status: 200 });
  }

  return NextResponse.json(null, { status: 204 });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const session = await getServerSession();
  const searchParams = request.nextUrl.searchParams;
  const eventId = searchParams.get("event_id");

  if (!session?.user || !eventId) {
    return NextResponse.json(null, { status: 400 });
  }

  const objects = body as IObject[];
  //BAD PRACTICE!!
  const existingObjects = await prismaClient.object.findMany({
    where: {
      eventId: parseInt(eventId),
    },
  });

  for (const obj of objects) {
    const dimensions =
      obj.type === ObjectMode.RECT
        ? {
            ...(obj.dimensions as IRectDimensions),
            radius: -1,
          }
        : {
            ...(obj.dimensions as ICircleDimensions),
            width: -1,
            height: -1,
          };
    const existingObject = existingObjects.find((o) => o.id === obj.id);

    if (existingObject) {
      await prismaClient.dimensions.delete({
        where: {
          id: existingObject.dimensionsId,
        },
      });

      await prismaClient.reservation.delete({
        where: {
          id: existingObject.reservationId ?? "",
        },
      });

      await prismaClient.coords.delete({
        where: {
          id: existingObject.coordsId,
        },
      });
    }

    await prismaClient.object.create({
      data: {
        authorId: session.user.email!,
        rotation: obj.rotation,
        coords: {
          create: {
            x: obj.coords.x,
            y: obj.coords.y,
          },
        },
        dimensions: {
          create: {
            ...dimensions,
          },
        },
        event: {
          connect: {
            id: parseInt(eventId),
          },
        },
        reservation: {
          create: {
            isReserved: obj.reservation?.isReserved ?? false,
            by: obj.reservation?.by,
          },
        },
        type:
          obj.type === ObjectMode.RECT
            ? DbObjectMode.RECT
            : DbObjectMode.CIRCLE,
      },
      include: {
        event: true,
      },
    });
  }

  return NextResponse.json(null, { status: 200 });
}

export async function DELETE(request: NextRequest) {
  const session = await getServerSession();
  const searchParams = request.nextUrl.searchParams;
  const eventId = searchParams.get("event_id");

  if (!session?.user || !eventId) {
    return NextResponse.json(null, { status: 400 });
  }

  await prismaClient.object.deleteMany({
    where: {
      eventId: parseInt(eventId),
      authorId: session.user.email!,
    },
  });

  return NextResponse.json(null, { status: 204 });
}
