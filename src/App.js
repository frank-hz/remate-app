import './assets/fonts/Inter/inter.css';
import './assets/fonts/Poppins/poppins.css';
import './assets/fonts/Jetbrains Mono/jetbrains_mono.css';
import './assets/css/app.css';
import {    
    LuSunMedium,
    LuSmartphone,
    LuCircleDollarSign,
    LuMoonStar
} from "react-icons/lu";
import { useState,useEffect } from 'react';

// Hooks
import { UseInterface } from './hooks/UseInterface';
import { UsePrenda } from './hooks/UsePrenda';

// Components
import { Header } from './components/Header';
import { Module } from './components/Module';
// import { Main } from './components/Main';
// import { PrendaTable } from './components/PrendaTable';
// import { VentaTable } from './components/VentaTable';
// import { Infobar } from './components/Infobar';


function App(){
    document.title = 'Remate App';
    const {AppTheme,TabActive,handleView,handleTheme} = UseInterface();    
    return (
        <div className={'app '+AppTheme}>
            <Header />            
            <main className='main'>                
                <Module />
            </main>
        </div>
    );
}
export default App;