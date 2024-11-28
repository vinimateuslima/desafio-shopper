import './Navbar.css'

import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/solicitar" className="navbar-link">
            Solicitação
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/historico" className="navbar-link">
            Histórico de Viagens
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar