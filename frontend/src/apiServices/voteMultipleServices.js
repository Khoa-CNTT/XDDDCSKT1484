import * as request from '~/utils/request'

const voteMultiple = async (pollOptionId, token) => {
    console.log(pollOptionId);

    try {
        const res = await request.post('poll-vote/vote/multiple', { pollOptionId }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        return res
    } catch (error) {
        return error
    }
}

export default voteMultiple