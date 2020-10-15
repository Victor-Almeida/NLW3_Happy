import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from "typeorm";
import Orfanato from "./Orfanato";

@Entity("Imagem")
export default class Imagem {
	@PrimaryGeneratedColumn("increment")
	id: number;

	@Column()
	caminho: string;

	@ManyToOne(() => Orfanato, orfanato => orfanato.imagens)
	@JoinColumn({name: "id_orfanato"})
	orfanato: Orfanato;
}