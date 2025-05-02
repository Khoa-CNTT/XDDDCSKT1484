import * as request from '~/utils/request';

const getTotalCount = async (token) =>{
    try{
        const config = {}
        if(token){
            config.headers = {
                'Authorization': `Bearer ${token}`
            }
        }
        const res = await request.get('total/count', config);
        return res;
    }catch(error){
        return error;
    }
    };

export default getTotalCount;