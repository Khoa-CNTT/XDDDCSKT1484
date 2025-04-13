import * as request from '~/utils/request'

const returnOrder = async (param, token) => {
    try {

        const config = {
            params: param,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        const res = await request.get('vn-pay/returnOrder', config)
        return res
    } catch (error) {
        return error
    }
}

export default returnOrder;