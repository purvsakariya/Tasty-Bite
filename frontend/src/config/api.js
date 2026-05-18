const BASE_URL = import.meta.env.VITE_API_URL;
const CLOUDINERY_URI = import.meta.env.CLOUDINERY_URL;

export const API = {
  // Auth
  REGISTER:`${BASE_URL}/api/v1/users/register`,
  LOGIN:`${BASE_URL}/api/v1/users/login`,
  LOGOUT:`${BASE_URL}/api/v1/users/logout`,
  SINGIN:`${BASE_URL}/api/v1/users/register`,
  CHANGE_PASS:`${BASE_URL}/api/v1/users/changePass`,

  // Meals
  MEALS:`${BASE_URL}/orders/availableMeals`,

  // Orders
  PLACE_ORDER:`${BASE_URL}/orders/order`,
  ORDER_HISTORY:`${BASE_URL}/orders/orderHistory`,
};