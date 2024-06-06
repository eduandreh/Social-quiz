import axios from 'axios';
import { 
    getQuestion, 
    insertQuestion,
    sendAnswer
    // deleteUser,
} from "../database.js"


export const getQuestionController = (req, res, next) => {
    res.json(getQuestion());
}

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