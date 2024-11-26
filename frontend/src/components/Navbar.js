import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <li>
                    <Link to="/">Anasayfa</Link>
                </li>
                <li>
                    <Link to="/gubre">Gübre</Link>
                </li>
                <li>
                    <Link to="/bitki">Bitkiler</Link>
                </li>
                <li>
                 <Link to="/bahce">Bahçe</Link>
                </li>
                <li>
          <Link to="/sulama-plani">Sulama Planı</Link>
        </li>
        <li>
  <Link to="/bakim">Bakım</Link>
</li>
<li>
  <Link to="/bahcivan">Bahçıvan</Link>
</li>
<li>
  <a href="/gubreleme">Gübreleme Planı</a>
</li>
<li>
  <a href="/hastalik-takibi">Hastalık Takibi</a>
</li>
<li>
  <a href="/iklim-takibi">İklim Takibi</a>
</li>
<li>
  <a href="/tur-katalogu">Tür Kataloğu</a>
</li>
<li>
  <a href="/hastalik-katalogu">Hastalık Kataloğu</a>
</li>
<li>
  <a href="/bahcivan-bahce">BahcivanBahce</a>
</li>
<li><Link to="/raporlar">Raporlar</Link></li>
       



                
            </ul>
        </nav>
    );
};

export default Navbar;
