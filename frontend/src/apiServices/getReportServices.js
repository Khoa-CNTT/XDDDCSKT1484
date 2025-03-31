import * as request from '~/utils/request'

const getReport = async (page, size, token, postId) => {
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

        if (postId) {
            config.params = {
                postId,
            }
        }
        const res = await request.get('reports', config)
        return res
    } catch (error) {
        return error;
    }
}

export default getReport;