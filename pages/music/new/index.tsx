import Head from 'next/head'
import { useState } from 'react'

import NavBar from '../../../components/NavBar'
import Form from '../../../components/Form'

export default function NewMusic() {
    
    const [ music, setMusic ] = useState({  Nome: '', Duracao: '' })

    function musicUpdate(value) {
        setMusic( music => { return { ...music, ...value } } )
    }

    function handleCreate() {
        console.log(music)
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
                        <input id="mail" type="text" value={music.Nome} onChange={ event => musicUpdate({Nome: event.target.value})}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="mail">Duração</label>
                        <input id="mail" type="text" value={music.Duracao} onChange={ event => musicUpdate({Duracao: event.target.value})}/>
                    </div>
                    <button onClick={handleCreate}>Adicionar</button>
                </Form>
            </main>
        </div>
    )
}
