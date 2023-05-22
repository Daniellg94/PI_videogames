require("dotenv").config();
const axios = require("axios");
const { API_KEY } = process.env;
const URL = `https://api.rawg.io/api/games?key=`;
const { Genres, Videogame } = require("../db");

const getGame = async (req, res) => {
  try {
    const allDbGames = await Videogame.findAll({ include: Genres });

    const apiPromises = [];
    const totalPages = 5; // Número total de páginas que deseas obtener

    for (let page = 1; page <= totalPages; page++) {
      apiPromises.push(axios(`${URL}${API_KEY}&page=${page}`));
    }

    const apiResponses = await Promise.all(apiPromises);

    const games = apiResponses.reduce((accumulator, response) => {
      const responseData = response.data.results.map((game) => {
        return {
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
          image: game.background_image,
          rating: game.rating,
          genres: game.genres.map((gen) => {
            return {
              name: gen.name,
            };
          }),
        };
      });

      return accumulator.concat(responseData);
    }, []);

    const reversedGames = allDbGames.reverse();

    const getAllGames = reversedGames.concat(games);

    if (!getAllGames.length) {
      return res.status(400).json({ error: "No se encontraron juegos." });
    }

    return res.status(200).json(getAllGames);
  } catch (error) {
    console.log("Ocurrió un error:", error);
    return res.status(500).json({ error: "Ocurrió un error en el servidor." });
  }
};

module.exports = getGame;