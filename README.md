
# Examen SIF U2 2022

<br>

>Crear base de datos 'examen-u2-sif-2022' para el examen.

<br>

## Alumnos:
- Jorge Arturo Canales Ortega
- Carlos Josue Su Pleitez

<br>

## Este repositorio para examen contiene lo siguiente:
- CRUD categories
- CRUD words
- Juego Ahorcado

<br>

>En la primera ejecucion de la aplicacion se insertaran por defecto 6 categorias y 37 palabras.

<br>

## Requisitos:
- [nodejs](https://nodejs.org/es/)
- npm
- [PostgreSQL](https://www.postgresql.org/download/)

<br>

## Instrucciones:
1. Clonar el repositorio.
2. Instalar las dependencias con `npm install`.
3. Copiar el archivo `.env.example` y renombrarlo a `.env` y configurar las variables de entorno.
4. Ejecutar el comando `npm run dev` para iniciar la aplicación.

<br>

## Ejecutar peticion get (http://localhost:PORT/api/game/ahorcado) para el juego
El body tiene que ser (estrictamente) el siguiente:

```
{
	"word": "ingresar letra o palabra aqui"
}
```

<br>

![Game Image](https://github.com/CarlosSu02/examen-u2-sif-pac3-2022/blob/main/game_img_readme.png)

<br>

## Ejemplo de salida de errores

<br>

![Show Errors](https://github.com/CarlosSu02/examen-u2-sif-pac3-2022/blob/main/error_word_game_img_readme.png)