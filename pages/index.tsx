import Head from 'next/head'
import Link from 'next/link'
import '../styles/Home.module.css'

export default function Home() {
  return (
    <div className="home">
      <header>
        <div className="container">
          <h3>Play.mp3</h3>
          <Link href="/login"><button className="btn transparent">Login</button></Link>
        </div>
      </header>
      <div className="main">
        <div className="container">
          <div className="content">
            <h2 className="title">Suas músicas preferidas quando e onde você quiser</h2>
            <p>Dê <strong>Play</strong> e comece a escutar agora totalmente de graça!</p>
            <Link href="/"><button className="btn">Play</button></Link>
          </div>
          <div className="image">
            <img src="../public/bg.png" alt=""/>
          </div>
        </div>
      </div>
    </div>
  )
}
