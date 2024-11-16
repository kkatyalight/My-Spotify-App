import {useState,useEffect } from "react";
import {useLocation} from 'react-router-dom';
import PlaylistsListEl from "./PlaylistsListEl.jsx"
import {PlaylistsManager} from '../app.js'
import Footer from "./Footer.jsx"
import { CustomScroll } from "react-custom-scroll";



export default function AllPlaylists(props){
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [playlists, setPlaylists] = useState([]);;
     useEffect(() => {
        const getMainInfo=async()=>{
            const limit=27;//4
            setPlaylists(await PlaylistsManager.getPlaylistsByCategory(location.state.id,limit));
            setLoading(false);
        }
         getMainInfo();
       },[]);
       console.log(playlists);

     if(!loading){
         return(
             <section className="playlist main-frame base_background" style={props.mainGridPos}>
             <CustomScroll heightRelativeToParent="calc(100% - 1rem)">
                <p className="font-bold-48">{location.state.header}</p>
                <div className="playlists-all-row-list-wrap">
                        {playlists.map((info,id)=>
                            <PlaylistsListEl key={id} {...info}/>
                        )}
                    </div>
                {/* <div className="playlists-main-row-warp">
                    <HeaderTextRow text1={props.header} text2="Show all" 
                    text1Class="font-bold-24" link={link}/>
            
                    <div className="playlists-main-row-list">
                        {playlists.map((info,id)=>
                            <PlaylistsListEl key={id} {...info}/>
                        )}
                    </div>
                </div> */}

                <Footer/>
             </CustomScroll>     
             </section>
         )
     }
     else console.log('loading MainFrame');
}