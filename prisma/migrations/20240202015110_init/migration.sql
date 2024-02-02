-- CreateTable
CREATE TABLE "Alert" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "event" TEXT NOT NULL,
    "damage" INTEGER NOT NULL,

    CONSTRAINT "Alert_pkey" PRIMARY KEY ("id")
);
