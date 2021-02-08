import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SideMenu } from '../components/SideMenu.js';
import '../App.css';
import { IconContext } from 'react-icons';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function Header(props) {
    const [sideMenu, setSideMenu] = useState(false);
    const history = useHistory();
    const showSideMenu = () => setSideMenu(!sideMenu);
    const handleLogout = () => {
        localStorage.clear()
        props.setUser(null)
        history.push('/signIn')
    }
    let shows;
            if(props.user) {
                shows = (
                    <input type="button" onClick={handleLogout} value="Logout" />
                )
            }
    return (
        <>
            <IconContext.Provider value={{ color: '#52616b' }}>
                <div className='navbar'>
                    <Link to='#' className='menu-bars'>
                        <FaIcons.FaBars onClick={showSideMenu} />
                    </Link>
                    <span class='navbar-brand h1'>CAL SMEi-TMEi</span>
                    {shows}

                </div>
                <nav className={sideMenu ? 'nav-menu active' : 'nav-menu'}>
                    <ul className='nav-menu-items' onClick={showSideMenu}>
                        <li className='navbar-toggle'>
                            <Link to='#' className='menu-close'>
                                <AiIcons.AiOutlineClose />
                            </Link>
                        </li>
                        {SideMenu.map((item, index) => {
                            return (
                                <li key={index} className={item.cName}>
                                    <Link to={item.path}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </IconContext.Provider>
        </>
    );
}

export default Header;


// import React, { useState } from 'react';
// import * as FaIcons from 'react-icons/fa';
// import * as AiIcons from 'react-icons/ai';
// import { Link } from 'react-router-dom';
// import { SideMenu } from '../components/SideMenu.js';
// import '../App.css';
// import { IconContext } from 'react-icons';
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

// export default class Header extends React.Component {
//     constructor(props){
//         super(props) 
//         this.state = {
//             sideMenu: false,
//             history: useHistory,
//         }
        
//     }
//     handleLogout = () => {
//       localStorage.clear();
//       this.props.setUser(null);
//       this.state.history.push('/login');
//     }

//     showSideMenu = () => this.setState({
//         sideMenu : !this.state.sideMenu
//     })
//     render() {
//         let shows;
//         if(this.props.user) {
//             shows = (
//                 <input type="button" onClick={this.handleLogout} value="Logout" />
//             )
//         }
//         return (
//             <>
//                 <IconContext.Provider value={{ color: '#52616b' }}>
//                     <div className='navbar'>
//                         <Link to='#' className='menu-bars'>
//                             <FaIcons.FaBars onClick={this.showSideMenu} />
//                         </Link>
                        
//                         <span class='navbar-brand h1'>CAL SMEi-TMEi</span>
//                         {shows }


//                     </div>
//                     <nav className={this.state.sideMenu ? 'nav-menu active' : 'nav-menu'}>
//                         <ul className='nav-menu-items' onClick={this.showSideMenu}>
//                             <li className='navbar-toggle'>
//                                 <Link to='#' className='menu-close'>
//                                     <AiIcons.AiOutlineClose />
//                                 </Link>
//                             </li>
//                             {SideMenu.map((item, index) => {
//                                 return (
//                                     <li key={index} className={item.cName}>
//                                         <Link to={item.path}>
//                                             {item.icon}
//                                             <span>{item.title}</span>
//                                         </Link>
//                                     </li>
//                                 );
//                             })}
//                         </ul>
//                     </nav>
//                 </IconContext.Provider>
//             </>
//         );
//     }
// }



// let shows;
//         if(this.props.user) {
//             shows = (
//                 <input type="button" onClick={this.handleLogout} value="Logout" />
//             )
//         }