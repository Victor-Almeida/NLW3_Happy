import Imagem from "../models/Imagem";

export default {
	render(imagem: Imagem){
		return {
			id: imagem.id,
			url: "http://localhost:3333/uploads/${imagem.caminho}"
		}
	},

	multi_render(imagens: Imagem[]){
		return imagens.map(imagem => (this.render(imagem)));
	}
};