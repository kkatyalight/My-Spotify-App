import options from "../assets/options_icon.svg"
import close from "../assets/close_icon.svg"
import add_fav from "../assets/add_fav_icon.svg"

import ListBasic from "./ListBasic.jsx"

import { CustomScroll } from "react-custom-scroll";
import { useState,useContext,useEffect } from "react"
import { TrackContext } from "../App.jsx";

import {TracksManager,UsersManager} from '../app.js'

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export default function MediaInfo({handleInfoClick, showInfo}){
    const {trackStatus,curTrackId,handleTrackClick} = useContext(TrackContext);
    const [artist, setArtist] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
 
        const getMainInfo=async()=>{
        if(curTrackId){
            setArtist(await TracksManager.getArtist(curTrackId.trackInfo.artists[0].id));
            setLoading(false);
        }
        } 
         getMainInfo();
       },[curTrackId]);
    let trackName,authorName,imgSrcAlbum;
    if(curTrackId){
        trackName=curTrackId ? curTrackId.trackInfo.name : "Track Name";
        authorName=curTrackId ? curTrackId.trackInfo.artists[0].name : "Author Name";
        imgSrcAlbum=curTrackId?.trackInfo.album.images[1].url; 
        //imgSrcArtist=curTrackId?.trackInfo.album.images[1].url; 
    }
    const handleAddFollowTrack=()=>{
        const response=UsersManager.addTrack(curTrackId.trackInfo.id)
         alert("Трек добавлен в избранные");
    }

    const handleAddFollow=async()=>{
        const response= await UsersManager.followArtist(curTrackId.trackInfo.artists[0].id);
        console.log(response);
        if(response.ok) alert("Подписка на исполнителя прошла успешно");
        else alert("Ошибка при подписке")
       }
       
       const handleConfirm=(type)=>{
            confirmAlert({
                customUI: ({ onClose }) => {
                return (
                    <div className="custom-ui">
                        <h1>Are you sure?</h1>
                        {type=='artist' &&  <p>Do you want to follow this artist?</p>}
                        {type=='track' && <p>Do you want to add this track to favorites?</p>}
                       
                        <button onClick={onClose}>No</button>
                        {type=='artist' && <button onClick={() => {handleAddFollow(); onClose()}}>Yes</button>}
                        {type=='track' && <button onClick={() => {handleAddFollowTrack(); onClose()}}>Yes</button>}
                    </div>
                );
                }
            });
       }

    if(showInfo){          
        return(
                <section className="media-info base_background">
                <CustomScroll heightRelativeToParent="calc(100% - 1rem)">
                    <header className="media-info-header">
                        <p className="font-bold-16">{
                            curTrackId ? curTrackId.playlistInfo.name : "Playlist Name"}
                        </p>
                        <span>
                            <img src={options} alt="" />
                            <img src={close} alt="" onClick={handleInfoClick}/>
                        </span>
                    </header>
                   
                    <div className="media-info-author-wrap margin-small">
                        {curTrackId &&<img src={imgSrcAlbum} alt="" />}
                        <div className="media-info-row-wrap">
                            <ListBasic headerClass="font-bold-24" 
                            text1={trackName} 
                            text2={authorName}/>
                            {curTrackId && <img className="hover-icon" onClick={()=>handleConfirm('track')} src={add_fav} alt="" /> }
                        </div>                   
                    </div>
                    <div className="media-info-author-wrap info_background margin-small">
                        <p className="font-bold-16">About the artist</p>
                        {!loading &&<img src={artist.images[1].url} alt="" />}
                        <div className="media-info-author-info">
                            <p className="font-bold-16">{
                                !loading ? artist.name : "Artist Name"
                            }</p>
                            <div className="media-info-row-wrap">
                                <p className="font-medium-16">{
                                    !loading ? artist.followers.total+" Followers" : "Followers"
                                }</p>
                                {curTrackId && <button onClick={()=>handleConfirm("artist")} id="follow-button" className="font-medium-16">Follow</button>}
                            </div>
                            <p className="font-medium-14">{
                                !loading ? "Genres: "+artist.genres.join(', '): "Genres:"
                            }</p>
                        </div>
                    </div>
                </CustomScroll>
            </section>
        )
    }

}