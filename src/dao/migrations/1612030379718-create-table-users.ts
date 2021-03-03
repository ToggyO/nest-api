import type { MigrationInterface, QueryRunner } from 'typeorm';

export class createTableUsers1612030379718 implements MigrationInterface {
    name = 'createTableUsers1612030379718';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL PRIMARY KEY,
                "firstName" VARCHAR(255) NOT NULL,
                "lastName" VARCHAR(255) NOT NULL,
                "email" VARCHAR(255) NOT NULL,
                "passwordHash" VARCHAR(255) NOT NULL,
                "salt" VARCHAR(255) NOT NULL,
                "role" SMALLINT CHECK( role IN ('0','1') ) NOT NULL DEFAULT 0,
                "avatar" TEXT,
                "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT NOW()
            )`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }
}
