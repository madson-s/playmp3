import Router from 'next/router'

import './styles.module.css'

export default function Navbar( { title, active, btnUrl, btnValue } ) {
    
    function logout(){
        Router.push('/login')
    }

    function redirect(url) {
        Router.push(url)
    } 

    return(
        <div id="header">
            <div className="container">
                <div className="content">
                    <h3>Play.mp3</h3>
                    <p className="logout" onClick={logout}>sair</p>
                </div>
            </div>
            <div className="container nav">
                <div className="options">
                    <p className={active[0] && "active" || " "} onClick={e => {redirect('/listener')}}>Ouvintes</p>
                    <p className={active[1] && "active" || " "} onClick={e => {redirect('/music')}}>Músicas</p>
                    <p className={active[2] && "active" || " "} onClick={e => {redirect('/artist')}}>Artistas</p>
                    <p className={active[3] && "active" || " "} onClick={e => {redirect('/playlist')}}>Playlists</p>
                    <p className={active[4] && "active" || " "} onClick={e => {redirect('/user')}}>Usuários</p>
                </div>
            </div>
            <div className="container">
                <div className="title">
                    <h4>{title}</h4>
                    {btnValue &&
                        <button onClick={e => { redirect(btnUrl) }}>{btnValue}</button>
                    }
                </div>
            </div>
        </div>
    )
}