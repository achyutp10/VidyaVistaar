import Cookies from 'js-cookie';

// Simulates checking token expiry
export const isAccessTokenExpired = (token) => {
  if (!token) return true;
  const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
  const expiry = payload.exp * 1000; // Convert to ms
  return Date.now() > expiry;
};

// Simulates refreshing the token
export const getRefreshedToken = async (refreshToken) => {
  const response = await fetch('/api/token/refresh/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refresh: refreshToken }),
  });

  if (!response.ok) {
    throw new Error('Failed to refresh token');
  }

  return await response.json(); // { access: 'newAccessToken', refresh: 'newRefreshToken' }
};

// Sets auth tokens in cookies or localStorage
export const setAuthUser = (access, refresh) => {
  Cookies.set('access_token', access, { secure: true });
  Cookies.set('refresh_token', refresh, { secure: true });
};
