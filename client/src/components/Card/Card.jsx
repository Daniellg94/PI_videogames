import styles from "./Card.module.css"
import { Link } from "react-router-dom"

const Card = (props) => {
    const genresString = props.genres.join(', ')
    const id = props.id
    return(
        <div className={styles.card}>
        <Link to = {`/Detail/${id}`}>
        <p>{props.name}</p>
        <p>{genresString}</p>
        <p>rating:{props.rating}</p></Link>
        <img src={props.image} alt='' />
        </div>
    )
}

export default Card