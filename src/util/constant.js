let baseUrl;

switch (process.env.NODE_ENV) {
    case "development":
        baseUrl = "http://localhost:8080/api/v1";
        break;
    case "production":
        baseUrl = "http://localhost:8080/api/v1";
        break;
    default:
        baseUrl = "http://localhost:8080/api/v1";
        break;
}

export const BASE_URL = baseUrl;