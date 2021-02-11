import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

import api from '../../../services/api'
import { redirect } from '../../../services/redirect'

import NavBar from '../../../components/NavBar'
import Form from '../../../components/Form'

export default function MusicDetails() {
    
    const router = useRouter()

    const [ music, setMusic ] = useState({ id: '', nome: '', duracao: '', artistas: []})
    const [ artists, setArtists ] = useState([])
    const [ confirmDelete, setConfirmDelete ] = useState(false)

    useEffect (() => {
        async function loadUser() {
            const { id } = router.query
            const response = await api.get(`/musicas/${id}`)
            const music = response.data.data
            setMusic(music)
        }

        loadUser()

        async function loadArtists() {
            const response = await api.get(`/artistas`)
            let artists = response.data.data
            artists = artists.map( artist => {return { ...artist, ...{associated: music.artistas.includes(artist.email)}}})
            setArtists(artists)
        }

        loadArtists()
    }, [])

    function musicUpdate(value) {
        setMusic( music => { return { ...music, ...value } } )
    }

    async function handleDelete() {
        if(confirmDelete){
            const response = await api.delete(`/musicas/${music.id}`)
            if(response.data.sucess)
                redirect('/music')
        }
        else
        {
            setConfirmDelete(true)
            setTimeout(() => {
                setConfirmDelete(false)
            }, 3000)
        }
        
    }

    async function handleUpdate() {
        const response = await api.put(`/musicas/${music.id}`, music)
            redirect('/music')
    }

    function toggleArtistsAssociation(toggledArtist) {
        if (toggledArtist.associated) {
            setMusic( music => { return {...music, ...{artistas:  
                music.artistas.filter( 
                    artist => artist.email !== toggledArtist.email
                )}}     
            })
            setArtists( artists => artists.map( artist => {
                if(artist.email !== toggledArtist.email)
                    return artist
                return {...artist, ...{ associated: false }}
            }))
        }
        else {
            setMusic( music => { return { ...music, ...{artistas: [...music.artistas , toggledArtist]} } } )

            setArtists( artists => artists.map( artist => {
                if(artist.email !== toggledArtist.email)
                    return artist
                return {...artist, ...{ associated: true }}
            }))
        }
    }

    return (
        <div className="music">
            <Head>
                <title>Musics</title>
            </Head>
            <header>
                <NavBar title={"Detalhes da Música"} active={[false, true, false, false, false]} btnUrl="" btnValue=""/>
            </header>
            <main>
                <Form>
                    <div className="input-field">
                        <label htmlFor="mail">id</label>
                        <input id="mail" type="text" value={music.id} disabled/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="mail">Nome</label>
                        <input id="mail" type="text" value={music.nome} onChange={ event => musicUpdate({nome: event.target.value})}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="mail">Duração</label>
                        <input id="mail" type="text" value={music.duracao} onChange={ event => musicUpdate({duracao: event.target.value})}/>
                    </div>
                    <div className="table-field">
                        <label htmlFor="mail">Artistas</label>
                        <table>
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
                                        <td className="details" onClick={()=>{ toggleArtistsAssociation(artist) }}>{artist.associated && "Desassociar" || "Associar" }</td>
                                    </tr>
                                )})}
                            </tbody>
                        </table>
                        {!artists.length && <p className="empty">Nenhum artista encontrado</p>}
                        
                    </div>
                    <br></br>
                    <div className="btn-content">
                        <button onClick={() => { handleUpdate() }}>Salvar</button>
                        <button className="secondary" onClick={() => { handleDelete() }}>Excluir</button>
                    </div>
                </Form>
            </main>
        </div>
    )
}
