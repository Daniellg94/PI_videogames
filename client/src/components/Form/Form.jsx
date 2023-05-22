import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getGenres } from "../../redux/actions";
import Validations from "./Validations/Validations";
import axios from "axios";
import styles from "./Form.module.css"
import { Link } from "react-router-dom";
import Ada from "./Ada.png"
import Big from "./Big.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Platforms=[
  {name:"Xbox",id:3},{name:"PlayStation",id:2},
  {name:"PC", id: 1},{name:"Nintendo", id: 7},
  {name:"iOS", id: 4},{name:"Apple Macintosh", id: 5},
  {name:"Linux", id: 6},{name:"Web", id: 14}
]

const Form = () =>{
    
    const dispatch = useDispatch()
    const Genres = useSelector(state=>state.genres)
    useEffect(()=>{ 
        dispatch(getGenres())
    },[dispatch])

    const [newGame, setNewGame] = useState({
        name:"",
        platforms:[],
        description:"",
        released:"",
        rating:0.0,
        image:"",
        genres:[],
    })

    const [error, setError] = useState({
        name:"",
        platforms:"",
        description:"",
        released:"",
        rating:0.0,
        image:"",
        genres:"",
    })

    const changeHandler = (event) => {
        setNewGame({
          ...newGame,
          [event.target.name]: event.target.value,
        });
        setError(
          Validations({
            ...newGame,
            [event.target.name]: event.target.value,
          })
        )
      };


      const addPlatform = (event) => {
        const selectedPlatform = Platforms.find((platform) => platform.name === event.target.value);
        if (selectedPlatform && !newGame.platforms.includes(selectedPlatform)) {
          setNewGame((prevState) => ({
            ...prevState,
            platforms: [...prevState.platforms, selectedPlatform],
          }));
          setError(
            Validations({
              ...newGame,
              platforms: [...newGame.platforms, selectedPlatform],
            })
          );
        }
      };
    
      const removePlatform = (platform) => {
        setNewGame((prevState) => ({
          ...prevState,
          platforms: prevState.platforms.filter((plat) => plat !== platform),
        }));
      };

      const handleRatingChange = (event) => {
        const rating = parseFloat(event.target.value);
        if (!isNaN(rating) && rating >= 0 && rating <= 5) {
          setNewGame((prevState) => ({
            ...prevState,
            rating: rating,
          }));
        } else {
          setNewGame((prevState) => ({
            ...prevState,
            rating: 0,
          }));
        }
      };

      const addGenres = (event) => {
        const selectedGenre = Genres.find((genre) => genre.name === event.target.value);
        if (selectedGenre && !newGame.genres.includes(selectedGenre)) {
          setNewGame((prevState) => ({
            ...prevState,
            genres: [...prevState.genres, selectedGenre],
          }));
          setError(
            Validations({
              ...newGame,
              genres: [...newGame.genres, selectedGenre],
            })
          );
        }
      };
      

      const removeGenres = (genre) => {
        setNewGame((prevState) => ({
          ...prevState,
          genres: prevState.genres.filter((gen) => gen !== genre),
        }));
      };

   

      const handleSubmit = (event) => {
        
      
        const postGame = 'https://daniel-vidoegames-pi-back.onrender.com/videogames';
  
        axios.post(postGame, newGame)
          .then((res) => toast.success('¡El juego se ha creado exitosamente!'))
          
          .catch((error) => toast.error("el juego ya existe"));

      }
    
      return (

        <div className={styles.fondo}>
          <div className={styles.buttons}>
          <Link to="/home"><button >Home</button></Link>
          <Link to="/"><button>inicio</button></Link>
          </div> 
        <form onSubmit={handleSubmit} className={styles.Form}>
          <label htmlFor="name">Game name:</label>
            <input type="text" name="name" placeholder="Ingresa nombre del juego" value={newGame.name} onChange={changeHandler}/>
          <div className={styles.error}>
            {error.name && <p>{error.name}</p>}</div>
          <br />
          <label htmlFor="released"> Released date: </label>
          <input type="date" name="released" placeholder="Fecha de lanzamiento" value={newGame.released} onChange={changeHandler} />
    
          <div className={styles.error}>{error.released && <p>{error.released}</p>}</div>
          <br />
          <label htmlFor="description"> Description: </label>
          <textarea name="description" placeholder="Describe your video game" value={newGame.description} onChange={changeHandler}>
          </textarea>
          <div className={styles.error}>{error.description && <p>{error.description}</p>}</div>
          <br />
          <label htmlFor="rating">Rating:</label>
          <input type="number" step={0.5} value={newGame.rating} onChange={handleRatingChange} required/>
          <br />
          <label htmlFor="platforms">Select Platforms:</label>
          <select type="text" name="platforms" placeholder="Selecciona una plataforma" value={newGame.platforms.map(platform => platform.name)} onChange={addPlatform}>
          <option value=""> Platforms</option>
            {Platforms.map((platform) => (
              <option key={platform.id} value={platform.name}>
                {platform.name}
              </option>
            ))}
          </select>
          <br />
          
            <label htmlFor="">Selected platforms:</label>
            <div className={styles.add}>
            {newGame.platforms.map((platform) => (
              <div key={platform.id} className={styles.card}>
                {platform.name} <button onClick={() => removePlatform(platform)}>X</button>
              </div>
            ))}
          <div className={styles.error}>{error.platforms && <p>{error.platforms}</p>}</div>
          </div>
          <br />          
          <label htmlFor="genre"> Select genres:</label>
          <select type="text" name="genres" placeholder="Selecciona una plataforma" value={newGame.genres.map(genre => genre.name)} onChange={addGenres}>
            <option value=""> Genres</option>
            {Genres.map((genre) => (
              <option key={genre.id} value={genre.name}>
                {genre.name}
              </option>
            ))}
          </select>
          <br />
          <label htmlFor="">Selected genres:</label>
          <div className={styles.add}>
            {newGame.genres.map((genre) => (
              <div key={genre.id} className={styles.card}>
                {genre.name} <button onClick={() => removeGenres(genre)}>X</button>
              </div>
            ))}
          <div className={styles.error}>{error.genres && <p>{error.genres}</p>}</div>
          </div>
          <br />
          <label htmlFor="image">Image:</label>
          <input type="text" name="image" value={newGame.image} onChange={changeHandler} />
          
          <div className={styles.error}>{error.image && <p>{error.image}</p>}</div>
          <br />
          <button type="submit" disabled={!newGame.name||!newGame.description||!newGame.image||error.image||error.description||error.platforms||error.genres||error.released} >
          send videogame</button>
          <ToastContainer autoClose={3000} hideProgressBar newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </form>
        <div className={styles.img1} ><img src={Ada} alt="" /></div>
        <div className={styles.img2} ><img src={Big} alt="" /></div>
        </div>
      );
    };

export default Form