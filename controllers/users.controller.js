import { allUsers,
    getUser, 
    insertUser,
    //updateUser,
    // deleteUser,
} from "../database.js"


export const allUsersController = (req, res, next) => {
    res.json(allUsers());
}

export const getUsersController = (req, res, next) => {
    res.json(getUser(req.params.id));
}

export const  insertUserController = async(req, res, next) => {
    // res.status(501).send("not implemented")
    const toInsert = req.body // validar que el body sea correcto...

    try{
        res.json(await insertUser(toInsert))
    }catch(ex){
        next(ex);
    }
}

// export const updateUserController = (req, res, next) => {

//     const id = req.params.id;  // verificar que el id es correcto...
//     const toUpdate = req.body; // verificar que el body es correcto...

//     // res.status(500).send("not implemented")
//     res.status(200).json(updateUser(id , toUpdate))
// }

// export const updateUserController = (req, res, next) => {
//     res.status(501).send("not implemented")
// }
// export const deleteUserController = (req, res, next) => {
//     res.status(501).send("not implemented")
// }