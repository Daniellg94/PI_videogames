
import {useSelector } from "react-redux"
import Card from "../Card/Card"
import styles from "./Cardscontainer.module.css"

const CardsContainer = () =>{
    
    const videogames = useSelector(state=>state.videogames)

    const visual =  useSelector(state=>state.filtrado)

    const gamesToDisplay = visual.length > 0 ? visual : videogames;

    return(

        <div className={styles.cardscontainer}>
            
            {gamesToDisplay.map(games=>{
                return <Card 
                key = {games.id}
                id = {games.id}
                genres={games.genres?.map((gen)=>gen.name)}
                name = {games.name}
                rating = {games.rating}
                image = {games.image}
                />
            })}
        </div>
    )
    


}

export default CardsContainer