

const Validations = (newGame) => {

    let errors = {}
    const imageRegex = /\.(jpg|jpeg|png|gif|bmp)$/i;

    if(!newGame.name){
        errors.name = "the game should have a name"
    }
    if(newGame.description.length < 30){
     errors.description = "description should have 30 characters at least"
    }
    if(newGame.platforms.length===0){
        errors.platforms = "the game should have 1 platform at least"
    }
    if(!newGame.released){
        errors.released = "the game should have a date of released"
    }
    if(!imageRegex.test(newGame.image)){
        errors.image = "it should be a image format "
    }
    if(newGame.genres.length === 0){
        errors.genres = "the game should have 1 genre at least"
    }
    return errors;
}

export default Validations