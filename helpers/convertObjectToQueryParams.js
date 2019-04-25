const convertObjectToQueryParams = queryParams => `?${Object.entries(queryParams).map(([key, value]) => `${key}=${value}`).join('&')}`

export { convertObjectToQueryParams }
