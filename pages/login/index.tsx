import Head from 'next/head'
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

export default function Login() {
    return (
        <div className="container">
            <div className="forms-container">
                <div className="signin-signup">
                    <form action="./index.html" className="sign-in-form">
                        <h2 className="tittle">Sign in</h2>
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

                    <form action="./index.html" className="sign-up-form">
                        <h2 className="tittle">Sign up</h2>
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
                        <input className="btn solid" type="submit" value="Sign up"/>
                        
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
                        <h3>New here ?</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        <button className="btn transparent" id="sign-up-btn" onClick={showSignup}>Sign up</button>
                    </div>
                    <img src="./compose_music.svg" className="image" alt=""/>
                </div>

                <div className="panel right-panel">
                    <div className="content">
                        <h3>One of us ?</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        <button className="btn transparent" id="sign-in-btn" onClick={showSignin}>Sign in</button>
                    </div>
                    <img src="./playlist.svg" className="image" alt=""/>
                </div>
            </div>
        </div>
    )
}