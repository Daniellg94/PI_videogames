require("dotenv").config();
const axios = require("axios");
const { API_KEY } = process.env;
const URL = `https://api.rawg.io/api/genres?key=`;
const { Genres } = require("../db");

const getGenres = async (req, res) => {
  try {
    //primero se buscan todos los generos de labase de datos
    const genres = await Genres.findAll();

    //si no los encuentra los buscara en la api
    if (genres.length === 0) {
      const apiGame = await axios(`${URL}${API_KEY}`);
      const genresFromAPI = apiGame.data.results.map((gen) => {
        return {
          id: gen.id,
          name: gen.name,
        };
      });
    // una vez encontrados los ordenara
      genresFromAPI.sort((a, b) => a.id - b.id);
    // los guardara en la base de datos con bulk create
      await Genres.bulkCreate(genresFromAPI)
    // le respondera al usuario con los generos en la base de datos  
      return res.status(200).json(genresFromAPI);
    }
    return res.status(200).json(genres)
  } catch (error) {}
};

module.exports = getGenres;
