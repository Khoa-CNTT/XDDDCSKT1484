import * as request from '~/utils/request'

const patchReport = async (id, token) => {
    try {
        const res = await request.patch(`reports/${id}`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return res
    } catch (error) {
        return error;
    }
}

export default patchReport;