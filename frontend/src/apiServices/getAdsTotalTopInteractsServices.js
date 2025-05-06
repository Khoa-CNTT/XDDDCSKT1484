import * as request from '~/utils/request';
const getAdsTotalTopInteracts = async (start, end, token) => {
    try {
        const config = {
            params: {
                start,
                end,
                limit: 5
            },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        const res = await request.get('total/top-interactions', config)
        return res;
    } catch (error) {
        return error;
    }
}
export default getAdsTotalTopInteracts;