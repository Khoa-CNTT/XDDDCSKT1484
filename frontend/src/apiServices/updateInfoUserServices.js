import * as request from '~/utils/request';

const updateInfoUser = async (data, token) => {
    try {
        const res = await request.patch('users', data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return res;
    } catch (error) {
        return error;
    }
}

export default updateInfoUser