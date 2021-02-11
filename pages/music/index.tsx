import { InferGetStaticPropsType } from 'next'
import Head from 'next/head'

import api from '../../services/api'
import { redirect } from '../../services/redirect'

import NavBar from '../../components/NavBar'
import Table from '../../components/Table'

export const getStaticProps  = async () => {
    const response = await api.get('/musicas')
    const musics = response.data.data
    return { 
        props: { musics }
    }
}

export default function Music({ musics }: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <div className="music">
            <Head>
                <title>Play.mp3</title>
            </Head>
            <header>
                <NavBar title={"Lista de Músicas"} active={[false, true, false, false, false]} btnUrl="/music/new" btnValue="Nova Música"/>
            </header>
            <main>
                <Table>
                    <thead>
                        <tr>
                            <td>Id</td>
                            <td>Nome</td>
                            <td>Duração</td>
                            <td className="details">Detalhes</td>
                        </tr>
                    </thead>
                    <tbody>
                        {musics.map( music => { return (
                            <tr>
                                <td>{music.id}</td>
                                <td>{music.nome}</td>
                                <td>{music.duracao}</td>
                                <td className="details" onClick={ e => redirect(`/music/details/${music.id}`)}>Detalhes</td>
                            </tr>
                        )})}    
                    </tbody>
                </Table>
            </main>
        </div>
    )
}
