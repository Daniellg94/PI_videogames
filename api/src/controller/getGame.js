require("dotenv").config();
const axios = require("axios");
const { API_KEY } = process.env;
const URL = `https://api.rawg.io/api/games?key=`;
const { Genres, Videogame } = require("../db");

const getGame = async (req, res) => {
  try {
    //trae todos los juegos encontrados en la base de datos
    const allDbGames = await Videogame.findAll();

    //trae todos los juegos encontrados en la api
    const apiGame = await axios(`${URL}${API_KEY}`);
    const games = apiGame.data.results.map((game) => {
      return {
        id: game.id,
        name: game.name,
        released: game.released,
        descriotion: game.description,
        platforms: game.parent_platforms.map((plat) => {
          return {
            id: plat.platform.id,
            name: plat.platform.name,
          };
        }),
        image: game.background_image,
        rating: game.rating,
        genres: game.genres.map((gen)=>{
          return {
            name:gen.name
          }
        })
      };
    });
    // concatena los juegos en la base de datos con los juegos en la api
    const getAllGames = allDbGames.concat(games);
    // si no se encuentra nada deve dar este error
    if (!getAllGames) return res.status(400).json({ error: "hay un problema revisa tu base de datos y tu api" });
    // retorna todos los juegos 
    return res.status(200).json(getAllGames);
  } catch (error) {
    console.log("no entre");
    return res.status(500).json({ error: error.mesage });
  }
};

module.exports = getGame;
