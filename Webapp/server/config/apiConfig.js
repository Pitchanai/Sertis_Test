const baseHref = ''
const apiConfig = {
  authAPI: {
    prefix: baseHref + '/api/auth',
    function: {
      test: '/test',
      signin: '/signin',
      signup: '/signup',
    },
  },
  staticAPI: {
    prefix: baseHref + '/api/static',
    function: {
      file: '/',
    },
  },
  cardAPI: {
    prefix: baseHref + '/api/card',
    function: {
      category: '/category',
      status: '/status',
      get: '/get',
      create: '/create',
      edit: '/edit',
      delete: '/delete'
    },
  },
}

module.exports = apiConfig