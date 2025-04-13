import * as request from '~/utils/request'

const putPackageAds = async (id, data, token) => {
    try {
        const res = await request.put(`ads-package/${id}`, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        return res
    } catch (error) {
        return error
    }
}

export default putPackageAds;