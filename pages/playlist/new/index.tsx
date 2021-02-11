import Head from 'next/head'
import { useState } from 'react'

import NavBar from '../../../components/NavBar'
import Form from '../../../components/Form'

export default function NewPlaylist() {
    
    const [ playlist, setPlaylist ] = useState({  Nome: '' })

    function playlistUpdate(value) {
        setPlaylist( playlist => { return { ...playlist, ...value }})
    }

    function handleCreate() {
        console.log(playlist)
    }

    return (
        <div className="playlist">
            <Head>
                <title>Musics</title>
            </Head>
            <header>
                <NavBar title={ "Nova Playlist" } active={[ false, false, false, true, false ]} btnUrl="" btnValue=""/>
            </header>
            <main>
                <Form>
                    <div className="input-field">
                        <label htmlFor="mail">Nome</label>
                        <input id="mail" type="text" value={ playlist.Nome } onChange={ event => playlistUpdate({ Nome: event.target.value })}/>
                    </div>
                    <button onClick={ handleCreate }>Adicionar</button>
                </Form>
            </main>
        </div>
    )
}
