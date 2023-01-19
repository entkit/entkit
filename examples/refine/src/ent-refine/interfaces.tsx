// Custom types
export type ER_String = string
export type ER_Number = number
export type ER_Boolean = boolean
export type ER_Date = Date
export type ER_UUID = string
export type ER_Image = string
export type ER_Code = string
export type ER_URL = string
export type ER_RichText = string
export type ER_StringList = ER_String[]
export type ER_NumberList = ER_Number[]


export enum ER_Enums_ProcessStatus{
    none = "none",
    done = "done",
    enqueued = "enqueued",
    in_progress = "in_progress",
    failed = "failed",
}


export interface ICompany {
    id: ER_UUID, // uuid.UUID
    name: ER_String, // string
    logo: ER_Image, // string
    description: ER_RichText, // string
    countries?: ICountry[],
    phones?: IPhone[],
    emails?: IEmail[],
    websites?: IWebsite[],
    locations?: ILocation[],
    logoImage?: IImage,
    galleryImages?: IImage[],
}
export interface ICountry {
    id: ER_UUID, // uuid.UUID
    name: ER_String, // string
    code: ER_String, // string
    companies?: ICompany[],
    phones?: IPhone[],
    emails?: IEmail[],
    websites?: IWebsite[],
    locations?: ILocation[],
}
export interface IEmail {
    id: ER_UUID, // uuid.UUID
    title: ER_String, // string
    description: ER_String, // string
    address: ER_String, // string
    company?: ICompany,
    country?: ICountry,
}
export interface IImage {
    id: ER_UUID, // uuid.UUID
    title: ER_String, // string
    originalURL: ER_Image, // string
    galleryCompany?: ICompany,
    logoCompany?: ICompany,
}
export interface ILocation {
    id: ER_UUID, // uuid.UUID
    title: ER_String, // string
    description: ER_String, // string
    latitude: ER_String, // float64
    longitude: ER_String, // float64
    address: ER_String, // string
    postcode: ER_String, // string
    type: ER_String, // string
    state: ER_String, // string
    suburb: ER_String, // string
    streetType: ER_String, // string
    streetName: ER_String, // string
    company?: ICompany,
    country?: ICountry,
}
export interface IPhone {
    id: ER_UUID, // uuid.UUID
    title: ER_String, // string
    description: ER_String, // string
    number: ER_String, // string
    type: ER_String, // string
    company?: ICompany,
    country?: ICountry,
}
export interface IProduct {
    id: ER_UUID, // uuid.UUID
    name: ER_String, // string
    description: ER_RichText, // string
    image: ER_Image, // string
    url: ER_URL, // string
    lastSell: ER_Date, // time.Time
    createdAt: ER_Date, // time.Time
    status: ER_Enums_ProcessStatus, // enums.ProcessStatus
    buildStatus: ER_Enums_ProcessStatus, // enums.ProcessStatus
    warehouse?: IWarehouse,
    vendor?: IVendor,
}
export interface IVendor {
    id: ER_UUID, // uuid.UUID
    name: ER_String, // string
    schema: ER_Code, // string
    warehouses?: IWarehouse[],
    products?: IProduct[],
}
export interface IWarehouse {
    id: ER_UUID, // uuid.UUID
    name: ER_String, // string
    lastUpdate: ER_Date, // time.Time
    originalData: ER_Code, // string
    enabled: ER_Boolean, // bool
    filters: ER_StringList, // []string
    products?: IProduct[],
    vendor?: IVendor,
}
export interface IWebsite {
    id: ER_UUID, // uuid.UUID
    title: ER_String, // string
    description: ER_String, // string
    url: ER_URL, // string
    company?: ICompany,
    country?: ICountry,
}