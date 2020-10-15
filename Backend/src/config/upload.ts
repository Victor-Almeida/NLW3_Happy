import multer from "multer";
import path from "path";

export default {
	storage: multer.diskStorage({
		destination: path.join(__dirname, "..", "..", "uploads"),
		filename: (requisicao, arquivo, callback) => {
			const fileName = "${Date.now}-${arquivo.originalName}";
			callback(null, fileName);
		}
	})
};