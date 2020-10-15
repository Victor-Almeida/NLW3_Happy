import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Imagens1602702850883 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    	await queryRunner.createTable(new Table({
    		name:  "Imagem",
    		columns: [
    			{
	    			name: "id",
	    			type: "integer",
	    			unsigned: true,
	    			isPrimary: true, 
	    			isGenerated: true,
	    			generationStrategy: "increment"
	    		},
	    		{
	    			name: "caminho",
	    			type: "varchar"
	    		},
	    		{
	    			name: "id_orfanato",
	    			type: "integer",

	    		}
    		],
    		foreignKeys:  [
    			{
    				name: "ImagemOrfanato",
    				columnNames: ["id_orfanato"],
    				referencedTableName: "Orfanato",
    				referencedColumnNames: ["id"],
    				onUpdate: "CASCADE",
    				onDelete: "CASCADE"
    			}
    		]
    	}));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    	await queryRunner.dropTable("Imagem");
    }

}
