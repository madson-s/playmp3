import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect} from 'react'

import api from '../../../services/api'
import { redirect } from '../../../services/redirect'
import { formatDate } from '../../../services/date'
 
import NavBar from '../../../components/NavBar'
import Form from '../../../components/Form'
import { setTimeout } from 'timers'


export default function Music() {
   
    const router = useRouter()

    const [ user, setUser ] = useState({  email: 'asda', dataNascimento: '', senha: ''})
    const [ confirmDelete, setConfirmDelete ] = useState(false)
    
    useEffect (() => {
        async function loadUser() {
            const { email } = router.query
            const response = await api.get(`/usuarios/${email}`)
            let user = response.data.data
            user = {...user, ...{ dataNascimento: formatDate(user.dataNascimento)} }
            setUser(user)
        }
        loadUser()
    }, [])

    function userUpdate(value) {
        setUser( user => { return { ...user, ...value } } )
    }

    async function handleUpdate( userEmail ) {
        console.log(user)
        api.put(`/usuarios/${userEmail}`, user).then( response => {
            redirect('/user')
        }) 
    }

    async function handleDelete( userEmail ) {
        if(confirmDelete){
            const response = await api.delete(`/usuarios/${userEmail}`)
            if(response.data.sucess)
                redirect('/user')
        }
        else
        {
            setConfirmDelete(true)
            setTimeout(() => {
                setConfirmDelete(false)
            }, 3000)
        }
        
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
                        <input id="mail" type="text" value={user.email} disabled/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="name">Senha</label>
                        <input id="name" type="text" value={user.senha} onChange={ event => userUpdate({senha: event.target.value})}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="lastName">Data Nascimento</label>
                        <input id="lastName" type="text" value={user.dataNascimento} onChange={ event => userUpdate({dataNascimento: event.target.value})}/>
                    </div>
                    <div className="btn-content">
                        <button onClick={() => {handleUpdate(user.email)} }>Salvar</button>
                        <button className="secondary" onClick={() => {handleDelete(user.email)}}>{confirmDelete && "Confirmar" || "Excluir"}</button>
                    </div>
                </Form>
                <br></br>
            </main>
        </div>
    )
}
