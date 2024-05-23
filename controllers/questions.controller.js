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
    res.json(sendAnswer(req.params.id));
}

export const  insertQuestionController = async(req, res, next) => {
    // res.status(501).send("not implemented")
    const toInsert = req.body // validar que el body sea correcto...
        try {
            const response = await axios.post('http://localhost:11434/api/chat', {
                "model": "llama3:instruct",
                "messages": [
                  {
                    "role": "user",
                    "content": "Dame una pista para que pueda adivinar la película 'The lion king', no menciones el titulo de la pelicula"
                  }
                ],
                "stream": false
              });
                const hint = response.data.message.content;
        res.json(await insertQuestion(toInsert, hint));
        
    }catch(ex){
        next(ex);
    }

}

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