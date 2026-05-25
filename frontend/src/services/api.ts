const getBaseUrl = () => `http://${window.location.hostname}:8000`;

const TOKEN_KEY = 'fridgiq_token';

function authHeaders(): Record<string, string> {
  const token = localStorage.getItem(TOKEN_KEY);
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Request failed' }));
    throw new Error(err.detail || 'Request failed');
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

export const apiClient = {
  async get<T>(path: string): Promise<T> {
    const res = await fetch(`${getBaseUrl()}${path}`, {
      headers: authHeaders(),
    });
    return handleResponse<T>(res);
  },

  async post<T>(path: string, body: unknown): Promise<T> {
    const res = await fetch(`${getBaseUrl()}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify(body),
    });
    return handleResponse<T>(res);
  },

  async put<T>(path: string, body: unknown): Promise<T> {
    const res = await fetch(`${getBaseUrl()}${path}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify(body),
    });
    return handleResponse<T>(res);
  },

  async delete(path: string): Promise<void> {
    const res = await fetch(`${getBaseUrl()}${path}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    if (!res.ok && res.status !== 204) {
      const err = await res.json().catch(() => ({ detail: 'Request failed' }));
      throw new Error(err.detail || 'Request failed');
    }
  },

  async postForm<T>(path: string, formData: FormData): Promise<T> {
    const res = await fetch(`${getBaseUrl()}${path}`, {
      method: 'POST',
      headers: authHeaders(),
      body: formData,
    });
    return handleResponse<T>(res);
  },
};
