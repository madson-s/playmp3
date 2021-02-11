import Head from 'next/head'
import { useState } from 'react'

import NavBar from '../../../components/NavBar'
import Form from '../../../components/Form'

export default function NewPlaylist() {
    
    const [ playlist, setPlaylist ] = useState({  Nome: '' })

    function playlistUpdate(value) {
        setPlaylist( playlist => { return { ...playlist, ...value } } )
    }

    function handleCreate() {
        console.log(playlist)
    }

    return (
        <div className="playlist">
            <Head>
                <title>Playlist</title>
            </Head>
            <header>
                <NavBar title={"Detalhes da Playlist"} active={[false, false, false, true, false]} btnUrl="" btnValue=""/>
            </header>
            <main>
                <Form>
                    <div className="input-field">
                        <label htmlFor="mail">Nome</label>
                        <input id="mail" type="text" value={playlist.Nome} onChange={ event => playlistUpdate({Nome: event.target.value})}/>
                    </div>
                    <div className="table-field">
                        <label htmlFor="mail">Músicas</label>
                        <table>
                            <thead>
                                <tr>
                                    <td>Id</td>
                                    <td>Nome</td>
                                    <td>Duração</td>
                                    <td className="details">Detalhes</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>12</td>
                                    <td>Nome</td>
                                    <td>Duração</td>
                                    <td className="details" onClick={ e => {}}>Adicionar</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="btn-content">
                        <button onClick={handleCreate}>Salvar</button>
                        <button className="secondary" onClick={handleCreate}>Excluir</button>
                    </div>
                </Form>
            </main>
        </div>
    )
}
