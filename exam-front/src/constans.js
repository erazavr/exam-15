let env = process.env.REACT_APP_ENV;

let apiURL = 'http://localhost:8000';

if (env === 'test') {
    apiURL = 'http://localhost:8010'
}

export default apiURL