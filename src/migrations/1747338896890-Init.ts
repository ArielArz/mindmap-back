import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1747338896890 implements MigrationInterface {
    name = 'Init1747338896890'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('admin', 'free', 'premium')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "address" character varying, "varchar" character varying, "role" "public"."users_role_enum" NOT NULL DEFAULT 'free', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "emotions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "significado" text, "name" character varying NOT NULL, CONSTRAINT "PK_0cfeb943349b02abbe434bf6980" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_state" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "intensidad" integer NOT NULL, "date" TIMESTAMP NOT NULL, "description" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, "emotionId" uuid, CONSTRAINT "PK_f5e224bbe5ee7f6dcb2a8e49418" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "locations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "latitude" numeric(10,6) NOT NULL, "longitude" numeric(10,6) NOT NULL, "address" text, "createdById" uuid, CONSTRAINT "PK_7cc1c9e3853b94816c094825e74" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."resources_filetype_enum" AS ENUM('document', 'image', 'audio', 'video', 'other')`);
        await queryRunner.query(`CREATE TYPE "public"."resources_fileextension_enum" AS ENUM('jpg', 'jpeg', 'png', 'webp', 'pdf', 'docx', 'mp4', 'mov', 'mp3', 'wav')`);
        await queryRunner.query(`CREATE TABLE "resources" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "fileType" "public"."resources_filetype_enum" NOT NULL, "fileExtension" "public"."resources_fileextension_enum" NOT NULL, "cloudinaryUrl" character varying NOT NULL, "publicId" character varying, "resourceType" character varying, "description" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "uploadedById" uuid, CONSTRAINT "PK_632484ab9dff41bba94f9b7c85e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contact" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2cbbe00f59ab6b3bb5b8d19f989" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_state" ADD CONSTRAINT "FK_b35c67d61943214aff1e7c94abd" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_state" ADD CONSTRAINT "FK_75e97d39d147d0b3eeca221da24" FOREIGN KEY ("emotionId") REFERENCES "emotions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "locations" ADD CONSTRAINT "FK_f700745d70a744e7910e3b51078" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "resources" ADD CONSTRAINT "FK_d7b99643067b3959a9557bf958e" FOREIGN KEY ("uploadedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "resources" DROP CONSTRAINT "FK_d7b99643067b3959a9557bf958e"`);
        await queryRunner.query(`ALTER TABLE "locations" DROP CONSTRAINT "FK_f700745d70a744e7910e3b51078"`);
        await queryRunner.query(`ALTER TABLE "user_state" DROP CONSTRAINT "FK_75e97d39d147d0b3eeca221da24"`);
        await queryRunner.query(`ALTER TABLE "user_state" DROP CONSTRAINT "FK_b35c67d61943214aff1e7c94abd"`);
        await queryRunner.query(`DROP TABLE "contact"`);
        await queryRunner.query(`DROP TABLE "resources"`);
        await queryRunner.query(`DROP TYPE "public"."resources_fileextension_enum"`);
        await queryRunner.query(`DROP TYPE "public"."resources_filetype_enum"`);
        await queryRunner.query(`DROP TABLE "locations"`);
        await queryRunner.query(`DROP TABLE "user_state"`);
        await queryRunner.query(`DROP TABLE "emotions"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    }

}
