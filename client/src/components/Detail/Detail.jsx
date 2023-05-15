import { useEffect,} from "react"
import { useDispatch } from "react-redux"
import {useParams} from "react-router-dom"
import { getGamesId } from "../../redux/actions"
import { useSelector } from "react-redux"

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
        <div>
            <h1>{gameid?.name}</h1>
            <h3 dangerouslySetInnerHTML={{ __html: description }}></h3>
            <h3>{platformsjoin}</h3>
            <h3>{gameid?.rating}</h3>
            <h3>{genresjoin}</h3>
            <h3>{gameid?.released}</h3>
            <img src={gameid?.image} alt="" />
        </div>
    )


}

export default Detail