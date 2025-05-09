import * as request from '~/utils/request'

const notify = async (page, size, token) => {
    try {
        const configs = {
            params: {
                page,
                size,
            },
            headers: {
                'Authorization': `Bearer ${token}`
            }

        }

        const res = await request.get('notices', configs)

        return res;
    } catch (error) {
        return error;
    }
}

export default notify;