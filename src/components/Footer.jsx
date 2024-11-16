import ListFooter from "./ListFooter.jsx"

export default function Footer(){
    const footerText={
        0:{
            header:"Company",
            list:["About","Jobs","For the Record"],
        },
        1:{
            header:"Communities",
            list:["For Artists","Developers","Advertising",
                "Investors","Vendors"],
        },
        2:{
            header:"Useful links",
            list:["Support","Free Mobile App"],
        },
        3:{
            header:"Spotify Plans",
            list:["Premium Individual",
                "Premium Duo","Premium Family",
                "Premium Student","Spotify Free"],
        },
        4:["Legal",
            "Safety & Privacy Center",
            "Privacy Policy",
            "Cookies",
            "About Ads",
            "Accessibilty",
        ]
    }
    return(
        <footer className="margin-big">
            <div className="footer-up">
                <div className="footer-up-colomns">
                    <ListFooter header={footerText[0]['header']} list={footerText[0]["list"]}/>
                    <ListFooter header={footerText[1]['header']} list={footerText[1]["list"]}/>
                    <ListFooter header={footerText[2]['header']} list={footerText[2]["list"]}/>
                    <ListFooter header={footerText[3]['header']} list={footerText[3]["list"]}/>                
                </div>

                <div className="footer-up-social">
                    <img src="" alt="" />
                    <img src="" alt="" />
                    <img src="" alt="" />
                </div>
            </div>

            <hr />

            <div className="footer-down">
                <div className="footer-down-row">
                    {
                        footerText[4].map((info, id)=>
                            <p key={id} className="font-medium-14">{info}</p>
                        )
                    }
                </div>
            </div>
        </footer>
    )
}