import * as request from '~/utils/request'

const uploadPostPoll = async (data, token) => {
    try {
        const res = await request.post('post-poll', data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        return res
    } catch (error) {
        return error
    }
}

export default uploadPostPoll;