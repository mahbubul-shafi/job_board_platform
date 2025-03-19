const API_BASE_URL = 'http://localhost:5000/api';

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export async function fetchApi<T>(url: string, options?: RequestInit): Promise<ApiResponse<T>> {
  try {
    console.log('Fetching:', url); // Debugging: Log the URL being fetched

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    });

    // Log the response for debugging
    const responseText = await response.text();
    console.log('Response:', responseText);

    if (!response.ok) {
      const errorData = JSON.parse(responseText); // Parse the response as JSON
      return { error: errorData.error || 'Request failed' };
    }

    const data = JSON.parse(responseText); // Parse the response as JSON
    return { data };
  } catch (error) {
    console.error('API request failed:', error);
    return { error: 'Network error' };
  }
}

export async function fetchWithAuth<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
  const token = localStorage.getItem('token');
  if (!token) {
    return { error: 'Unauthorized' };
  }

  return fetchApi<T>(endpoint, {
    ...options,
    headers: {
      ...options?.headers,
      Authorization: `Bearer ${token}`,
    },
  });
}