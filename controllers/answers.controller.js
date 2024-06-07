import { 
    sendAnswer,
} from "../models/answers.database.js"

export const sendAnswerController = (req, res, next) => {
    const id = req.params.id;
    const answer = req.body.answer;
    if(sendAnswer(id, answer)){
        res.status(200).send("Correcto! :)");
    }
    else{
        res.status(400)
        .send("Respuesta incorrecta. Intente de nuevo o solicite una pista.");
    }
}