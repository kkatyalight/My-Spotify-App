export default function ListFooter(props){
    return(
        <div className="footer-up-colomn">
            <p className="font-bold-16">{props.header}</p>
            {
                props.list.map((info,id)=>
                    <p key={id} className="font-medium-14">{info}</p>
                )
            }
        </div>
    )
}