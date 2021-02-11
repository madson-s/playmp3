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
                <NavBar title={"Novo Ouvinte"} active={[true, false, false, false, false]} btnUrl="" btnValue=""/>
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
                    <button onClick={handleCreate}>Adicionar</button>
                </Form>
                
            </main>
        </div>
    )
}
