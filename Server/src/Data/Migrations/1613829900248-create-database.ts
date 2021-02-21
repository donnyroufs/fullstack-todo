import { MigrationInterface, QueryRunner } from 'typeorm'

export class createDatabase1613829900248 implements MigrationInterface {
  static DATABASE = 'todo-demo'

  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createDatabase(createDatabase1613829900248.DATABASE)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropDatabase(createDatabase1613829900248.DATABASE)
  }
}
