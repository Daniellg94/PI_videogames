import { GET_GENRES, GET_VIDEOGAMES, ID_VIDEOGAMES } from "./accions_types";

const initialState ={
    videogames:[],
    videogame:[],
    genres:[]
}

const rootReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_VIDEOGAMES:
            return{...state, videogames:action.payload}

        case ID_VIDEOGAMES:
            return{...state, videogame:action.payload}
        
        case GET_GENRES:
            return{...state, genres:action.payload}
    
        default:
           return {...state}
    }

}

export default rootReducer;