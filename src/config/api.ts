const ADMIN_TOKEN = 'ekb_lights_admin_2024_secure_XyZ789!@#';

export const API_ENDPOINTS = {
  products: 'https://functions.poehali.dev/6081e864-e155-4489-a6db-b390358a83bc',
  adminProducts: 'https://functions.poehali.dev/8edfe581-36eb-4559-a8c5-f9fd27f4a594',
  adminSettings: 'https://functions.poehali.dev/bae26e4f-1ed0-46da-abb6-7f8511d54f7e',
  telegramBot: 'https://functions.poehali.dev/fbf214ed-4f95-448b-9b46-3ed38518d45a'
};

export const getAuthHeaders = () => ({
  'Content-Type': 'application/json',
  'X-Admin-Token': ADMIN_TOKEN
});

export const apiRequest = async (url: string, options: RequestInit = {}) => {
  const response = await fetch(url, {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...options.headers
    }
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || error.message || 'API request failed');
  }
  
  return response.json();
};
