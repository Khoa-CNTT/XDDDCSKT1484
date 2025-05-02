// ~/apiServices.js
import * as request from '~/utils/request';
import formatDate from '~/utils/formatDate';

const getAdsTotalCountServices = async (token, { startDate, endDate }) => {
    try {
        const config = {
            headers: {},
            params: {
                start:formatDate(startDate),
                end:formatDate(endDate),
            },
        };

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        console.log(config);

        const res = await request.get('ads-total/count', config);
        return res;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export default getAdsTotalCountServices;
