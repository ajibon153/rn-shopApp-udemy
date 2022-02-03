const variables = {
  development: {
    googleApiKey: 'AIzaSyDKvc68UW_Lo1q2V2okkUj2O7O-ZUMdLAM',
  },
  production: {
    googleApiKey: 'AIzaSyDKvc68UW_Lo1q2V2okkUj2O7O-ZUMdLAM',
  },
};

const getEnvVariables = () => {
  if (__DEV__) {
    return variables.development; // return this if in development mode
  }
  return variables.production; // otherwise, return this
};

export default getEnvVariables; // export a reference to the function
