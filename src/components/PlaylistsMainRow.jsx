import PlaylistsListEl from "./PlaylistsListEl.jsx"
import HeaderTextRow from "./HeaderTextRow.jsx"

import { useEffect,useState } from "react"

import {PlaylistsManager} from '../app.js'

import { useResize } from "../useResize.js"

export default function PlaylistsMainRow(props){
    const [loading, setLoading] = useState(true);
    const [playlists, setPlaylists]=useState([]);
    const limit  = useResize();
    useEffect(() => {
        const getPlaylists=async()=>{
            setPlaylists(await PlaylistsManager.getPlaylistsByCategory(props.id,limit));
            setLoading(false);
        }
        getPlaylists();
      },[limit]);
    
    if(!loading){
        const state ={ 
            id: props.id,
            header: props.header,
        }
        return(
            <div className="playlists-main-row-warp">
                <HeaderTextRow text1={props.header} text2="Show all" 
                text1Class="font-bold-24" state={state}
                link={`/all-playlists-by-category/:${props.id}`}/>
        
                <div className="playlists-main-row-list">
                    {playlists.map((info,id)=>
                        <PlaylistsListEl key={id} {...info}/>
                    )}
                    
                </div>
            </div>
        )
    }  
}