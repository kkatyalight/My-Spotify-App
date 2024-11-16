export default function ListBasic(props){
    if(props.img){
        return(
            <div className="list-basic-img">
                <img src={props.img} alt="" />
                {props.showFull==true &&
                    <div>
                        <p className={props.headerClass?`${props.headerClass}`:"font-bold-16"}>{props.text1}</p>
                        <p className="font-medium-14">{props.text2}</p>
                    </div>
                }
                
            </div>
            
        )
    }
    else{
        return(
            <div className="list-basic">
                <p className={props.headerClass?`${props.headerClass}`:"font-bold-16"}>{props.text1}</p>
                <p className="font-medium-14">{props.text2}</p>
            </div>
        )
    }
  
}