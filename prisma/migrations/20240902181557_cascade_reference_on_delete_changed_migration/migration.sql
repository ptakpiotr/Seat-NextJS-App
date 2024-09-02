-- DropForeignKey
ALTER TABLE "Object" DROP CONSTRAINT "Object_coordsId_fkey";

-- DropForeignKey
ALTER TABLE "Object" DROP CONSTRAINT "Object_dimensionsId_fkey";

-- DropForeignKey
ALTER TABLE "Object" DROP CONSTRAINT "Object_eventId_fkey";

-- DropForeignKey
ALTER TABLE "Object" DROP CONSTRAINT "Object_reservationId_fkey";

-- AddForeignKey
ALTER TABLE "Object" ADD CONSTRAINT "Object_coordsId_fkey" FOREIGN KEY ("coordsId") REFERENCES "Coords"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Object" ADD CONSTRAINT "Object_dimensionsId_fkey" FOREIGN KEY ("dimensionsId") REFERENCES "Dimensions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Object" ADD CONSTRAINT "Object_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Object" ADD CONSTRAINT "Object_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
