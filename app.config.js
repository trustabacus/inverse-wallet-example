const APIs = {
  production: {
    base: 'https://inverse-prod.onrender.com/query',
  },
  staging: {
    base: 'https://inverse-backend.onrender.com/query',
  },
};

const projectId = '';

module.exports = ({ config }) => {
  if (process.env.APP_ENV === 'production') {
    return {
      /* add production config here */
      ...config,
      extra: {
        eas: {
          projectId,
        },
        API_BASE: APIs.production.base,
        MODE: 'production',
      },
    };
  } else {
    return {
      /* add staging config here */
      ...config,
      extra: {
        eas: {
          projectId,
        },
        API_BASE: APIs.production.base,
        MODE: 'staging',
      },
    };
  }
};
