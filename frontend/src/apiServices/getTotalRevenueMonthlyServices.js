import * as request from '~/utils/request';

const getTotalRevenueMonthlyServices = async (year, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        year: year,  
      },
    };
    const res = await request.get('total/revenue/monthly', config);
    return res;
  } catch (error) {
    return error;
  }
};

export default getTotalRevenueMonthlyServices;
