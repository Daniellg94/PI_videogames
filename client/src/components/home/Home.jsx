import CardsContainer from "../Cardscontainer/Cardscontainer"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getGames } from "../../redux/actions"


const Home = () =>{
    // inicia y hace el dispatch
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getGames())
    },[])
    

    return(
        <div>
            <h1> Home</h1>
            <CardsContainer/>
        </div>
    )


}

export default Home