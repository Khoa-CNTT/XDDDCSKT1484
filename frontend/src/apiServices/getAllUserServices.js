import * as request from '~/utils/request'

const getAllUser = async (username, page, size, token) => {
    try {
        const config = {
            params: {
                username,
                page,
                size,
            }
        }
        if (token) {
            config.headers = {
                'Authorization': `Bearer ${token}`
            }
        }
        const res = await request.get('users', config)

        return res
    } catch (error) {
        return error
    }
}

export default getAllUser;