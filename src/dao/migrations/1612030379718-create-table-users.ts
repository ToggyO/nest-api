import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTableUsers1612030379718 implements MigrationInterface {
    name = 'createTableUsers1612030379718';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "firstName" text NOT NULL,
                "lastName" text NOT NULL,
                "email" text NOT NULL,
                "passwordHash" text NOT NULL,
                "salt" text NOT NULL,
                "role" varchar CHECK( role IN ('0','1') ) NOT NULL DEFAULT (0),
                "avatar" text, "created_at" datetime NOT NULL DEFAULT (datetime('now')),
                "updated_at" datetime NOT NULL DEFAULT (datetime('now'))
            )`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }
}
