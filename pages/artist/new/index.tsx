import Head from 'next/head'
import { useState } from 'react'

import NavBar from '../../../components/NavBar'
import Form from '../../../components/Form'

export default function NewArtist() {

    const [ artist, setArtist ] = useState({  Email: '', NomeArtistico: '', Biografia: '', AnoFormacao: '' })

    function artistUpdate(value) {
        setArtist( artist => { return { ...artist, ...value } } )
    }

    function handleCreate() {
        console.log(artist)
    }

    return (
        
        <div className="music">
            <Head>
                <title>Musics</title>
            </Head>
            <header>
                <NavBar title={"Novo Artista"} active={[false, false, true, false, false]} btnValue="" btnUrl=""/>
            </header>
            <main>
                <Form>
                    <div className="input-field">
                        <label htmlFor="mail">E-mail</label>
                        <input id="mail" type="text" value={artist.Email} onChange={ event => artistUpdate({Email: event.target.value})}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="name">NomeArtistico</label>
                        <input id="name" type="text" value={artist.NomeArtistico} onChange={ event => artistUpdate({NomeArtistico: event.target.value})}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="lastName">Biografia</label>
                        <input id="lastName" type="text" value={artist.Biografia} onChange={ event => artistUpdate({Biografia: event.target.value})}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="phone">AnoFormacao</label>
                        <input id="phone" type="text" value={artist.AnoFormacao} onChange={ event => artistUpdate({AnoFormacao: event.target.value})}/>
                    </div>
                    <button onClick={handleCreate}>Adicionar</button>
                </Form>
            </main>
        </div>
    )
}
