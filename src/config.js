
const accessToken = process.env.REACT_APP_ACCESS_TOKEN;
const hypercareScope = process.env.REACT_APP_HYPERCARE_SCOPE;
const isPriority = false;
const limit = 20;

const baseURL = {
    hyperscopeURL: process.env.REACT_APP_HYPERCARE_URL
}

export {
    accessToken,
    hypercareScope,
    baseURL,
    isPriority,
    limit
}