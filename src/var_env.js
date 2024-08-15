export const BASE_URL = 'http://localhost/sistema-dev/';
export const API = {
    sucursal: {
        get_all: `${BASE_URL}api/v1/public/sucursal-getall`,
        get_data: `${BASE_URL}api/v1/sucursal/getdata`, 
    },
    prenda: {
        get_all: `${BASE_URL}api/v1/public/prenda-getall`,
        get_data: `${BASE_URL}api/v1/public/prenda-getdata`
    },
    tipo_prenda: {
        get_all: `${BASE_URL}api/v1/public/tipoprenda-getall`,
    }
}

