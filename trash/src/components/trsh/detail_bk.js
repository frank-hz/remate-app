import { useEffect, useState } from 'react';
import {
    LuX,
    LuLayers,
    LuPencilLine,
    LuCornerLeftDown,
    LuSave,
    LuAlertTriangle
} from 'react-icons/lu';
import { UsePrenda } from '../hooks/UsePrenda';
import { UseInterface } from '../hooks/UseInterface';


export const PrendaDetail = ({status, handleStatus, DataPrenda, handlePrenda, getPrendaData}) => {
    
    // permiso para editar los datos
    const [EditionStatus,setEditionStatus] = useState(false);

    // activacion/desactivacion del formulario editable
    const [FormDisabled,setFormDisabled] = useState(true);

    // almacena los datos de la prenda, inicializada con el prop recibido
    const [PrendaUpdate, setPrendaUpdate] = useState(DataPrenda);
    const PrendaBK = DataPrenda;

    // Hooks Custom referentes al modulo de Prendas
    // StateTag: almacena los tags referentes al estado de la prenda
    // UpdatePrenda: actualiza los datos de la prenda
    const {StateTag,UpdatePrenda} = UsePrenda();

    // almacena iconos referentes a un tipo
    // ejem. success|danger|warning
    const {IconType} = UseInterface();

    // estado de la alerta
    // para activarla se debera especificar un valor verdadero en 'open'
    // adicionalmente se podra especificar el titulo('title') y el mensaje('message')
    const [Alert,setAlert] = useState({});


    // cierra la vista/modal
    const closeDetail = () => handleStatus(false);

    // activa/desactiva los campos editables y el estado de edicion
    function HandleEditionStatus(state){
        setEditionStatus(state);
        setFormDisabled(!state);
    }

    // valida los datos y procesa el envio
    async function saveChanges(){
        try {
            if (DataPrenda.id) {
                let update = await UpdatePrenda({
                    'id': DataPrenda.id,
                    'costo_reparacion': DataPrenda.costo_reparacion,
                    'precio_inicial': DataPrenda.precio_inicial,
                    'precio_venta': DataPrenda.precio_venta,
                    'costo_total': DataPrenda.costo_total
                });
                console.log(update)
                if (update && update.ok) {
                    setAlert({
                        'open': true,
                        'title': 'Proceso completado',
                        'message': update.ok,
                        'type': 'success',
                        'timer': 2000
                    });
                    return;
                }
                getPrendaData(DataPrenda.id);
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
    
    // guarda costo por mantenimiento
    // recalcula costo total
    function processRepairAmounts(repair_val){
        let new_costo_reparacion = parseFloat(repair_val);
        let new_costo_total = parseFloat(repair_val) + parseFloat(DataPrenda.precio_inicial);
        handlePrenda({
            ...DataPrenda,
            costo_reparacion: new_costo_reparacion,
            costo_total: new_costo_total
        })
        console.log(DataPrenda)
    }


    useEffect(()=>{
        if (Alert.timer > 0) {
            setTimeout(() => {
                setAlert({'open': false});
            }, Alert.timer);
        }
    }, [Alert])
    return (
        <div className={'modal-wrapper' + (status ? ' show' : '')}>
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
                                ()=>closeDetail()
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
                            <input 
                                name="credito" className='form-input' 
                                defaultValue={DataPrenda.precio_inicial} 
                                disabled={true} 
                            />
                        </div>
                        <div className='form-group w-50'>
                            <div className='form-label'>Costo Total</div>
                            <input 
                                name="credito" className='form-input' 
                                value={DataPrenda.costo_total} 
                                disabled={true} 
                            />
                        </div>
                    </div>
                    <div className='d-flex mb-2'>
                        <div className='form-group w-50'>
                            <div className='form-label'>Reparacion/Mantenimiento</div>
                            <input 
                                type='number'
                                name="credito" className='form-input' 
                                defaultValue={DataPrenda.costo_reparacion} 
                                onChange={
                                    // e => {
                                    //     Prenda.costo_reparacion = parseFloat(e.target.value);
                                    //     Prenda.costo_total = parseFloat(e.target.value + Prenda.precio_inicial);
                                    // }         
                                    e => processRepairAmounts(e.target.value)                           
                                }
                                disabled={FormDisabled} 
                            />
                        </div>
                        <div className='form-group w-50'>
                            <div className='form-label'>Precio Venta</div>
                            <input 
                                name="credito" className='form-input' 
                                defaultValue={DataPrenda.precio_venta} 
                                onChange={
                                    (e)=>{
                                        DataPrenda.precio_venta = e.target.value
                                    }
                                }
                                disabled={FormDisabled} 
                            />
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button 
                        className={
                            'button-footer button-footer-red '+
                            (EditionStatus ? '' : 'd-none')
                        } 
                        onClick={()=>HandleEditionStatus(false)}>
                            <LuCornerLeftDown size={18} className="icon-no-action mr-1" />
                            Cancelar
                    </button>
                    <button 
                        className={
                            'button-footer button-footer-green '+
                            (EditionStatus ? '' : 'd-none')
                        } 
                        onClick={saveChanges} 
                        >
                            <LuSave size={18} className="icon-no-action mr-1" />
                            Guardar
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
                </div>
            </div>
        </div>
    );

} 