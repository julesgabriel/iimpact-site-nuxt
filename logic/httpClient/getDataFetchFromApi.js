import axios from "axios";

export default function GetDataFetchedFromApi(route, params = "") {
    return axios.get(`${process.env.baseUrl}/${route}${params !== "" ? "/" + params : params}`)
}
