const { Router, request } = require('express');
const getGame = require("../controller/getGame.js")
const searchGameByName = require ("../controller/searchGameByName.js")
const newGame = require('../controller/postGame.js')
const getGameById = require ('../controller/getGameById.js')
const getGenres = require ('../controller/getgenres.js')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.get('/videogames', getGame)

router.get('/videogames/name',searchGameByName)

router.post('/videogames', newGame)

router.get('/videogames/:id', getGameById)

router.get('/genres',getGenres)

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
