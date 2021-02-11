import './styles.module.css'

import Router from 'next/router'

export default function Table( { children} ) {

    function redirect(url) {
        Router.push(url)
    } 

    return(
        <div id="table">
            <div className="container">
                <div className="content">
                <div className="table">
                    <table>
                    { children }
                    </table>
                </div>
                </div>
            </div>
        </div>
    )
}