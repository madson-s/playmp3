import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { uniqueId } from 'lodash'

import { redirect } from '../../../services/redirect'
import api from '../../../services/api'

import NavBar from '../../../components/NavBar'
import Form from '../../../components/Form'
import Playlist from '../../playlist'


export default function Music() {

    const router = useRouter()

    const [ listener, setListener ] = useState({  email: '', nome: '', sobrenome: '', telefone: '', musicas: [], artistas: [], playlists: []})
    const [ musics, setMusics ] = useState([])
    const [ artists, setArtists ] = useState([])
    const [ playlists, setPlaylists ] = useState([])
    const [ confirmDelete, setConfirmDelete ] = useState(false)

    useEffect(()=>{
        async function loadListener() {
            const { email } = router.query
            const response = await api.get(`/ouvintes/${email}`)
            const listener = response.data.data
            setListener(listener)
        }

        async function loadMusics() {
            const response = await api.get(`/musicas`)
            let musics = response.data.data
            musics = musics.map( music => {return { ...music, ...{associated: listener.musicas.includes(music.id)}}})
            setMusics(musics)
        }

        async function loadArtists() {
            const response = await api.get(`/artistas`)
            let artists = response.data.data
            artists = artists.map( artist => {return { ...artist, ...{associated: listener.musicas.includes(artist.email)}}})
            setArtists(artists)
        }
        
        async function loadPlaylists() {
            const response = await api.get(`/playlists`)
            let playlists = response.data.data
            playlists = playlists.map( playlist => {return { ...playlist, ...{associated: listener.playlists.includes(playlist.nome)}}})
            setPlaylists(playlists)
        }

        loadListener()
        loadMusics()
        loadArtists()
        loadPlaylists()
    },[])

    function musicUpdate(value) {
        setListener( listener => { return { ...listener, ...value } } )
    }

    async function handleDelete() {
        if(confirmDelete){
            const response = await api.delete(`/ouvintes/${listener.email}`)
            if(response.data.sucess)
                redirect('/listener')
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
        const response = await api.put(`/ouvintes/${listener.email}`, listener)
            if(response.data.sucess)
                redirect('/listener')
    }

    function toggleMusicAssociation(toggledMusic) {
        if (toggledMusic.associated) {
            setListener( listener => {return { ...listener, ...{ musicas: 
                listener.musicas.filter( 
                    music => music.id !== toggledMusic.id
                )}}
            })
            setMusics( musics => musics.map( music => {
                if(music.id !== toggledMusic.id)
                    return music
                return {...music, ...{ associated: false }}
            }))
        }
        else {
            setListener( listener => { return { ...listener, ...{musicas: [...listener.musicas, toggledMusic] } } } )
            setMusics( musics => musics.map( music => {
                if(music.id !== toggledMusic.id)
                    return music
                return {...music, ...{ associated: true }}
            }))
        }
    }

    function togglePlaylistAssociation(toggledPlaylist) {
        if (toggledPlaylist.associated) {
            setListener( listener => { return {...listener, ...{playlists:  
                listener.playlists.filter( 
                    playlist => playlist.nome !== toggledPlaylist.nome
                )}}     
            })
            setPlaylists( playlists => playlists.map( playlist => {
                if(playlist.nome !== toggledPlaylist.nome)
                    return playlist
                return {...playlist, ...{ associated: false }}
            }))
        }
        else {
            setListener( listener => { return { ...listener, ...{playlists: [...listener.playlists , toggledPlaylist]} } } )
            setPlaylists( playlists => playlists.map( playlist => {
                if(playlist.nome !== toggledPlaylist.nome)
                    return playlist
                return {...playlist, ...{ associated: true }}
            }))
        }
    }

    function toggleArtistsAssociation(toggledArtist) {
        if (toggledArtist.associated) {
            setListener( listener => { return {...listener, ...{artistas:  
                listener.artistas.filter( 
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
            setListener( listener => { return { ...listener, ...{artistas: [...listener.artistas , toggledArtist]} } } )
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
                <NavBar title={"Detalhes do Ouvinte"} active={[true, false, false, false, false]} btnValue="" btnUrl=""/>
            </header>
            <main>
                <Form>
                    <div className="input-field">
                        <label htmlFor="mail">E-mail</label>
                        <input id="mail" type="text" value={listener.email} disabled/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="name">Nome</label>
                        <input id="name" type="text" value={listener.nome} onChange={ event => musicUpdate({nome: event.target.value})}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="lastName">Sobrenome</label>
                        <input id="lastName" type="text" value={listener.sobrenome} onChange={ event => musicUpdate({sobrenome: event.target.value})}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="phone">Telefone</label>
                        <input id="phone" type="text" value={listener.telefone} onChange={ event => musicUpdate({telefone: event.target.value})}/>
                    </div>
                    <div className="table-field">
                        <label htmlFor="mail">Músicas</label>
                        <table>
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
                                    <tr key={uniqueId()}>
                                        <td>{music.id}</td>
                                        <td>{music.nome}</td>
                                        <td>{music.duracao}</td>
                                        <td className="details" onClick={ () => { toggleMusicAssociation(music) }}>{music.associated && "dislike" || "like"}</td>
                                    </tr>
                                )})}
                            </tbody>
                        </table>
                        {!musics.length && <p className="empty">Nenhuma música encontrada</p>}
                    </div>
                    <br></br>
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
                                        <td className="details" onClick={()=>{ toggleArtistsAssociation(artist) }}>{artist.associated && "unfollow" || "follow" }</td>
                                    </tr>
                                )})}
                            </tbody>
                        </table>
                        {!artists.length && <p className="empty">Nenhum artista encontrado</p>}
                        
                    </div>
                    <br></br>
                    <div className="table-field">
                        <label htmlFor="mail">Playlists</label>
                        <table>
                            <thead>
                                <tr>
                                    <td>Nome</td>
                                    <td className="details">Detalhes</td>
                                </tr>
                            </thead>
                            <tbody>
                                {playlists.map( playlist => { return (
                                    <tr>
                                        <td>{playlist.nome}</td>

                                        <td className="details" onClick={()=>{ togglePlaylistAssociation(playlist) }}>{playlist.associated && "dislike" || "like" }</td>
                                    </tr>
                                )})}
                            </tbody>
                        </table>
                        {!artists.length && <p className="empty">Nenhuma playlist encontrado</p>}
                        
                    </div>
                    <br></br>
                    <div className="btn-content">
                        <button onClick={() => { handleUpdate() }}>Salvar</button>
                        <button className="secondary" onClick={() => {handleDelete()} }>{confirmDelete && "Confirmar" || "Excluir"}</button>
                    </div>
                </Form>
            </main>
        </div>
    )
}
