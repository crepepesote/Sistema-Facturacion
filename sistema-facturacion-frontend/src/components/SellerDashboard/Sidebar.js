import React, { useState } from 'react';
import './SellerDashboard.css';

const Sidebar = ({ onMenuClick }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`sidebar ${isOpen ? '' : 'close'}`}>
      <div className="menu_content">

        <ul className="menu_items">
         <li><div>
            <h1> </h1>
            </div></li>
          <li className="item" onClick={() => onMenuClick('users')}>
            <div className="nav_link submenu_item">
              <span className="navlink_icon">
                <i className="bx bx-user"></i>
              </span>
              <span className="navlink">Factura</span>
            </div>
          </li>
        </ul>

        <div className="bottom_content">
          <div className="bottom expand_sidebar" onClick={toggleSidebar}>
            <span>Expandir</span>
            <i className='bx bx-log-in'></i>
          </div>
          <div className="bottom collapse_sidebar" onClick={toggleSidebar}>
            <span>Colapsar</span>
            <i className='bx bx-log-out'></i>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
