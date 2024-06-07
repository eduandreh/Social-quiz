import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
  console.log("autenticando");
  if (!req.headers.authorization)
    return next("no hay cabecera de autenticacion");

  const token = req.headers.authorization.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET_SIGN);
    console.log("PAYLOAD", payload); 
    req.USER_ID = payload.user;
    next();

  } catch (error) {
    console.log("Invalid token", error);
    return next("Token no válido");
  }
}

export function authorizate(req, res, next) {
  console.log("autorizando", req.USER_ID);
  // tenemos que validar que el usuario logueado sea el usuario de los params
  // if (!req.headers.authorization)
  //   return next("no hay cabecera de autenticacion");
  // const token = req.headers.authorization.split(" ")[1];
  // const payload = jwt.verify(token, process.env.JWT_SECRET_SIGN);

  // console.log(payload);

  const id_user = req.params.id_user; // <-- string

  console.log("id_user", id_user);

  if (id_user != req.USER_ID)
    return next({
      error: 403,
      message: "no tienes permisos para ver los todos de otra gente",
    });

  next();
}
