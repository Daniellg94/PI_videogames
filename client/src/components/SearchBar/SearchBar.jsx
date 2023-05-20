import { useState } from "react"
import { useDispatch } from "react-redux"
import { getSearch } from "../../redux/actions"
import { Link } from "react-router-dom"
import styles from "./SearchBar.module.css"

const SearchBar = () =>{

const dispatch = useDispatch()
const [search, setSearch] = useState("")

    const handlesearch = ()=>{
        dispatch(getSearch(search))
    }

    return(
        <div className={styles.search}>
            <input type='search' onChange={(event)=>setSearch(event.target.value)} value={search} />
         <Link to ={"/home"}><button onClick={handlesearch}>Buscar</button> </Link>
        </div>
    )
}

export default SearchBar 