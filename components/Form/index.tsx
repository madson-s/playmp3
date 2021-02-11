import './styles.module.css'

export default function Form({ children }) {
    return (
        <div id="form">
            <div className="container">
                <div className="content">
                    {children}
                </div>
            </div>
        </div>
    )
}