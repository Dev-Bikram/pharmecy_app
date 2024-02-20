import axiosInstance from "api/axiosInstance";
import { endpoints } from "api/endpoints";
import {
  IMedicineListResponse,
  IchageMedicneStatusPayload,
  IchageMedicneStatusResponse,
  MedicineListPayload
} from "typescript/interface/medicine.interface";

export const fetchMedicineList = async (
  data: MedicineListPayload,
  signal?: AbortSignal
) => {
  let t = {
    ...data
  };

  if (typeof data?.query !== "undefined" && data?.query?.length < 3) {
    delete t.query;
  }

  const res = await axiosInstance.post<IMedicineListResponse>(
    endpoints.medicine.list,
    t,
    { signal }
  );

  return res;
};

export const chageMedicneStatus = async (data: IchageMedicneStatusPayload) => {
  const res = await axiosInstance.post<IchageMedicneStatusResponse>(
    endpoints.medicine.status,
    data
  );

  return res;
};