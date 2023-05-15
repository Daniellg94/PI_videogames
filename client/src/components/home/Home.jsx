import CardsContainer from "../Cardscontainer/Cardscontainer"
import { useEffect } from "react"
import { useDispatch} from "react-redux"
import { getGames, getOrder,ratindord,filterGenres,filterPlatform } from "../../redux/actions"


const Home = () =>{
    // inicia y hace el dispatch

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getGames())
    },[dispatch])

    const hendlerOrder = (event)=>{
        dispatch(getOrder(event.target.value))
    }
    const handlerRating = (event) =>{
        dispatch(ratindord(event.target.value))
    }
    const handlerFilter = (event) =>{
        dispatch(filterGenres(event.target.value))
    }
    const handlerPlatform = (event) =>{
        dispatch(filterPlatform(event.target.value))
    }

    return(
        
        <div>
            <div>
            <button value="Linux" onClick={handlerPlatform}>Linux</button>
            <button value="PC" onClick={handlerPlatform}>PC</button>
            <button value="PlayStation" onClick={handlerPlatform}>PlayStation</button>
            </div>
            <div>
            <button value="Strategy" onClick={handlerFilter}>Strategy</button>
            <button value="Puzzle" onClick={handlerFilter}>Puzzle</button>
            <button value="Fighting" onClick={handlerFilter}>Fighting</button>
            <button value="Adventure" onClick={handlerFilter}>Adventure</button>
            <button value="Shooter" onClick={handlerFilter}>Shooter</button>
            <button value="Racing" onClick={handlerFilter}>Racing</button>
            <button value="RPG" onClick={handlerFilter}>RPG</button>
            <button value="Action" onClick={handlerFilter}>Action</button>
            </div>
          <div>  
            <button value="A" onClick={hendlerOrder}>acendente</button>
            <button value="Z" onClick={hendlerOrder}>decendente</button>
            <button value="0" onClick={handlerRating}>Rating up</button>
            <button value="5" onClick={handlerRating}>Rating down</button></div>
            <CardsContainer/>
        </div>
    )


}

export default Home