// import { number, string } from 'yup'
// import { number, string } from 'yup'
import { OUR_ENDPOINT } from '../apiConfig'
import { apiCall } from '../customApiCalls'
import {
  AgentByDepartmentResponse,
  AllBannerResponse,
  AllCustomerRespone,
  AlluserResponse,
  Banner,
  Category,
  CategroiesResponse,
  CreateBannerResponse,
  CreateCategoryResponse,
  CreateDepartmentResponse,
  Customer,
  CustomerTransactionResponse,
  Department,
  DepartmentResponse,
  Notification,
  PostCustomerData,
  RateResponse,
  SingleCategoryResponse,
  SubcategoriesResponse,
  SubCategory,
  TeamResponse,
  UPdateCustomerResponse
} from './datainterfaces'
// import * from './index'
export const gettAllCustomerss = async ({
  token
}: {
  token: string
}): Promise<AllCustomerRespone> => {
  return await apiCall(OUR_ENDPOINT.CUSTOMER.AllCustomers, 'GET', undefined, token)
}
export const getCustomerDetails = async ({
  token,
  id
}: {
  token: string
  id: string
}): Promise<AllCustomerRespone> => {
  return await apiCall(`${OUR_ENDPOINT.CUSTOMER.CustomerDetails}/${id}`, 'GET', undefined, token)
}
export const getCustomerTransactions = async ({
  token,
  id
}: {
  token: string
  id: string
}): Promise<CustomerTransactionResponse> => {
  return await apiCall(
    `${OUR_ENDPOINT.CUSTOMER.CustomerTransactions}/${id}`,
    'GET',
    undefined,
    token
  )
}
export const getTransactions = async ({
  token
}: {
  token: string
}): Promise<CustomerTransactionResponse> => {
  return await apiCall(`${OUR_ENDPOINT.OPERATIONS.Traansactions}`, 'GET', undefined, token)
}

export const getDepartments = async ({ token }: { token: string }): Promise<DepartmentResponse> => {
  return await apiCall(`${OUR_ENDPOINT.OPERATIONS.Departments}`, 'GET', undefined, token)
}
export const getAgentByDepartment = async ({
  token,
  id
}: {
  token: string
  id: string
}): Promise<AgentByDepartmentResponse> => {
  return await apiCall(
    `${OUR_ENDPOINT.OPERATIONS.AgentByDepartment}/${id}`,
    'GET',
    undefined,
    token
  )
}

export const getAllAgents = async ({
  token,
}: {
  token: string
}): Promise<AgentByDepartmentResponse> => {
  return await apiCall(
    `${OUR_ENDPOINT.OPERATIONS.GetAllAgents}`,
    'GET',
    undefined,
    token
  )
}
export const getRate = async ({ token }: { token: string }): Promise<RateResponse> => {
  return await apiCall(`${OUR_ENDPOINT.OPERATIONS.GetRate}`, 'GET', undefined, token)
}
export const getTeam = async ({ token }: { token: string }): Promise<TeamResponse> => {
  return await apiCall(`${OUR_ENDPOINT.OPERATIONS.GetTeam}`, 'GET', undefined, token)
}
export const getCategories = async ({ token }: { token: string }): Promise<CategroiesResponse> => {
  return await apiCall(`${OUR_ENDPOINT.OPERATIONS.GetCategories}`, 'GET', undefined, token)
}
export const getAllUsers = async ({ token }: { token: string }): Promise<AlluserResponse> => {
  return await apiCall(`${OUR_ENDPOINT.OPERATIONS.GetAllUsers}`, 'GET', undefined, token)
}
export const getSubCategories = async ({
  token
}: {
  token: string
}): Promise<SubcategoriesResponse> => {
  return await apiCall(`${OUR_ENDPOINT.OPERATIONS.GetSubCategories}`, 'GET', undefined, token)
}

export const getSingleCategory = async ({
  token,
  id
}: {
  token: string
  id: string
}): Promise<SingleCategoryResponse> => {
  return await apiCall(
    `${OUR_ENDPOINT.OPERATIONS.GetSingleCategory}/${id}`,
    'GET',
    undefined,
    token
  )
}
/*


Post Requests

*/
export const updateCustomer = async ({
  token,
  id,
  data
}: {
  token: string
  id: string
  data: PostCustomerData
}): Promise<UPdateCustomerResponse> => {
  return await apiCall(`${OUR_ENDPOINT.OPERATIONS.UpdateCustomer}/${id}`, 'POST', data, token)
}
//create category
export const createCategory = async ({
  token,
  data
}: {
  token: string
  data: Category
}): Promise<CreateCategoryResponse> => {
  return await apiCall(`${OUR_ENDPOINT.OPERATIONS.CreateCategory}`, 'POST', data, token)
}

