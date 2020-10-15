import {Router} from "express";
import {getRepository} from "typeorm";
import multer from "multer";
import Orfanato from "./models/Orfanato";
import configUpload from "./config/upload";
import ControladorOrfanatos from "./controllers/ControladorOrfanatos";
import "./database/connection";

const rotas = Router();
const upload =  multer(configUpload);

rotas.post("/orfanatos", upload.array("imagens"), ControladorOrfanatos.create);
rotas.get("/orfanatos", ControladorOrfanatos.index);
rotas.get("/orfanatos/:id", ControladorOrfanatos.show);

export default rotas;