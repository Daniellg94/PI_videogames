import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getGenres } from "../../redux/actions";


const Form = () =>{

    const Platforms=[
        {name:"Xbox",id:3},{name:"PlayStation",id:2},
        {name:"PC", id: 1},{name:"Nintendo", id: 7},
        {name:"iOS", id: 4},{name:"Apple Macintosh", id: 5},
        {name:"Linux", id: 6},{name:"Web", id: 14}
    ]
    
    const dispatch = useDispatch()
    const genres = useSelector(state=>state.genres)
    useEffect(()=>{ 
        dispatch(getGenres())
    },[])

    const [newGame, setNewGame] = useState({
        name:"",
        platforms:[],
        description:"",
        released:"",
        rating:0.0,
        image:"",
        Genres:[],
    })

    const changeHandler = (event) => {
        setNewGame({
          ...newGame,
          [event.target.name]: event.target.value,
        });
      };


    const addPlatform = (event) => {
        const selectedPlatform = event.target.value;
        if (!newGame.platforms.includes(selectedPlatform)) {
          setNewGame((prevState) => ({
            ...prevState,
            platforms: [...prevState.platforms, selectedPlatform],
          }));
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
        }
      };

      const addGenres = (event) => {
        const selectedGenres = event.target.value;
        if (!newGame.Genres.includes(selectedGenres)) {
          setNewGame((prevState) => ({
            ...prevState,
            Genres: [...prevState.Genres, selectedGenres],
          }));
        }
      };

      const removeGenres = (Genre) => {
        setNewGame((prevState) => ({
          ...prevState,
          Genres: prevState.Genres.filter((gen) => gen !== Genre),
        }));
      };


    
      return (
        <form action="">
          <label htmlFor="name">Game name:
            <input type="text" name="name" placeholder="Ingresa nombre del juego" value={newGame.name} onChange={changeHandler}/>
          </label>
          <br />
          <label htmlFor="released"> Released date: 
          <input type="date" name="released" placeholder="Fecha de lanzamiento" value={newGame.released} onChange={changeHandler} />
          </label>
          <br />
          <label htmlFor="platforms"> Platforms:
            <select type="text" name="platforms" placeholder="Selecciona una plataforma" value={newGame.platforms} onChange={addPlatform}>
            {Platforms.map((platform) => (
            <option key={platform.id} value={platform.name}>
              {platform.name}
            </option>
          ))}
            </select>
          </label>
          <br />
          <div>
            <label htmlFor=""> Selected platforms:
            {newGame.platforms.map((platform) => (
              <div key={platform}> {platform} <button onClick={() => removePlatform(platform)}>X</button>
              </div>
            ))}
            </label>
          </div>
          <br />
          <label htmlFor="description"> Description: <textarea name="description" placeholder="Describe your video game" value={newGame.description} onChange={changeHandler}>
          </textarea>
          <br />
          </label>
          <label htmlFor="rating">Rating
          <input type="number" step={0.5} value={newGame.rating} onChange={handleRatingChange} required/>
          </label>
          <br />
          <label htmlFor="genres">Genres
          <select name="genres" type="text" value={newGame.Genres} onChange={addGenres}>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.name}>
              {genre.name}
            </option>
          ))}
          </select>
          </label>
          <div>
            <label htmlFor=""> Selected platforms:
            {newGame.Genres.map((Genre) => (
              <div key={Genre}> {Genre} <button onClick={() => removeGenres(Genre)}>X</button>
              </div>
            ))}
            </label>
          </div>
          
        </form>
      );
    };

export default Form