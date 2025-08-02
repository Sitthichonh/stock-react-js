export const apiUrl = "http://localhost:8085/api/v2"
export const imageUrl = "http://localhost:8085"

// Login Page
export const APP_INIT = "APP_INIT";

//Login Page
export const HTTP_LOGIN_FETCHING = "HTTP_LOGIN_FETCHING";
export const HTTP_LOGIN_SUCCESS = "HTTP_LOGIN_SUCCESS";
export const HTTP_LOGIN_FAILED = "HTTP_LOGIN_FAILED";

//Register Page
export const HTTP_REGISTER_FETCHING = "HTTP_REGISTER_FETCHING";
export const HTTP_REGISTER_SUCCESS = "HTTP_REGISTER_SUCCESS";
export const HTTP_REGISTER_FAILED = "HTTP_REGISTER_FAILED";

// Stock Page
export const HTTP_STOCK_FETCHING = "HTTP_STOCK_FETCHING";
export const HTTP_STOCK_SUCCESS = "HTTP_STOCK_SUCCESS";
export const HTTP_STOCK_FAILED = "HTTP_STOCK_FAILED";

export const YES = 'YES'
export const NO = 'NO'
export const OK = 'ok'
export const NOK = 'nok'

export const server = {
    LOGIN_URL : `authen/login`,
    REGISTER_URL : `authen/register`,
    PRODUCT_URL : `stock/product`,
    TRANSACION_URL : `transaction`,
    REPORT_URL : `stock/report`,
    LOGIN_PASSED : `yes`,
}