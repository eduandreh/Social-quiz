import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
  console.log("autenticando");
  if (!req.headers.authorization)
    return next({
      statusCode: 401,
      message: "Necesitas estar autenticado para acceder aquí.",
    });

  const token = req.headers.authorization.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET_SIGN);
    console.log("PAYLOAD", payload); 
    req.USER_ID = payload.user;
    next();

  } catch (error) {
    return next({
      statusCode: 401,
      message: "Token inválido",
    });
  }
}

export function authorizate(req, res, next) {
  console.log("autorizando", req.USER_ID);

  const id_user = req.params.id_user;

  console.log("id_user", id_user);

  if (id_user != req.USER_ID)
    return next({
      statusCode: 403,
      message: "No tienes permisos para acceder aquí.",
    });

  next();
}
