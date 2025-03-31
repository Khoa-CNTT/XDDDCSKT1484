import * as request from '~/utils/request'

const register = async (data) => {
    try {
        const result = await request.post('users', data)
        return result;
    } catch (error) {
        return error;
    }
}

export default register;