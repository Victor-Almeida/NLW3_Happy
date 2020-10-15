import {ErrorRequestHandler} from "express";
import {ValidationError} from "yup";

interface ErrosValidacao {
	[key: string]: string[];
};

const errorHandler:ErrorRequestHandler = (erro, requisicao, resposta, prox) => {
	console.log(erro);

	if(erro instanceof  ValidationError){
		let erros: ErrosValidacao = {};

		erro.inner.forEach(err => {
			erros[err.path] = err.errors;
		});

		return resposta.status(400).json({mensagem: "Erro de validação", erros});
	}

	return resposta.status(500).json({mensagem: "Erro interno"});
};

export default errorHandler;