require("dotenv").config();
const axios = require("axios");
const { API_KEY } = process.env;
const URL = `https://api.rawg.io/api/genres?key=`;
const { Genres } = require("../db");

const getGenres = async (req, res) => {
  try {
    const genres = await Genres.findAll();

    if (genres.length === 0) {
      const apiGame = await axios(`${URL}${API_KEY}`);
      const genresFromAPI = apiGame.data.results.map((gen) => {
        return {
          id: gen.id,
          name: gen.name,
        };
      });
      genresFromAPI.sort((a, b) => a.id - b.id);
      await Genres.bulkCreate(genresFromAPI)
      return res.status(200).json(genresFromAPI);
    }
    return res.status(200).json(genres)
  } catch (error) {}
};

module.exports = getGenres;
