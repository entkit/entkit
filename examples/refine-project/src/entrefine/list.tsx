/* eslint no-use-before-define: 0 */
import React, {useEffect, useState} from "react";
import {IResourceComponentsProps, HttpError, useDeleteMany} from "@pankod/refine-core";
import * as RA from "@pankod/refine-antd";
import * as Tables from "./tables";
import * as Interfaces from "./interfaces";
export type CompanyListProps = RA.ListProps & { tableProps?: Tables.CompanyTableProps}
export const CompanyList :React.FC<CompanyListProps> = ({tableProps, ...props} ) => {

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const rowSelection = {selectedRowKeys, onChange: setSelectedRowKeys};
    const { mutate } = useDeleteMany<Interfaces.ICompany>();

    return <RA.List {...props} resource="Company" headerButtons={({ defaultButtons }) => (
        <>
            {defaultButtons}
            {selectedRowKeys.length ?
                <RA.Popconfirm
                    key="delete"
                    okText="Delete all"
                    cancelText="Cancel"
                    okType="primary"
                    title="Are you sure?"
                    onConfirm={(): void => {
                        mutate({
                            resource: "Company",
                            ids: selectedRowKeys,
                            mutationMode: "optimistic",
                        });
                    }}
                >
                    <RA.Button icon={<RA.Icons.DeleteOutlined />} type="primary" danger>Delete selected</RA.Button>
                </RA.Popconfirm>
                : null}
        </>
    )}>
        <Tables.CompanyTable {...tableProps} rowSelection={rowSelection}/>
    </RA.List>
};
export type CountryListProps = RA.ListProps & { tableProps?: Tables.CountryTableProps}
export const CountryList :React.FC<CountryListProps> = ({tableProps, ...props} ) => {

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const rowSelection = {selectedRowKeys, onChange: setSelectedRowKeys};
    const { mutate } = useDeleteMany<Interfaces.ICountry>();

    return <RA.List {...props} resource="Country" headerButtons={({ defaultButtons }) => (
        <>
            {defaultButtons}
            {selectedRowKeys.length ?
                <RA.Popconfirm
                    key="delete"
                    okText="Delete all"
                    cancelText="Cancel"
                    okType="primary"
                    title="Are you sure?"
                    onConfirm={(): void => {
                        mutate({
                            resource: "Country",
                            ids: selectedRowKeys,
                            mutationMode: "optimistic",
                        });
                    }}
                >
                    <RA.Button icon={<RA.Icons.DeleteOutlined />} type="primary" danger>Delete selected</RA.Button>
                </RA.Popconfirm>
                : null}
        </>
    )}>
        <Tables.CountryTable {...tableProps} rowSelection={rowSelection}/>
    </RA.List>
};
export type EmailListProps = RA.ListProps & { tableProps?: Tables.EmailTableProps}
export const EmailList :React.FC<EmailListProps> = ({tableProps, ...props} ) => {

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const rowSelection = {selectedRowKeys, onChange: setSelectedRowKeys};
    const { mutate } = useDeleteMany<Interfaces.IEmail>();

    return <RA.List {...props} resource="Email" headerButtons={({ defaultButtons }) => (
        <>
            {defaultButtons}
            {selectedRowKeys.length ?
                <RA.Popconfirm
                    key="delete"
                    okText="Delete all"
                    cancelText="Cancel"
                    okType="primary"
                    title="Are you sure?"
                    onConfirm={(): void => {
                        mutate({
                            resource: "Email",
                            ids: selectedRowKeys,
                            mutationMode: "optimistic",
                        });
                    }}
                >
                    <RA.Button icon={<RA.Icons.DeleteOutlined />} type="primary" danger>Delete selected</RA.Button>
                </RA.Popconfirm>
                : null}
        </>
    )}>
        <Tables.EmailTable {...tableProps} rowSelection={rowSelection}/>
    </RA.List>
};
export type ImageListProps = RA.ListProps & { tableProps?: Tables.ImageTableProps}
export const ImageList :React.FC<ImageListProps> = ({tableProps, ...props} ) => {

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const rowSelection = {selectedRowKeys, onChange: setSelectedRowKeys};
    const { mutate } = useDeleteMany<Interfaces.IImage>();

    return <RA.List {...props} resource="Image" headerButtons={({ defaultButtons }) => (
        <>
            {defaultButtons}
            {selectedRowKeys.length ?
                <RA.Popconfirm
                    key="delete"
                    okText="Delete all"
                    cancelText="Cancel"
                    okType="primary"
                    title="Are you sure?"
                    onConfirm={(): void => {
                        mutate({
                            resource: "Image",
                            ids: selectedRowKeys,
                            mutationMode: "optimistic",
                        });
                    }}
                >
                    <RA.Button icon={<RA.Icons.DeleteOutlined />} type="primary" danger>Delete selected</RA.Button>
                </RA.Popconfirm>
                : null}
        </>
    )}>
        <Tables.ImageTable {...tableProps} rowSelection={rowSelection}/>
    </RA.List>
};
export type LocationListProps = RA.ListProps & { tableProps?: Tables.LocationTableProps}
export const LocationList :React.FC<LocationListProps> = ({tableProps, ...props} ) => {

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const rowSelection = {selectedRowKeys, onChange: setSelectedRowKeys};
    const { mutate } = useDeleteMany<Interfaces.ILocation>();

    return <RA.List {...props} resource="Location" headerButtons={({ defaultButtons }) => (
        <>
            {defaultButtons}
            {selectedRowKeys.length ?
                <RA.Popconfirm
                    key="delete"
                    okText="Delete all"
                    cancelText="Cancel"
                    okType="primary"
                    title="Are you sure?"
                    onConfirm={(): void => {
                        mutate({
                            resource: "Location",
                            ids: selectedRowKeys,
                            mutationMode: "optimistic",
                        });
                    }}
                >
                    <RA.Button icon={<RA.Icons.DeleteOutlined />} type="primary" danger>Delete selected</RA.Button>
                </RA.Popconfirm>
                : null}
        </>
    )}>
        <Tables.LocationTable {...tableProps} rowSelection={rowSelection}/>
    </RA.List>
};
export type PhoneListProps = RA.ListProps & { tableProps?: Tables.PhoneTableProps}
export const PhoneList :React.FC<PhoneListProps> = ({tableProps, ...props} ) => {

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const rowSelection = {selectedRowKeys, onChange: setSelectedRowKeys};
    const { mutate } = useDeleteMany<Interfaces.IPhone>();

    return <RA.List {...props} resource="Phone" headerButtons={({ defaultButtons }) => (
        <>
            {defaultButtons}
            {selectedRowKeys.length ?
                <RA.Popconfirm
                    key="delete"
                    okText="Delete all"
                    cancelText="Cancel"
                    okType="primary"
                    title="Are you sure?"
                    onConfirm={(): void => {
                        mutate({
                            resource: "Phone",
                            ids: selectedRowKeys,
                            mutationMode: "optimistic",
                        });
                    }}
                >
                    <RA.Button icon={<RA.Icons.DeleteOutlined />} type="primary" danger>Delete selected</RA.Button>
                </RA.Popconfirm>
                : null}
        </>
    )}>
        <Tables.PhoneTable {...tableProps} rowSelection={rowSelection}/>
    </RA.List>
};
export type ProductListProps = RA.ListProps & { tableProps?: Tables.ProductTableProps}
export const ProductList :React.FC<ProductListProps> = ({tableProps, ...props} ) => {

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const rowSelection = {selectedRowKeys, onChange: setSelectedRowKeys};
    const { mutate } = useDeleteMany<Interfaces.IProduct>();

    return <RA.List {...props} resource="Product" headerButtons={({ defaultButtons }) => (
        <>
            {defaultButtons}
            {selectedRowKeys.length ?
                <RA.Popconfirm
                    key="delete"
                    okText="Delete all"
                    cancelText="Cancel"
                    okType="primary"
                    title="Are you sure?"
                    onConfirm={(): void => {
                        mutate({
                            resource: "Product",
                            ids: selectedRowKeys,
                            mutationMode: "optimistic",
                        });
                    }}
                >
                    <RA.Button icon={<RA.Icons.DeleteOutlined />} type="primary" danger>Delete selected</RA.Button>
                </RA.Popconfirm>
                : null}
        </>
    )}>
        <Tables.ProductTable {...tableProps} rowSelection={rowSelection}/>
    </RA.List>
};
export type VendorListProps = RA.ListProps & { tableProps?: Tables.VendorTableProps}
export const VendorList :React.FC<VendorListProps> = ({tableProps, ...props} ) => {

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const rowSelection = {selectedRowKeys, onChange: setSelectedRowKeys};
    const { mutate } = useDeleteMany<Interfaces.IVendor>();

    return <RA.List {...props} resource="Vendor" headerButtons={({ defaultButtons }) => (
        <>
            {defaultButtons}
            {selectedRowKeys.length ?
                <RA.Popconfirm
                    key="delete"
                    okText="Delete all"
                    cancelText="Cancel"
                    okType="primary"
                    title="Are you sure?"
                    onConfirm={(): void => {
                        mutate({
                            resource: "Vendor",
                            ids: selectedRowKeys,
                            mutationMode: "optimistic",
                        });
                    }}
                >
                    <RA.Button icon={<RA.Icons.DeleteOutlined />} type="primary" danger>Delete selected</RA.Button>
                </RA.Popconfirm>
                : null}
        </>
    )}>
        <Tables.VendorTable {...tableProps} rowSelection={rowSelection}/>
    </RA.List>
};
export type WarehouseListProps = RA.ListProps & { tableProps?: Tables.WarehouseTableProps}
export const WarehouseList :React.FC<WarehouseListProps> = ({tableProps, ...props} ) => {

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const rowSelection = {selectedRowKeys, onChange: setSelectedRowKeys};
    const { mutate } = useDeleteMany<Interfaces.IWarehouse>();

    return <RA.List {...props} resource="Warehouse" headerButtons={({ defaultButtons }) => (
        <>
            {defaultButtons}
            {selectedRowKeys.length ?
                <RA.Popconfirm
                    key="delete"
                    okText="Delete all"
                    cancelText="Cancel"
                    okType="primary"
                    title="Are you sure?"
                    onConfirm={(): void => {
                        mutate({
                            resource: "Warehouse",
                            ids: selectedRowKeys,
                            mutationMode: "optimistic",
                        });
                    }}
                >
                    <RA.Button icon={<RA.Icons.DeleteOutlined />} type="primary" danger>Delete selected</RA.Button>
                </RA.Popconfirm>
                : null}
        </>
    )}>
        <Tables.WarehouseTable {...tableProps} rowSelection={rowSelection}/>
    </RA.List>
};
export type WebsiteListProps = RA.ListProps & { tableProps?: Tables.WebsiteTableProps}
export const WebsiteList :React.FC<WebsiteListProps> = ({tableProps, ...props} ) => {

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const rowSelection = {selectedRowKeys, onChange: setSelectedRowKeys};
    const { mutate } = useDeleteMany<Interfaces.IWebsite>();

    return <RA.List {...props} resource="Website" headerButtons={({ defaultButtons }) => (
        <>
            {defaultButtons}
            {selectedRowKeys.length ?
                <RA.Popconfirm
                    key="delete"
                    okText="Delete all"
                    cancelText="Cancel"
                    okType="primary"
                    title="Are you sure?"
                    onConfirm={(): void => {
                        mutate({
                            resource: "Website",
                            ids: selectedRowKeys,
                            mutationMode: "optimistic",
                        });
                    }}
                >
                    <RA.Button icon={<RA.Icons.DeleteOutlined />} type="primary" danger>Delete selected</RA.Button>
                </RA.Popconfirm>
                : null}
        </>
    )}>
        <Tables.WebsiteTable {...tableProps} rowSelection={rowSelection}/>
    </RA.List>
};/* eslint no-use-before-define: 2 */