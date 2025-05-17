import * as request from '~/utils/request'

const voteMultiple = async (postId, pollOptionId, token) => {

    try {
        const res = await request.post(`poll-vote/vote/multiple/${postId}`, { pollOptionId }, {
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