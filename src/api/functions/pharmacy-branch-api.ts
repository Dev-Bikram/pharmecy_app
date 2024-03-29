import axiosInstance from "api/axiosInstance"
import { endpoints } from "api/endpoints"
import { IBranchDetailsResponse, IListPharmacyBranchPayload, IpharmacyBranchListResponse , IgetAssignedAll, IgetAssignedEach} from "typescript/interface/pharmacy-branch.interface"

export const fetchpharmacybranchlists = async (data: IListPharmacyBranchPayload) => {
    try {
        const response = await axiosInstance.post<IpharmacyBranchListResponse>(endpoints.branch.list, data)
        return response
    } catch (error) {
        console.log(error);

    }
}

export const getBranchdetails = async (id: number) => {
    try {
        const response = await axiosInstance.get<IBranchDetailsResponse>(endpoints.branch.branchdetails(id))
        return response?.data?.data
    } catch (error) {
        console.log(error);
    }
}

export const getAssignedAll = async () =>{
    try {
       const response = await axiosInstance.get<IgetAssignedAll>(endpoints.branch.assignedAll)
       return response
    }
    catch(error){
         console.log(error)
    }
}

