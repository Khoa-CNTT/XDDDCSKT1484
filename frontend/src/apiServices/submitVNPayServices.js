import * as request from '~/utils/request'

const submitOrder = async (location, type, idHandler, sales_package, token) => {
    try {

        const config = {
            params: {
                location,
                type,
                idHandler,
                sales_package,
            },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        const res = await request.get('vn-pay/submitOrder', config)
        return res
    } catch (error) {
        return error
    }
}

export default submitOrder;