import * as request from '~/utils/request'

const forgotPassword = async (email) => {
    try {
        const res = await request.post('mail/send-mail/change-password', email)
        return res
    } catch (error) {
        return error
    }
}

export default forgotPassword;