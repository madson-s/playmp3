import { InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import { uniqueId } from 'lodash'

import { redirect } from '../../services/redirect'

import NavBar from '../../components/NavBar'
import Table from '../../components/Table'
import api from '../../services/api'

export const getStaticProps = async () => {
    const response = await api.get('/playlists')
    const playlists = response.data.data
    return {
        props: { playlists }
    }
}

export default function Playlist({ playlists }: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        
        <div className="playlist">
            <Head>
                <title>Play.mp3</title>
            </Head>
            <header>
                <NavBar title={"Lista de Playlists"} active={[false, false, false, true, false]} btnUrl="/playlist/new" btnValue="Nova Playlist"/>
            </header>
            <main>
                <Table>
                    <thead>
                        <tr>
                            <td>Nome</td>
                            <td className="details">Detalhes</td>
                        </tr>
                    </thead>
                    <tbody>
                        { playlists.map( playlist => { return (
                            <tr key={uniqueId()}>
                                <td>{playlist.nome}</td>
                                <td className="details" onClick={ e => redirect(`/playlist/details/${playlist.nome}`)}>Detalhes</td>
                            </tr>
                        )})}
                        
                    </tbody>
                </Table>
            </main>
        </div>
    )
}
