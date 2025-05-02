import * as request from '~/utils/request'

 const getTotalRevenue = async (token) => {
    try{
        const config = {}
        if(token){
            config.headers = {
                'Authorization': `Bearer ${token}`
            }
        }
        const res = await request.get('total/revenue', config);
        return res;
    }catch(error){
        return error;
    }
};

export default getTotalRevenue;