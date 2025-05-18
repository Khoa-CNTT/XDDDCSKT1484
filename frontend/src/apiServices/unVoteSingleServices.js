import * as request from '~/utils/request'

const unVoteSingle = async (pollOptionId, token) => {
    try {
        const res = await request.post(`poll-vote/vote/${pollOptionId}/un-vote`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        return res
    } catch (error) {
        return error
    }
}

export default unVoteSingle