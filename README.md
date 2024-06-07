# SOCIAL-QUIZZ

## Introduction

Version emoji quizz movie.

![image](/DD-COMPOSITE-EMOJI-QUIZ-1.webp)

### Casos de uso

1. El usuario registrado puede agregar preguntas y su respuesta.
   Y añadirle un estado: privada o pública. Y categorizarla.

2. un endpoint que me de una pregunra random. Esta pregunta tiene que ser pública. (modo de juego básico)

2.1. Modos de juego: pregunta sin respuesta ó pregunta con 4 opciones.

3. el usuario (anónimo) puede responder a preguntas. Y recibir el feedback.

4. Los usuarios registrados pueden hacer comentarios a las preguntas que haya hecho otro usuario.

5. Hacer likes a las preguntas o dislikes

### Extras


0. Modelo IA: guardar en cache y preguntar

1. modo de juego con tiempo.
2. Comentarios con likes y dislikes.
3. Modos de juego:
   1. Top questions.
   2. Sólo peliculas de una categoría.

### Ejemplos

### Algunas preguntas

A continuación un listado de peliculas para añadir a la base de datos

| Película     | Solución                    |
| ------------ | --------------------------- |
| '🔕🐑🐑🐑'   | el silencio de los corderos |
| '💍💍💍💍⚰️' | cuatro bodas y un funeral   |
| '🏝️🏐'       | náufrago                    |
| '👽☎🏠'      | ET                          |
| '👦✂👐'      | Eduardo manos tijeras       |

#### Juego

A continuación te muestro un workflow con las posibles request y responses entre cliente y servidor.

cliente llama a: `/dameunapreguntayrespuestas` (no uses este nombre para el endpoint, usa otro más correcto...)

el servidor responde:

json
{
    "pregunta": "🔕🐑🐑🐑"
    "id": 357285
    "respuestas": [
        "Parque jurásico",
        "El señor de los anillos",
        "Tomb raider",
        "El silencio de los corderos"
    ]
}

El cliente muestra pregunta (+ respuestas).

El cliente envia la solucion `/estaeslasolucion` (no uses este nombre para el endpoint, usa otro más correcto...):

json
{
  "pregunta": 357285,
  "solucion": "Parque jurásico"
}

El servidor responde con la respuesta:

json
{
  "mensaje": "Muy mal! era blablabla"
}



que me queda

Esquemas y validaciones
User autorizaciones y getquestion por user
Categorias de preguntas (todo)
Modo de juego de multiple choice
Comentarios
Likes, dislike