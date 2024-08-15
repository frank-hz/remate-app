import { useEffect, useState } from "react";

export const PrendaTable = () => {
    const [ListPrendas, setListPrendas] = useState([]);
    async function getPrendas(){
        try {
            let request = await fetch(`${SERVICE_BASE_URL}RemateAPI/get_all`);
            let data = await request.json();
            setListPrendas(data);
        } catch (error) {
            
        }
    }
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
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>01</td>
                            <td>TV LED 24'</td>
                            <td>TELEVISION</td>
                            <td>S/ 500.00</td>
                        </tr>
                        <tr>
                            <td>02</td>
                            <td>TV MIRAY 32</td>
                            <td>TELEVISION</td>
                            <td>S/ 750.00</td>
                        </tr>
                        <tr>
                            <td>03</td>
                            <td>LAVADORA</td>
                            <td>LINEA BLANCA</td>
                            <td>S/ 213.00</td>
                        </tr>
                        <tr>
                            <td>04</td>
                            <td>IPHONE 13 PRO MAX 256GB</td>
                            <td>CELULAR</td>
                            <td>S/ 375.00</td>
                        </tr>
                        <tr>
                            <td>05</td>
                            <td>LAPTOP APPLE MACBOOK PRo'</td>
                            <td>LAPTOP</td>
                            <td>S/ 960.00</td>
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