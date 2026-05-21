const BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:4000'
  : (import.meta.env.VITE_API_URL || 'https://tasty-bite.onrender.com');
const CLOUDINERY_URI = import.meta.env.CLOUDINERY_URL;

export const API = {
  // Auth
  REGISTER:`${BASE_URL}/api/v1/users/register`,
  LOGIN:`${BASE_URL}/api/v1/users/login`,
  LOGOUT:`${BASE_URL}/api/v1/users/logout`,
  SIGNIN:`${BASE_URL}/api/v1/users/register`,
  CHANGE_PASS:`${BASE_URL}/api/v1/users/changePass`,

  // Meals
  MEALS:`${BASE_URL}/orders/availableMeals`,

  // Orders
  PLACE_ORDER:`${BASE_URL}/orders/order`,
  ORDER_HISTORY:`${BASE_URL}/orders/orderHistory`,
};