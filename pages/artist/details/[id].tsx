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
                <NavBar title={"Detalhes do Artista"} active={[false, false, true, false, false]} btnValue="" btnUrl=""/>
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
                                    <td className="details" onClick={ e => {}}>Associar</td>
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
