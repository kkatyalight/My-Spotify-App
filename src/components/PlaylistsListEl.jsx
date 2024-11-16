import { Link } from "react-router-dom";
import testIMG from "../assets/tt.png"

export default function PlaylistsListEl(props){
    const maxDescL=40;//45..
    const maxNameL=35;
    let description='';
    description= props.description.replace(/<a[^>]*>(.*?)<\/a>/gi, '$1');

    const state ={ 
        type:'playlist',
        id: props.id, 
        name: props.name, 
        image:props.images[0].url,
        description:description,
        primary_color:props.primary_color,
    }
    return(
        <Link to={`/playlist/:${props.id}`} state={state}>
            <div className="playlist-el-wrap hover-background">
                <div className="playlist-el-img">
                    <img className="img-playlist" src={props.images[0].url} alt="" />
                </div>
                <div>
                    <p className="font-bold-16">{props.name.length > maxNameL ?
                        props.name.substring(0,maxNameL-3)+"..." : props.name
                        }</p>
                    <p className='font-medium-14'>
                        {description.length > maxDescL ?
                        description.substring(0,maxDescL-3)+"..." : description
                        }</p>
                </div>
            </div>
        </Link>

    )
}