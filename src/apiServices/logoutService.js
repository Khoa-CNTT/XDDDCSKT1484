import * as request from '~/utils/request';

const logout = async (token) => {
    try {
        const res = request.post('auth/logout', {
            token
        })
        return res;
    } catch (error) {
        return error;
    }
}

export default logout;