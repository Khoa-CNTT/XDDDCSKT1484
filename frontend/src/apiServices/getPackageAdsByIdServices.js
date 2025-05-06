import * as request from '~/utils/request'

const getPackageAdsByIdServices = async (id, token) => {
    try {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        const res = await request.get(`ads-package/${id}`, config)
        return res
    } catch (error) {
        return error
    }
}

export default getPackageAdsByIdServices;