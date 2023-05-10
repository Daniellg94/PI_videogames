require('dotenv').config();
const { Op } = require('sequelize')
const axios = require('axios')
const {API_KEY} = process.env
const {Videogame,Genres}=require('../db')

const URL_NAME = "https://api.rawg.io/api/games?key="

const getGameByName = async(req,res) => {
    try {
    const {search} = req.query

    //busca en la base de datos los atributos por nombre 
    const dbGames = await Videogame.findAll({
        attributes: ["id", "name","released","description","platforms","image","rating"],
        where:{name:{[Op.like]:`%${search}%`}},
        //include:Genres,
    })
   
    const api = await axios.get(`${URL_NAME}${API_KEY}&search=${search}`)
    if(!api){
        return new Error(`search: ${search} Not found`) }
        const games = api.data.results.map(game=>{
            return{
                id: game.id,    
                name: game.name,
                released: game.released,
                description:  game.description,
                platforms: game.parent_platforms.map(plat=>{return {
                    id:plat.platform.id,
                    name:plat.platform.name}}),
                image: game.background_image,
                rating: game.rating
            }
        })
        const allgames = dbGames.concat(games)
        const sendGame = allgames.slice(0,15)
    return res.status(200).json({games:sendGame})
        
    } catch (error) {
        return error.message.includes('SEARCH')
        ?res.status(404).json('wacamole')
        :res.status(500).json({ message: error.message })

        
    }
}

module.exports = getGameByName