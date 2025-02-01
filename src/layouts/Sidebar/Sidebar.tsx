import { Outlet, useLocation } from "react-router";
import "./Sidebar.css"
import {
  RiCloudFill,
  RiHome7Fill,
  RiMenuLine,
  RiTeamFill,
} from "@remixicon/react";
import { useState } from "react";
import "../../index.css"

const logoPath = "/src/assets/images/logo.png"
const sidebarLinks = [
  {
    title: 'MASTER',
    links: [
      {
        icon: <RiHome7Fill />,
        title: 'Dashboard',
        href: '/'
      },
      {
        icon: <RiTeamFill />,
        title: 'Anggota',
        href: '/anggota'
      }
    ]
  },
]

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { pathname } = useLocation()

  return (
    <body>
      <header className={`header ${isOpen ? "left-pd": ""}`} id="header">
        <div className="header__container">
          <a href="#" className="header__logo">
            <RiCloudFill />
            <span>Cloud</span>
          </a>

          <button 
            className="header__toggle"
            id="header-toggle"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <RiMenuLine />
          </button>
        </div>
      </header>

      <nav className={`sidebar ${isOpen ? "show-sidebar" : ""}`} id="sidebar">
        <div className="sidebar__container">
          <div className="sidebar__user">
            <div className="sidebar__img">
              <img src={logoPath} alt="image" />
            </div>

            <div className="sidebar__info">
              <h3>My Koperasi</h3>
              <span>aplikasi koperasi</span>
            </div>
          </div>

          <div className="sidebar__content">
            {sidebarLinks.map((link) => (
              <div>
                <h3 className="sidebar__title">
                  {link.title}
                </h3>

                <div className="sidebar__list">
                  {link.links.map((item) => (
                    <a href={item.href} className={`sidebar__link ${pathname === item.href ? 'active-link' : ''}`}>
                      {item.icon}
                      <span>{item.title}</span>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </nav>

      <main className={`main container ${isOpen ? "left-pd": ""}`} id="main">
        <Outlet />
      </main>
    </body>
  )
}

export default Sidebar