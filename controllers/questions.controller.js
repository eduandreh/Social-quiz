import axios from 'axios';
import { 
    getQuestion, 
    insertQuestion,
    allQuestionsByUser
} from "../models/questions.database.js"


export const getQuestionController = (req, res, next) => {
    res.json(getQuestion());
}



export const insertQuestionController = async (req, res, next) => {
    const toInsert = req.body; // Validar que el body sea correcto.
    const user = req.USER_ID;
    const movieName = toInsert.answer;
    let hint = null;

    console.log("user_id", user);

     hint = await getHint(movieName);

    try {
        const result = await insertQuestion(toInsert, hint, user);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

const getHint = async (movieName) => {
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

//random ()

// export const updateUserController = (req, res, next) => {

//     const id = req.params.id;  // verificar que el id es correcto...
//     const toUpdate = req.body; // verificar que el body es correcto...

//     // res.status(500).send("not implemented")
//     res.status(200).json(updateUser(id , toUpdate))
// }
// export const deleteUserController = (req, res, next) => {
//     res.status(501).send("not implemented")
// }

export const getQuestionsByUserController = (req, res, next) => {
    try {
      let { idUser } = req.params;
      const result = allQuestionsByUser(idUser);
      res.json(result);
    } catch (error) {
      next(error);
    }
  };