import { Link } from "react-router-dom"
import styles from "./Nav.module.css"
import SearchBar from "../SearchBar/SearchBar"
import { useDispatch } from "react-redux"
import { getGames } from "../../redux/actions"


const Nav = () =>{

    const dispach = useDispatch()
    const homehandler = () => {
        dispach(getGames())
    }

    return(
        <div className={styles.navBar}>
            <div className={styles.navButtons}>
            <Link to = "/" ><button className={styles.navButton}>
                Inicio
                </button></Link>
            <Link to = "/home"  ><button onClick={homehandler} className={styles.navButton}>
                Home
                </button></Link>
                <Link to = "/Form" className={styles.navLink}><button className={styles.navButton}>
                Form
                </button></Link>          
            </div>
            <SearchBar className={styles.searchBar}/>
        </div>
    )


}

export default Nav