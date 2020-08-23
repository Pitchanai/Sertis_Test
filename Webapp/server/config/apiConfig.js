const baseHref = ''
const apiConfig = {
  authAPI: {
    prefix: baseHref + '/api/auth',
    function: {
      test: '/test',
      signin: '/signin',
      signup: '/signup'
    }
  },
  partyAPI: {
    prefix: baseHref + '/api/party',
    function: {
      all: '/all',
      create: '/create',
      join: '/join',
      leave: '/leave',
    }
  },
  staticAPI: {
    prefix: baseHref + '/api/static',
    function: {
      file: '/'
    }
  }
}

module.exports = apiConfig