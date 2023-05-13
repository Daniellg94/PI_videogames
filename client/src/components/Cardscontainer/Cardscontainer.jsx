import { useSelector } from "react-redux"
import Card from "../Card/Card"
import styles from "./Cardscontainer.module.css"


<link rel="stylesheet" href="" />


const CardsContainer = () =>{

    const videogames = useSelector(state=>state.videogames)
    return(
        <div className={styles.cardscontainer}>
            
            {videogames.map(games=>{
                return <Card 
                key = {games.id}
                id = {games.id}
                genres={games.genres.map((gen)=>gen.name)}
                name = {games.name}
                rating = {games.rating}
                image = {games.image}
                />
            })}
        </div>
    )
    


}

export default CardsContainer