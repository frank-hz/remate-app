import {LuInfo} from 'react-icons/lu';
import '../assets/css/inforbar.css'

export const Infobar = () => {
    return (
        <section className='info-list'>
            <div className='info-card'>
                <div className='info-card-icon'>
                    <LuInfo size={24} />
                </div>
                <div className='info-card-value'>45</div>
                <div className='info-card-label'>Prendas Actuales</div>
            </div>
            <div className='info-card'>
                <div className='info-card-icon'>
                    <LuInfo size={24} />
                </div>
                <div className='info-card-value'>03</div>
                <div className='info-card-label'>Ventas Realizadas</div>
            </div>
            <div className='info-card'>
                <div className='info-card-icon'>
                    <LuInfo size={24} />
                </div>
                <div className='info-card-value'>S/ 10.500</div>
                <div className='info-card-label'>Total por Ventas</div>
            </div>
            <div className='info-card'>
                <div className='info-card-icon'>
                    <LuInfo size={24} />
                </div>
                <div className='info-card-value'>S/ 137.60</div>
                <div className='info-card-label'>Estimado Total</div>
            </div>
            
        </section>
    );
}