import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { uniqueId } from 'lodash'

import api from '../../../services/api'
import { redirect } from '../../../services/redirect'

import NavBar from '../../../components/NavBar'
import Form from '../../../components/Form'

export default function NewPlaylist() {
   
    const router = useRouter()

    const [ playlist, setPlaylist ] = useState({ nome: '', musicas: []})
    const [ musics, setMusics ] = useState([])
    const [ confirmDelete, setConfirmDelete ] = useState(false)

    useEffect (() => {
        async function loadPlaylist() {
            const { name } = router.query
            const response = await api.get(`/playlists/${name}`)
            setPlaylist(response.data.data)
        }
        async function loadMusics() {
            const response = await api.get(`/musicas`)
            let musics = response.data.data
            musics = musics.map( music => {return { ...music, ...{associated: playlist.musicas.includes(music.id)}}})
            setMusics(musics)
        }
        loadPlaylist()
        loadMusics()
    }, [])

    async function handleUpdate() {
        const response = await api.put(`/playlists/${playlist.nome}`, playlist)
        redirect('/playlist')
    }

    async function handleDelete() {
        if(confirmDelete){
            const response = await api.delete(`/playlists/${playlist.nome}`)
            if(response.data.sucess)
                redirect('/playlist')
        }
        else
        {
            setConfirmDelete(true)
            setTimeout(() => {
                setConfirmDelete(false)
            }, 3000)
        }
        
    }

    function toggleMusicAssociation(toggledMusic) {
        if (toggledMusic.associated) {
            setPlaylist( playlist => {return { ...playlist, ...{ musicas: 
                playlist.musicas.filter( 
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
            setPlaylist( playlist => { return { ...playlist, ...{musicas: [...playlist.musicas, toggledMusic] } } } )
            musics.map( music => {
                if(music.id !== toggledMusic.id)
                    return music
                return {...music, ...{ associated: true }}
            })
            setMusics( musics => musics.map( music => {
                if(music.id !== toggledMusic.id)
                    return music
                return {...music, ...{ associated: true }}
            }))
        }
    }

    return (
        <div className="playlist">
            <Head>
                <title>Playlist</title>
            </Head>
            <header>
                <NavBar title={"Detalhes da Playlist"} active={[false, false, false, true, false]} btnUrl="" btnValue=""/>
            </header>
            <main>
                <Form>
                    <div className="input-field">
                        <label htmlFor="mail">Nome</label>
                        <input id="mail" type="text" value={playlist.nome} disabled/>
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
                                        <td className="details" onClick={ () => { toggleMusicAssociation(music) }}>{music.associated && "Remover" || "Adicionar"}</td>
                                    </tr>
                                )})}
                            </tbody>
                        </table>
                    </div>
                    <br></br>
                    <div className="btn-content">
                        <button onClick={()=>{handleUpdate()}}>Salvar</button>
                        <button className="secondary" onClick={() => {handleDelete()} }>{confirmDelete && "Confirmar" || "Excluir"}</button>
                    </div>
                </Form>
                <br></br>
            </main>
        </div>
    )
}
