import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Card from "../Card/Card";
import styles from "./Cardscontainer.module.css";

const CardsContainer = () => {
  //Se utilizan los hooks useSelector para obtener el estado de videogames y 
  //visual desde el store de Redux. videogames representa todos los juegos 
  //disponibles y visual representa los juegos filtrados (si existen).
  const videogames = useSelector((state) => state.videogames);
  const visual = useSelector((state) => state.filtrado);
  //Luego, se utiliza una operación ternaria para determinar qué juegos se deben mostrar.
  // Si visual contiene juegos filtrados, se asigna a gamesToDisplay esa lista de juegos.
  // De lo contrario, se asigna la lista completa de videogames.
  const gamesToDisplay = visual.length > 0 ? visual : videogames;

  // Estado para controlar la página actual
  const [currentPage, setCurrentPage] = useState(1);
  // Estado para almacenar los juegos que se mostrarán en la página actual
  const [currentGames, setCurrentGames] = useState([]);

  // Cantidad de juegos por página
  const gamesPerPage = 15;

  
  //Se utiliza el efecto useEffect para calcular los índices de inicio y fin 
  //de los juegos que se mostrarán en la página actual, y extraer los juegos 
  //correspondientes a esa página. El efecto se ejecuta cada vez que currentPage 
  //o gamesToDisplay cambian.

  useEffect(()=>{
    return(()=>(
    setCurrentPage(1)))
  },[gamesToDisplay])

  
  useEffect(() => {
    // Calcula el índice de inicio y final de los juegos que se mostrarán en la página actual
    const indexOfLastGame = currentPage * gamesPerPage;
    const indexOfFirstGame = indexOfLastGame - gamesPerPage;
    // Extrae los juegos correspondientes a la página actual
    const gamesToShow = gamesToDisplay.slice(indexOfFirstGame, indexOfLastGame);
    // Actualiza el estado de los juegos a mostrar
    setCurrentGames(gamesToShow);
  }, [currentPage, gamesToDisplay]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={styles.cardscontainer}>
      {currentGames.map((game) => (
        <Card
          key={game.id}
          id={game.id}
          genres={game.genres?.map((gen) => gen.name)}
          name={game.name}
          rating={game.rating}
          image={game.image}
        />
      ))}

      {/* Agregar los botones de paginación */}
      <div className={styles.pagination}>
        {/* Botón de página anterior */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={styles.paginationbuton}
        >
          Back
        </button>
        {/* Botones de número de página */}
        {Array.from({ length: Math.ceil(gamesToDisplay.length / gamesPerPage) }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`${currentPage === index + 1 ? styles.active : styles.paginationbuton}`}
          >
            {index + 1}
          </button>
        ))}
        {/* Botón de página siguiente */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === Math.ceil(gamesToDisplay.length / gamesPerPage)}
          className={styles.paginationbuton}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CardsContainer;