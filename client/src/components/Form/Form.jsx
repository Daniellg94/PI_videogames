import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getGenres } from "../../redux/actions";
import Validations from "./Validations/Validations";
import axios from "axios";

const Platforms=[
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
        platforms:[],
        description:"",
        released:"",
        rating:0.0,
        image:"",
        genres:[],
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
        event.preventDefault();
        const postGame = 'http://localhost:3001/videogames';
  
        axios.post(postGame, newGame)
          .then((res) => alert('¡El juego se ha creado exitosamente!'))
          .catch((error) => console.error(error));

      }
    
      return (
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Game name:
            <input type="text" name="name" placeholder="Ingresa nombre del juego" value={newGame.name} onChange={changeHandler}/>
            {error.name && <p>{error.name}</p>}
          </label>
          <br />
          <label htmlFor="released"> Released date: 
          <input type="date" name="released" placeholder="Fecha de lanzamiento" value={newGame.released} onChange={changeHandler} />
          {error.released && <p>{error.released}</p>}
          </label>
          <br />
          <label htmlFor="platforms">Platforms:</label>
          <select type="text" name="platforms" placeholder="Selecciona una plataforma" value={newGame.platforms.map(platform => platform.name)} onChange={addPlatform} multiple>
            {Platforms.map((platform) => (
              <option key={platform.id} value={platform.name}>
                {platform.name}
              </option>
            ))}
          </select>
          <br />
          <div>
            <label htmlFor="">Selected platforms:</label>
            {newGame.platforms.map((platform) => (
              <div key={platform.id}>
                {platform.name} <button onClick={() => removePlatform(platform)}>X</button>
              </div>
            ))}
            {error.platforms && <p>{error.platforms}</p>}
          </div>
          <br />
          <label htmlFor="description"> Description: 
          <textarea name="description" placeholder="Describe your video game" value={newGame.description} onChange={changeHandler}>
          </textarea>
          {error.description && <p>{error.description}</p>}
          <br />
          </label>
          <label htmlFor="rating">Rating:
          <input type="number" step={0.5} value={newGame.rating} onChange={handleRatingChange} required/>
          </label>
          <br />
          <label htmlFor="genre">Platforms:</label>
          <select type="text" name="genres" placeholder="Selecciona una plataforma" value={newGame.genres.map(genre => genre.name)} onChange={addGenres} multiple>
            {Genres.map((genre) => (
              <option key={genre.id} value={genre.name}>
                {genre.name}
              </option>
            ))}
          </select>
          <br />
          <div>
            <label htmlFor="">Selected genres:</label>
            {newGame.genres.map((genre) => (
              <div key={genre.id}>
                {genre.name} <button onClick={() => removeGenres(genre)}>X</button>
              </div>
            ))}
            {error.genres && <p>{error.genres}</p>}
          </div>
          <br />
          <label htmlFor="image">Image:
          <input type="text" name="image" value={newGame.image} onChange={changeHandler} />
          </label>
          {error.image && <p>{error.image}</p>}
          <br />
          <button type="submit" disabled={!newGame.name||!newGame.description||!newGame.image} >send videogame</button>
          
        </form>
      );
    };

export default Form