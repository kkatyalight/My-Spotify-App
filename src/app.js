
const client_id = import.meta.env.VITE_CLIENT_ID
const client_secret = import.meta.env.VITE_CLIENT_SECRET_ID;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const baseUrl="https://api.spotify.com/v1"
let token;


const customFetch=async(url,needBaseUrl, httpMethod, httpHeaders, httpBody)=>{
    const fetchOptions={};
    //0-without baseUrl, 1-with baseUrl
    if(needBaseUrl!=0) url=baseUrl+url;
    //"GET"/"POST"
    fetchOptions.method=httpMethod;
    //if headers aren't default
    httpHeaders ? fetchOptions.headers=httpHeaders : 
    fetchOptions.headers={"Authorization":`Bearer ${token}`};
    //if need body
    if(httpBody) fetchOptions.body=httpBody; 

    const result= await fetch(url,fetchOptions);

    if (httpMethod!="GET") return result;
    const data =await result.json();
    return data;
}

function generateRandomString(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

const redirect_uri = 'http://localhost:5174/';
const state = generateRandomString(16);
const scope = `user-read-private 
                user-read-email 
                user-read-recently-played
                user-library-read
                user-library-modify
                user-top-read
                user-follow-read
                user-follow-modify
                playlist-modify-public
                playlist-modify-private
                `;

let url = 'https://accounts.spotify.com/authorize';
url += '?response_type=token';
url += '&show_dialog=true';
url += '&client_id=' + encodeURIComponent(client_id);
url += '&scope=' + encodeURIComponent(scope);
url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
url += '&state=' + encodeURIComponent(state);
export {url};


export async function setAccessToken(){
    const hash = window.location.hash.substring(1);
    const accessString = hash.indexOf("&");
    token = hash.substring(13, accessString);
    //await UsersManager.getUserProfile();
    return token;
}

export function getAccessToken(){
    return token;
}

export class CategoriesManager{
    static async getCategories(){
        const data=await customFetch(
            "/browse/categories?locale=en", 1,
            "GET",
        );
       return data.categories.items;
    }
}
export class PlaylistsManager{
    static async getPlaylistsByCategory(category_id,limit){
        const data=await customFetch(
        `/browse/categories/${category_id}/playlists?limit=${limit}&locale=en`, 1,
            "GET",
        );
       return data.playlists.items;
    }
}
export class TracksManager{
    static async getTracksByPlaylist(playlist_id){
        const data=await customFetch(
            `/playlists/${playlist_id}/tracks`, 1,
                "GET",
            );
        return data.items;
    }
    static async getFavTracks(){
        const data=await customFetch(
            `/me/tracks`, 1,
                "GET",
            );
        return data.items;
    } 
    static async getArtist(artist_id){
        const data=await customFetch(
            `/artists/${artist_id}`, 1,
                "GET",
            );
        return data;
    } 
    
}
export class UsersManager{
    // static async getUserProfile(){
    //     const data=await customFetch(
    //         `/me`, 1,
    //         "GET",
    //     );
    //     console.log('prof',data);
    // };
    static async getUserHistory(){
        const data=await customFetch(
            `/me/player/recently-played`, 1,
            "GET",
        );
        return data.items;
    };
    static async getUserAlbums(){
        const data=await customFetch(
            `/me/albums`, 1,
            "GET",
        );
        return data.items;
    };
    static async getUserPlaylists(){
        const data=await customFetch(
            `/me/playlists`, 1,
            "GET",
        );
        return data.items;
    };
    static async getUserTopArtists(){
        const data=await customFetch(
            `/me/top/${artists}`, 1,
            "GET",
        );
        return data;
    };
    static async getUserTopTracks(){
        const data=await customFetch(
            `/me/top/${tracks}`, 1,
            "GET",
        );
        return data.items;
    };
    static async getUserFollowedArtists(){
        const data=await customFetch(
            `/me/following?type=artist`, 1,
            "GET",
        );
        return data.artists.items;
    };
    static async getUserSavedTracks(){
        const data=await customFetch(
            `/me/tracks/contains`, 1,
            "GET",
        );
        return data;
    };
    static async followPlaylist(playlist_id){
        const data=await customFetch(
            `/playlists/${playlist_id}/followers`, 1,
            "PUT",
        );
        return data;
    };
    static async followArtist(artist_id){
        const data=await customFetch(
            `/me/following/?type=artist&ids=${artist_id}`, 1,
            "PUT",
        );
        return data;
    };
    static async addTrack(track_id){
        const data=await customFetch(
            `/me/tracks/?ids=${track_id}`, 1,
            "PUT",
        );
        return data;
    };

}
