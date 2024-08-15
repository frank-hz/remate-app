import { useState, useEffect } from "react";
import '../assets/css/module.css';
import { 
    LuPackage,
    LuChevronsUpDown,
    LuSearch,
    LuCalendar
} from "react-icons/lu";
import { UsePrenda } from '../hooks/UsePrenda';
import { UseApp } from '../hooks/UseApp';


export function Module(){
    // Hooks:
    const { getSedeList } = UseApp();
    const {
        getPrendaList,
        getPrendaData,
        getPrendaTypes,
        UpdatePrenda
    } = UsePrenda();

    // Vars
    const [FilterSetting, SetFilterSetting] = useState({
        limit: '5',
        search: '',
        type_prenda: '',
        date_liquidacion: '',
        state: '',
        sucursal: '' 
    })
    
    // Lista de Sucursales
    const [SedeList, SetSedeList] = useState([]);
    // Lista Tipo de Prenda
    const [TipoList, SetTipoList] = useState([]);
    // Lista de Prendas
    const [PrendaList, SetPrendaList] = useState([]);

    async function HandleSedes(){
        const sede_data = await getSedeList();
        SetSedeList(sede_data);  
        console.log(SedeList) 
    }
    async function HandleTipos(){
        let data = await getPrendaTypes();
        console.log(data)
        SetTipoList(data)
    }
    async function HandlePrendas(){
        SetPrendaList([])
        let data = await getPrendaList(FilterSetting);
        if (data) {
            console.log(data)
            SetPrendaList(data)
        }
    }

    useEffect(()=>{
        HandleTipos()
    }, [])

    useEffect(()=>{
        HandleSedes()
    }, [])

    useEffect(()=>{
        HandlePrendas()
    }, [FilterSetting])

    

    return(
        <div className="module">
            <section className="module-header">
                <div className='module-title'>
                    <LuPackage size={19} />
                    PRENDAS
                </div>
                <section className='module-overview'>
                    <div className="card-info">
                        <div className="card-info-value">
                            <span>45</span>
                        </div>
                        <span className="card-info-subtext">Prendas Totales</span>
                    </div>
                    <div className="card-info">
                        <div className="card-info-value">
                            <span>40</span>
                        </div>
                        <span className="card-info-subtext">Prendas En Remate</span>
                    </div>
                    <div className="card-info">
                        <div className="card-info-value">
                            <span>05</span>
                        </div>
                        <span className="card-info-subtext">Prendas Vendidas</span>
                    </div>
                </section>
            </section>
            <section className="module-table-filters">
                <div className="filter filter-large">
                    <label className="filter-label">Buscar</label>    
                    <div className="input-group input-lg">
                        <input id="_FILTER_SEARCH" type="text" placeholder="Descripcion, Credito, Modelo o Serie" 
                        onInput={evt => {
                            SetFilterSetting({
                                ...FilterSetting,
                                search: evt.target.value
                            })
                        }} />
                        <div className="input-group-icon">
                            <LuSearch size={14} />
                        </div>
                    </div>
                </div>
                <div className="filter">
                    <label className="filter-label">Tipo</label>    
                    <div className="input-group">
                        <select onChange={
                            evt => SetFilterSetting({
                                ...FilterSetting,
                                type_prenda: evt.target.value
                            })}
                        >
                            <option value="">- Seleccionar -</option>
                            {
                                (TipoList)
                                ? (
                                    TipoList.map((tipo, ind) => {
                                        return (
                                        <option key={tipo.id} value={tipo.id}>
                                            {tipo.nombre}
                                        </option>)
                                    })
                                )
                                : ''
                            }
                        </select>
                        <div className="input-group-icon">
                            <LuChevronsUpDown size={14} />
                        </div>
                    </div>
                </div>
                <div className="filter">
                    <label className="filter-label">Liquidacion</label>    
                    <div className="input-group">
                        <input type="date" onChange={
                            evt => {
                                SetFilterSetting({
                                    ...FilterSetting,
                                    date_liquidacion: evt.target.value
                                })
                            }
                        } />
                        <div className="input-group-icon">
                            <LuCalendar size={14} />
                        </div>
                    </div>
                </div>
                <div className="filter">
                    <label className="filter-label">Estado</label>    
                    <div className="input-group">
                        <select onChange={evt => {
                            SetFilterSetting({
                                ...FilterSetting,
                                state: evt.target.value
                            })
                        }}>
                            <option value="">Todo</option>
                            <option value="A">En Remate</option>
                            <option value="O">Ocupado</option>
                            <option value="R">Recuperado</option>
                        </select>
                        <div className="input-group-icon">
                            <LuChevronsUpDown size={14} />
                        </div>
                    </div>
                </div>
                <div className="filter filter-right">
                    <label className="filter-label">Sucursal</label>    
                    <div className="input-group">
                        <select onChange={evt => {
                            console.log(evt.target.value)
                            SetFilterSetting({
                                ...FilterSetting,
                                sucursal: evt.target.value
                            })
                        }}>
                            <option>- Seleccionar -</option>
                            {
                                (SedeList)
                                ? (
                                    SedeList.map((sede, ind) => {
                                        return <option key={sede.id} value={sede.id}>
                                            {sede.nombre}, {sede.ciudad}
                                        </option>
                                    }) 
                                ) : (<option>Sin Datos</option>)
                            }
                        </select>
                        <div className="input-group-icon">
                            <LuChevronsUpDown size={14} />
                        </div>
                    </div>
                </div>
                <div className="filter">
                    <label className="filter-label">Cantidad</label>    
                    <div className="input-group">
                        <select onChange={evt => {
                            SetFilterSetting({
                                ...FilterSetting,
                                limit: evt.target.value
                            })
                        }}>
                            <option value="">- Seleccionar -</option>
                            <option value="ALL">Todo</option>
                            <option value="25">25 Filas</option>
                            <option value="50">50 Filas</option>
                            <option value="100">100 Filas</option>
                            <option value="200">200 Filas</option>
                        </select>
                        <div className="input-group-icon">
                            <LuChevronsUpDown size={14} />
                        </div>
                    </div>
                </div>
            </section>
            <div className="module-table">
                <table>
                    <thead>
                        <tr>
                            <th className="cell-index">Nª</th>
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
                        {/* <tr>
                            <td className="cell-index">02</td>
                            <td>CH01-2810</td>
                            <td>PULSERA ORO 14K</td>
                            <td>JOYA</td>
                            <td></td>
                            <td></td>
                            <td>25-05-2022</td>
                            <td>S/ 600.00</td>
                            <td>S/ 635.00</td>
                            <td>En Remate</td>
                            <td>Vender</td>
                        </tr> */}
                        {
                            (PrendaList.length > 0)
                            ? (
                                PrendaList.map((prenda,ind) => {
                                    return (
                                        <tr key={prenda.id}>
                                            <td className="cell-index">{ind+1}</td>
                                            <td>{prenda.credito_serie}</td>
                                            <td>{prenda.descripcion}</td>
                                            <td>{prenda.categoria_nombre}</td>
                                            <td>{prenda.modelo}</td>
                                            <td>{prenda.serial}</td>
                                            <td>{prenda.credito_liquidacion}</td>
                                            <td>S/ {prenda.costo_total}</td>
                                            <td>S/ {prenda.precio_venta}</td>
                                            <td>{prenda.estado}</td>
                                            <td>Vender</td>
                                        </tr>
                                    )
                                })
                            )
                            : (
                                <tr>
                                    <td colSpan="11" style={{'textAlign':'center'}}>
                                        Sin Datos
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>

    );
}