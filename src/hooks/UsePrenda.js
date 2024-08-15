import { useState } from "react";
import { API, BASE_URL } from "../var_env";

export const UsePrenda = () => {
    const [Status,setStatus] = useState(false);
     

    const getPrendaList = async(settings) => {
        try {
            let request = await fetch(`${API.prenda.get_all}`, {
                method: 'POST',
                body: JSON.stringify(settings)
            });
            let resp = await request.json();
            if (resp.error || !resp.result) {
                console.log('Error al obtener datos');
                return;
            }
            // console.log(resp.sql)
            return resp.result;
        } catch (error) {
            console.log(`[PrendaList] ${error.message}`);
            return;
        }
    }

    const getPrendaData = async(id) => {
        try {
            let request = await fetch(`${BASE_URL}RemateAPI/prenda_get_data`, {
                method: 'POST',
                body: JSON.stringify({id: id})
            });
            let response = await request.json();
            return response.result;
        } catch (error) {
            console.log(`[error] Prenda Data`);
            return;
        }
    }
    
    const getPrendaTypes = async() => {
        try {
            let request = await fetch(`${API.tipo_prenda.get_all}`);
            let response = await request.json();
            if (response && response.error) {
                console.log(response.error);
                return;
            }
            return response.result;
        } catch (error) {
            console.log(`[error] TipoPrenda List`);
            return;
        }
    }
    
    const UpdatePrenda = async(data) => {
        try {
            if (!data) {
                console.log('[error] datos de prenda no especificados');
                return;
            }
            let update = await fetch(`${BASE_URL}RemateAPI/prenda_update_data`,{
                method: 'POST',
                body: JSON.stringify(data)
            });
            let response = await update.json();
            return response;
        } catch (error) {
            return;
        }
    }
    
    const StateTag = (state) => {
        switch (state) {
            case 'V':
                return (<span className="tag tag-prenda-V">Vendido</span>);
                break;
        
            case 'A':
                return (<span className="tag tag-prenda-A">Remate</span>);
                break;

            default:
                return (<span>NO_DATA</span>);
                break;
        }
    }

    return {
        StateTag,
        getPrendaTypes,
        getPrendaList,
        getPrendaData,
        UpdatePrenda
    };
}