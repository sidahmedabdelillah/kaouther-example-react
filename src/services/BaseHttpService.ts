import axios, { AxiosInstance } from "axios";

export class BaseHttpService {
  axiosIns: AxiosInstance;

  constructor() {
    this.axiosIns = axios.create({ baseURL: "http://localhost:3000" });
  }
}
