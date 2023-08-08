const URL = 'http://localhost:3000';


export const getProducts = async () => {
    try {

        let { data } = await axios(`${URL}/productos`);
        console.log(data)
        return data;
        
    } catch (error) {
        console.log(error);
        return [];
    }
}