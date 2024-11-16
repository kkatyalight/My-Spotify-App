import library_icon from "../assets/library_icon.svg"
import menu_icon from "../assets/menu_icon.svg"
import { CustomScroll } from "react-custom-scroll";
import { useEffect,useState } from "react";

import {UsersManager} from "../app"
import ListBasic from "./ListBasic";

export default function MediaLibrary({handleLibraryClick,showLibrary}){
    const [savedAlbums, setSavedAlbums] = useState([]);
    const [savedPlaylists, setSavedPlaylists] = useState([]);
    const [followedArtist, setFollowedArtist] = useState(true);
    const [loading, setLoading] = useState(true);
    const [curShow, setCurShow] = useState(null);
    const [curShowType, setCurShowType]=useState('playlist')
    const [showFilter,setShowFilter]=useState(false);
    const getMainInfo=async()=>{
        setSavedAlbums(await UsersManager.getUserAlbums())
        setSavedPlaylists(await UsersManager.getUserPlaylists())
        setFollowedArtist(await UsersManager.getUserFollowedArtists())
        setLoading(false);
      }
    useEffect(() => {
        getMainInfo();
      },[]);
      useEffect(() => {
        setCurShow(savedPlaylists);
      },[!loading]);

      const handleRerender=()=>{
        if(!showLibrary){
            setLoading(true);
            getMainInfo();
        }
       
      }
      const handleSort=(sortType)=>{
        switch(sortType){
            case 'playlist':{
                setCurShowType('playlist');
                setCurShow(savedPlaylists)
                console.log(curShow);
                break;
            }
            case 'artist':{
                setCurShowType('artist');
                setCurShow(followedArtist)
                console.log(curShow);
                break;
            }
            case 'album':{
                setCurShowType('album');
                setCurShow(savedAlbums)
                console.log(curShow);
                break;
            }
            case 'name':{
                if(curShowType=='album'){
                    setCurShow(arr=>{
                        const sortData=[...arr];
                        sortData.sort(function(a,b){
                            if (a.album.name < b.album.name) {
                                return -1;
                            }
                            if (a.album.name > b.album.name) {
                                return 1;
                            }
                            return 0;
                            });
                        return sortData;
                    })
                }
                else{
                    setCurShow(arr=>{
                        const sortData=[...arr];
                        sortData.sort(function(a,b){
                            if (a.name > b.name) {
                                return -1;
                            }
                            if (a.name < b.name) {
                                return 1;
                            }
                            return 0;
                            });
                        return sortData;
                    })
                }
                break;
            }
            case 'trackAmount':{
                setCurShow(arr=>{
                    const sortData=[...arr];
                    sortData.sort(function(a,b){
                        return a.tracks.total-b.tracks.total;
                })
                return sortData;
            })
                break;
            }
            case 'popularity':{
                setCurShow(arr=>{
                    const sortData=[...arr];
                    sortData.sort(function(a,b){
                        return a.popularity-b.popularity;;
                })
                return sortData;
            })
                break;
            }
            case 'addedTime':{
                setCurShow(arr=>{
                    const sortData=[...arr];
                    sortData.sort(function(a,b){
                        return new Date(a.added_at)-new Date(b.added_at);
                })
                return sortData;
            })
                break;
            }
        }
      }
      if(!loading && curShow){
        return(
        <section className="media-library-wrap base_background">
            <CustomScroll heightRelativeToParent="calc(100% - 1rem)">
                <div className={showLibrary?`media-library-info-opened`:`media-library-info`}>
                    <div>
                        <img className="hover-icon" src={library_icon} alt="" onClick={()=>{handleLibraryClick(); handleRerender()}}/>
                        {showLibrary && <p className="font-bold-24">Your Library</p> }
                        {showLibrary && <img className="hover-icon" onClick={()=>setShowFilter(!showFilter)} src={menu_icon} alt="" />}
                    </div>
                    {showLibrary && 
                        <div className="main-header">
                            <button onClick={()=>handleSort('playlist')} className={curShowType=='playlist'?`button-current`:''}>
                                Playlists</button>
                            <button onClick={()=>handleSort('artist')} className={curShowType=='artist'?`button-current`:''}>
                                Artists</button>
                            <button onClick={()=>handleSort('album')} className={curShowType=='album'?`button-current`:''}>
                                Albums</button>
                            {showFilter && 
                                <div className="filter info_background font-bold-16">
                                    <p className="font-medium-14">Sort by</p>
                                    <p onClick={()=>handleSort('name')} className="hover-line">Name</p>
                                    {curShowType=='playlist' && 
                                         <p onClick={()=>handleSort('trackAmount')} className="hover-line">Track Amount</p>
                                    }
                                    {curShowType=='artist' && 
                                         <p onClick={()=>handleSort('popularity')} className="hover-line">Popularity</p>
                                    }
                                    {curShowType=='album' && 
                                         <p onClick={()=>handleSort('addedTime')} className="hover-line">Added Time</p>
                                    }
                                </div> 
                                }
                        </div>
                    }
                        
                        
                    {curShowType=='playlist' && 
                        curShow.map((info, id)=>(
                           <ListBasic key={id} img={info.images[0].url} showFull={showLibrary}
                           text1={info.name} text2={info.owner.display_name}/>
                        ))
                    }
                    {curShowType=='artist' &&
                         curShow.map((info, id)=>(
                            <ListBasic key={id} img={info.images[0].url} showFull={showLibrary}
                            text1={info.name} text2={info.type}/>
                         ))
                    }
                     {curShowType=='album' &&
                         curShow.map((info, id)=>(
                            <ListBasic key={id} img={info.album.images[0].url} showFull={showLibrary}
                            text1={info.album.name} 
                            text2={info.album.album_type+" "+info.album.artists[0].name}/> 
                         ))
                    }
        
                </div>
            </CustomScroll>
        </section>
        )
      } 
      else{
        return(
        <section className="media-library-wrap-opened base_background">
             <div className='media-library-info'>
                    <div>
                        <img className="hover-icon" src={library_icon} alt="" />
                    </div>
                </div>
        </section>
        )
            
      }
}