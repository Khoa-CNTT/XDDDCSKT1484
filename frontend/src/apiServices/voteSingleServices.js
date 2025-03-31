import * as request from '~/utils/request'

const voteSingle = async (postPollId, token) => {
    try {
        const res = await request.post(`poll-vote/vote/${postPollId}`, {}, {
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