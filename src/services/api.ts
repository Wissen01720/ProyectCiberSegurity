import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const api = {
  // Auth
  register: (email: string, password: string) =>
    axios.post(`${API_URL}/auth/register`, { email, password }),
  
  login: (email: string, password: string) =>
    axios.post(`${API_URL}/auth/login`, { email, password }),

  // Scenarios
  getScenarios: () => 
    axios.get(`${API_URL}/scenarios`),
  
  getScenariosByType: (type: string) =>
    axios.get(`${API_URL}/scenarios/${type}`),

  // Security Logs
  logSecurityEvent: (userId: string, eventType: string, details: string, severity: string) =>
    axios.post(`${API_URL}/security/log`, { userId, eventType, details, severity }),
  
  getUserLogs: (userId: string) =>
    axios.get(`${API_URL}/security/logs/${userId}`),
};