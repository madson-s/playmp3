import Head from 'next/head'
import { useState } from 'react'

import NavBar from '../../../components/NavBar'
import Form from '../../../components/Form'


export default function Music() {

    const [ listener, setListener ] = useState({  Email: '', Nome: '', Sobrenome: '', Telefone: '' })

    function musicUpdate(value) {
        setListener( listener => { return { ...listener, ...value } } )
    }

    function handleCreate() {
        console.log(listener)
    }

    return (
        <div className="music">
            <Head>
                <title>Musics</title>
            </Head>
            <header>
                <NavBar title={"Detalhes do Ouvinte"} active={[true, false, false, false, false]} btnValue="" btnUrl=""/>
            </header>
            <main>
                <Form>
                    <div className="input-field">
                        <label htmlFor="mail">E-mail</label>
                        <input id="mail" type="text" value={listener.Email} onChange={ event => musicUpdate({Email: event.target.value})}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="name">Nome</label>
                        <input id="name" type="text" value={listener.Nome} onChange={ event => musicUpdate({Nome: event.target.value})}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="lastName">Sobrenome</label>
                        <input id="lastName" type="text" value={listener.Sobrenome} onChange={ event => musicUpdate({Sobrenome: event.target.value})}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="phone">Telefone</label>
                        <input id="phone" type="text" value={listener.Telefone} onChange={ event => musicUpdate({Telefone: event.target.value})}/>
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
                                    <td className="details" onClick={ e => {}}>Curtir</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="table-field">
                        <label htmlFor="mail">Artistas</label>
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
                                    <td className="details" onClick={ e => {}}>Seguir</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="table-field">
                        <label htmlFor="mail">Playlists</label>
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
                                    <td className="details" onClick={ e => {}}>Curtir</td>
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
