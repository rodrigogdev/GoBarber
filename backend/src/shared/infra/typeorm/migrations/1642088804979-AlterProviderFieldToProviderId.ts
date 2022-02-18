import {
	MigrationInterface,
	QueryRunner,
	TableColumn,
	TableForeignKey,
} from "typeorm";

export default class AlterProviderFieldToProviderId1642088804979
	implements MigrationInterface
{
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn("appointments", "provider");
		await queryRunner.addColumn(
			"appointments",
			new TableColumn({
				name: "provider_Id",
				type: "uuid",
				isNullable: true,
			})
		);

		await queryRunner.createForeignKey(
			"appointments",
			new TableForeignKey({
				name: "AppointmentProvider",
				columnNames: ["provider_Id"],
				referencedColumnNames: ["id"],
				referencedTableName: "users",
				onDelete: "SET NULL",
				onUpdate: "CASCADE",
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey("appointments", "AppointmentProvider");

		await queryRunner.dropColumn("appointments", "provider_Id");

		await queryRunner.addColumn(
			"appointments",
			new TableColumn({
				name: "provider",
				type: "varchar",
			})
		);
	}
}
