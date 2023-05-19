import { useEffect,} from "react"
import { useDispatch } from "react-redux"
import {useParams} from "react-router-dom"
import { getGamesId } from "../../redux/actions"
import { useSelector } from "react-redux"
import styles from "./Detail.module.css"
import estrella from "./estrella.png"

const Detail = () =>{

    const dispatch= useDispatch()
    let {id} = useParams()

    const gameid = useSelector(state=>state.videogame)

    console.log(gameid)

    useEffect(()=>{ 
        dispatch(getGamesId(id))
    },[id])

    const platforms =gameid.platforms?.map(plat=> plat.name)
    const genres =gameid.genres?.map(plat=> plat.name)
    const platformsjoin = platforms?.join(', ')
    const genresjoin = genres?.join(', ')
    
    const description = gameid?.description

    return(
        <div className={styles.det}>
            <div className={styles.imagen}>
            <img src={gameid?.image} alt="" />
            <footer><h1>{gameid?.name}</h1>

            </footer>
            </div>
            <div>
            <div className={styles.des}>
            <h3 dangerouslySetInnerHTML={{ __html: description }}></h3>
            <div className={styles.rating}>
            <h2><img src={estrella} alt="" />{gameid?.rating}</h2>
            </div>
            </div>
            <div className={styles.platforms}> <h3>{platformsjoin}</h3> </div>
            
            <div className={styles.genres}>
            <h3>{genresjoin}</h3>
            <h3>{gameid?.released}</h3>
            </div>
            
            </div>

        </div>
    )


}

export default Detail