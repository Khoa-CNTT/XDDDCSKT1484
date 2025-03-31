import * as request from '~/utils/request'

const notify = async (token) => {
    try {
        const res = await request.get('notices', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        return res
    } catch (error) {
        return error
    }
}

export default notify;