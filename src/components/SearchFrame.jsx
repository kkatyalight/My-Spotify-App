import PlaylistsMainRow from "./PlaylistsMainRow.jsx"
import Footer from "./Footer.jsx"

import { useEffect,useState } from "react"
import {CategoriesManager} from '../app.js'

export default function SearchFrame(){
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
        return(
            <section className="main-frame base_background">
                 <header className="main-header">
                    <button>All</button>
                    <button>Music</button>
                    <button>Podcasts</button>
                </header>
                <div className="main-grid-playlists">
                    <div className="main-grid-playlists-el">
    
                    </div>
                </div>
    
            {categories.map((info,id)=>
                <PlaylistsMainRow key={id} header={info.name} id={info.id}/>
            )}
            <Footer/>
            </section>
        )
    }
    else console.log('loading SearchFrame');

}