// Expect a cold start of 5 to 10 secs on this service
const API_BASE_URL = "https://project-tempest-hiring.up.railway.app"

/**
 * TASK: Implement API client for fetching data from the backend API endpoint
 */
export const apiClient = async (endpoint, params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    const url = `${API_BASE_URL}${endpoint}?${queryString}`
    const res = await fetch(url)
  
    if (!res.ok) {
      throw new Error(`API error: ${res.status}`)
    }
  
    return res.json()
}
