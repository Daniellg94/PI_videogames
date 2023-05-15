import {
  SEARCH,
  GET_GENRES,
  GET_VIDEOGAMES,
  ID_VIDEOGAMES,
  ORDER,
  RATING,
  FILTER_GENRES,
  FILTER_PLATFORM,
} from "./accions_types";

const initialState = {
  videogames: [],
  videogame: [],
  genres: [],
  filtrado: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VIDEOGAMES:
      return { ...state, videogames: action.payload, filtrado: [] };

    case ID_VIDEOGAMES:
      return { ...state, videogame: action.payload };

    case GET_GENRES:
      return { ...state, genres: action.payload };

    case SEARCH:
      return { ...state, videogames: action.payload };

    case ORDER:
      const gamesOrd = [...state.videogames];
      return {
        ...state,
        videogames:
          action.payload === "A"
            ? gamesOrd.sort((a, b) => a.name.localeCompare(b.name))
            : gamesOrd.sort((a, b) => b.name.localeCompare(a.name)),
        filtrado:
          action.payload === "A"
            ? gamesOrd.sort((a, b) => a.name.localeCompare(b.name))
            : gamesOrd.sort((a, b) => b.name.localeCompare(a.name)),
      };
    case RATING:
      const gameRating = [...state.videogames];
      return {
        ...state,
        videogames:
          action.payload === "5"
            ? gameRating.sort((a, b) => a.rating - b.rating)
            : gameRating.sort((a, b) => b.rating - a.rating),
        filtrado:
          action.payload === "5"
            ? gameRating.sort((a, b) => a.rating - b.rating)
            : gameRating.sort((a, b) => b.rating - a.rating),
      };
    case FILTER_GENRES:
      const filtergen = state.videogames.filter((game) => {
        return game.genres.some((genre) => genre.name === action.payload);
      });
      return {
        ...state,
        filtrado: filtergen,
      };
      case FILTER_PLATFORM:
        const filterPlatforms = state.videogames.filter((game) => {
          return game.platforms.some((platform) => platform.name === action.payload);
        });
        return {
          ...state,
          filtrado: filterPlatforms
        };

    default:
      return { ...state };
  }
};

export default rootReducer;
