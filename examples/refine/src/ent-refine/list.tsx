import React from "react";
import {IResourceComponentsProps, HttpError} from "@pankod/refine-core";
import * as RA from "@pankod/refine-antd";
import * as Tables from "./tables";
import * as Interfaces from "./interfaces";

export const CompanyList :React.FC<IResourceComponentsProps & {extendTable?: RA.useTableProps<Interfaces.ICompany, HttpError>}> = ( props ) => {


    return <RA.List>
        <Tables.CompanyTable {...props} />
    </RA.List>
};

export const CountryList :React.FC<IResourceComponentsProps & {extendTable?: RA.useTableProps<Interfaces.ICountry, HttpError>}> = ( props ) => {
    return <RA.List>
        <Tables.CountryTable {...props} />
    </RA.List>
};

export const EmailList :React.FC<IResourceComponentsProps & {extendTable?: RA.useTableProps<Interfaces.IEmail, HttpError>}> = ( props ) => {
    return <RA.List>
        <Tables.EmailTable {...props} />
    </RA.List>
};

export const ImageList :React.FC<IResourceComponentsProps & {extendTable?: RA.useTableProps<Interfaces.IImage, HttpError>}> = ( props ) => {
    return <RA.List>
        <Tables.ImageTable {...props} />
    </RA.List>
};

export const LocationList :React.FC<IResourceComponentsProps & {extendTable?: RA.useTableProps<Interfaces.ILocation, HttpError>}> = ( props ) => {
    return <RA.List>
        <Tables.LocationTable {...props} />
    </RA.List>
};

export const PhoneList :React.FC<IResourceComponentsProps & {extendTable?: RA.useTableProps<Interfaces.IPhone, HttpError>}> = ( props ) => {
    return <RA.List>
        <Tables.PhoneTable {...props} />
    </RA.List>
};

export const ProductList :React.FC<IResourceComponentsProps & {extendTable?: RA.useTableProps<Interfaces.IProduct, HttpError>}> = ( props ) => {
    return <RA.List>
        <Tables.ProductTable {...props} />
    </RA.List>
};

export const VendorList :React.FC<IResourceComponentsProps & {extendTable?: RA.useTableProps<Interfaces.IVendor, HttpError>}> = ( props ) => {
    return <RA.List>
        <Tables.VendorTable {...props} />
    </RA.List>
};

export const WarehouseList :React.FC<IResourceComponentsProps & {extendTable?: RA.useTableProps<Interfaces.IWarehouse, HttpError>}> = ( props ) => {
    return <RA.List>
        <Tables.WarehouseTable {...props} />
    </RA.List>
};

export const WebsiteList :React.FC<IResourceComponentsProps & {extendTable?: RA.useTableProps<Interfaces.IWebsite, HttpError>}> = ( props ) => {
    return <RA.List>
        <Tables.WebsiteTable {...props} />
    </RA.List>
};