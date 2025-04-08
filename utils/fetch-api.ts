import qs from "qs";
import { getStrapiURL } from "./api-helpers";

export async function fetchAPI(
  path: string,
  urlParamsObject = {},
  options = {}
) {
  try {
    // Merge default and user options
    const mergedOptions = {
      next: { revalidate: 3600 },
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    };

    // Build request URL
    const queryString = qs.stringify(urlParamsObject);
    const requestUrl = `${getStrapiURL(
      `/api${path}${queryString ? `?${queryString}` : ""}`
    )}`;

    // Trigger API call
    const response = await fetch(requestUrl, mergedOptions);
    const data = await response.json();
    return data;
    
  } catch (error) {
    console.error(error);
    throw new Error(`Please check if your server is running and you set all the required tokens.`);
  }
}

export async function postAPI(
  path: string,
  bodyData = {},
  options = {}
) {
  try {
    const requestUrl = getStrapiURL(`/api${path}`);

    const mergedOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
      ...options,
    };

    const response = await fetch(requestUrl, mergedOptions);

    // Check if the response is ok (status in the range 200-299)
    if (!response.ok) {
      // Try to get more specific error information from the response body
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        // Ignore if the response body is not valid JSON
        console.warn("Could not parse error response body as JSON", e);
      }
      console.error("API Error Response:", {
        status: response.status,
        statusText: response.statusText,
        errorData
      });
      throw new Error(`API request failed with status ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("POST API Error:", error);
    // Re-throw the error so the caller can handle it
    throw error instanceof Error ? error : new Error(`An unknown error occurred during the POST request to ${path}`);
  }
}
