const {Videogame,Genres} = require('../db')

const postNew = async(req,res) => {

    try {
        
        const{name,description,platforms,image,released,genres}=req.body

        if(!name||!description||!platforms||!image||!released||!genres.length){
            return res.status(401).json({error:"falta algo"})
        }
       
        const gameFind = await Videogame.findOne( {where:{name,released}} );
        if(gameFind)return res.status(400).json({error:'este juego ya existe'});
        const newGame = await Videogame.create({name,description,platforms,image,released})
        const genresFind = await Genres.findAll({where:{id:genres.map(gen=> gen.id)}})
        await newGame.addGenres(genresFind)
        // relaciona y manda los generos relacionados 
        const gameFind2 = await Videogame.findByPk(newGame.id,{ include:[
            {
              model: Genres,
              attributes: ['id','name'],through: { attributes: [] }
            }
          ]} )
        return res.status(200).json(gameFind2)
        
    } catch (error) {

        return res.status(500).json({error:error.message})
        
    }
}

module.exports=postNew