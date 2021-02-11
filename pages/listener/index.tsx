import { InferGetStaticPropsType } from 'next'
import { uniqueId } from 'lodash'
import Head from 'next/head'

import { redirect } from '../../services/redirect'
import api from '../../services/api'

import NavBar from '../../components/NavBar'
import Table from '../../components/Table'

export async function getStaticProps() {
    const response = await api.get('/ouvintes')

    return {
        props: { listeners: response.data.data }
    }
}

export default function Listener({ listeners }: InferGetStaticPropsType<typeof getStaticProps>) {

    return (
        
        <div className="listener">
            <Head>
                <title>Ouvintes</title>
            </Head>
            <header>
                <NavBar 
                    title={"Lista de Ouvintes"} 
                    active={[true, false, false, false, false]} 
                    btnValue={"Adicionar Ouvinte"} 
                    btnUrl={"/listener/new"}
                />
            </header>
            <main>
                <Table>
                    <thead>
                        <tr>
                            <td>Email</td>
                            <td>Nome</td>
                            <td>Sobrenome</td>
                            <td>Telefone</td>
                            <td className="details">Detalhes</td>
                        </tr>
                    </thead>
                    <tbody>
                        {listeners.map( listener => { return (
                            <tr key={uniqueId()}>
                                <td>{listener.email}</td>
                                <td>{listener.nome}</td>
                                <td>{listener.sobrenome}</td>
                                <td>{listener.telefone}</td>
                                <td className="details" onClick={ e => redirect(`/listener/details/${listener.email}`)}>Detalhes</td>
                            </tr>
                        )})}
                    </tbody>
                </Table>
                <br></br>
            </main>
        </div>
    )
}
