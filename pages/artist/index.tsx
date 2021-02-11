import { InferGetStaticPropsType } from 'next'
import Head from 'next/head'

import api from '../../services/api'
import { redirect } from '../../services/redirect'

import NavBar from '../../components/NavBar'
import Table from '../../components/Table'

export const getStaticProps = async () => {
    const response = await api.get('/artistas')
    const artists = response.data.data
    return {
        props: { artists }
    }
}

export default function Artist({ artists }: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        
        <div className="music">
            <Head>
                <title>Musics</title>
            </Head>
            <header>
                <NavBar title={"Lista de Artistas"} active={[false, false, true, false, false]} btnValue="Novo Artista" btnUrl="/artist/new"/>
            </header>
            <main>
                <Table>
                        <thead>
                        <tr>
                            <td>Email</td>
                            <td>NomeArtistico</td>
                            <td>Biografia</td>
                            <td>AnoFormacao</td>
                            <td className="details">Detalhes</td>
                        </tr>
                    </thead>
                    <tbody>
                        {artists.map( artist => { return ( 
                            <tr>
                                <td>{artist.email}</td>
                                <td>{artist.nomeArtistico}</td>
                                <td>{artist.biografia}</td>
                                <td>{artist.anoFormacao}</td>
                                <td className="details" onClick={ e => redirect(`/artist/details/${artist.email}`)}>Detalhes</td>
                            </tr>
                        )})}
                    </tbody>
                </Table>
            </main>
        </div>
    )
}
