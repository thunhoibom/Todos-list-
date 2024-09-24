-- CreateTable
CREATE TABLE "Todo" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "is_completed" BOOLEAN NOT NULL,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "userID" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("userID")
);

-- CreateTable
CREATE TABLE "sessions" (
    "sessionID" TEXT NOT NULL,
    "user_ID" TEXT NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("sessionID")
);

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_ID_fkey" FOREIGN KEY ("user_ID") REFERENCES "user"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;
