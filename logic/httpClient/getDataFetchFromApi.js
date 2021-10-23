export default function GetDataFetchedFromApi(route, params = "") {
  return fetch(`${process.env.baseUrl}/${route}${params !== "" ? "/" + params : params}`).then((res) => res.json());
}
