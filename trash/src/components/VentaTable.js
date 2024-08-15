import { useEffect, useState } from "react";
import { SERVICE_BASE_URL } from "../variables";
import { Grid,_ } from "gridjs-react";
import 'gridjs/dist/theme/mermaid.min.css';
import {
    LuChevronsUpDown,
    LuLayers
} from 'react-icons/lu';

export const VentaTable = ({toggle_modal}) => {
    // settings table
    const class_name = {
        table: 'dataset-table table-w-index'
    }
    const [TableColumns, setTableColumns] = useState([
        'Nª','Credito','Descripcion','Tipo','Modelo',
        'Serie','Liquidacion','Costo Total','Precio Venta','Estado','Accion'
    ]);
    const language_config = {
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
        'noRecordsFound': 'No se encontraron datos',
        'autoWidth': true
          
    }

    // Utilities
    
    async function load_prenda_modal(_id){
        if (!_id) return;
        let request = await fetch(`${SERVICE_BASE_URL}RemateAPI/prenda_get_data`, {
            method: 'POST',
            body: JSON.stringify({id: _id})
        });
        let response = await request.json();
        if (response.result) {
            console.log(response.success)
            console.log(response.result)
            toggle_modal(true);
        }

    }
    const StateTag = {
        'V': (<span className="tag tag-prenda-V">Vendido</span>),
        'A': (<span className="tag tag-prenda-A">Remate</span>),
    }

    const [CallPrendas, setCallPrendas] = useState(true);
    const [ListPrendas, setListPrendas] = useState([]);
    async function getPrendas(){
        try {
            let request = await fetch(`${SERVICE_BASE_URL}RemateAPI/prendas_get_all`);
            let data = await request.json();
            if (data){
                setListPrendas(
                    data.map((prenda,ind)=>
                        [
                            ind+1,
                            prenda.credito_serie,
                            prenda.descripcion,
                            prenda.tipo,
                            prenda.modelo,
                            prenda.serie,
                            prenda.liquidacion,
                            'S/ '+prenda.costo_total,
                            'S/ '+prenda.precio_venta,
                            _(StateTag[prenda.estado]),
                            _(<button className="table-button table-button-blue" title="detalle" onClick={()=>load_prenda_modal(prenda.id)} >
                                <LuLayers size={16} className="iconbtn" />
                            </button>)
                        ]
                    )
                );
            }
            
        } catch (error) {
            
        }
    }
    useEffect(()=>{
        getPrendas();
    }, []);
    return (
        <div className="datatable">
            <div className="datatable-filters"></div>
            <div className="datatable-content">
                <table>
                    <thead>
                        <tr>
                            <th>N#</th>
                            <th>Descripcion</th>
                            <th>Tipo</th>
                            <th>Precio Venta</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>01</td>
                            <td>TV LED 24'</td>
                            <td>TELEVISION</td>
                            <td>S/ 500.00</td>
                            <td>
                                <button className="table-button table-button-blue" title="detalle" onClick={()=>load_prenda_modal(5)} >
                                    <LuLayers size={16} className="iconbtn" />
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>02</td>
                            <td>TV MIRAY 32</td>
                            <td>TELEVISION</td>
                            <td>S/ 750.00</td>
                            <td>
                                <button className="table-button table-button-blue" title="detalle" onClick={()=>load_prenda_modal(6)} >
                                    <LuLayers size={16} className="iconbtn" />
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>03</td>
                            <td>LAVADORA</td>
                            <td>LINEA BLANCA</td>
                            <td>S/ 213.00</td>
                            <td>
                                <button className="table-button table-button-blue" title="detalle" onClick={()=>load_prenda_modal(7)} >
                                    <LuLayers size={16} className="iconbtn" />
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>04</td>
                            <td>IPHONE 13 PRO MAX 256GB</td>
                            <td>CELULAR</td>
                            <td>S/ 375.00</td>
                            <td>
                                <button className="table-button table-button-blue" title="detalle" onClick={()=>load_prenda_modal(87)} >
                                    <LuLayers size={16} className="iconbtn" />
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>05</td>
                            <td>LAPTOP APPLE MACBOOK PRo'</td>
                            <td>LAPTOP</td>
                            <td>S/ 960.00</td>
                            <td>
                                <button className="table-button table-button-blue" title="detalle" onClick={()=>load_prenda_modal(67)} >
                                    <LuLayers size={16} className="iconbtn" />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="datatable-footer">
                Footer
            </div>
        </div>
    );
}

// export default PrendaTable;