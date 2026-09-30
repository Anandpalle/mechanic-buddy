import axiosClient from './axiosClient';

export const mechanicApi = {
  getNearbyMechanics: (lat, lng) => axiosClient.get(`/mechanics/nearby?lat=${lat || 12.9716}&lng=${lng || 77.5946}`),
  getAllMechanics: () => axiosClient.get('/mechanics/all'),
  toggleAvailability: (id, available) => axiosClient.put(`/mechanics/${id}/availability?available=${available}`),
};
