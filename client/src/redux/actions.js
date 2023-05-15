import {SEARCH, GET_GENRES, GET_VIDEOGAMES, ID_VIDEOGAMES, ORDER, RATING, FILTER_GENRES, FILTER_PLATFORM} from "./accions_types"
import axios from "axios"

const URL = `http://localhost:3001/videogames`;

export const getGames = ()=>{
    
    return async (dispatch)=>{
        const apiData = await axios.get(URL)
        const data = apiData.data
        return dispatch(
            {
                type:GET_VIDEOGAMES,
                payload: data            
            }
        )
}
}

export const getGamesId = (id) =>{

    return async (dispatch) =>{
        const apiDataId= await axios.get (`http://localhost:3001/videogames/${id}`)
        const data = apiDataId.data
        return dispatch ({
            type:ID_VIDEOGAMES,
            payload: data
        })
    }
    
}

export const getGenres = () =>{

    return async (dispatch) =>{
        const dbgenres = await axios.get( `http://localhost:3001/genres`)
        const data = dbgenres.data
        return dispatch({
            type: GET_GENRES,
            payload: data
        })
    }
}

export const getSearch = (search) =>{

    return async (dispatch) =>{
        const dbfilter= await axios.get (`http://localhost:3001/videogames/name?search=${search}`)
        const data = dbfilter.data.sendGame
        return dispatch({
            type: SEARCH,
            payload: data
        }
        )
    }
}

export const getOrder = (order) =>{
    return{type:ORDER, payload:order}

}

export const ratindord = (rating) =>{
    return{type:RATING, payload:rating}

}

export const filterGenres = (genre) =>{
    return{type:FILTER_GENRES, payload:genre}

}

export const filterPlatform = (platform) =>{
    return{type:FILTER_PLATFORM, payload:platform}

}