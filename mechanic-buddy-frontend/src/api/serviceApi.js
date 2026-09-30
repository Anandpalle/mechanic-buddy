import axiosClient from './axiosClient';

export const serviceApi = {
  createBooking: (bookingData) => axiosClient.post('/services/book', bookingData),
  getMyRequests: () => axiosClient.get('/services/my-requests'),
  getAllRequests: () => axiosClient.get('/services/all'),
  updateStatus: (id, status) => axiosClient.put(`/services/${id}/status?status=${status}`),
  diagnoseWithAi: (query) => axiosClient.post('/ai/diagnose', query),
  createRazorpayOrder: (serviceRequestId, amount) => 
    axiosClient.post(`/payment/create-order?serviceRequestId=${serviceRequestId}&amount=${amount}`),
  verifyPayment: (serviceRequestId, paymentId, orderId) => 
    axiosClient.post(`/payment/verify?serviceRequestId=${serviceRequestId}&paymentId=${paymentId || ''}&orderId=${orderId || ''}`),
  getAnalyticsSummary: () => axiosClient.get('/analytics/summary'),
};