//first delete request
export const deleteCategory = async ({
  token,
  id
}: {
  token: string
  id: string
}): Promise<CreateCategoryResponse> => {
  return await apiCall(`${OUR_ENDPOINT.OPERATIONS.DeleteCategory}/${id}`, 'GET', undefined, token)
}

//edit category
export const editCategory = async ({
  token,
  id,
  data
}: {
  token: string
  id: string
  data: Category
}): Promise<CreateCategoryResponse> => {
  return await apiCall(`${OUR_ENDPOINT.OPERATIONS.UpdateCategory}/${id}`, 'POST', data, token)
}
export const createSubCategory = async ({
  token,
  data
}: {
  token: string
  data: SubCategory
}): Promise<CreateCategoryResponse> => {
  return await apiCall(`${OUR_ENDPOINT.OPERATIONS.CreateSubCategory}`, 'POST', data, token)
}
export const createDepartment = async ({
  token,
  data
}: {
  token: string
  data: Department
}): Promise<CreateDepartmentResponse> => {
  return await apiCall(`${OUR_ENDPOINT.OPERATIONS.CreateDepartment}`, 'POST', data, token)
}
export const editDepartment = async ({
  token,
  data,
  id
}: {
  token: string
  data: Department,
  id: string
}): Promise<CreateDepartmentResponse> => {
  return await apiCall(`${OUR_ENDPOINT.OPERATIONS.UpdateDepartment}/${id}`, 'POST', data, token)
}
export const deleteDepartment = async ({
  token,
  id
}: {
  token: string
  id: string
}): Promise<CreateDepartmentResponse> => {
  return await apiCall(`${OUR_ENDPOINT.OPERATIONS.DeleteDepartment}/${id}`, 'GET', undefined, token)
}

export const createBanner = async ({
  token,
  data
}: {
  token: string
  data: Banner
}): Promise<CreateBannerResponse> => {
  return await apiCall(`${OUR_ENDPOINT.OPERATIONS.CreateBanner}`, 'POST', data, token)
}


export const getBanner= async ({ token }: { token: string }): Promise<AllBannerResponse> => {
  return await apiCall(`${OUR_ENDPOINT.OPERATIONS.GetBanner}`, 'GET', undefined, token)
}
export const editBanner = async ({
  token,
  data,
  id
}: {
  token: string
  data: Banner,
  id: string
}): Promise<CreateBannerResponse> => {
  return await apiCall(`${OUR_ENDPOINT.OPERATIONS.UpdateBanner}/${id}`, 'POST', data, token)
}
export const deleteBanner = async ({
  token,
  id
}: {
  token: string
  id: string
}): Promise<CreateBannerResponse> => {
  return await apiCall(`${OUR_ENDPOINT.OPERATIONS.DeleteBanner}/${id}`, 'GET', undefined, token)
}

export const createNotification = async ({
  token,
  data
}: {
  token: string
  data: Notification
}): Promise<NotificationResponse> => {
  return await apiCall(`${OUR_ENDPOINT.OPERATIONS.CreateBanner}`, 'POST', data, token)
}
export const getNotification= async ({ token }: { token: string }): Promise<NotificationResponse> => {
  return await apiCall(`${OUR_ENDPOINT.OPERATIONS.GetNotification}`, 'GET', undefined, token)
}
export const editNotification = async ({
  token,
  data,
  id
}: {
  token: string
  data: Notification,
  id: string
}): Promise<NotificationResponse> => {
  return await apiCall(`${OUR_ENDPOINT.OPERATIONS.UpdateNotification}/${id}`, 'POST', data, token)
}
export const deleteNotification = async ({
  token,
  id
}: {
  token: string
  id: string
}): Promise<NotificationResponse> => {
  return await apiCall(`${OUR_ENDPOINT.OPERATIONS.DeleteNotification}/${id}`, 'GET', undefined, token)
}
