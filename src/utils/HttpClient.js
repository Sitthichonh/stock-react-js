import axios from "axios";
import join from "url-join"
import { server, apiUrl } from "../constants";

const isAbsoluteURLRegex = /^(?:\w+:)\/\//

axios.interceptors.request.use(async (config) => {
    if (!isAbsoluteURLRegex.test(config.url)) {
        config.url = join(apiUrl, config.url)
    }
    config.timeout = 10000 // 10Second
    return config
})

export const HttpClient = axios