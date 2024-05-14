import logo from '../assets/img/kinalito.png'
import back from '../assets/img/flecha-izquierda.png'

export const logo = () => {
    return (
        <div className='logo'>
            <img src={logo} alt="Logo-kinalito" />
            <img src={back} alt="Back" />
        </div>
    )
}