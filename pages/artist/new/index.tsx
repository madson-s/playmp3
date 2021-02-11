import Head from 'next/head'
import { useState } from 'react'

import api from '../../../services/api'
import { redirect } from '../../../services/redirect'

import NavBar from '../../../components/NavBar'
import Form from '../../../components/Form'

export default function NewArtist() {

    const [ artist, setArtist ] = useState({  email: '', nomeArtistico: '', biografia: '', anoFormacao: '' })

    function artistUpdate(value) {
        setArtist( artist => { return { ...artist, ...value } } )
    }

    async function handleCreate() {
        const response = await api.post('/artistas', artist)
        if(response.data.sucess)
            redirect('/artist')
    }

    return (
        <div className="artist">
            <Head>
                <title>Play.mp3</title>
            </Head>
            <header>
                <NavBar title={"Novo Artista"} active={[false, false, true, false, false]} btnValue="" btnUrl=""/>
            </header>
            <main>
                <Form>
                    <div className="input-field">
                        <label htmlFor="mail">E-mail</label>
                        <input id="mail" type="text" value={artist.email} onChange={ event => artistUpdate({email: event.target.value})}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="name">NomeArtistico</label>
                        <input id="name" type="text" value={artist.nomeArtistico} onChange={ event => artistUpdate({nomeArtistico: event.target.value})}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="lastName">Biografia</label>
                        <input id="lastName" type="text" value={artist.biografia} onChange={ event => artistUpdate({biografia: event.target.value})}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="phone">AnoFormacao</label>
                        <input id="phone" type="text" value={artist.anoFormacao} onChange={ event => artistUpdate({anoFormacao: event.target.value})}/>
                    </div>
                    <button onClick={handleCreate}>Adicionar</button>
                </Form>
            </main>
        </div>
    )
}
