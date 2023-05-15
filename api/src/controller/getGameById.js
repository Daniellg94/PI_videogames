require("dotenv").config();
const axios = require("axios");
const { API_KEY } = process.env;
const {Videogame,Genres} = require('../db')
const { Op } = require('sequelize')


const URL_NAME = "https://api.rawg.io/api/games";

const getGameById = async (req, res) => {
  try {
    const { id } = req.params;

    function isUUID(value) {
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      return uuidRegex.test(value);}
    //busca con la primary key el id pasado por parametros
  if(isUUID(id)){
    const dbGames = await Videogame.findByPk(id,{include:{model:Genres}})
  
  // si la encuentra en base de datos entrara aca y lo enviara al usuario
  if(dbGames){
    return res.status(200).json(dbGames)
  }}

  //si no encuentra ese id en base de datos la buscara en la api
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
    return res.status(200).json( gameid );
  } catch (error) {
    return error.message.includes("games")
      ? res.status(404).json("error: es 404")
      : res.status(500).json({ message: error.message });
  }
};

module.exports = getGameById;
