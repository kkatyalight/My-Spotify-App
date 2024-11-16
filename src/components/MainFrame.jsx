import PlaylistsMainRow from "./PlaylistsMainRow.jsx"
import Footer from "./Footer.jsx"

import fav_tracks_icon from "../assets/fav_tracks_icon.svg"
import { useEffect,useState } from "react"
import {CategoriesManager} from '../app.js'
import { CustomScroll } from "react-custom-scroll";
import { Link } from "react-router-dom";
import ListBasic from "./ListBasic"
export default function MainFrame(props){
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const getMainInfo=async()=>{
        setCategories(await CategoriesManager.getCategories());
          setLoading(false);
        }
        getMainInfo();
      },[]);

    if(!loading){
        const state ={ 
            type:'playlist',
            id: 'fav', 
            name: "Favorites", 
            image:fav_tracks_icon,
            description:"Your liked songs",
        }      
        return(
            <section className="main-frame base_background" style={props.mainGridPos}>

            <CustomScroll  heightRelativeToParent="calc(100% - 1rem)">
                <Link to="/" >
                <button id="home">Home</button>
                </Link>
                <Link to="/playlist/:fav" className="fav" state={state}>
                <ListBasic img={fav_tracks_icon} showFull={true}
                            text1="Liked Songs" text2="Spotify" />
                  
                </Link>
                      
                {categories.map((info,id)=>
                    <PlaylistsMainRow key={id} header={info.name} id={info.id}/>
                )}
                <Footer/>
            </CustomScroll>     
            </section>
        )
    }
}