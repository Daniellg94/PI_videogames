require('dotenv').config();
const axios = require('axios')
const {API_KEY} = process.env
const URL = `https://api.rawg.io/api/games?key=`
const {Genres,Videogame}=require('../db')

const getGame = async(req,res) => {
    try {

        const allDbGames=await Videogame.findAll()

        const apiGame = await axios(`${URL}${API_KEY}`)
        const games = apiGame.data.results.map(game=>{
            return{
                id: game.id,
                name: game.name,
                released: game.released,
                descriotion:  game.description,
                platforms: game.parent_platforms.map(plat=>{return {
                    id:plat.platform.id,
                    name:plat.platform.name}}),
                image: game.background_image,
                rating: game.rating
            }
        });
        if (!games) return res.status(400).json({error:'no lo encontre'}) 
        const getAllGames=allDbGames.concat(games)
        return res.status(200).json(getAllGames)
    
    } catch (error) { 
        console.log('no entre')
        return res.status(500).json({error:error.mesage})
        
    }
}

module.exports = getGame