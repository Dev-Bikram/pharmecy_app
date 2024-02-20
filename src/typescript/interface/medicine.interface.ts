import { BaseApiResponse, BasePaginationData } from "./common.interface";

export interface MedicineListPayload {
  page: number;
  length: number;
  query?: string;
  pharmacyBranchId?: number;
}

export interface ImedicineListObj {
  id: number;
  APPID?: number;

  price: string;
  APID?: number;
  SUBP?: string;
  productName: string;
  QTYVAL: number;
  resalePrice: number;
  status: string;
}

export interface ImedicineListData extends BasePaginationData {
  docs: ImedicineListObj[];
}

export interface IMedicineListResponse extends BaseApiResponse {
  data: ImedicineListData;
}

export type PharmacyMedicineData = Omit<ImedicineListObj, "resalePrice"> & {
  pricePerTablet: string;
  totalPrice: string;
};

export type PrescriptionMedicineData = Pick<ImedicineListObj, "APPID"> & {
  VPID: string;
  created_at: string;
  description: string;
  directions: string;
  id: string | number;
  object: string;
  qty: string;
  updated_at: string;
  pricePerTablet?: string;
  totalPrice?: string;
};

export interface IchageMedicneStatusPayload {
  pharmacyBranchId: number;
  status: string;
  amppId: string;
  APPID: string;
}

export interface IchageMedicneStatusResponse extends BaseApiResponse {
  data: string;
}
