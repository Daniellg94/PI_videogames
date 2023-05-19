import styles from "./Card.module.css"
import { Link } from "react-router-dom"

const Card = (props) => {
    const genresString = props.genres.join(', ')
    const id = props.id
    return(
        <div className={styles.card}>
        
        <Link to = {`/Detail/${id}`}> 
        <p><img src={props.image} alt='ruta de la imagen' /></p> 
        <footer>
        <p>{props.name}</p>
        <p>{genresString}</p>
        <p>⭐{props.rating}</p>     
        </footer>  
        </Link>
        
        </div>
    )
}

export default Card