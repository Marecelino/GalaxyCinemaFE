// src/services/authService.js
import api from './api';

const authService = {
  login: (credentials) => {
    // Để giả lập đăng nhập với JSON Server
    return api.get(`/users?email=${credentials.email}`).then(response => {
      const users = response.data;
      if (users.length > 0 && users[0].password === credentials.password) {
        // Giả lập tạo token
        const user = users[0];
        const token = btoa(JSON.stringify({userId: user.id, email: user.email}));
        
        // Trả về dạng giống response từ API auth thực tế
        return {
          data: {
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              phone: user.phone
            },
            token
          }
        };
      }
      throw new Error('Invalid credentials');
    });
  },
  
  register: (userData) => {
    // Kiểm tra email đã tồn tại
    return api.get(`/users?email=${userData.email}`).then(response => {
      const users = response.data;
      if (users.length > 0) {
        throw new Error('Email already exists');
      }
      
      // Tạo user mới
      return api.post('/users', userData).then(response => {
        const user = response.data;
        const token = btoa(JSON.stringify({userId: user.id, email: user.email}));
        
        return {
          data: {
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              phone: user.phone
            },
            token
          }
        };
      });
    });
  },
  
  getCurrentUser: () => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      return api.get(`/users/${userId}`);
    }
    return Promise.reject('No user logged in');
  },
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    return Promise.resolve();
  }
};

export default authService;