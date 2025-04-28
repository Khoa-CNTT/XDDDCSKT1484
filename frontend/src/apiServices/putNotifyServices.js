import * as request from '~/utils/request'

const putNotify = async (token) => {
    try {
        const res = await request.put('notices/read', {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return res;
    } catch (error) {
        return error;
    }
}

export default putNotify;