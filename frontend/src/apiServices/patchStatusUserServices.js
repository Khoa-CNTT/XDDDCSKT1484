import * as request from '~/utils/request'

const patchStatusUser = async (id, data, token) => {
    try {
        const res = await request.patch(`users/${id}`, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return res
    } catch (error) {
        return error;
    }
}

export default patchStatusUser;