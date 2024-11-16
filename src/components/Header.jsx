import home_icon from "../assets/home_icon.svg"
import install_icon from "../assets/install_icon.svg"
import logo from "../assets/logo.svg"
import search_icon from "../assets/search_icon.svg"
import close_icon from "../assets/close_icon.svg"

import testIMG from "../assets/tt.png"
import { Link } from "react-router-dom"

export default function Header(){
    return(
        <header className="header">
            <a href="/">
            <img src={logo} alt="logo" />
            </a>
            {/* <Link to='/' className="logo">
                <img src={logo} alt="logo" />
            </Link> */}
            <form className="search">
                <img className='search-left-icon' src={search_icon} alt="search_icon" />
                <input type="text" placeholder="What do you want to play?"/>
                <img className='search-right-icon' src={close_icon} alt="close_icon" />
            </form>
            <div className="account">
                <button id="premium-button">Explore Premium</button>
                <button id="install-button">
                    <img src={install_icon} alt="install_icon" />
                    <p>Install App</p>
                </button>
                {/* <img className="account-img" src={testIMG} alt="" /> */}
            </div>
        </header>
    )
}