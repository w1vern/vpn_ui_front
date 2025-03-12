interface ResponseScheme {
  status: number;
  message: string;
  _data: any; // Add type for response data if needed
}

type fetchMethods = "POST" | "GET" | "PUT" | "DELETE";

/*
 * Fetch data from API using ofetch (POST method)
 * @param route - API route to fetch data from (e.g., /api/auth/login -> login)
 * @param bodyJson - JSON data to send with POST request
 * @returns Promise with response status and message
 */
export async function apiAuthFetch(
  route: string,
  method: fetchMethods,
  bodyJson: string
): Promise<ResponseScheme> {
  try {
    const response = await $fetch.raw("/api/auth/" + route, {
      method: "POST",
      body: bodyJson,
    });

    const data = response._data as { message: string };
    return {
      status: response.status,
      message: data.message || "Unknown Error",
      _data: response?._data,
    };
  } catch (error: any) {
    return {
      status: error.response?.status || 500,
      message: error.data?.detail || "Unknown Error",
      _data: error.data,
    };
  }
}