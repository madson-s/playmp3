import { InferGetStaticPropsType } from 'next'
import Head from 'next/head'  
import { uniqueId } from 'lodash'

import { redirect } from '../../services/redirect'
import api from '../../services/api'
import { formatDate } from '../../services/date'

import NavBar from '../../components/NavBar'
import Table from '../../components/Table'

export async function getStaticProps() {
    const response = await api.get('/usuarios')
    const users = response.data.data
    return {
        props: { users }
    }
}


export default function User({ users }: InferGetStaticPropsType<typeof getStaticProps>) {

    return (
        
        <div className="user">
            <Head>
                <title>Play.mp3</title>
            </Head>
            <header>
                <NavBar title={"Lista de Usuários"} active={[false, false, false, false, true]} btnUrl="/user/new" btnValue="Novo Usuário"/>
            </header>
            <main>
                <Table>
                    <thead>
                        <tr>
                            <td>Email</td>
                            <td>DataNascimento</td>
                            <td className="details">Detalhes</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map( user => { return (
                                <tr key={uniqueId()}>
                                    <td>{user.email}</td>
                                    <td>{formatDate(user.dataNascimento)}</td>
                                    <td className="details" onClick={ e => redirect(`/user/details/${user.email}`)}>Detalhes</td>
                                </tr>
                            )})
                        }
                        
                    </tbody>
                </Table>
            </main>
        </div>
    )
}