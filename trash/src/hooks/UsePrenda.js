import { useState } from "react";
import { SERVICE_BASE_URL } from "../variables";

export const UsePrenda = () => {
    const [Status,setStatus] = useState(false);
    
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

    const getPrendasList = async() => {
        try {
            let request = await fetch(`${SERVICE_BASE_URL}RemateAPI/prendas_get_all`);
            let response = await request.json();
            if (response.error) {
                console.log(response.error);
                return;
            }
            return response.result;
        } catch (error) {
            console.log(`[error] Prenda List`);
            return;
        }
    }

    const getPrenda = async(id) => {
        try {
            let request = await fetch(`${SERVICE_BASE_URL}RemateAPI/prenda_get_data`, {
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
    
    const UpdatePrenda = async(data) => {
        try {
            if (!data) {
                console.log('[error] datos de prenda no especificados');
                return;
            }
            let update = await fetch(`${SERVICE_BASE_URL}RemateAPI/prenda_update_data`,{
                method: 'POST',
                body: JSON.stringify(data)
            });
            let response = await update.json();
            return response;
        } catch (error) {
            return;
        }
    }
    

    return {
        StateTag,
        getPrenda,
        getPrendasList,
        UpdatePrenda
    };
}