import axios from 'axios';

const API_URL = 'http://localhost:3001';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Service functions for movies
export const movieService = {
  getAll: () => api.get('/movies'),
  getById: (id) => api.get(`/movies/${id}`),
  getNowPlaying: () => api.get('/movies?releaseDate_lte=2025-04-17'),
  getUpcoming: () => api.get('/movies?releaseDate_gt=2025-04-17'),
};

// Service functions for cinemas
export const cinemaService = {
  getAll: () => api.get('/cinemas'),
  getById: (id) => api.get(`/cinemas/${id}`),
};

// Service functions for showtimes
export const showTimeService = {
  getAll: () => api.get('/showTimes'),
  getById: (id) => api.get(`/showTimes/${id}`),
  getByMovieId: (movieId) => api.get(`/showTimes?movieId=${movieId}`),
  getByCinemaId: (cinemaId) => api.get(`/showTimes?cinemaId=${cinemaId}`),
  getByMovieAndCinema: (movieId, cinemaId) => 
    api.get(`/showTimes?movieId=${movieId}&cinemaId=${cinemaId}`),
  getByDate: (date) => api.get(`/showTimes?date=${date}`),
};

// Service functions for seats
export const seatService = {
  getByShowTimeId: (showTimeId) => api.get(`/seats?showTimeId=${showTimeId}`),
  updateSeat: (seatId, seatData) => api.patch(`/seats/${seatId}`, seatData),
};

// Service functions for bookings
export const bookingService = {
  getAll: () => api.get('/bookings'),
  getById: (id) => api.get(`/bookings/${id}`),
  getByUserId: (userId) => api.get(`/bookings?userId=${userId}`),
  create: (bookingData) => api.post('/bookings', bookingData),
  update: (id, bookingData) => api.put(`/bookings/${id}`, bookingData),
  delete: (id) => api.delete(`/bookings/${id}`),
};

// Service functions for auth
export const authService = {
  login: (credentials) => api.post('/login', credentials),
  register: (userData) => api.post('/users', userData),
  getCurrentUser: () => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      return api.get(`/users/${userId}`);
    }
    return Promise.reject('No user logged in');
  },
};

export default api;