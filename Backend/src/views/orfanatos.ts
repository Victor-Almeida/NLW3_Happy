import Orfanato from "../models/Orfanato";
import view_imagens from "./imagens";

export default {
	render(orfanato: Orfanato){
		return {
			id: orfanato.id,
			nome: orfanato.nome,
			latitude: orfanato.latitude,
			longitude: orfanato.longitude,
			sobre:  orfanato.sobre,
			instrucoes: orfanato.instrucoes,
			horario_de_funcionamento: orfanato.horario_de_funcionamento,
			aberto_aos_fins_de_semana: orfanato.aberto_aos_fins_de_semana,
			imagens: view_imagens.multi_render(orfanato.imagens)
		}
	},

	multi_render(orfanatos: Orfanato[]){
		return orfanatos.map(orfanato => (this.render(orfanato)));
	}
};