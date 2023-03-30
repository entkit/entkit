// Custom types
export type EntString = string;
export type EntNumber = number;
export type EntBoolean = boolean;
export type EntDate = Date;
export type EntUUID = string;
export type EntImage = string;
export type EntCode = string;
export type EntURL = string;
export type EntRichText = string;
export type EntStringList = EntString[];
export type EntNumberList = EntNumber[];
export type EntID = EntUUID | EntNumber;

export enum EntEnumsProcessStatus {
    "none" = "none",
    "done" = "done",
    "enqueued" = "enqueued",
    "in_progress" = "in_progress",
    "failed" = "failed",
}

interface gqlField<T> {
    edges?: {
        nodes?: Array<T>;
    };
    totalCount?: number;
}

export interface ICompany {
    id: EntUUID; // uuid.UUID
    name: EntString; // string
    description: EntRichText; // string
    countries?: ICountry[];
    _countries?: gqlField<ICountry>;
    phones?: IPhone[];
    _phones?: gqlField<IPhone>;
    emails?: IEmail[];
    _emails?: gqlField<IEmail>;
    websites?: IWebsite[];
    _websites?: gqlField<IWebsite>;
    locations?: ILocation[];
    _locations?: gqlField<ILocation>;
    logoImage?: IImage;
    coverImage?: IImage;
    galleryImages?: IImage[];
    _galleryImages?: gqlField<IImage>;
}
export interface ICountry {
    id: EntUUID; // uuid.UUID
    name: EntString; // string
    code: EntString; // string
    companies?: ICompany[];
    _companies?: gqlField<ICompany>;
    phones?: IPhone[];
    _phones?: gqlField<IPhone>;
    emails?: IEmail[];
    _emails?: gqlField<IEmail>;
    websites?: IWebsite[];
    _websites?: gqlField<IWebsite>;
    locations?: ILocation[];
    _locations?: gqlField<ILocation>;
}
export interface IEmail {
    id: EntUUID; // uuid.UUID
    title: EntString; // string
    description: EntString; // string
    address: EntString; // string
    company?: ICompany;
    country?: ICountry;
}
export interface IImage {
    id: EntUUID; // uuid.UUID
    title: EntString; // string
    originalURL: EntImage; // string
    galleryCompany?: ICompany;
    logoCompany?: ICompany;
    coverCompany?: ICompany;
}
export interface ILocation {
    id: EntUUID; // uuid.UUID
    title: EntString; // string
    description: EntString; // string
    latitude: EntString; // float64
    longitude: EntString; // float64
    address: EntString; // string
    postcode: EntString; // string
    type: EntString; // string
    state: EntString; // string
    suburb: EntString; // string
    streetType: EntString; // string
    streetName: EntString; // string
    company?: ICompany;
    country?: ICountry;
}
export interface IPhone {
    id: EntUUID; // uuid.UUID
    title: EntString; // string
    description: EntString; // string
    number: EntString; // string
    type: EntString; // string
    company?: ICompany;
    country?: ICountry;
}
export interface IProduct {
    id: EntUUID; // uuid.UUID
    name: EntString; // string
    description: EntRichText; // string
    image: EntImage; // string
    url: EntURL; // string
    lastSell: EntDate; // time.Time
    createdAt: EntDate; // time.Time
    status: EntEnumsProcessStatus; // enums.ProcessStatus
    buildStatus: EntEnumsProcessStatus; // enums.ProcessStatus
    warehouse?: IWarehouse;
    vendor?: IVendor;
}
export interface IVendor {
    id: EntUUID; // uuid.UUID
    name: EntString; // string
    schema: EntCode; // string
    warehouses?: IWarehouse[];
    _warehouses?: gqlField<IWarehouse>;
    products?: IProduct[];
    _products?: gqlField<IProduct>;
}
export interface IWarehouse {
    id: EntUUID; // uuid.UUID
    name: EntString; // string
    lastUpdate: EntDate; // time.Time
    originalData: EntCode; // string
    enabled: EntBoolean; // bool
    filters: EntStringList; // []string
    products?: IProduct[];
    _products?: gqlField<IProduct>;
    vendor?: IVendor;
}
export interface IWebsite {
    id: EntUUID; // uuid.UUID
    title: EntString; // string
    description: EntString; // string
    url: EntURL; // string
    company?: ICompany;
    country?: ICountry;
}
