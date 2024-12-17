const environments = {
    development: {
      API_URL: 'https://dev-retell-api.example.com',
    },
    staging: {
      API_URL: 'https://staging-retell-api.example.com',
    },
    production: {
      API_URL: 'https://prod-retell-api.example.com',
    },
  };
  
  export const getEnvConfig = () => environments[process.env.NODE_ENV || 'development'];
  