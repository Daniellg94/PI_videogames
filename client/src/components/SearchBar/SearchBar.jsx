import { useState } from "react"
import { useDispatch } from "react-redux"
import { getSearch } from "../../redux/actions"


const SearchBar = () =>{

const dispatch = useDispatch()
const [search, setSearch] = useState("")

    const handlesearch = ()=>{
        dispatch(getSearch(search))
    }

    return(
        <div>
            <input type='search' onChange={(event)=>setSearch(event.target.value)} value={search} />
         <button onClick={handlesearch}>Buscar</button>
        </div>
    )
}

export default SearchBar 