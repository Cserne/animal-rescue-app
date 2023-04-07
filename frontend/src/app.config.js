const _config = {
    dev: {
        baseurl: "http://localhost:8080"
    },
    prod: {
        // baseurl: process.env.REACT_APP_RESCUE_API || "http://localhost:8080"
        baseurl: process.env.REACT_APP_RESCUE_API
    }
}

const config = process.env.NODE_ENV === "development" ? _config.dev : _config.prod;

export default config