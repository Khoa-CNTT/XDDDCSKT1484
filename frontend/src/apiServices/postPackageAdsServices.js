import * as request from '~/utils/request'

const postPackageAds = async (data, token) => {
    try {
        const res = await request.post('ads-package', data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        return res
    } catch (error) {
        return error
    }
}

export default postPackageAds;