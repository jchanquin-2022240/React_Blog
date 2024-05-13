import logo from '../../assets/img/kinalito.png'
import './navbar.css'

export const Navbar = () => {
    return (
        <div className='container-navbar'>
            <header>
                <nav className='navbar'>
                    <div className='logo'>
                        <img src={logo} alt="Logo-Kinalito" />
                    </div>
                </nav>
            </header>
        </div>
    )
}