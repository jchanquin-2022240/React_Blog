import logo from '../../assets/img/kinalito.png'
import './navbar.css'

export const Navbar = () => {
    return (
        <div className='container-navbar'>
            <header className="header">
                <div className="menu">
                    <label className="menu-logo">
                        <img src={logo} alt="Logo-Kinalito" />
                    </label>
                </div>
            </header>
        </div>
    )
}