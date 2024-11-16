import {useState,useEffect } from "react";
import {Link, useLocation} from 'react-router-dom';
import PlaylistTrackEl from "./PlaylistTrackEl.jsx"
import {TracksManager,UsersManager} from '../app.js'
import Footer from "./Footer.jsx"
import { CustomScroll } from "react-custom-scroll";
import play_icon_green from "../assets/play_icon_green.svg"
import add_fav_icon from "../assets/add_fav_icon.svg"
import fav_tracks_icon from "../assets/fav_tracks_icon.svg"

import { useResize } from "../useResize.js"
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export default function Playlist(props){
    const location = useLocation();
    const [loading, setLoading] = useState(true);
   const [tracks, setTracks] = useState([]);
   
    const limit=useResize();
     useEffect(() => {
        console.log(location);
        if(location.state.id=='fav'){
            const getMainInfo=async()=>{
                setTracks(await TracksManager.getFavTracks());
                setLoading(false);
                } 
            getMainInfo();
        }
        else{
            const getMainInfo=async()=>{
                setTracks(await TracksManager.getTracksByPlaylist(location.state.id));
                setLoading(false);
                } 
            getMainInfo();
        }
        
       },[]);

       const handleAddFollow=async()=>{
        const response= await UsersManager.followPlaylist(location.state.id);
        console.log(response);
        if(response.ok) alert("Подписка на плейлист прошла успешно");
        else alert("Ошибка при подписке")
       }
       
       const handleConfirm=()=>{
            confirmAlert({
                customUI: ({ onClose }) => {
                return (
                    <div className="custom-ui">
                        <h1>Are you sure?</h1>
                        <p>Do you want to follow this playlist?</p>
                        <button onClick={onClose}>No</button>
                        <button onClick={() => {handleAddFollow(); onClose()}}>Yes</button>
                    </div>
                );
                }
            });
       }
     if(!loading){
         return(
             <section className="playlist main-frame base_background" style={props.mainGridPos}>
             <CustomScroll heightRelativeToParent="calc(100% - 1rem)">
                <Link to="/">
                    <button id="home">Home</button>
                </Link>
                 <header className="playlist-header">
                    <img src={location.state.image} alt=""/>
                    
                    <div className="playlist-header-text">
                        <p className="font-bold-16">Playlist</p>
                        <p className={limit>4?"font-bold-48": limit>2?"font-bold-24":"font-bold-16"}>
                            {location.state.name}</p>
                        {limit>2 && <p className="font-medium-14">{location.state.description}</p>}
                        
                    </div>
                 </header>

                <div className="playlist-buttons">
                    <img src={play_icon_green} alt="play_icon_green" />
                    <img onClick={handleConfirm} src={add_fav_icon} alt="add_fav_icon" />
                </div>
                
                    <PlaylistTrackEl id="0"/>
                    <hr />
                    {tracks.map((info,id)=>
                        <PlaylistTrackEl key={id+1} id={id+1} track={info.track} playlist={location.state}/>
                    )}
             
                 <Footer/>
             </CustomScroll>     
             </section>
         )
     }
     //else console.log('loading MainFrame');
}