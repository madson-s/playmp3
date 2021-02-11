import { InferGetStaticPropsType } from 'next'
import Head from 'next/head'

import { redirect } from '../../services/redict'

import NavBar from '../../components/NavBar'
import Table from '../../components/Table'

export const getStaticProps = async () => {
    const artists = [{  Email: 'asdasd', NomeArtistico: 'asdas', Biografia: 'asdasdasd', AnoFormacao: 'asdasdasdas' }] 
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
                                <td>{artist.Email}</td>
                                <td>{artist.NomeArtistico}</td>
                                <td>{artist.Biografia}</td>
                                <td>{artist.AnoFormacao}</td>
                                <td className="details" onClick={ e => redirect('/artist/details/id')}>Detalhes</td>
                            </tr>
                        )})}
                        
                    </tbody>
                </Table>
            </main>
        </div>
    )
}
