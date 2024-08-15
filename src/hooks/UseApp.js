import { BASE_URL, API } from '../var_env';

export const UseApp = () => {
    // const [SedeList, setSedeList] = useState([]);
    
    async function getSedeList() {
        try {
            let request = await fetch(API.sucursal.get_all, {
                method: 'POST'
            });
            let data = await request.json();
            console.log(data)
            if (!data) {   
                console.log('Error: data request')
                return [];
            }
            return data;
        } catch (error) {
            console.log('Error: process', error.message)
            return []
        }
    }

    return { getSedeList }
}