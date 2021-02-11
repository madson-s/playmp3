import Head from 'next/head'
import { useState } from 'react'

import NavBar from '../../../components/NavBar'
import Form from '../../../components/Form'

export default function Music() {
   
    const [ user, setUser ] = useState({  Email: '', DataNascimento: '', Senha: ''})

    function musicUpdate(value) {
        setUser( user => { return { ...user, ...value } } )
    }

    function handleCreate() {
        console.log(user)
    }

    return (
        
        <div className="music">
            <Head>
                <title>Musics</title>
            </Head>
            <header>
                <NavBar title={"Detalhes do Usuário"} active={[false, false, false, false, true]} btnValue="" btnUrl=""/>
            </header>
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
                    <div className="btn-content">
                        <button onClick={handleCreate}>Salvar</button>
                        <button className="secondary" onClick={handleCreate}>Excluir</button>
                    </div>
                </Form>
            </main>
        </div>
    )
}
