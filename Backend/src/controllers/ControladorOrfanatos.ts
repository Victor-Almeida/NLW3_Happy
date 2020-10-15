import {Request, Response} from "express";
import {getRepository} from "typeorm";
import Orfanato from "../models/Orfanato";
import view_orfanatos  from "../views/orfanatos";
import * as yup from "yup";

export default {
	async show(requisicao:Request, resposta:Response){
		const {id} = requisicao.params;
		const repositorio_orfanato = getRepository(Orfanato);
		const orfanato = await repositorio_orfanato.findOneOrFail(id, {
			relations: ["imagens"]
		});

		return resposta.json(view_orfanatos.render(orfanato));
	},

	async index(requisicao: Request, resposta:Response){
		const repositorio_orfanato = getRepository(Orfanato);
		const orfanatos = await repositorio_orfanato.find({
			relations: ["imagens"]
		});
		
		return resposta.json(view_orfanatos.multi_render(orfanatos));
	},

	async create(requisicao: Request, resposta: Response){
		const {
			nome,
			latitude,
			longitude,
			sobre,
			instrucoes,
			horario_de_funcionamento,
			aberto_aos_fins_de_semana
		} = requisicao.body;

		const repositorio_orfanato = getRepository(Orfanato);
		const imagens_requisicao = requisicao.files as Express.Multer.File[];

		const imagens = imagens_requisicao.map(imagem => {
			return {caminho: imagem.filename};
		});

		const dados = {
			nome,
			latitude,
			longitude,
			sobre,
			instrucoes,
			horario_de_funcionamento,
			aberto_aos_fins_de_semana,
			imagens
		};

		const schema = yup.object.shape({
			nome: yup.string().required("Nome obrigatório"),
			latitude: yup.number().required("Latitude obrigatória para localização geográfica"),
			longitude: yup.number().required("Longitude obrigatória para localização geográfica"),
			sobre: yup.string().max(300),
			instrucoes: yup.string(),
			horario_de_funcionamento: yup.string().required("Horário de funcionamento obrigatório para que possam saber quando visitar"),
			aberto_aos_fins_de_semana: yup.boolean(),
			imagens: yup.array(yup.object().shape({
				caminho: yup.string().required()
			}))
		});

		await schema.validate(dados, {
			abortEarly: false
		});

		const orfanato = repositorio_orfanato.create({
			nome,
			latitude,
			longitude,
			sobre,
			instrucoes,
			horario_de_funcionamento,
			aberto_aos_fins_de_semana,
			imagens
		});

		await repositorio_orfanato.save(orfanato);

		return resposta.status(201).json(orfanato);
	}
}