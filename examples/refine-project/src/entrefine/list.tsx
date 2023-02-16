/* eslint no-use-before-define: 0 */
import React, {useState} from "react";
import * as RA from "@pankod/refine-antd";
import * as Tables from "./tables";
import * as Type from "./interfaces";
import * as Action from "./action";
export type CompanyListProps = RA.ListProps & { tableProps?: Tables.CompanyTableProps}
export const CompanyList :React.FC<CompanyListProps> = ({tableProps, ...props} ) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<Type.EntID[]>([]);
    const rowSelection = {selectedRowKeys, onChange: setSelectedRowKeys};

    return <RA.List {...props} resource="Company" headerButtons={({ defaultButtons }) => (
        <>
            {defaultButtons}
            {selectedRowKeys.length ? <>
                <Action.CompanyDeleteAction
                    key="CompanyDeleteAction"
                    recordItemIDs={ selectedRowKeys }
                    onSuccess={ ()=>{
                        setSelectedRowKeys([]);
                    } }
                />
            </> : null }
        </>
    )}>
        <Tables.CompanyTable {...tableProps} rowSelection={rowSelection}/>
    </RA.List>
};
export type CountryListProps = RA.ListProps & { tableProps?: Tables.CountryTableProps}
export const CountryList :React.FC<CountryListProps> = ({tableProps, ...props} ) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<Type.EntID[]>([]);
    const rowSelection = {selectedRowKeys, onChange: setSelectedRowKeys};

    return <RA.List {...props} resource="Country" headerButtons={({ defaultButtons }) => (
        <>
            {defaultButtons}
            {selectedRowKeys.length ? <>
                <Action.CountryDeleteAction
                    key="CountryDeleteAction"
                    recordItemIDs={ selectedRowKeys }
                    onSuccess={ ()=>{
                        setSelectedRowKeys([]);
                    } }
                />
            </> : null }
        </>
    )}>
        <Tables.CountryTable {...tableProps} rowSelection={rowSelection}/>
    </RA.List>
};
export type EmailListProps = RA.ListProps & { tableProps?: Tables.EmailTableProps}
export const EmailList :React.FC<EmailListProps> = ({tableProps, ...props} ) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<Type.EntID[]>([]);
    const rowSelection = {selectedRowKeys, onChange: setSelectedRowKeys};

    return <RA.List {...props} resource="Email" headerButtons={({ defaultButtons }) => (
        <>
            {defaultButtons}
            {selectedRowKeys.length ? <>
                <Action.EmailDeleteAction
                    key="EmailDeleteAction"
                    recordItemIDs={ selectedRowKeys }
                    onSuccess={ ()=>{
                        setSelectedRowKeys([]);
                    } }
                />
            </> : null }
        </>
    )}>
        <Tables.EmailTable {...tableProps} rowSelection={rowSelection}/>
    </RA.List>
};
export type ImageListProps = RA.ListProps & { tableProps?: Tables.ImageTableProps}
export const ImageList :React.FC<ImageListProps> = ({tableProps, ...props} ) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<Type.EntID[]>([]);
    const rowSelection = {selectedRowKeys, onChange: setSelectedRowKeys};

    return <RA.List {...props} resource="Image" headerButtons={({ defaultButtons }) => (
        <>
            {defaultButtons}
            {selectedRowKeys.length ? <>
                <Action.ImageDeleteAction
                    key="ImageDeleteAction"
                    recordItemIDs={ selectedRowKeys }
                    onSuccess={ ()=>{
                        setSelectedRowKeys([]);
                    } }
                />
            </> : null }
        </>
    )}>
        <Tables.ImageTable {...tableProps} rowSelection={rowSelection}/>
    </RA.List>
};
export type LocationListProps = RA.ListProps & { tableProps?: Tables.LocationTableProps}
export const LocationList :React.FC<LocationListProps> = ({tableProps, ...props} ) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<Type.EntID[]>([]);
    const rowSelection = {selectedRowKeys, onChange: setSelectedRowKeys};

    return <RA.List {...props} resource="Location" headerButtons={({ defaultButtons }) => (
        <>
            {defaultButtons}
            {selectedRowKeys.length ? <>
                <Action.LocationDeleteAction
                    key="LocationDeleteAction"
                    recordItemIDs={ selectedRowKeys }
                    onSuccess={ ()=>{
                        setSelectedRowKeys([]);
                    } }
                />
            </> : null }
        </>
    )}>
        <Tables.LocationTable {...tableProps} rowSelection={rowSelection}/>
    </RA.List>
};
export type PhoneListProps = RA.ListProps & { tableProps?: Tables.PhoneTableProps}
export const PhoneList :React.FC<PhoneListProps> = ({tableProps, ...props} ) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<Type.EntID[]>([]);
    const rowSelection = {selectedRowKeys, onChange: setSelectedRowKeys};

    return <RA.List {...props} resource="Phone" headerButtons={({ defaultButtons }) => (
        <>
            {defaultButtons}
            {selectedRowKeys.length ? <>
                <Action.PhoneDeleteAction
                    key="PhoneDeleteAction"
                    recordItemIDs={ selectedRowKeys }
                    onSuccess={ ()=>{
                        setSelectedRowKeys([]);
                    } }
                />
            </> : null }
        </>
    )}>
        <Tables.PhoneTable {...tableProps} rowSelection={rowSelection}/>
    </RA.List>
};
export type ProductListProps = RA.ListProps & { tableProps?: Tables.ProductTableProps}
export const ProductList :React.FC<ProductListProps> = ({tableProps, ...props} ) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<Type.EntID[]>([]);
    const rowSelection = {selectedRowKeys, onChange: setSelectedRowKeys};

    return <RA.List {...props} resource="Product" headerButtons={({ defaultButtons }) => (
        <>
            {defaultButtons}
            {selectedRowKeys.length ? <>
                <Action.ProductDeleteAction
                    key="ProductDeleteAction"
                    recordItemIDs={ selectedRowKeys }
                    onSuccess={ ()=>{
                        setSelectedRowKeys([]);
                    } }
                />
            </> : null }
        </>
    )}>
        <Tables.ProductTable {...tableProps} rowSelection={rowSelection}/>
    </RA.List>
};
export type VendorListProps = RA.ListProps & { tableProps?: Tables.VendorTableProps}
export const VendorList :React.FC<VendorListProps> = ({tableProps, ...props} ) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<Type.EntID[]>([]);
    const rowSelection = {selectedRowKeys, onChange: setSelectedRowKeys};

    return <RA.List {...props} resource="Vendor" headerButtons={({ defaultButtons }) => (
        <>
            {defaultButtons}
            {selectedRowKeys.length ? <>
                <Action.VendorDeleteAction
                    key="VendorDeleteAction"
                    recordItemIDs={ selectedRowKeys }
                    onSuccess={ ()=>{
                        setSelectedRowKeys([]);
                    } }
                />
            </> : null }
        </>
    )}>
        <Tables.VendorTable {...tableProps} rowSelection={rowSelection}/>
    </RA.List>
};
export type WarehouseListProps = RA.ListProps & { tableProps?: Tables.WarehouseTableProps}
export const WarehouseList :React.FC<WarehouseListProps> = ({tableProps, ...props} ) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<Type.EntID[]>([]);
    const rowSelection = {selectedRowKeys, onChange: setSelectedRowKeys};

    return <RA.List {...props} resource="Warehouse" headerButtons={({ defaultButtons }) => (
        <>
            {defaultButtons}
            {selectedRowKeys.length ? <>
                <Action.WarehouseDeleteAction
                    key="WarehouseDeleteAction"
                    recordItemIDs={ selectedRowKeys }
                    onSuccess={ ()=>{
                        setSelectedRowKeys([]);
                    } }
                />
            </> : null }
        </>
    )}>
        <Tables.WarehouseTable {...tableProps} rowSelection={rowSelection}/>
    </RA.List>
};
export type WebsiteListProps = RA.ListProps & { tableProps?: Tables.WebsiteTableProps}
export const WebsiteList :React.FC<WebsiteListProps> = ({tableProps, ...props} ) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<Type.EntID[]>([]);
    const rowSelection = {selectedRowKeys, onChange: setSelectedRowKeys};

    return <RA.List {...props} resource="Website" headerButtons={({ defaultButtons }) => (
        <>
            {defaultButtons}
            {selectedRowKeys.length ? <>
                <Action.WebsiteDeleteAction
                    key="WebsiteDeleteAction"
                    recordItemIDs={ selectedRowKeys }
                    onSuccess={ ()=>{
                        setSelectedRowKeys([]);
                    } }
                />
            </> : null }
        </>
    )}>
        <Tables.WebsiteTable {...tableProps} rowSelection={rowSelection}/>
    </RA.List>
};/* eslint no-use-before-define: 2 */