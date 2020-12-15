import Head from 'next/head'
import Router from 'next/router'
import '../../styles/Music.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faTimes } from '@fortawesome/free-solid-svg-icons'

function Sair() {
    Router.push('/login')
}

function CloseAdd() {
    const form = document.querySelector(".form-container.add")
    form.classList.add("inve")
}

function OpenAdd() {
    const form = document.querySelector(".form-container.add")
    form.classList.remove("inve")
}

function CloseEdit() {
    const form = document.querySelector(".form-container.edit")
    form.classList.add("inve")
}

function OpenEdit() {
    const form = document.querySelector(".form-container.edit")
    form.classList.remove("inve")
}

function MusicItem (){
    return (
        <div className="music-content" onClick={OpenEdit}>
            <div className="id">01</div>
            <div className="name">Nome da música</div>
            <div className="duration">00:00</div>                  
        </div>
    )
}

export default function Music() {
    return (
        
        <div className="music">
            <Head>
                <title>Musics</title>
            </Head>
            <header>
            <div className="container">
                <h3>Play.mp3</h3>
                <div className="icon" onClick={Sair}>Sair</div>
                </div>
            </header>
            <div className="nav-bar">
                <div className="container">

                </div>
            </div>
            <main>
                <div className="container">
                    <div className="music-list">
                        <div className="add-music" onClick={OpenAdd}>
                            ADICIONAR NOVA MUSICA            
                        </div>

                        <div className="list-container">
                            <div className="list-header">
                                <div className="id">ID</div>
                                <div className="name">NAME</div>
                                <div className="duration">DURATION</div>                    
                            </div>
                            
                            <MusicItem></MusicItem>

                            <MusicItem></MusicItem>

                            <MusicItem></MusicItem>

                            <MusicItem></MusicItem>

                        </div>
                        
                    </div>
                </div>
            </main>
            <div className="form-container inve add">
                <div className="shadow"></div>
                <div className="form">
                    <div className="icon" onClick={CloseAdd}>
                        <i><FontAwesomeIcon icon={faTimes} /></i>
                    </div>
                    <h2>Adicionar Música</h2>
                    <div className="input-field">
                        <i></i>
                        <input type="text" placeholder="Nome"/>
                    </div>
                    
                    <div className="input-field">
                    <i></i>
                        <input type="text" placeholder="Duração"/>
                    </div>
                    <div className="btn">Adicionar</div>
                </div>
            </div>

            <div className="form-container inve edit">
                <div className="shadow"></div>
                <div className="form">
                    <div className="icon" onClick={CloseEdit}>
                        <i><FontAwesomeIcon icon={faTimes} /></i>
                    </div>
                    <h3>Editar Música</h3>
                    <div className="input-field">
                        <i></i>
                        <input type="text" value="Nome da música"/>
                    </div>
                    
                    <div className="input-field" >
                    <i></i>
                        <input type="text" value="00:00"/>
                    </div>
                    <div className="bnt-content">
                        <div className="btn">Alterar</div>
                        <div className="btn transparent">Remover</div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}
