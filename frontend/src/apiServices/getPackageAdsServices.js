import * as request from '~/utils/request'

const getPackageAds = async (page, size, token) => {
    try {

        const config = {
            params: {
                page,
                size,
            },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        const res = await request.get('ads-package', config)
        return res
    } catch (error) {
        return error
    }
}

export default getPackageAds;