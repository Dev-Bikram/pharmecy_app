import { BaseApiResponse } from "./common.interface";
import {
  EnumToPipes,
  VerificationStatusType,
  bankInfoVerificationStatusType
} from "./pharmacy-branch.interface";

export interface IUser {
  id: number;
  name: string;
  surname: string;
}

export enum PharmacyStatusEnum {
  Pending = "Pending",
  Approved = "Approved",
  Rejected = "Rejected",
  "Under Review" = "Under Review",
  "On Hold" = "On Hold"
}
export type pharmacyStatusType = EnumToPipes<PharmacyStatusEnum, string>;

export interface IFetchPharmacyData {
  id: number;
  name: string;
  ownerUserId: number;
  logo: any;
  applyLogoForAllBranches: boolean;
  address: string;
  city: string;
  postcode: string;
  phone: string;
  country: string;
  bankAccountName: string;
  bankAccountNumber: string;
  sortCode: string;
  status: string;
  createdAt: string;
  user: IUser;
  collectPaymentForAllBranches: boolean;
  ryftAccountId: null | string;
  ryftAccountVerificationStatus?: VerificationStatusType;
  ryftAccountStatus: null | string;
  ryftPayoutEnabled: boolean;
  ryftPayoutMethodId: null | string;
  allowBranchesForMedicationPriceChange?: boolean;
  allowBranchesForToggleAvailability?: boolean;
  priceMultiple?: number | string;
  dispensingFee?: number | string;
  minimumItemCharge?: number | string;
  latitude: number;
  longitude: number;
  approvalStatus: pharmacyStatusType;
  ryftPayoutMethodStatus: bankInfoVerificationStatusType;
}

export interface UpdatepaymentInformationResponse extends BaseApiResponse {
  data: IFetchPharmacyData;
}

export interface FetchPharmacyResponse extends BaseApiResponse {
  data: IFetchPharmacyData;
}

// for adding a pharmacy
export interface IaddPharmacyPayload {
  name: string;
  address: string;
  postcode: string;
  phone: string;
  logo?: any;
  applyLogoForAllBranches?: boolean;
  status?: string;
  city: string;
  country?: string;
  createdAt?: string;
}

// for update a pharmacy
export interface IupdatePharmacyPayload extends IaddPharmacyPayload {
  id: number;
}

// for adding a new account to a pharmacy
export interface IaddAdminACPayload {
  name: string;
  surname: string;
  email: string;
  pharmacyBranchId: number;
}

export interface IEditAdminACPayload {
  name: string;
  surname: string;
  email: string;
  id: number;
}

export interface IdeleteAdminACPayload {
  pharmacyBranchId: number;
  id: number;
}

export interface IAdminAccountDoc {
  id: number;
  name: string;
  surname: string;
  email: string;
}

export interface IAddAdminAccountResponse extends BaseApiResponse {
  data: IAdminAccountDoc;
}

export interface IadminListpaylod {
  pharmacyBranchId: number;
  page: number;
  length: number;
  search?: string;
}

export interface IAddAdminAccountListResponse extends BaseApiResponse {
  data: IAdminAccountData;
}

export interface IAdminAccountData {
  docs: IAdminAccountDoc[];
  totalRecords: number;
  perPage: number;
  currentPage: number;
  totalPages: number;
}

export interface IUserRole {
  id: number;
  label: string;
  role: string;
}

export interface IPharmacyUser {
  pharmacyId: number;
  pharmacyBranchId: number;
}
export interface IotherBranchUserListDoc {
  id: number;
  name: string;
  surname: string;
  email: string;
  status: string;
  userRoleId: number;
  userRole: IUserRole;
  pharmacyUser: IPharmacyUser[];
}

export interface IotherBranchUserListResponse extends BaseApiResponse {
  data: {
    docs: IotherBranchUserListDoc[];
    totalRecords: number;
    perPage: number;
    currentPage: number;
    totalPages: number;
  };
}

export interface IworkingHours {
  openAt: string | null;
  closeAt: string | null;
  error?: string;
}

export interface IworkingDays {
  id: number;
  isOpen: boolean;
  workingHours?: IworkingHours[];
}
export interface PharmacyBusinessHourUpdatePayload {
  workingDays: IworkingDays[];
}

export interface IgetAssignedEach {
  id: number;
  name: string;
}

export interface IgetAssignedAll extends BaseApiResponse {
  data: IgetAssignedEach[];
}
