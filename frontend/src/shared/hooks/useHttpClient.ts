import { useState, useCallback } from 'react';

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendRequest = useCallback(
    async (url: string, method = 'GET', body: any = null, headers: any = {}) => {
      setIsLoading(true);
      setError(null);

      try {
        const options: RequestInit = {
          method,
          headers: { ...(headers as Record<string, string>) },
        };

        if (body) {
          if (body instanceof FormData) {
            options.body = body;
          } else {
            options.body = JSON.stringify(body);
            (options.headers as Record<string, string>)['Content-Type'] = 'application/json';
          }
        }

        const response = await fetch(url, options);

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Something went wrong!');
        }

        setIsLoading(false);
        return data;
      } catch (err: any) {
        setIsLoading(false);
        setError(err.message || 'Something went wrong!');
        throw err;
      }
    },
    []
  );

  const clearError = () => setError(null);

  return { isLoading, error, sendRequest, clearError };
};
