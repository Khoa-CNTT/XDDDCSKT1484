import * as request from '~/utils/request'

const deletedReport = async (id, token) => {
    try {
        const res = await request.deleted(`reports/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return res
    } catch (error) {
        return error;
    }
}

export default deletedReport;