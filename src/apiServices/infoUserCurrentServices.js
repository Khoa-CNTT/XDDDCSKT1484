import * as request from '~/utils/request'

const infoUserCurrent = async (token) => {
    try {
        const res = await request.get('users/my-info', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        return res
    } catch (error) {
        return error
    }
}

export default infoUserCurrent