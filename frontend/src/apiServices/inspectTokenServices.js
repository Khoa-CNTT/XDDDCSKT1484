import * as request from '~/utils/request'

const inspectToken = async (token) => {
    try {
        const res = await request.post('auth/introspect-token', { token });
        return res;
    } catch (error) {
        return error;
    }
}

export default inspectToken;