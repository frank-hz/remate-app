import { useEffect, useState } from "react";
// import { Grid,_ } from "gridjs-react";
// import 'gridjs/dist/theme/mermaid.min.css';
import {
    LuChevronsUpDown,
    LuLayers
} from 'react-icons/lu';
import { UsePrenda } from "../hooks/UsePrenda";
import { PrendaDetail } from './PrendaDetail';


export const PrendaTable = () => {
    // almacena la lista de  prendas
    const [ListPrendas, setListPrendas] = useState([]);     
    // almacena datos de la prenda seleccionada
    const [PrendaSelected, setPrendaSelected] = useState({});
    // estado del detalle - modal
    const [StatusDetail,setStatusDetail] = useState(false);
    // cargar custom hooks
    const {getPrendasList,getPrenda,StateTag} = UsePrenda();

    const [RequestData, setRequestData] = useState(true);
    
    const [LoadingState, setLoadingState] = useState(true);

    // asignar un nuevo valor a la visata del detalle
    const handleStatus = (new_value) => {
        setStatusDetail(new_value);
    }


    // settings table
    const TableStyle = {
        table: 'dataset-table table-w-index' + (LoadingState ? ' dataset-loading' : '') 
    }
    const [TableColumns, setTableColumns] = useState([
        'Nª','Credito','Descripcion','Tipo','Modelo',
        'Serie','Liquidacion','Costo Total','Precio Venta','Estado','Accion'
    ]);
    const TableLanguage = {
        'search': {
            'placeholder': 'Buscar...'
        },
        'pagination': {
            'previous': 'Ant.',
            'next': 'Sig.',
            'showing': 'mostrando',
            'results': () => 'registros',
            'of': 'de',
            'to': 'a',
        },
        'loading': 'Cargando...',
        'noRecordsFound': 'No se encontraron datos'
          
    }

    // Utilities    
    async function OpenPrendaDetail(id){
        console.log('enviando: '+id)
        if (!id) return;
        setPrendaSelected({id: id});
        setStatusDetail(true); 
    }
    async function handlePrenda(new_data){
        setPrendaSelected(new_data);
    }

    async function LoadPrendaList(){
        setLoadingState(true);
        let data = await getPrendasList();
        if (data){
            // setListPrendas(
            //     data.map((prenda,ind)=>
            //         [
            //             ind+1,
            //             prenda.credito_serie,
            //             prenda.descripcion,
            //             prenda.tipo,
            //             prenda.modelo,
            //             prenda.serie,
            //             prenda.liquidacion,
            //             'S/ '+prenda.costo_total,
            //             'S/ '+prenda.precio_venta,
            //             _(StateTag(prenda.estado)),
            //             _(<button className="table-button table-button-blue" title="detalle" onClick={()=>OpenPrendaDetail(prenda.id)} data-id={prenda.id}>
            //                 <LuLayers size={16} className="iconbtn" />
            //             </button>)
            //         ]
            //     )
            // );
            setListPrendas(data);
            setRequestData(false);
        }
        setLoadingState(false);
    }
    useEffect(()=>{
        if (RequestData) {
            LoadPrendaList();
        }
    }, []);
    return (
        <div className="dataset">
            { 
                (StatusDetail && PrendaSelected) 
                ? (
                    <PrendaDetail 
                        idPrenda={PrendaSelected.id}
                        status={StatusDetail}  
                        handleStatus={handleStatus} 
                        refreshList={LoadPrendaList}
                    />
                )
                : ''
            }          
            <div className="dataset-filters">
                {/* <div className="dataset-filter-title">Filtros:</div> */}
                <div className="dataset-filter-form">
                    <div className="filter-item">
                        <div className="filter-label">Tipo</div>
                        <div className="filter-input">                            
                            <select>
                                <option value="ELECTRO">Electro</option>
                                <option value="JOYA">Joya</option>
                                <option value="VEHICULO">Vehiculo</option>
                                <option value="PREDIO">Predio</option>
                            </select>
                            <div className="filter-input-icon">
                                <LuChevronsUpDown size={14} />
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
            <div className="card-table">
                <table>
                    <thead>
                        <tr>
                            <th>Nª</th>
                            <th>Credito</th>
                            <th>Descripcion</th>
                            <th>Tipo</th>
                            <th>Modelo</th>
                            <th>Serie</th>
                            <th>Liquidacion</th>
                            <th>Costo Total</th>
                            <th>Precio Venta</th>
                            <th>Estado</th>
                            <th>Accion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (ListPrendas) 
                            ? (
                                ListPrendas.map((prenda,ind)=>{
                                    return <tr key={prenda.id + '_'+ind}>
                                        <td>{ind+1}</td>
                                        <td>{prenda.credito_serie}</td>
                                        <td>{prenda.descripcion}</td>
                                        <td>{prenda.tipo}</td>
                                        <td>{prenda.modelo}</td>
                                        <td>{prenda.serie}</td>
                                        <td>{prenda.liquidacion}</td>
                                        <td>{prenda.costo_total}</td>
                                        <td>{prenda.precio_venta}</td>
                                        <td>{prenda.estado}</td>
                                        <td></td>
                                    </tr>
                                    }
                                )
                            )
                            : (<tr>
                                <td colSpan={11}>No se encontraron datos</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// export default PrendaTable;