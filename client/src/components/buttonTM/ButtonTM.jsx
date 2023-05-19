import { useEffect, useState } from "react"
import styles from "./ButtonTM.module.css"
import Luna from "./Luna.png"
import Sol from "./Sol.png"


const ButtonTM = () => {
    const [theme, setTheme] = useState("dark");
    const [dark,setDark] = useState (true)
  
    useEffect(() => {
      document.body.setAttribute("data-theme", theme);
    }, [theme]);   
    
    const chageTheme = () => {
        let msg;      
       setTheme((preValue) => {
               if (preValue === 'dark') msg = "light";
               else msg = 'dark'
                 
               setDark(!dark)
               return msg
             });
           };

    return (
      <button className={styles.buttonTM} onClick={chageTheme}>
       {!dark? <img src={Luna} alt="" />: <img src={Sol} alt="" /> }
      </button>
    );
  };

export default ButtonTM