import * as request from '~/utils/request'

const login = async (data) => {
    try {
        const res = await request.post('auth/login', data);

        return res
    } catch (error) {
        return error
    }
}

export default login