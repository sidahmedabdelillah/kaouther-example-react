import { AxiosResponse } from "axios";
import { BaseHttpService } from "../BaseHttpService";
import dayjs from "dayjs";

export type DjeezyAppServerRequestsType = {
  id: string;
  date: Date;
  post: number;
  get: number;
};

export class DjeezyAppChartService extends BaseHttpService {
  async getFiveMinutsResults(gte?: Date) {
    const params = {
      gte: gte ? dayjs(gte).unix() : undefined,
    };
    console.log({ params, gte });
    const {
      data: { data },
    }: AxiosResponse<{ data: DjeezyAppServerRequestsType[] }> =
      await this.axiosIns.get("/api/v1/djeezy-server-data/5min", {
        params,
      });
    return data;
  }
}
