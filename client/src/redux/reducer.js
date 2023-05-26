import {
  SEARCH,
  GET_GENRES,
  GET_VIDEOGAMES,
  ID_VIDEOGAMES,
  ORDER,
  RATING,
  FILTER_GENRES,
  FILTER_PLATFORM,
  COPIAR,
  DBGAMES,
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
      return { ...state, videogames: action.payload, filtrado: []};

    case ID_VIDEOGAMES:
      return { ...state, videogame: action.payload };

    case GET_GENRES:
      return { ...state, genres: action.payload };

    case SEARCH:
      return { ...state, videogames: action.payload, filtrado: [] };

    case ORDER:
      const gamesOrd = [...state.videogames];
      const filterOrd =[...state.filtrado]
      return {
        ...state,
        videogames:
          action.payload === "A"
            ? gamesOrd.sort((a, b) => a.name.localeCompare(b.name))
            : gamesOrd.sort((a, b) => b.name.localeCompare(a.name)),
        filtrado:
          action.payload === "A"
            ? filterOrd.sort((a, b) => a.name.localeCompare(b.name))
            : filterOrd.sort((a, b) => b.name.localeCompare(a.name)),
      };
    case RATING:
      const gameRating = [...state.videogames];
      const filterRat =[...state.filtrado]
      return {
        ...state,
        videogames:
          action.payload === "5"
            ? gameRating.sort((a, b) => a.rating - b.rating)
            : gameRating.sort((a, b) => b.rating - a.rating),
        filtrado:
          action.payload === "5"
            ? filterRat.sort((a, b) => a.rating - b.rating)
            : filterRat.sort((a, b) => b.rating - a.rating),
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
        case DBGAMES:
          const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
          const filterDbGames = state.videogames.filter((game) => {
          //si es un uuid filtrara todos los que son uuid dentro del array
          if (uuidRegex.test(action.payload)) {
          return uuidRegex.test(game.id);
          //  no es uuid filtrara todos los que no sean uuid 
          } else {
          return !uuidRegex.test(game.id);}});
          return {
            ...state,
            filtrado: filterDbGames
          };
      

      case COPIAR:
        return{...state}

    default:
      return { ...state };
  }
};

export default rootReducer;
