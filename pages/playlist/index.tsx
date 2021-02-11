import { InferGetStaticPropsType } from 'next'
import Head from 'next/head'

import { redirect } from '../../services/redict'

import NavBar from '../../components/NavBar'
import Table from '../../components/Table'

export const getStaticProps = async () => {
    const playlists = [{  Id: 1, Nome: 'asdasd' }] 
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
                            <tr>
                                <td>{playlist.Nome}</td>
                                <td className="details" onClick={ e => redirect(`/playlist/details/${playlist.Id}`)}>Detalhes</td>
                            </tr>
                        )})}
                        
                    </tbody>
                </Table>
            </main>
        </div>
    )
}
