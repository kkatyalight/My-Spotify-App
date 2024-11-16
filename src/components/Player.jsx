import add_fav_icon from "../assets/add_fav_icon.svg"
import connection_icon from "../assets/connection_icon.svg"
import full_screen_icon from "../assets/full_screen_icon.svg"
import list_icon from "../assets/list_icon.svg"
import mix_icon from "../assets/mix_icon.svg"
import next_track_icon from "../assets/next_track_icon.svg"
import now_playing_icon from "../assets/now_playing_icon.svg"
import pause_icon from "../assets/pause_icon.svg"
import play_icon_green from "../assets/play_icon_green.svg"
import play_icon from "../assets/play_icon.svg"
import prev_track_icon from "../assets/prev_track_icon.svg"
import repeat_icon from "../assets/repeat_icon.svg"
import sound_icon from "../assets/sound_icon.svg"
import text_icon from "../assets/text_icon.svg"
import mini_player_icon from "../assets/mini_player_icon.svg"

import ListBasic from "./ListBasic"

import { TrackContext } from "../App.jsx";
import { useContext } from "react";

export default function Player({handleInfoClick}){
    const {trackStatus,curTrackId,handleTrackClick} = useContext(TrackContext);
    
    let trackName,authorName,imgSrcAlbum;
    if(curTrackId){
        trackName=curTrackId ? curTrackId.trackInfo.name : "Track Name";
        authorName=curTrackId ? curTrackId.trackInfo.artists[0].name : "Author Name";
        imgSrcAlbum=curTrackId?.trackInfo.album.images[2].url; 
        //imgSrcArtist=curTrackId?.trackInfo.album.images[1].url; 
    }
    return(
        <footer className='player'>
            {/* компонент 1 */}
            <div className="player-info">

                <div className="tracks-table-title">
                    <img className="img-track" src={imgSrcAlbum} alt="" />
                    <ListBasic text1={trackName} text2={authorName}/>
                </div>
             
                <img src={add_fav_icon} alt="add_fav_icon" />
            </div>
            <div className="player-handler">
                <div className='player-buttons'>
                    <img src={mix_icon} alt="mix_icon" />
                    <img src={prev_track_icon} alt="prev_track_icon" />
                    <img src={play_icon} alt="play_icon" />
                    <img src={next_track_icon} alt="next_track_icon" />
                    <img src={repeat_icon} alt="repeat_icon" />
                </div>
                <div className="player-timer">
                    <p>3:02</p>
                    {/* slider */}
                    <p>4:03</p>
                </div>
            </div>
            <div className="player-settings">
                <img src={now_playing_icon} alt="now_playing_icon" onClick={handleInfoClick}/>
                <img src={text_icon} alt="text_icon" />
                <img src={list_icon} alt="list_icon" />
                <img src={connection_icon} alt="connection_icon" />
                <div>
                    <img src={sound_icon} alt="sound_icon" />
                    {/* slider */}
                </div>
                <img src={mini_player_icon} alt="mini_player_icon" />
                <img src={full_screen_icon} alt="full_screen_icon" />
            </div>
        </footer>
    )
}