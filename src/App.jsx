import './App.css'
import Header from "./components/Header.jsx"
import Player from "./components/Player.jsx"
import MediaLibrary from "./components/MediaLibrary.jsx"
import MainFrame from "./components/MainFrame.jsx"
import MediaInfo from "./components/MediaInfo.jsx"

import SearchFrame from "./components/SearchFrame.jsx"
import Playlist from "./components/Playlist.jsx"
import AllPlaylists from "./components/AllPlaylists.jsx"
import {setAccessToken,url} from "./app.js"
import { createContext,useState,useEffect } from 'react'
//export const ClientContext = createContext(new Client());

import { createBrowserRouter,RouterProvider} from "react-router-dom";

export const TrackContext=createContext({
  state:"paused",
  trackId:'',
  handleTrackClick:()=>{},
});


export default function App() {
  const [loading, setLoading] = useState(true);
  const [mainGridPos, setMainGridPos] = useState({});

  const [showInfo, setShowInfo] = useState(true)
  const [showLibrary, setShowLibrary] = useState(false)

  useEffect(()=>{
    console.log(showLibrary);
    if (window.location.hash!="") {
      const getMainInfo=async()=>{
        await setAccessToken();
        setLoading(false);
        }
        getMainInfo();
    }
  },[])
  
  const handleLoginClick=()=>{
    window.location.replace(url);
  }
  

const handleInfoClick = () => {
  if (showLibrary) {
    document.querySelector('.media-library-wrap').style.gridColumn='1/2'
    setMainGridPos({gridColumn:'2/14'})
    setShowLibrary(!showLibrary);
  }
  if(!showInfo) setMainGridPos({gridColumn:'2/14'}) // mainGridPos.current.style.gridColumn='2/14'
  else setMainGridPos({gridColumn:'2/19'})
  setShowInfo(!showInfo)
}

const handleLibraryClick=()=>{
  if(showInfo) handleInfoClick();
  if(showLibrary) {
    document.querySelector('.media-library-wrap').style.gridColumn='1/2'
    setMainGridPos({gridColumn:'2/14'})
    handleInfoClick();
  }
  else {
    document.querySelector('.media-library-wrap').style.gridColumn='1/6'
    setMainGridPos({gridColumn:'6/19'})
  }
  setShowLibrary(!showLibrary);
}

// const [status, setStatus] = useState('paused');
//   const togglePlayPause = () => setStatus(status === 'playing' ? 'paused' : 'playing');

const [trackStatus, setTrackStatus] = useState('paused');
const [curTrackId, setCurTrackId] = useState(null);
const handleTrackClick=(trackInfo, playlistInfo)=>(e)=>{
  console.log(curTrackId);
  console.log(trackStatus);
  if(curTrackId==null || curTrackId.trackInfo.id!=trackInfo.id) setCurTrackId({trackInfo, playlistInfo});
  else setTrackStatus(trackStatus=='paused'?'playing':'paused')

}

const router=createBrowserRouter([
  {
    path: "/",
    element: <MainFrame mainGridPos={mainGridPos}/>,
  },
  {
    path: "/playlist/:id",
    element: <Playlist mainGridPos={mainGridPos}/>,
  },
  {
    path: "/search",
    element: <SearchFrame mainGridPos={mainGridPos}/>,
  },
  {
    path: "/all-playlists-by-category/:id",
    element: <AllPlaylists mainGridPos={mainGridPos}/>,
  }
], {
  basename: "/My-Spotify-App/",
})
  return (
    <>
    {!loading && 
     <TrackContext.Provider value={{trackStatus,curTrackId,handleTrackClick}}>
        <Header/>
        <main className="margin-side">
          <MediaLibrary handleLibraryClick={handleLibraryClick} showLibrary={showLibrary}/>
          <RouterProvider router={router}/>
          <MediaInfo handleInfoClick={handleInfoClick} showInfo={showInfo} />
          <Player handleInfoClick={handleInfoClick}/>
        </main>
      </TrackContext.Provider>
    }
    {loading && 
       <a className="login base_background" onClick={handleLoginClick}>
        <button>LogIn</button>
      </a>
    } 
    </>

)

 
}

