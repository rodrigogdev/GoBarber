import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

// eslint-disable-next-line import/prefer-default-export
export class AddUserTypeToUsers1647966228243 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "users",
      new TableColumn({
        name: "user_type",
        type: "varchar",
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("users", "user_type");
  }
}
