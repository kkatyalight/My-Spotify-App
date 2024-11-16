import { Link } from "react-router-dom"

export default function HeaderTextRow(props){
    //console.log(props);
    if(props.link){
        return(
            <div className="media-info-row-wrap">
                <Link to={props.link} state={props.state} >
                    <p className={props.text1Class?`${props.text1Class} hover-line`:"font-bold-16 hover-line"}>
                        {props.text1}</p>
                </Link>
                <Link to={props.link} state={props.state} className="hover-line">
                    <p className={props.text2Class?`${props.text2Class} hover-line`:"font-medium-14 hover-line"}>
                        {props.text2}</p>
                </Link>
                
            </div>
        )
    }
    else{
        return(
            <div className="media-info-row-wrap">                
                <p className={props.text1Class?`${props.text1Class}`:"font-bold-16"}>
                        {props.text1}</p>
                <p className={props.text2Class?`${props.text2Class}`:"font-medium-14"}>
                        {props.text2}</p>        
                
            </div>
        )
    }
   
}