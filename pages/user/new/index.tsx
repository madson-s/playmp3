import Head from 'next/head'
import { useState } from 'react'

import api from '../../../services/api'
import { redirect } from '../../../services/redirect'

import NavBar from '../../../components/NavBar'
import Form from '../../../components/Form'

export default function Music() {

    const [ user, setUser ] = useState({  email: '', dataNascimento: '', senha: ''})

    function musicUpdate(value) {
        setUser( user => { return { ...user, ...value } } )
    }

    async function handleCreate() {
        const response = await api.post('/usuarios', user)
        if(response.data.sucess)
            redirect('/user')
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
                        <input id="mail" type="text" value={user.email} onChange={ event => musicUpdate({email: event.target.value})}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="name">Senha</label>
                        <input id="name" type="text" value={user.senha} onChange={ event => musicUpdate({senha: event.target.value})}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="lastName">Data Nascimento</label>
                        <input id="lastName" type="text" value={user.dataNascimento} onChange={ event => musicUpdate({dataNascimento: event.target.value})}/>
                    </div>
                    <button onClick={handleCreate}>Adicionar</button>
                </Form>
                <br></br>
            </main>
        </div>
    )
}
