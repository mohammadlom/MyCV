import { MigrationInterface, QueryRunner } from "typeorm";
import { query } from "express";

export class roles1595432755489 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        try {
            queryRunner.query(`
                INSERT INTO roles (\`id\`, \`title\`) VALUES 
                (1, 'guest'),
                (2, 'user'),
                (3, 'admin')
            `);
        } catch (error) {
            queryRunner.rollbackTransaction();
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        try {
            queryRunner.query('SET FOREIGN_KEY_CHECKS = 0;');
            queryRunner.query(`TRUNCATE table roles`);
            queryRunner.query('SET FOREIGN_KEY_CHECKS = 1;');
        } catch (error) {
            queryRunner.rollbackTransaction();
        }
    }

}
