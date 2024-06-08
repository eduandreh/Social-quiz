import axios from 'axios';
import { 
    getQuestion, 
    insertQuestion,
    allQuestionsByUser,
    getHint
} from "../models/questions.database.js"


export const getQuestionController = (req, res, next) => {
    try {
        const result = getQuestion(req.params.id_question);
        res.json(result);
    } catch (error) {
        next(error);
    }
}

export const insertQuestionController = async (req, res, next) => {
    const toInsert = req.body; 
    const user = req.USER_ID;
    const movieName = toInsert.answer;
    let hint = null;

    console.log("user_id", user);

     hint = await createHint(movieName);

    try {
        const result = await insertQuestion(toInsert, hint, user);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

const createHint = async (movieName) => {
    try {
        const response = await axios.post('http://localhost:11434/api/chat', {
            "model": "llama3:instruct",
            "messages": [
                {
                    "role": "user",
                    "content": `Dame una pista para que pueda adivinar la película '${movieName}', no menciones el título de la película.`
                }
            ],
            "stream": false
        }); 
        return response.data.message.content;

    } catch (error) {
        console.error(`Error verificando la disponibilidad de la api de IA`);
        return null;
    }
};

export const getHintController = async (req, res, next) => {
    const {id_question} = req.params;
    try {
        const result = await getHint(id_question);
        if(result){
            res.json(result);
        }
        else{
            res.status(404).json({msg: "No hay pistas disponibles para esta pregunta."});
        }
        
    } catch (error) {
        next(error);
    }
}

export const getQuestionsByUserController = (req, res, next) => {
    try {
      let {id_user}  = req.params;
      const result = allQuestionsByUser(id_user);
      res.json(result);
    } catch (error) {
      next(error);
    }
  };