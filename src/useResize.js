import { useState, useEffect } from 'react';

const SCREEN_SM = 576;
const SCREEN_MD = 768;//3
const SCREEN_LG = 1024;//4
const SCREEN_XL = 1440;//5
const SCREEN_XXL = 2560;//6

export const useResize=()=>{
    const [playlistEl, setPlaylistEl] = useState(5);

    useEffect(() => {
        const handleResize = (event) => {
            if (event.target.innerWidth>=SCREEN_XL) setPlaylistEl(7);
            else if(event.target.innerWidth>=SCREEN_LG) setPlaylistEl(5);
            else if(event.target.innerWidth>=SCREEN_MD)setPlaylistEl(4);
            else setPlaylistEl(2);
        };
        window.addEventListener('resize', handleResize);
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);
      
      //console.log(playlistEl);
      return playlistEl;
}