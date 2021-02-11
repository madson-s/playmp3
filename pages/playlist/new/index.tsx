import Head from 'next/head'
import { useState } from 'react'

import api from '../../../services/api'
import { redirect } from '../../../services/redirect'

import NavBar from '../../../components/NavBar'
import Form from '../../../components/Form'

export default function NewPlaylist() {
    
    const [ playlist, setPlaylist ] = useState({  nome: '' })

    function playlistUpdate(value) {
        setPlaylist( playlist => { return { ...playlist, ...value }})
    }

    async function handleCreate() {
        
        const data = {
            nome: playlist.nome,
            ativo: true,
            ouvintes: []
        }

        const response = await api.post('/playlists', data)

        redirect('/playlist')
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
                        <input id="mail" type="text" value={ playlist.nome } onChange={ event => playlistUpdate({ nome: event.target.value })}/>
                    </div>
                    <button onClick={ handleCreate }>Adicionar</button>
                </Form>
            </main>
        </div>
    )
}
