import CardsContainer from "../Cardscontainer/Cardscontainer"
import { useEffect, useState } from "react"
import { useDispatch, useSelector} from "react-redux"
import { getGenres } from "../../redux/actions";
import { getGames, getOrder,ratindord,filterGenres,filterPlatform } from "../../redux/actions"
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
    const Genres = useSelector(state=>state.genres)
    useEffect(()=>{ 
        dispatch(getGenres())
    },[dispatch])

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

      <button value="A" onClick={hendlerOrder}>acendente</button>
      <button value="Z" onClick={hendlerOrder}>decendente</button>
      <button value="0" onClick={handlerRating}>Rating up</button>
      <button value="5" onClick={handlerRating}>Rating down</button>
      
    </div>
      <div className={styles.img1}> <img src={Kirvy} alt="" /></div>
      <div className={styles.img2}> <img src={Pikachu} alt="" /></div>
      <div className={styles.img3}><img src={Nube} alt="" /></div>
      <div className={styles.img4}><img src={Nube} alt="" /></div>
      <div className={styles.img5}><img src={Nube} alt="" /></div>

  </div>
);}

export default Home