import { useState } from 'react';
import logo from '../assets/img/logo.svg';
import '../assets/css/header.css';
import {
    LuPackage,
    LuMenu,
    LuShoppingCart,
    LuLayout,
    LuUser
} from 'react-icons/lu';


export const Header = () => {
    const [toggleStatus, setToggleStatus] = useState(false);
    function handleToggleStatus(){
        setToggleStatus(!toggleStatus)
        console.log(toggleStatus)
    }

    return (
        <header className='header'>
            <div className='header-main'>
                <a className='logo' href="#">
                    <div className='logo-brand'>
                        <object data={logo}></object>
                        Remates    
                    </div> 
                </a>
                <div className='dash-toggle' onClick={handleToggleStatus}>
                    <LuMenu size={24} />
                </div>
            </div> 
            <nav className={'nav' + (toggleStatus ? ' active' : '')}>
                <ul className='menu'>
                    <li className='menu-item active'>                        
                        <LuPackage size={21} />
                        Prendas
                    </li>
                    <li className='menu-item'>
                        <LuShoppingCart size={21} />
                        Ventas 
                    </li>
                    <li className='menu-item'>
                        <LuLayout size={21} />
                        Sistema 
                    </li>
                    <li className='menu-item'>
                        <LuUser size={21} />
                        Usuario
                    </li>
                </ul>
            </nav>
        </header>
    );
}