import * as request from '~/utils/request'

const getUserById = async (id) => {
    try {
        const res = await request.get(`users/${id}`)
        return res
    } catch (error) {
        return error
    }
}

export default getUserById;