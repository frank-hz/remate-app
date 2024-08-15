import { useEffect, useState } from 'react';
import {
    LuX,
    LuLayers,
    LuPencilLine,
    LuArrowRightFromLine,
    LuSave,
    LuAlertTriangle,
    LuDelete
} from 'react-icons/lu';
import {MdAttachMoney} from 'react-icons/md';
import { UsePrenda } from '../hooks/UsePrenda';
import { UseInterface } from '../hooks/UseInterface';
import { MoneyFormat,Rx_round } from '../coffee.js';

export const PrendaDetail = ({idPrenda,status,handleStatus,refreshList}) => {
    // Custom Hooks

    // StateTag: almacena los tags referentes al estado de la prenda
    // getPrenda: obtiene los datos de una prenda
    // UpdatePrenda: actualiza los datos de la prenda
    const {StateTag,getPrenda,UpdatePrenda} = UsePrenda();

    // almacena iconos referentes a un tipo
    // ejem. success|danger|warning
    const {IconType} = UseInterface();


    // objeto de formato de moneda
    let PEN = new Intl.NumberFormat('es-PE');
    
    // permiso para editar los datos
    const [EditionStatus,setEditionStatus] = useState(false);

    // activacion/desactivacion del formulario editable
    const [FormDisabled,setFormDisabled] = useState(true);

    // almanena los datos de la prenda
    const initPrendaData = async () => {
        let datap = await getPrenda(idPrenda);
        if (Object.keys(datap).length > 0) {
            datap.precio_inicial = PEN.format(datap.precio_inicial);
            datap.costo_reparacion = PEN.format(datap.costo_reparacion);
            datap.costo_total = PEN.format(datap.costo_total);
            datap.precio_venta = PEN.format(datap.precio_venta);
        }
        setDataPrenda(datap);
        
    }
    const [RequestData,setRequestData] = useState(true);
    const [DataPrenda,setDataPrenda] = useState({});

    
    

    // estado de la alerta
    // para activarla se debera especificar un valor verdadero en 'open'
    // adicionalmente se podra especificar: titulo('title'), mensaje('message')  
    // temporizador('timer')
    const [Alert,setAlert] = useState({});

    // functions    
    const CloseDetail = () => {
        handleStatus(false)
        setDataPrenda({})
    }
    function HandleEditionStatus(state){
        if (state && !DataPrenda.id) {
            setAlert({
                open: true,
                type: 'warning',
                title: 'Cuidado',
                message: 'no hay datos que se puedan actualizar',
                timer: 2500
            });
            return;
        }
        setEditionStatus(state);
        setFormDisabled(!state);
    }



    // procesaa el costo por mantenimiento
    function processRepairAmounts(repair_val){
        let new_reparacion = repair_val || 0.00;
        let new_total = parseFloat(new_reparacion) + parseFloat(DataPrenda.precio_inicial);
        setDataPrenda({
            ...DataPrenda,
            costo_reparacion: PEN.format(new_reparacion),
            costo_total: MoneyFormat(new_total)
        })
    }

    // procesa y guarda los cambios del proceso de edicion
    async function SaveChanges(){
        try {
            if (DataPrenda.id) {
                let update = await UpdatePrenda({
                    'id': DataPrenda.id,
                    'costo_reparacion': DataPrenda.costo_reparacion,
                    'precio_inicial': DataPrenda.precio_inicial,
                    'precio_venta': DataPrenda.precio_venta,
                    'costo_total': DataPrenda.costo_total
                });
                if (update && update.ok) {
                    setAlert({
                        'open': true,
                        'title': 'Proceso completado',
                        'message': update.ok,
                        'type': 'success',
                        'timer': 2000
                    });
                    HandleEditionStatus(false);
                    initPrendaData();
                    refreshList();
                    return;
                }
                
                // initPrendaData();
                setAlert({
                    'open': true,
                    'title': 'Proceso incompleto',
                    'message': 'no se completo la tarea',
                    'type': 'warning',
                    timer: 3000
                });                
            }
        } catch (error) {
            setAlert({
                'open': true,
                'title': 'Error',
                'message': 'ocurrio un error al procesar',
                'type': 'danger',
            });
        }
    } 


    // controla el renderizado de alertas
    useEffect(()=>{
        if (Alert.timer > 0) {
            setTimeout(() => {
                setAlert({'open': false});
            }, Alert.timer);
        }
    }, [Alert]);

    useEffect(() => {
        if (RequestData){
            initPrendaData();
            setRequestData(false);
        }
    },[]);
    return (
        <div className={'modal-wrapper' + (status ? ' show' : '')}>
            {console.log(DataPrenda)}
            <div className="modal">
                <div className="modal-header">
                    <div className="modal-title">
                        <LuLayers size={20} className='mr-1' />
                        Detalle de Prenda
                    </div>
                    <div className="modal-options">
                        <a href='#' 
                            className='modal-option modal-option-red' 
                            onClick={
                                ()=>CloseDetail()
                            }>
                            <LuX size={20} className='icon-no-action' />
                        </a>
                    </div>
                </div>
                <div className="modal-body">
                    <div className={
                        'alert-wrapper' 
                        + (Alert.open ? ' alert-show' : '')
                    }>
                        <div className={
                            "alert"
                            + (Alert.type ? ' alert-'+Alert.type : '')
                        }>
                            <div className='alert-header'>
                                <div className="alert-title">
                                    <div className='alert-icon mr-1'>
                                        {(Alert.type) ? IconType(Alert.type) : ''}
                                    </div> 
                                    {Alert.title} 
                                </div>
                                <div className='alert-close'>&#215;</div>
                            </div>
                            <div className="alert-content">
                                {Alert.message}
                            </div>
                        </div>
                    </div>
                    <div className='d-flex mb-2'>
                        <div className='form-group w-50'>
                            <div className='form-label'>Cliente/Propietario</div>
                            <input 
                                name="credito" className='form-input' 
                                defaultValue={DataPrenda.cliente} 
                                disabled={true} 
                            />
                        </div>
                        <div className='form-group w-50'>
                            <div className='form-label'>Credito</div>
                            <input 
                                name="credito" className='form-input' 
                                defaultValue={DataPrenda.credito_serie} 
                                disabled={true} 
                            />
                        </div>
                    </div>
                    <div className='d-flex mb-2'>
                        <div className='form-group w-50'>
                            <div className='form-label'>Descripcion</div>
                            <input 
                                name="credito" className='form-input' 
                                defaultValue={DataPrenda.descripcion} 
                                disabled={true} 
                            />
                        </div>
                        <div className='form-group w-50'>
                            <div className='form-label'>Estado</div>
                            <div className='p-1'>
                                {StateTag(DataPrenda.estado)}
                            </div>
                        </div>
                    </div>
                    <div className='d-flex mb-2'>
                        <div className='form-group w-50'>
                            <div className='form-label'>Tipo</div>
                            <input 
                                name="credito" className='form-input' 
                                defaultValue={DataPrenda.tipo}
                                disabled={true} 
                            />
                        </div>
                        <div className='form-group w-50'>
                            <div className='form-label'>Categoria</div>
                            <input 
                                name="credito" className='form-input' 
                                defaultValue={DataPrenda.categoria} 
                                disabled={true} 
                            />
                        </div>
                    </div>
                    <div className='d-flex mb-2'>
                        <div className='form-group w-50'>
                            <div className='form-label'>Serial</div>
                            <input 
                                name="credito" className='form-input' 
                                defaultValue={DataPrenda.serial} 
                                disabled={true} 
                            />
                        </div>
                        <div className='form-group w-50'>
                            <div className='form-label'>Modelo</div>
                            <input 
                                name="credito" className='form-input' 
                                defaultValue={DataPrenda.modelo} 
                                disabled={true} 
                            />
                        </div>
                    </div>
                    <div className='d-flex mb-2'>
                        <div className='form-group w-50'>
                            <div className='form-label'>Comentarios</div>
                            <div className='p-1 form-value'>
                                {DataPrenda.comentario}
                            </div>
                        </div>
                        <div className='form-group w-50'>
                            <div className='form-label'>Observaciones</div>
                            <div className='p-1 form-value'>
                                {DataPrenda.observacion}
                            </div>
                        </div>
                    </div>
                    <div className='d-flex mb-2'>
                        <div className='form-group w-50'>
                            <div className='form-label'>Precio Inicial</div>
                            <div className='form-input-icon'>
                                <div className='input-icon'>
                                    S/
                                </div>
                                <input 
                                    name="credito" 
                                    value={DataPrenda.precio_inicial || 0} 
                                    disabled={true} 
                                />
                            </div> 
                            
                        </div>
                        <div className='form-group w-50'>
                            <div className='form-label'>Costo Total</div>
                            <div className='form-input-icon'>
                                <div className='input-icon'>
                                    S/
                                </div>
                                <input 
                                    name="credito" 
                                    value={DataPrenda.costo_total || 0} 
                                    disabled={true} 
                                />
                            </div>                           
                        </div>
                    </div>
                    <div className='d-flex mb-2'>
                        <div className='form-group w-50'>
                            <div className='form-label'>Reparacion/Mantenimiento</div>
                            <div className='form-input-icon'>
                                <div className='input-icon'>
                                    S/
                                </div>
                                <input 
                                    type='number' step='any'
                                    value={DataPrenda.costo_reparacion || 0} 
                                    onChange={      
                                        e => processRepairAmounts(e.target.value)                        
                                    }
                                    disabled={FormDisabled} 
                                />
                            </div>                            
                        </div>
                        <div className='form-group w-50'>
                            <div className='form-label'>Precio Venta</div>
                            <div className='form-input-icon'>
                                <div className='input-icon'>
                                    S/
                                </div>
                                <input type="text"
                                    value={DataPrenda.precio_venta || ''} 
                                    onChange={
                                        (e)=>setDataPrenda({
                                            ...DataPrenda,
                                            precio_venta: e.target.value
                                        })
                                    }
                                    disabled={FormDisabled} 
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <div>
                        
                        <button 
                            className={
                                'button-footer button-footer-green '+
                                (EditionStatus ? '' : 'd-none')
                            } 
                            onClick={SaveChanges} 
                            >
                                <LuSave size={18} className="icon-no-action mr-1" />
                                Guardar
                        </button>  
                        <button 
                            className={
                                'button-footer button-footer-red '+
                                (EditionStatus ? '' : 'd-none')
                            } 
                            onClick={()=>HandleEditionStatus(false)} 
                            >
                                <LuArrowRightFromLine size={18} className="icon-no-action mr-1" />
                                Cancelar
                        </button>

                        <button 
                            className={
                                'button-footer button-footer-black '+
                                (EditionStatus ? 'd-none' : '')
                            } 
                            onClick={()=>HandleEditionStatus(true)} >
                            <LuPencilLine size={18} className='icon-no-action mr-1' />
                            Editar
                        </button>
                        <button 
                            className={
                                'button-footer button-footer-black '
                            } 
                            onClick={CloseDetail} >
                            <LuDelete size={18} className='icon-no-action mr-1' />
                            Salir
                        </button>                  
                        
                    </div>                    
                </div>
            </div>
        </div>
    );
}