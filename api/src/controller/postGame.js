const {Videogame,Genres} = require('../db')

const postNew = async(req,res) => {
    
    try {
        
        const{name,description,platforms,image,released,genres,rating}=req.body

        if(!name||!description||!platforms||!image||!released||!genres.length||!rating){
            return res.status(401).json({error:"falta algo"})
        }
       // encuentra coincidencias de nombre y de fecha para ver si se perimite crear
        const gameFind = await Videogame.findOne( {where:{name,released}} );
        if(gameFind)return res.status(400).json({error:'este juego ya existe'});
        // se crea un nuevo videojuego con los parametros pedidos
        const newGame = await Videogame.create({name,description,platforms,image,released,rating})
        // busca los generos en la base de datos y los relaciona con los generos que registra el usuario
        const genresFind = await Genres.findAll({where:{id:genres.map(gen=> gen.id)}})
        // añade los generos al juego reistrados por base de datos
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