import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { uniqueId } from 'lodash'

import api from '../../../services/api'
import { redirect } from '../../../services/redirect'

import NavBar from '../../../components/NavBar'
import Form from '../../../components/Form'

export default function NewArtist() {

    const router = useRouter()

    const [ artist, setArtist ] = useState({  email: '', nomeArtistico: '', biografia: '', anoFormacao: '', musicas: []})
    const [ musics, setMusics ] = useState([])
    const [ confirmDelete, setConfirmDelete ] = useState(false)

    useEffect (() => {
        async function loadArtist() {
            const { email } = router.query
            const response = await api.get(`/artistas/${email}`)
            const artist = response.data.data
            setArtist(artist)
        }

        async function loadMusics() {
            const response = await api.get(`/musicas`)
            let musics = response.data.data
            musics = musics.map( music => {return { ...music, ...{associated: artist.musicas.includes(music.id)}}})
            setMusics(musics)
        }

        loadMusics()
        loadArtist()
    }, [])

    function artistUpdate(value) {
        setArtist( artist => { return { ...artist, ...value } } )
    }

    async function handleUpdate() {
        const response = await api.put(`/artistas/${artist.email}`, artist)
            if(response.data.sucess)
                redirect('/artist')
    }

    async function handleDelete() {
        if(confirmDelete){
            const response = await api.delete(`/artistas/${artist.email}`)
            if(response.data.sucess)
                redirect('/artist')
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
            setArtist( artist => {return { ...artist, ...{ musicas: 
                artist.musicas.filter( 
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
            setArtist( artist => { return { ...artist, ...{musicas: [...artist.musicas, toggledMusic] } } } )
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
        
        <div className="music">
            <Head>
                <title>Musics</title>
            </Head>
            <header>
                <NavBar title={"Detalhes do Artista"} active={[false, false, true, false, false]} btnValue="" btnUrl=""/>
            </header>
            <main>
                <Form>
                    <div className="input-field">
                        <label htmlFor="mail">E-mail</label>
                        <input id="mail" type="text" value={artist.email} disabled/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="name">NomeArtistico</label>
                        <input id="name" type="text" value={artist.nomeArtistico} onChange={ event => artistUpdate({nomeArtistico: event.target.value})}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="lastName">Biografia</label>
                        <input id="lastName" type="text" value={artist.biografia} onChange={ event => artistUpdate({biografia: event.target.value})}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="phone">AnoFormacao</label>
                        <input id="phone" type="text" value={artist.anoFormacao} onChange={ event => artistUpdate({anoFormacao: event.target.value})}/>
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
                        {!musics.length && <p className="empty">Nenhuma música encontrada</p>}
                    </div>
                    <br></br>
                    <div className="btn-content">
                        <button onClick={() => { handleUpdate() }}>Salvar</button>
                        <button className="secondary" onClick={() => {handleDelete()} }>{confirmDelete && "Confirmar" || "excluir"}</button>
                    </div>
                </Form>
            </main>
        </div>
    )
}
