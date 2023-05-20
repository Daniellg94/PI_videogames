import { Link } from "react-router-dom"
import styles from "./LandingPage.module.css"
import Kratos from "./Kratos.png"
import Jefemaestro from "./Jefemaestro.png"
import Mario from "./Mario.png"




const LandingPage = () => {



    return(
        <div className={styles.landing}>

        <div className={styles.img1}><img src={Kratos} alt="" /></div>    
        <Link to = '/home'><button>🎮Let's play🎮</button></Link>
        <div className={styles.img2}><img src={Jefemaestro} alt="" /></div>
        <div className={styles.img3}><img src={Mario} alt="" /></div>
        </div>
    )
}

export default LandingPage