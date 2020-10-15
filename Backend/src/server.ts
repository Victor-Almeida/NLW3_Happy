import express from "express";
import path from "path";
import cors from "cors";
import errorHandler from "./errors/handler";
import rotas from "./rotas";
import "express-async-errors";
import "./database/connection";

const app = express();
app.use(cors());
app.use(express.json());
app.use(rotas);
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
app.use(errorHandler);

app.listen(3333);