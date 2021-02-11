import { InferGetStaticPropsType } from 'next'
import Head from 'next/head'

import { redirect } from '../../services/redict'

import NavBar from '../../components/NavBar'
import Table from '../../components/Table'

type Music = {
    Id: number
    Nome: string
    Duracao: string
}

export const getStaticProps  = async () => {
    const musics = [ { Id: 1, Nome: 'Nome', Duracao: '00:00' } ] 
    console.log(musics)
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
                                <td>{music.Id}</td>
                                <td>{music.Nome}</td>
                                <td>{music.Duracao}</td>
                                <td className="details" onClick={ e => redirect(`/music/details/${music.Id}`)}>Detalhes</td>
                            </tr>
                        )})}    
                    </tbody>
                </Table>
            </main>
        </div>
    )
}
