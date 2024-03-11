interface Environment {
  // apiUrl: string;
  production: boolean;
  defaultLanguage: string;
  apiBaseUrl: string;
}


export const environment: Environment = {
  // apiUrl: 'http://16.171.151.92/api/data',
  production: false,
  defaultLanguage: 'en',
  apiBaseUrl: 'http://localhost:3000',
  // apiUrl: ""
};

