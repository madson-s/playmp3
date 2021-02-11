import Head from 'next/head'
import Router from 'next/router'
import '../../styles/Login.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faFacebookF, faGoogle, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'

function showSignup() {
    const container = document.querySelector(".container")
    container.classList.add("sign-up-mode")
}

function showSignin() {
    const container = document.querySelector(".container")
    container.classList.remove("sign-up-mode")
}

const login = event => {
    event.preventDefault();
    const options = {
        method: 'POST',
        head: {
            'Content-Type': 'application/json'
        }
    }

    Router.push('/music')

}

export default function Login() {
    return (
        <div className="login">
            <Head>
                <title>Login</title>
            </Head>
            <div className="container">
                <div className="forms-container">
                    <div className="signin-signup">
                        <form onSubmit={login} className="sign-in-form">
                            <h2 className="tittle">Fazer login</h2>
                            <div className="input-field">
                                <i className="fas fa-user"><FontAwesomeIcon icon={faUser} /></i>
                                <input type="text" placeholder="Username"/>
                            </div>
                            <div className="input-field">
                                <i className="fas fa-lock"><FontAwesomeIcon icon={faLock} /></i>
                                <input type="password" placeholder="Password"/>
                            </div>
                            <input className="btn solid" type="submit" value="Login"/>
                            
                            {/* <p className="social-text">Or Sign in with social platforms</p>
                            <div className="social-media">
                                <a href="#" className="social-icon">
                                    <i className="fab fa-facebook-f"><FontAwesomeIcon icon={faFacebookF} /></i>
                                </a>
                                <a href="#" className="social-icon">
                                    <i className="fab fa-twitter"><FontAwesomeIcon icon={faTwitter} /></i>
                                </a>
                                <a href="#" className="social-icon">
                                    <i className="fab fa-google"><FontAwesomeIcon icon={faGoogle} /></i>
                                </a>
                                <a href="#" className="social-icon">
                                    <i className="fab fa-linkedin-in"><FontAwesomeIcon icon={faLinkedinIn} /></i>
                                </a>
                            </div> */}
                        </form>

                        <form action="./" className="sign-up-form">
                            <h2 className="tittle">Fazer Cadastro</h2>
                            <div className="input-field">
                                <i className="fas fa-user"><FontAwesomeIcon icon={faUser} /></i>
                                <input type="text" placeholder="Username"/>
                            </div>
                            <div className="input-field">
                                <i className="fas fa-envelope">
                                    <FontAwesomeIcon icon={faEnvelope} />
                                </i>
                                <input type="text" placeholder="Email"/>
                            </div>
                            <div className="input-field">
                                <i className="fas fa-lock"><FontAwesomeIcon icon={faLock} /></i>
                                <input type="password" placeholder="Password"/>
                            </div>
                            <input className="btn solid" type="submit" value="Cadastrar" disabled/>
                            
                            {/* <p className="social-text">Or Sign up with social platforms</p>
                            <div className="social-media">
                                <a href="#" className="social-icon">
                                    <i className="fab fa-facebook-f"><FontAwesomeIcon icon={faFacebookF} /></i>
                                </a>
                                <a href="#" className="social-icon">
                                    <i className="fab fa-twitter"><FontAwesomeIcon icon={faTwitter} /></i>
                                </a>
                                <a href="#" className="social-icon">
                                    <i className="fab fa-google"><FontAwesomeIcon icon={faGoogle} /></i>
                                </a>
                                <a href="#" className="social-icon">
                                    <i className="fab fa-linkedin-in"><FontAwesomeIcon icon={faLinkedinIn} /></i>
                                </a>
                            </div> */}
                        </form>
                    </div>
                </div>

                <div className="panels-container">
                    <div className="panel left-panel">
                        <div className="content">
                            <h3>Novo aqui ?</h3>
                            <p>Faça seu cadastro para aproveitar o melhor da música agora mesmo</p>
                            <button className="btn transparent" id="sign-up-btn" onClick={showSignup}>Cadastrar</button>
                        </div>
                        <img src="./compose_music.svg" className="image" alt=""/>
                    </div>

                    <div className="panel right-panel">
                        <div className="content">
                            <h3>Um de nós ?</h3>
                            <p>Faça o login e não perca tempo para escuatar suas músicas prediletas</p>
                            <button className="btn transparent" id="sign-in-btn" onClick={showSignin}>Entrar</button>
                        </div>
                        <img src="./playlist.svg" className="image" alt=""/>
                    </div>
                </div>
            </div>
        </div>
        
    )
}