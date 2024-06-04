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
    res.json(sendAnswer(id, answer));
}

export const insertQuestionController = async (req, res, next) => {
    const toInsert = req.body; // Validar que el body sea correcto.
    const movieName = toInsert.answer;
    let hint = null;
    console.log('Inserting question:', toInsert);
    console.log('Movie name:', movieName);

    const serverStatus = await checkServerAvailability('http://localhost:11434/');
    if (serverStatus) {
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
            hint = response.data.message.content;
        } catch (ex) {
            console.error('Error al obtener la pista del servidor de IA', ex);
        }
    }

    try {
        const result = await insertQuestion(toInsert, hint);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

const checkServerAvailability = async (url) => {
    try {
        const response = await axios.get(url); 
        return response.status === 200;
    } catch (error) {
        console.error(`Error verificando la disponibilidad de la api de IA`);
        return false;
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