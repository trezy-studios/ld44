/* eslint-disable require-await */
const fetchJSON = async (url, options = {}) => fetch(url, options).then(response => response.json())
/* eslint-enable require-await */

export { fetchJSON }
