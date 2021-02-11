import Head from 'next/head'
import { useState } from 'react'

import api from '../../../services/api'
import { redirect } from '../../../services/redirect'

import NavBar from '../../../components/NavBar'
import Form from '../../../components/Form'

export default function NewMusic() {
    

    const [ music, setMusic ] = useState({ nome: '', duracao: ''})


    function musicUpdate(value) {
        setMusic( music => { return { ...music, ...value } } )
    }

    async function handleCreate() {
        const response = await api.post('/musicas', music)
        redirect('/music')
    }

    return (
        <div className="music">
            <Head>
                <title>Musics</title>
            </Head>
            <header>
                <NavBar title={"Nova Música"} active={[false, true, false, false, false]} btnUrl="" btnValue=""/>
            </header>
            <main>
                <Form>
                    <div className="input-field">
                        <label htmlFor="mail">Nome</label>
                        <input id="mail" type="text" value={music.nome} onChange={ event => musicUpdate({nome: event.target.value})}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="mail">Duração</label>
                        <input id="mail" type="text" value={music.duracao} onChange={ event => musicUpdate({duracao: event.target.value})}/>
                    </div>
                    <button onClick={handleCreate}>Adicionar</button>
                </Form>
            </main>
        </div>
    )
}
