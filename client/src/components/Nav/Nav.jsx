import { Link } from "react-router-dom"
import styles from "./Nav.module.css"

const Nav = () =>{

    return(
        <div className={styles.Navcont}>
            <Link to = "/home">Home</Link>
            <Link to = "/Form">Form</Link>

        </div>
    )


}

export default Nav