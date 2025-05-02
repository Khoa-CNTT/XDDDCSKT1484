import * as request from '~/utils/request';

const getAdsTotalCountUserService = async (token) => {
    try{
        const config = {}
        if(token){
            config.headers = {
                'Authorization': `Bearer ${token}`
            }
        }
        const res = await request.get('ads-total/count/user', config)
        return res;
    } catch (error) {
        return error
    }
};
export default getAdsTotalCountUserService;