import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Orfanatos1602633363204 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    	await queryRunner.createTable(new Table({
    		name: "Orfanato",
    		columns: [
	    		{
	    			name: "id",
	    			type: "integer",
	    			unsigned: true,
	    			isPrimary: true, 
	    			isGenerated: true,
	    			generationStrategy: "increment",

	    		},
	    		{
	    			name: "nome",
	    			type: "varchar"
	    		},
	    		{
	    			name: "latitude",
	    			type: "decimal",
	    			scale: 10,
	    			precision: 2
	    		},
	    		{
	    			name: "longitude",
	    			type: "decimal",
	    			scale: 10,
	    			precision: 2
	    		},
	    		{
	    			name: "sobre",
	    			type: "text"
	    		},
	    		{
	    			name: "instrucoes",
	    			type: "text"
	    		},
	    		{
	    			name: "horario_de_funcionamento",
	    			type: "varchar"
	    		},
	    		{
	    			name: "aberto_aos_fins_de_semana",
	    			type: "boolean",
	    			default: false
	    		}
    		]
    	}));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    	await queryRunner.dropTable("Orfanato");
    }

}
