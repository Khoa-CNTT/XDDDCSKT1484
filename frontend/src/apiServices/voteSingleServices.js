import * as request from '~/utils/request'

const voteSingle = async (pollOptionId, token) => {
    try {
        const res = await request.post(`poll-vote/vote/${pollOptionId}`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        return res
    } catch (error) {
        return error
    }
}

export default voteSingle