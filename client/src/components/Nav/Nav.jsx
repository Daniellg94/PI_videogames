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
        <div className={styles.Navcont}>
            <button onClick={homehandler}><Link to = "/home" onChange={homehandler}>Home</Link></button>
            <button><Link to = "/Form">Form</Link></button>
            <SearchBar/>
        </div>
    )


}

export default Nav