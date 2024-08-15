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
import { PrendaTable } from './components/PrendaTable';
import { VentaTable } from './components/VentaTable';
import { Infobar } from './components/Infobar';



function App(){
    document.title = 'Remate App';
    const {AppTheme,TabActive,handleView,handleTheme} = UseInterface();    
    return (
        <div className={'app '+AppTheme}>
            <Header/>            
            <main className='main'>
                <Infobar/>
                <div className='menu-bar'>
                    <div className='tab-menu'>
                        <div className={'tab-item '+(TabActive == 'PRENDAS'?'active':'')} data-view="PRENDAS" onClick={handleView}>
                            <LuSmartphone className='icon-no-action mr-1 mb-1' size={18} />
                            Prendas
                        </div>
                        <div className={'tab-item '+(TabActive == 'VENTAS'?'active':'') + ' tab-item-ventas'} data-view="VENTAS" onClick={handleView}>
                            <LuCircleDollarSign className='icon-no-action mr-1 mb-1' size={18} />
                            Ventas
                        </div>
                    </div>
                    <div className='options-menu'>
                        <a className={'option-button AppTheme-'+AppTheme} onClick={handleTheme} href='#'>
                            {
                                AppTheme == 'dark'
                                ? (<LuSunMedium className='font-500 icon-no-action' size={24} />)
                                : (<LuMoonStar className='font-500 icon-no-action' size={24} />)
                            }
                        </a>
                    </div>
                </div>
                <div className='content'>
                {
                    (()=>{
                        switch (TabActive) {
                            case 'PRENDAS':
                                return <PrendaTable />
                                break;
                        
                            case 'VENTAS':
                                return <VentaTable />
                                break;
                        }
                    })()
                }                
                </div>
            </main>
        </div>
    );
}
export default App;