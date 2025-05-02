import * as request from '~/utils/request';
const getAdsTotalTopSpendersServices = async (token) => {
    try{
        const config = {}
        if(token){
            config.headers ={
                'Authorization': `Bearer ${token}`
            }
            const res = await request.get('ads-total/top-spenders', config)
            return res;
        }
    }catch(error){
        return error;
    }
}
export default getAdsTotalTopSpendersServices