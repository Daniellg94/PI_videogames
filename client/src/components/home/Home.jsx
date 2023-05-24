import CardsContainer from "../Cardscontainer/Cardscontainer"
import { useEffect, useState } from "react"
import { useDispatch, useSelector} from "react-redux"
import { getGenres } from "../../redux/actions";
import { getGames, getOrder,ratindord,filterGenres,filterPlatform,dbgame} from "../../redux/actions"
import styles from "./Home.module.css"
import { Platforms } from "../Form/Form";
import Kirvy from "./Kirvy.png"
import Pikachu from "./Pikachu.png"
import Nube from "./Nube.png"

const Home = () =>{
    // inicia y hace el dispatch

    const dispatch = useDispatch()

    useEffect(()=>{
      dispatch(getGames())
    },[dispatch])
    // controla el orden por de la A a la Z
    const hendlerOrder = (event)=>{
        dispatch(getOrder(event.target.value))
    }
    // controla el orden por Rating
    const handlerRating = (event) =>{
        dispatch(ratindord(event.target.value))
    }
    const handlerFilter = (event) =>{
        dispatch(filterGenres(event.target.value))
    }
    //Filtra por plataforma
    const handlerPlatform = (event) =>{
        dispatch(filterPlatform(event.target.value))
    }
    //filtra por base de datos o api
    const handlerbd = (event)=>{
      dispatch(dbgame(event.target.value))
    }

    // trae todos los generos de la db
    const Genres = useSelector(state=>state.genres)
    useEffect(()=>{ 
        dispatch(getGenres())
    },[dispatch])

// setea el estado de los botones que hacen drop a los filtros 
const [openGenres, setOpenGenres] = useState(false);
const [openPlatforms, setOpenPlatforms] = useState(false);

const dropGenres = () => {
  setOpenGenres(!openGenres);
};

const dropPlatforms = () => {
  setOpenPlatforms(!openPlatforms);
};

return (
  <div className={styles.container}>
    <div className={styles.cardcontainer}>
    <CardsContainer/>
    </div>
    
    <div className={styles.buttons}>
      
        <button className={styles.dropbtn} onClick={dropGenres}>
          Drop Genres
        </button>
        {openGenres && (
          <div className={styles.dropdownContent}>
            {Genres.map((genre) => (
              <button  disabled={genre.disabled} onClick={handlerFilter} value={genre.name}>
                {genre.name}
              </button>
            ))}
          </div>
        )}
      
      
        <button className={styles.dropbtn} onClick={dropPlatforms} >
          Drop Platforms
        </button>
        {openPlatforms && (
          <div className={styles.dropdownContent}>
            {Platforms.map((platform) => (
              <button value={platform.name} onClick={handlerPlatform}>
                {platform.name}
              </button>
            ))}
          </div>
        )}

      <button value="A" onClick={hendlerOrder}>A - Z</button>
      <button value="Z" onClick={hendlerOrder}>Z - A</button>
      <button value="0" onClick={handlerRating}>Rating up</button>
      <button value="5" onClick={handlerRating}>Rating down</button>
      <button value="6e8bc430-9c3a-11d9-9669-0800200c9a66" onClick={handlerbd}>DB GAMES</button>
      <button value="123" onClick={handlerbd}>API GAMES</button>
      
    </div>
      <div className={styles.img1}> <img src={Kirvy} alt="" /></div>
      <div className={styles.img2}> <img src={Pikachu} alt="" /></div>
      <div className={styles.img3}><img src={Nube} alt="" /></div>
      <div className={styles.img4}><img src={Nube} alt="" /></div>
      <div className={styles.img5}><img src={Nube} alt="" /></div>

  </div>
);}

export default Home