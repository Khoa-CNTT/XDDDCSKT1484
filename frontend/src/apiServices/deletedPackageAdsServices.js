import * as request from '~/utils/request'

const deletedPackageAds = async (id, token) => {
    try {
        const res = await request.deleted(`ads-package/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        return res
    } catch (error) {
        return error
    }
}

export default deletedPackageAds