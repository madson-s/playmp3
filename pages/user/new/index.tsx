import Head from 'next/head'
import { useState } from 'react'

import api from '../../../services/api'

import NavBar from '../../../components/NavBar'
import Form from '../../../components/Form'

export default function Music() {

    const [ user, setUser ] = useState({  Email: '', DataNascimento: '', Senha: ''})

    function musicUpdate(value) {
        setUser( user => { return { ...user, ...value } } )
    }

    async function handleCreate() {
        const data = { 
            email: "user@example.com",
            senha: "string",
            dataNascimento: "2021-02-11"
        }
        const response = await api.post('/usuarios', data)
        console.log(response)
    }

    return (
        <div className="music">
            <Head>
                <title>Musics</title>
            </Head>
            <header>
                <NavBar title={"Novo Usuário"} active={[false, false, false, false, true]} btnUrl="" btnValue=""/>
            </header>
            <div className="nav-bar">
                <div className="container">

                </div>
            </div>
            <main>
                <Form>
                    <div className="input-field">
                        <label htmlFor="mail">E-mail</label>
                        <input id="mail" type="text" value={user.Email} onChange={ event => musicUpdate({Email: event.target.value})}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="name">Senha</label>
                        <input id="name" type="text" value={user.Senha} onChange={ event => musicUpdate({Senha: event.target.value})}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="lastName">Data Nascimento</label>
                        <input id="lastName" type="text" value={user.DataNascimento} onChange={ event => musicUpdate({DataNascimento: event.target.value})}/>
                    </div>
                    <button onClick={handleCreate}>Adicionar</button>
                </Form>
            </main>
        </div>
    )
}
