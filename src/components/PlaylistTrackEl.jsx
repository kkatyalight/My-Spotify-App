import ListBasic from "./ListBasic.jsx"
import add_fav_icon from "../assets/add_fav_icon.svg"

import { TrackContext } from "../App.jsx";
import { useContext } from "react";

import { useResize } from "../useResize.js"


import {UsersManager} from '../app.js'
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export default function PlaylistTrackEl(props){
    const limit  = useResize();
    const {trackStatus,curTrackId,handleTrackClick} = useContext(TrackContext);

    function msToTime(s) {
        var ms = s % 1000;
        s = (s - ms) / 1000;
        var secs = s % 60;
        s = (s - secs) / 60;
        var mins = s % 60;
        if(secs<10) secs = "0"+secs;
        return mins + ':' + secs;
      }
    const time=msToTime(props.track?.duration_ms);

    const handleAddFollow=()=>{
        const response=UsersManager.addTrack(props.track.id)
         alert("Трек добавлен в избранные");
    }
    const handleConfirm=()=>{
        confirmAlert({
            customUI: ({ onClose }) => {
            return (
                <div className="custom-ui">
                    <h1>Are you sure?</h1>
                    <p>Do you want to add this track to favorites?</p>
                    <button onClick={onClose}>No</button>
                    <button onClick={() => {handleAddFollow(); onClose()}}>Yes</button>
                </div>
            );
            }
        });
   }

    switch(props.id){
        case '0':{
            return(
                <div className="tracks-table">
                    <p className="tracks-table-num font-medium-14">#</p>
                    <p className="tracks-table-title font-medium-14">Title</p>
                    {limit>4 && <p className="tracks-table-album font-medium-14">Album</p>}
                    
                    <p className="tracks-table-time font-medium-14">Time</p>
                </div>
            )
        }
        default:{
            return(
                <div className="tracks-table">
                    <p className="tracks-table-num font-medium-14">{props.id}</p>
                    <div className="tracks-table-title hover-background" 
                    onClick={(e)=>handleTrackClick(props.track, props.playlist)(e)}
                    style={limit<=4 ?{gridColumn:"2/4"}:{}}>
                        <img className="img-track" src={props.track.album.images[2].url} alt="" />
                        <ListBasic text1={props.track.name} text2={props.track.artists[0].name}/>
                    </div>
                    {limit>4 && <p className="tracks-table-album font-medium-14">{props.track.album.name}</p>}
                        {props.playlist.id!='fav'&& 
                        <img onClick={handleConfirm} 
                        className="tracks-table-add hover-icon" 
                        src={add_fav_icon} alt="add_fav_icon" />}
                    <p className="tracks-table-time font-medium-14">{time}</p>
                </div>
            )
        }
    }
}