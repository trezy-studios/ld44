const HTTPStatusCodes = {
  100: {
    code: 100,
    message: 'Continue',
  },

  101: {
    code: 101,
    message: 'Switching Protocols',
  },

  200: {
    code: 200,
    message: 'OK',
  },

  201: {
    code: 201,
    message: 'Created',
  },

  202: {
    code: 202,
    message: 'Accepted',
  },

  203: {
    code: 203,
    message: 'Non-Authoritative Information',
  },

  204: {
    code: 204,
    message: 'No Content',
  },

  205: {
    code: 205,
    message: 'Reset Content',
  },

  206: {
    code: 206,
    message: 'Partial Content',
  },

  300: {
    code: 300,
    message: 'Multiple Choices',
  },

  301: {
    code: 301,
    message: 'Moved Permanently',
  },

  302: {
    code: 302,
    message: 'Found',
  },

  303: {
    code: 303,
    message: 'See Other',
  },

  304: {
    code: 304,
    message: 'Not Modified',
  },

  305: {
    code: 305,
    message: 'Use Proxy',
  },

  307: {
    code: 307,
    message: 'Temporary Redirect',
  },

  400: {
    code: 400,
    message: 'Bad Request',
  },

  401: {
    code: 401,
    message: 'Unauthorized',
  },

  402: {
    code: 402,
    message: 'Payment Required',
  },

  403: {
    code: 403,
    message: 'Forbidden',
  },

  404: {
    code: 404,
    message: 'Not Found',
  },

  405: {
    code: 405,
    message: 'Method Not Allowed',
  },

  406: {
    code: 406,
    message: 'Not Acceptable',
  },

  407: {
    code: 407,
    message: 'Proxy Authentication Required',
  },

  408: {
    code: 408,
    message: 'Request Timeout',
  },

  409: {
    code: 409,
    message: 'Conflict',
  },

  410: {
    code: 410,
    message: 'Gone',
  },

  411: {
    code: 411,
    message: 'Length Required',
  },

  412: {
    code: 412,
    message: 'Precondition Failed',
  },

  413: {
    code: 413,
    message: 'Request Entity Too Large',
  },

  414: {
    code: 414,
    message: 'Request-URI Too Long',
  },

  415: {
    code: 415,
    message: 'Unsupported Media Type',
  },

  416: {
    code: 416,
    message: 'Requested Range Not Satisfiable',
  },

  417: {
    code: 417,
    message: 'Expectation Failed',
  },

  500: {
    code: 500,
    message: 'Internal Server Error',
  },

  501: {
    code: 501,
    message: 'Not Implemented',
  },

  502: {
    code: 502,
    message: 'Bad Gateway',
  },

  503: {
    code: 503,
    message: 'Service Unavailable',
  },

  504: {
    code: 504,
    message: 'Gateway Timeout',
  },

  505: {
    code: 505,
    message: 'HTTP Version Not Supported',
  },
}





const getHTTPStatusCode = code => {
  const codeMap = {
    epicFail: 500,
    fail: 400,
    success: 200,
  }

  let HTTPStatusCode = HTTPStatusCodes[code]

  if (codeMap[code]) {
    HTTPStatusCode = HTTPStatusCodes[codeMap[code]]
  }

  if (!HTTPStatusCode) {
    /* eslint-disable no-magic-numbers */
    HTTPStatusCode = HTTPStatusCodes[500]
    /* eslint-enable */
  }

  return HTTPStatusCode
}





export { getHTTPStatusCode }
