import React, { useState } from "react";
import * as RA from "@refinedev/antd";
import * as Tables from "./tables";
import * as Type from "./interfaces";
import * as Action from "./action";
export type CompanyListProps = RA.ListProps & {
    tableProps?: Tables.CompanyTableProps;
};
export const CompanyList: React.FC<CompanyListProps> = ({
    tableProps,
    ...props
}) => {
    const can = true;

    const [selectedRowKeys, setSelectedRowKeys] = useState<Type.EntID[]>([]);
    const rowSelection = { selectedRowKeys, onChange: setSelectedRowKeys };

    return can ? (
        <RA.List
            {...props}
            resource="company"
            headerButtons={({ defaultButtons }) => (
                <>
                    <Action.CompanyListAction
                        key="CompanyListAction"
                        recordItemIDs={selectedRowKeys}
                    />

                    {selectedRowKeys.length ? (
                        <>
                            <Action.CompanyDeleteAction
                                key="CompanyDeleteAction"
                                recordItemIDs={selectedRowKeys}
                                onSuccess={() => setSelectedRowKeys([])}
                            />
                        </>
                    ) : null}
                </>
            )}
        >
            <Tables.CompanyTable {...tableProps} rowSelection={rowSelection} />
        </RA.List>
    ) : null;
};
export type CountryListProps = RA.ListProps & {
    tableProps?: Tables.CountryTableProps;
};
export const CountryList: React.FC<CountryListProps> = ({
    tableProps,
    ...props
}) => {
    const can = true;

    const [selectedRowKeys, setSelectedRowKeys] = useState<Type.EntID[]>([]);
    const rowSelection = { selectedRowKeys, onChange: setSelectedRowKeys };

    return can ? (
        <RA.List
            {...props}
            resource="country"
            headerButtons={({ defaultButtons }) => (
                <>
                    <Action.CountryListAction
                        key="CountryListAction"
                        recordItemIDs={selectedRowKeys}
                    />

                    {selectedRowKeys.length ? (
                        <>
                            <Action.CountryDeleteAction
                                key="CountryDeleteAction"
                                recordItemIDs={selectedRowKeys}
                                onSuccess={() => setSelectedRowKeys([])}
                            />
                        </>
                    ) : null}
                </>
            )}
        >
            <Tables.CountryTable {...tableProps} rowSelection={rowSelection} />
        </RA.List>
    ) : null;
};
export type EmailListProps = RA.ListProps & {
    tableProps?: Tables.EmailTableProps;
};
export const EmailList: React.FC<EmailListProps> = ({
    tableProps,
    ...props
}) => {
    const can = true;

    const [selectedRowKeys, setSelectedRowKeys] = useState<Type.EntID[]>([]);
    const rowSelection = { selectedRowKeys, onChange: setSelectedRowKeys };

    return can ? (
        <RA.List
            {...props}
            resource="email"
            headerButtons={({ defaultButtons }) => (
                <>
                    <Action.EmailListAction
                        key="EmailListAction"
                        recordItemIDs={selectedRowKeys}
                    />

                    {selectedRowKeys.length ? (
                        <>
                            <Action.EmailDeleteAction
                                key="EmailDeleteAction"
                                recordItemIDs={selectedRowKeys}
                                onSuccess={() => setSelectedRowKeys([])}
                            />
                        </>
                    ) : null}
                </>
            )}
        >
            <Tables.EmailTable {...tableProps} rowSelection={rowSelection} />
        </RA.List>
    ) : null;
};
export type ImageListProps = RA.ListProps & {
    tableProps?: Tables.ImageTableProps;
};
export const ImageList: React.FC<ImageListProps> = ({
    tableProps,
    ...props
}) => {
    const can = true;

    const [selectedRowKeys, setSelectedRowKeys] = useState<Type.EntID[]>([]);
    const rowSelection = { selectedRowKeys, onChange: setSelectedRowKeys };

    return can ? (
        <RA.List
            {...props}
            resource="image"
            headerButtons={({ defaultButtons }) => (
                <>
                    <Action.ImageListAction
                        key="ImageListAction"
                        recordItemIDs={selectedRowKeys}
                    />

                    {selectedRowKeys.length ? (
                        <>
                            <Action.ImageDeleteAction
                                key="ImageDeleteAction"
                                recordItemIDs={selectedRowKeys}
                                onSuccess={() => setSelectedRowKeys([])}
                            />
                        </>
                    ) : null}
                </>
            )}
        >
            <Tables.ImageTable {...tableProps} rowSelection={rowSelection} />
        </RA.List>
    ) : null;
};
export type LocationListProps = RA.ListProps & {
    tableProps?: Tables.LocationTableProps;
};
export const LocationList: React.FC<LocationListProps> = ({
    tableProps,
    ...props
}) => {
    const can = true;

    const [selectedRowKeys, setSelectedRowKeys] = useState<Type.EntID[]>([]);
    const rowSelection = { selectedRowKeys, onChange: setSelectedRowKeys };

    return can ? (
        <RA.List
            {...props}
            resource="location"
            headerButtons={({ defaultButtons }) => (
                <>
                    <Action.LocationListAction
                        key="LocationListAction"
                        recordItemIDs={selectedRowKeys}
                    />

                    {selectedRowKeys.length ? (
                        <>
                            <Action.LocationDeleteAction
                                key="LocationDeleteAction"
                                recordItemIDs={selectedRowKeys}
                                onSuccess={() => setSelectedRowKeys([])}
                            />
                        </>
                    ) : null}
                </>
            )}
        >
            <Tables.LocationTable {...tableProps} rowSelection={rowSelection} />
        </RA.List>
    ) : null;
};
export type PhoneListProps = RA.ListProps & {
    tableProps?: Tables.PhoneTableProps;
};
export const PhoneList: React.FC<PhoneListProps> = ({
    tableProps,
    ...props
}) => {
    const can = true;

    const [selectedRowKeys, setSelectedRowKeys] = useState<Type.EntID[]>([]);
    const rowSelection = { selectedRowKeys, onChange: setSelectedRowKeys };

    return can ? (
        <RA.List
            {...props}
            resource="phone"
            headerButtons={({ defaultButtons }) => (
                <>
                    <Action.PhoneListAction
                        key="PhoneListAction"
                        recordItemIDs={selectedRowKeys}
                    />

                    {selectedRowKeys.length ? (
                        <>
                            <Action.PhoneDeleteAction
                                key="PhoneDeleteAction"
                                recordItemIDs={selectedRowKeys}
                                onSuccess={() => setSelectedRowKeys([])}
                            />
                        </>
                    ) : null}
                </>
            )}
        >
            <Tables.PhoneTable {...tableProps} rowSelection={rowSelection} />
        </RA.List>
    ) : null;
};
export type ProductListProps = RA.ListProps & {
    tableProps?: Tables.ProductTableProps;
};
export const ProductList: React.FC<ProductListProps> = ({
    tableProps,
    ...props
}) => {
    const can = true;

    const [selectedRowKeys, setSelectedRowKeys] = useState<Type.EntID[]>([]);
    const rowSelection = { selectedRowKeys, onChange: setSelectedRowKeys };

    return can ? (
        <RA.List
            {...props}
            resource="product"
            headerButtons={({ defaultButtons }) => (
                <>
                    <Action.ProductListAction
                        key="ProductListAction"
                        recordItemIDs={selectedRowKeys}
                    />

                    {selectedRowKeys.length ? (
                        <>
                            <Action.ProductDeleteAction
                                key="ProductDeleteAction"
                                recordItemIDs={selectedRowKeys}
                                onSuccess={() => setSelectedRowKeys([])}
                            />
                        </>
                    ) : null}
                </>
            )}
        >
            <Tables.ProductTable {...tableProps} rowSelection={rowSelection} />
        </RA.List>
    ) : null;
};
export type VendorListProps = RA.ListProps & {
    tableProps?: Tables.VendorTableProps;
};
export const VendorList: React.FC<VendorListProps> = ({
    tableProps,
    ...props
}) => {
    const can = true;

    const [selectedRowKeys, setSelectedRowKeys] = useState<Type.EntID[]>([]);
    const rowSelection = { selectedRowKeys, onChange: setSelectedRowKeys };

    return can ? (
        <RA.List
            {...props}
            resource="vendor"
            headerButtons={({ defaultButtons }) => (
                <>
                    <Action.VendorListAction
                        key="VendorListAction"
                        recordItemIDs={selectedRowKeys}
                    />

                    {selectedRowKeys.length ? (
                        <>
                            <Action.VendorDeleteAction
                                key="VendorDeleteAction"
                                recordItemIDs={selectedRowKeys}
                                onSuccess={() => setSelectedRowKeys([])}
                            />
                        </>
                    ) : null}
                </>
            )}
        >
            <Tables.VendorTable {...tableProps} rowSelection={rowSelection} />
        </RA.List>
    ) : null;
};
export type WarehouseListProps = RA.ListProps & {
    tableProps?: Tables.WarehouseTableProps;
};
export const WarehouseList: React.FC<WarehouseListProps> = ({
    tableProps,
    ...props
}) => {
    const can = true;

    const [selectedRowKeys, setSelectedRowKeys] = useState<Type.EntID[]>([]);
    const rowSelection = { selectedRowKeys, onChange: setSelectedRowKeys };

    return can ? (
        <RA.List
            {...props}
            resource="warehouse"
            headerButtons={({ defaultButtons }) => (
                <>
                    <Action.WarehouseListAction
                        key="WarehouseListAction"
                        recordItemIDs={selectedRowKeys}
                    />

                    {selectedRowKeys.length ? (
                        <>
                            <Action.WarehouseDeleteAction
                                key="WarehouseDeleteAction"
                                recordItemIDs={selectedRowKeys}
                                onSuccess={() => setSelectedRowKeys([])}
                            />
                        </>
                    ) : null}
                </>
            )}
        >
            <Tables.WarehouseTable
                {...tableProps}
                rowSelection={rowSelection}
            />
        </RA.List>
    ) : null;
};
export type WebsiteListProps = RA.ListProps & {
    tableProps?: Tables.WebsiteTableProps;
};
export const WebsiteList: React.FC<WebsiteListProps> = ({
    tableProps,
    ...props
}) => {
    const can = true;

    const [selectedRowKeys, setSelectedRowKeys] = useState<Type.EntID[]>([]);
    const rowSelection = { selectedRowKeys, onChange: setSelectedRowKeys };

    return can ? (
        <RA.List
            {...props}
            resource="website"
            headerButtons={({ defaultButtons }) => (
                <>
                    <Action.WebsiteListAction
                        key="WebsiteListAction"
                        recordItemIDs={selectedRowKeys}
                    />

                    {selectedRowKeys.length ? (
                        <>
                            <Action.WebsiteDeleteAction
                                key="WebsiteDeleteAction"
                                recordItemIDs={selectedRowKeys}
                                onSuccess={() => setSelectedRowKeys([])}
                            />
                        </>
                    ) : null}
                </>
            )}
        >
            <Tables.WebsiteTable {...tableProps} rowSelection={rowSelection} />
        </RA.List>
    ) : null;
};
