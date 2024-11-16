Копия базового функционала Spotify Web с использованием [SpotifyApi](https://developer.spotify.com/documentation/web-api)

[Посмотреть результат](https://kkatyalight.github.io/My-Spotify-App/)

# Руководство по авторизации:
    1 Нажать кнопку LogIn
    2 Войти в аккаунт пользователя (необходимо использовать заранее настроенный аккаунт, реквизиты ниже)
    3 Принять настройки доступа

# Данные для авторизации:
    Эл.почта - user.testspotify.app@gmail.com
    Пароль - userPassword1

# Активные страницы:
    1 MainFrame path="/" - домашняя страница, просмотр плейлистов, отсортированных по жанрам
    2 AllPlaylists path="/all-playlists-by-category" - просмотр всех доступных плейлистов выбранного жанра
    3 Playlist path="/playlist/:id" - просмотр треков из плейлиста

# Активные компоненты:
    1 MediaInfo (блок на странице справа) - просмотр информации о выбранном треке (альбом, артист)
    2 MediaLibrary (блок на странице слева) - просмотр библиотеки пользователя 
    (при открытии для просмотра подробной информации происходит перезагрузка библиотеки для синхронизации)
    
Player не функционален, так как SpotifyApi предоставляет доступ к его функционалу только для Premium аккаунтов.

# Навигация: 
<img src="./src/assets/logo.svg" alt="Alt text" title="Optional title" style="display: inline-block; margin: 0 auto; width: 50px"> - возврат к регистрации

<img src="./src/assets/library_icon.svg" alt="Alt text" title="Optional title" style="display: inline-block; margin: 0 auto; width: 50px"> - отобразить/скрыть MediaLibrary

<img src="./src/assets/menu_icon.svg" alt="Alt text" title="Optional title" style="display: inline-block; margin: 0 auto; width: 50px"> - открыть меню сортировки в MediaLibrary 

<img src="https://github.com/user-attachments/assets/f173f3f1-964e-46de-8ca0-c408e7f12a2c" alt="Alt text" title="Optional title" style="display: inline-block; margin: 0 auto; heigth: 50px"> - отобразить выбранную категорию из библиотеки пользователя

<img src="./src/assets/now_playing_icon.svg" alt="Alt text" title="Optional title" style="display: inline-block; margin: 0 auto; width: 50px"> - в компоненте Player - отобразить/скрыть MediaInfo

<img src="https://github.com/user-attachments/assets/a1708153-5d6d-4827-abdf-93fa01377cbd" alt="Alt text" title="Optional title" style="display: inline-block; margin: 0 auto; heigth: 50px"> - перейти к домашней странице MainFrame

<img src="https://github.com/user-attachments/assets/e713d204-e419-46a6-ba65-bde0611b2658" alt="Alt text" title="Optional title" style="display: inline-block; margin: 0 auto; heigth: 50px"> - перейти в плейлист с любимыми треками

<img src="https://github.com/user-attachments/assets/3ac3f481-6e24-458b-9b2b-a0fc04c39023" alt="Alt text" title="Optional title" style="display: inline-block; margin: 0 auto; heigth: 50px">/
<img src="https://github.com/user-attachments/assets/8a7c7643-5a01-4c99-9222-3e71f02f38d1" alt="Alt text" title="Optional title" style="display: inline-block; margin: 0 auto; heigth: 50px"> - перейти на страницу AllPlaylists выбранной категории

<img src="https://github.com/user-attachments/assets/582d428a-3e4d-436d-8c3f-a4b12d3e3953" alt="Alt text" title="Optional title" style="display: inline-block; margin: 0 auto; heigth: 50px"> на главной странице MainFrame и на странице AllPlaylists - открыть соответствующий плейлист

<img src="https://github.com/user-attachments/assets/c7eddb8e-5ea0-4e74-8b0d-d16d9182c364" alt="Alt text" title="Optional title" style="display: inline-block; margin: 0 auto; heigth: 50px"> на странице Playlist - отобразить информацию о выбранной песне в MediaInfo и Player


# PUT-запросы
    Follow Artist (кнопка "Follow" в MediaInfo) - подписаться на исполнителя
    Follow Playlist (кнопка + в плейлисте) - подписаться на плейлист
    Add Song To Favorite (кнопка + возле трека в Playlist и в MediaInfo) - добавить трек в избранное
    
Для подтверждения добавления исполнителя/плейлиста/трека в библиотеку используется модальное окно.

Обновленную информацию по трекам можно увидеть в плейлисте Liked Songs.

Обновленную информацию по исполнителям и плейлистам можно увидеть в MediaLibrary


    



