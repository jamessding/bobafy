set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "users" (
	"userId" serial NOT NULL,
	"username" TEXT NOT NULL,
	"hashedPassword" TEXT NOT NULL,
	"firstName" TEXT NOT NULL,
	"lastName" TEXT NOT NULL,
	"avatarUrl" TEXT NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "stores" (
	"storeId" TEXT NOT NULL,
	"storeName" TEXT NOT NULL,
	CONSTRAINT "stores_pk" PRIMARY KEY ("storeId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "reviews" (
	"reviewId" serial NOT NULL,
	"userId" int NOT NULL,
	"storeId" TEXT NOT NULL,
	"createdAt" timestamptz(6) NOT NULL DEFAULT now(),
	"imageUrl" TEXT,
	"content" TEXT,
	"drinkType" TEXT NOT NULL,
	"recommend" BOOLEAN NOT NULL DEFAULT 'false',
	CONSTRAINT "reviews_pk" PRIMARY KEY ("reviewId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "likes" (
	"userId" int NOT NULL,
	"reviewId" int NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "comments" (
	"userId" int NOT NULL,
	"reviewId" int NOT NULL,
	"content" TEXT NOT NULL,
	"createdAt" timestamptz(6) NOT NULL DEFAULT now()
) WITH (
  OIDS=FALSE
);





ALTER TABLE "reviews" ADD CONSTRAINT "reviews_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_fk1" FOREIGN KEY ("storeId") REFERENCES "stores"("storeId");

ALTER TABLE "likes" ADD CONSTRAINT "likes_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "likes" ADD CONSTRAINT "likes_fk1" FOREIGN KEY ("reviewId") REFERENCES "reviews"("reviewId");

ALTER TABLE "comments" ADD CONSTRAINT "comments_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "comments" ADD CONSTRAINT "comments_fk1" FOREIGN KEY ("reviewId") REFERENCES "reviews"("reviewId");
