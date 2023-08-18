import React from 'react'
import ResponsiveNavLink from '@/Components/ResponsiveNavLink'



const Header = ({auth, children }) => {
  return (
    <div>
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            <ul className="navbar-nav">
            <li className="nav-item">
                <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></a>
            </li>
            <li className="nav-item d-none d-sm-inline-block">
                <a href="/" className="nav-link">Home</a>
            </li>
            <li className="nav-item d-none d-sm-inline-block">
                <a href="/dashboard" className="nav-link">User</a>
            </li>
            </ul>
            {/* Right navbar links */}
            <ul className="navbar-nav ml-auto">
            {/* Navbar Search */}
            <li className="nav-item">
                <a className="nav-link" data-widget="navbar-search" href="#" role="button">
                <i className="fas fa-search" />
                </a>
                <div className="navbar-search-block">
                <form className="form-inline">
                    <div className="input-group input-group-sm">
                    <input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search" />
                    <div className="input-group-append">
                        <button className="btn btn-navbar" type="submit">
                        <i className="fas fa-search" />
                        </button>
                        <button className="btn btn-navbar" type="button" data-widget="navbar-search">
                        <i className="fas fa-times" />
                        </button>
                    </div>
                    </div>
                </form>
                </div>
            </li>
            
            {/* Notifications Dropdown Menu */}
            <li className="nav-item dropdown">
                <a className="nav-link" data-toggle="dropdown" href="#">
                <i className="far fa-user" />
                
                </a>
                <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                <div className="dropdown-divider" />
                <a href="#" className="dropdown-item">
                     <ResponsiveNavLink className="dropdown-item" href={route('profile.edit')}>Profile</ResponsiveNavLink>
                </a>
                <div className="dropdown-divider" />
                <a href="#" className="dropdown-item">
                    <ResponsiveNavLink className="dropdown-item" method="post" href={route('logout')} as="button">
                    Log Out
                    </ResponsiveNavLink>

                </a>
                <div className="dropdown-divider" />
                <p className="dropdown-item dropdown-footer">{auth.user.name}</p>
                </div>
            </li>
            <li className="nav-item">
                <a className="nav-link" data-widget="fullscreen" href="#" role="button">
                <i className="fas fa-expand-arrows-alt" />
                </a>
            </li>
            
            </ul>
        </nav>    
        <main>{children}</main>
</div>


  )
}

export default Header;