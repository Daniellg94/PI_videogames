require("dotenv").config();
const axios = require("axios");
const { API_KEY } = process.env;
const {Videogame,Genres} = require('../db')
const { Op } = require('sequelize')


const URL_NAME = "https://api.rawg.io/api/games";

const getGameById = async (req, res) => {
  try {
    const { id } = req.params;
    //busca con la primary key el id pasado por parametros
    const dbGames = await Videogame.findByPk(id,{include:{model:Genres}})
  

  if(dbGames){
    return res.status(200).json(dbGames)
  }

    const api = await axios.get(`${URL_NAME}/${id}?key=${API_KEY}`);
    if (!api) {
      throw new Error(`error: ${id} Not found`);
    }
    const game = api.data;
    const gameid = {
      id: game.id,
      name: game.name,
      released: game.released,
      description: game.description,
      platforms: game.parent_platforms.map((plat) => {
        return {
          id: plat.platform.id,
          name: plat.platform.name,
        };
      }),
      genres: game.genres.map((gen) => {
        return {
          id: gen.id,
          name: gen.name,
        };
      }),
      image: game.background_image,
      rating: game.rating,
    };
    return res.status(200).json({ gameid });
  } catch (error) {
    return error.message.includes("games")
      ? res.status(404).json("error: es 404")
      : res.status(500).json({ message: error.message });
  }
};

module.exports = getGameById;
