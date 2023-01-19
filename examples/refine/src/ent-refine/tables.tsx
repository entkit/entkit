import React, {useState} from "react";
import {IResourceComponentsProps, HttpError} from "@pankod/refine-core";
import * as RA from "@pankod/refine-antd";
import * as Interfaces from "./interfaces";
import { Cursors } from "./data-provider";
import * as Custom from "./custom";
import * as FieldView from "./field-view";


export const CompanyTable :React.FC<IResourceComponentsProps & {extendTable?: RA.useTableProps<Interfaces.ICompany, HttpError>}> = ( props ) => {

    const [cursors, setCursors] = useState<Cursors>({
        first: 10,
    })

    const [perPage, setPerPage] = useState<number>(10)
    const table = RA.useTable<Interfaces.ICompany>({
        resource: "Company",
        initialSorter: [
            {
                field: "name",
                order: "asc",
            },
        ],
        initialFilter: [
            {
                field: "id",
                value: null,
                operator: "eq",
            },{
                field: "name",
                value: null,
                operator: "contains",
            },{
                field: "logo",
                value: null,
                operator: "eq",
            },],
        metaData: {
            fields: [
                "id",
                "name",
                "logo",
                "description",
            ],
            cursors,
        },
        hasPagination: true,
        ...props.extendTable,
    });

    const data = table.tableQueryResult.data as any

    return (
        <>
            <RA.Table {...table.tableProps} pagination={false} rowKey="id">
                <RA.Table.Column
                    dataIndex="id"
                    title="Id"
                    render={ (value)=> {
                        return <FieldView.ER_UUIDViewOnList value={ value } />
                    } }
                    filterDropdown={(props) => (
                        <RA.FilterDropdown {...props}>
                            <RA.Input />
                        </RA.FilterDropdown>
                    )}
                    defaultSortOrder={RA.getDefaultSortOrder("id", table.sorter)}
                />
                <RA.Table.Column
                    dataIndex="name"
                    title="Name"
                    sorter={
                        {}
                    }
                    render={ (value)=> {
                        
                        return <Custom.MyCustomTitle value={ value } />
                    } }
                    filterDropdown={(props) => (
                        <RA.FilterDropdown {...props}>
                            <RA.Input />
                        </RA.FilterDropdown>
                    )}
                    defaultSortOrder={RA.getDefaultSortOrder("name", table.sorter)}
                />
                <RA.Table.Column
                    dataIndex="logo"
                    title="Logo"
                    sorter={
                        {}
                    }
                    render={ (value)=> {
                        return <FieldView.ER_ImageViewOnList value={ value } />
                    } }
                    filterDropdown={(props) => (
                        <RA.FilterDropdown {...props}>
                            <RA.Input />
                        </RA.FilterDropdown>
                    )}
                    defaultSortOrder={RA.getDefaultSortOrder("logo", table.sorter)}
                />
                <RA.Table.Column<Interfaces.ICompany>
                    title="Actions"
                    dataIndex="actions"
                    render={(_, record) => (
                        <RA.Space>
                            <RA.ShowButton
                                hideText={true}
                                resource="Company"
                                resourceNameOrRouteName="Company"
                                size="small"
                                recordItemId={record.id}
                            />
                            <RA.DeleteButton
                                hideText={true}
                                resource="Company"
                                resourceNameOrRouteName="Company"
                                size="small"
                                recordItemId={record.id}
                            />
                            <RA.EditButton
                                hideText={true}
                                resource="Company"
                                resourceNameOrRouteName="Company"
                                size="small"
                                recordItemId={record.id}
                            />
                        </RA.Space>
                    )}
                />
            </RA.Table>

            <RA.Space style={ {marginTop: 20} }>
                <RA.Typography.Text type="secondary">Total {data?.total || 0}</RA.Typography.Text>
                <RA.Button
                    disabled={!Boolean(data?.pageInfo?.hasPreviousPage)}
                    onClick={() => {
                        setCursors((ov)=>({
                            ...ov,
                            before: data?.pageInfo?.startCursor,
                            last: perPage,
                            after: undefined,
                            first: undefined,
                        }))
                    }
                    }>
                    <RA.Icons.LeftOutlined/>
                    Prev
                </RA.Button>
                <RA.Button
                    disabled={!Boolean(data?.pageInfo?.hasNextPage)}
                    onClick={() => {
                        setCursors((ov)=>{
                            return {
                                ...ov,
                                after: data?.pageInfo?.endCursor,
                                first: perPage,
                                before: undefined,
                                last: undefined,
                            }
                        })
                    }}>
                    Next
                    <RA.Icons.RightOutlined/>
                </RA.Button>
                <RA.Select
                    labelInValue
                    defaultValue={ { value: 10, label: '10 / page' } }
                    style={ { width: 110 } }
                    onChange={(value)=>{
                        setPerPage(value.value)
                        setCursors((ov)=>({
                            ...ov,
                            // Return to first page
                            first: value.value,
                            last: undefined,
                            before: undefined,
                            after: undefined,
                        }))
                    }}
                    options={[
                        {value: 10, label: '10 / page'},
                        {value: 20, label: '20 / page'},
                        {value: 50, label: '50 / page'},
                        {value: 100, label: '100 / page'},
                    ]}
                />
            </RA.Space>
        </>
    );
};
export const CountryTable :React.FC<IResourceComponentsProps & {extendTable?: RA.useTableProps<Interfaces.ICountry, HttpError>}> = ( props ) => {

    const [cursors, setCursors] = useState<Cursors>({
        first: 10,
    })

    const [perPage, setPerPage] = useState<number>(10)
    const table = RA.useTable<Interfaces.ICountry>({
        resource: "Country",
        initialSorter: [
            {
                field: "name",
                order: "asc",
            },
        ],
        initialFilter: [
            {
                field: "id",
                value: null,
                operator: "eq",
            },{
                field: "name",
                value: null,
                operator: "contains",
            },{
                field: "code",
                value: null,
                operator: "eq",
            },],
        metaData: {
            fields: [
                "id",
                "name",
                "code",
            ],
            cursors,
        },
        hasPagination: true,
        ...props.extendTable,
    });

    const data = table.tableQueryResult.data as any

    return (
        <>
            <RA.Table {...table.tableProps} pagination={false} rowKey="id">
                <RA.Table.Column
                    dataIndex="id"
                    title="Id"
                    render={ (value)=> {
                        return <FieldView.ER_UUIDViewOnList value={ value } />
                    } }
                    filterDropdown={(props) => (
                        <RA.FilterDropdown {...props}>
                            <RA.Input />
                        </RA.FilterDropdown>
                    )}
                    defaultSortOrder={RA.getDefaultSortOrder("id", table.sorter)}
                />
                <RA.Table.Column
                    dataIndex="name"
                    title="Name"
                    sorter={
                        {}
                    }
                    render={ (value)=> {
                        return <FieldView.ER_StringViewOnList value={ value } />
                    } }
                    filterDropdown={(props) => (
                        <RA.FilterDropdown {...props}>
                            <RA.Input />
                        </RA.FilterDropdown>
                    )}
                    defaultSortOrder={RA.getDefaultSortOrder("name", table.sorter)}
                />
                <RA.Table.Column
                    dataIndex="code"
                    title="Code"
                    sorter={
                        {}
                    }
                    render={ (value)=> {
                        return <FieldView.ER_StringViewOnList value={ value } />
                    } }
                    filterDropdown={(props) => (
                        <RA.FilterDropdown {...props}>
                            <RA.Input />
                        </RA.FilterDropdown>
                    )}
                    defaultSortOrder={RA.getDefaultSortOrder("code", table.sorter)}
                />
                <RA.Table.Column<Interfaces.ICountry>
                    title="Actions"
                    dataIndex="actions"
                    render={(_, record) => (
                        <RA.Space>
                            <RA.ShowButton
                                hideText={true}
                                resource="Country"
                                resourceNameOrRouteName="Country"
                                size="small"
                                recordItemId={record.id}
                            />
                            <RA.DeleteButton
                                hideText={true}
                                resource="Country"
                                resourceNameOrRouteName="Country"
                                size="small"
                                recordItemId={record.id}
                            />
                            <RA.EditButton
                                hideText={true}
                                resource="Country"
                                resourceNameOrRouteName="Country"
                                size="small"
                                recordItemId={record.id}
                            />
                        </RA.Space>
                    )}
                />
            </RA.Table>

            <RA.Space style={ {marginTop: 20} }>
                <RA.Typography.Text type="secondary">Total {data?.total || 0}</RA.Typography.Text>
                <RA.Button
                    disabled={!Boolean(data?.pageInfo?.hasPreviousPage)}
                    onClick={() => {
                        setCursors((ov)=>({
                            ...ov,
                            before: data?.pageInfo?.startCursor,
                            last: perPage,
                            after: undefined,
                            first: undefined,
                        }))
                    }
                    }>
                    <RA.Icons.LeftOutlined/>
                    Prev
                </RA.Button>
                <RA.Button
                    disabled={!Boolean(data?.pageInfo?.hasNextPage)}
                    onClick={() => {
                        setCursors((ov)=>{
                            return {
                                ...ov,
                                after: data?.pageInfo?.endCursor,
                                first: perPage,
                                before: undefined,
                                last: undefined,
                            }
                        })
                    }}>
                    Next
                    <RA.Icons.RightOutlined/>
                </RA.Button>
                <RA.Select
                    labelInValue
                    defaultValue={ { value: 10, label: '10 / page' } }
                    style={ { width: 110 } }
                    onChange={(value)=>{
                        setPerPage(value.value)
                        setCursors((ov)=>({
                            ...ov,
                            // Return to first page
                            first: value.value,
                            last: undefined,
                            before: undefined,
                            after: undefined,
                        }))
                    }}
                    options={[
                        {value: 10, label: '10 / page'},
                        {value: 20, label: '20 / page'},
                        {value: 50, label: '50 / page'},
                        {value: 100, label: '100 / page'},
                    ]}
                />
            </RA.Space>
        </>
    );
};
export const EmailTable :React.FC<IResourceComponentsProps & {extendTable?: RA.useTableProps<Interfaces.IEmail, HttpError>}> = ( props ) => {

    const [cursors, setCursors] = useState<Cursors>({
        first: 10,
    })

    const [perPage, setPerPage] = useState<number>(10)
    const table = RA.useTable<Interfaces.IEmail>({
        resource: "Email",
        initialSorter: [
            {
                field: "title",
                order: "asc",
            },
        ],
        initialFilter: [
            {
                field: "id",
                value: null,
                operator: "eq",
            },{
                field: "title",
                value: null,
                operator: "contains",
            },{
                field: "description",
                value: null,
                operator: "contains",
            },{
                field: "address",
                value: null,
                operator: "eq",
            },],
        metaData: {
            fields: [
                "id",
                "title",
                "description",
                "address",
            ],
            cursors,
        },
        hasPagination: true,
        ...props.extendTable,
    });

    const data = table.tableQueryResult.data as any

    return (
        <>
            <RA.Table {...table.tableProps} pagination={false} rowKey="id">
                <RA.Table.Column
                    dataIndex="id"
                    title="Id"
                    render={ (value)=> {
                        return <FieldView.ER_UUIDViewOnList value={ value } />
                    } }
                    filterDropdown={(props) => (
                        <RA.FilterDropdown {...props}>
                            <RA.Input />
                        </RA.FilterDropdown>
                    )}
                    defaultSortOrder={RA.getDefaultSortOrder("id", table.sorter)}
                />
                <RA.Table.Column
                    dataIndex="title"
                    title="Title"
                    sorter={
                        {}
                    }
                    render={ (value)=> {
                        return <FieldView.ER_StringViewOnList value={ value } />
                    } }
                    filterDropdown={(props) => (
                        <RA.FilterDropdown {...props}>
                            <RA.Input />
                        </RA.FilterDropdown>
                    )}
                    defaultSortOrder={RA.getDefaultSortOrder("title", table.sorter)}
                />
                <RA.Table.Column
                    dataIndex="description"
                    title="Description"
                    sorter={
                        {}
                    }
                    render={ (value)=> {
                        return <FieldView.ER_StringViewOnList value={ value } />
                    } }
                    filterDropdown={(props) => (
                        <RA.FilterDropdown {...props}>
                            <RA.Input />
                        </RA.FilterDropdown>
                    )}
                    defaultSortOrder={RA.getDefaultSortOrder("description", table.sorter)}
                />
                <RA.Table.Column
                    dataIndex="address"
                    title="Address"
                    sorter={
                        {}
                    }
                    render={ (value)=> {
                        return <FieldView.ER_StringViewOnList value={ value } />
                    } }
                    filterDropdown={(props) => (
                        <RA.FilterDropdown {...props}>
                            <RA.Input />
                        </RA.FilterDropdown>
                    )}
                    defaultSortOrder={RA.getDefaultSortOrder("address", table.sorter)}
                />
                <RA.Table.Column<Interfaces.IEmail>
                    title="Actions"
                    dataIndex="actions"
                    render={(_, record) => (
                        <RA.Space>
                            <RA.ShowButton
                                hideText={true}
                                resource="Email"
                                resourceNameOrRouteName="Email"
                                size="small"
                                recordItemId={record.id}
                            />
                            <RA.DeleteButton
                                hideText={true}
                                resource="Email"
                                resourceNameOrRouteName="Email"
                                size="small"
                                recordItemId={record.id}
                            />
                            <RA.EditButton
                                hideText={true}
                                resource="Email"
                                resourceNameOrRouteName="Email"
                                size="small"
                                recordItemId={record.id}
                            />
                        </RA.Space>
                    )}
                />
            </RA.Table>

            <RA.Space style={ {marginTop: 20} }>
                <RA.Typography.Text type="secondary">Total {data?.total || 0}</RA.Typography.Text>
                <RA.Button
                    disabled={!Boolean(data?.pageInfo?.hasPreviousPage)}
                    onClick={() => {
                        setCursors((ov)=>({
                            ...ov,
                            before: data?.pageInfo?.startCursor,
                            last: perPage,
                            after: undefined,
                            first: undefined,
                        }))
                    }
                    }>
                    <RA.Icons.LeftOutlined/>
                    Prev
                </RA.Button>
                <RA.Button
                    disabled={!Boolean(data?.pageInfo?.hasNextPage)}
                    onClick={() => {
                        setCursors((ov)=>{
                            return {
                                ...ov,
                                after: data?.pageInfo?.endCursor,
                                first: perPage,
                                before: undefined,
                                last: undefined,
                            }
                        })
                    }}>
                    Next
                    <RA.Icons.RightOutlined/>
                </RA.Button>
                <RA.Select
                    labelInValue
                    defaultValue={ { value: 10, label: '10 / page' } }
                    style={ { width: 110 } }
                    onChange={(value)=>{
                        setPerPage(value.value)
                        setCursors((ov)=>({
                            ...ov,
                            // Return to first page
                            first: value.value,
                            last: undefined,
                            before: undefined,
                            after: undefined,
                        }))
                    }}
                    options={[
                        {value: 10, label: '10 / page'},
                        {value: 20, label: '20 / page'},
                        {value: 50, label: '50 / page'},
                        {value: 100, label: '100 / page'},
                    ]}
                />
            </RA.Space>
        </>
    );
};
export const ImageTable :React.FC<IResourceComponentsProps & {extendTable?: RA.useTableProps<Interfaces.IImage, HttpError>}> = ( props ) => {

    const [cursors, setCursors] = useState<Cursors>({
        first: 10,
    })

    const [perPage, setPerPage] = useState<number>(10)
    const table = RA.useTable<Interfaces.IImage>({
        resource: "Image",
        initialSorter: [
            {
                field: "title",
                order: "asc",
            },
        ],
        initialFilter: [
            {
                field: "id",
                value: null,
                operator: "eq",
            },{
                field: "title",
                value: null,
                operator: "contains",
            },{
                field: "originalURL",
                value: null,
                operator: "eq",
            },],
        metaData: {
            fields: [
                "id",
                "title",
                "originalURL",
            ],
            cursors,
        },
        hasPagination: true,
        ...props.extendTable,
    });

    const data = table.tableQueryResult.data as any

    return (
        <>
            <RA.Table {...table.tableProps} pagination={false} rowKey="id">
                <RA.Table.Column
                    dataIndex="id"
                    title="Id"
                    render={ (value)=> {
                        return <FieldView.ER_UUIDViewOnList value={ value } />
                    } }
                    filterDropdown={(props) => (
                        <RA.FilterDropdown {...props}>
                            <RA.Input />
                        </RA.FilterDropdown>
                    )}
                    defaultSortOrder={RA.getDefaultSortOrder("id", table.sorter)}
                />
                <RA.Table.Column
                    dataIndex="title"
                    title="Title"
                    sorter={
                        {}
                    }
                    render={ (value)=> {
                        return <FieldView.ER_StringViewOnList value={ value } />
                    } }
                    filterDropdown={(props) => (
                        <RA.FilterDropdown {...props}>
                            <RA.Input />
                        </RA.FilterDropdown>
                    )}
                    defaultSortOrder={RA.getDefaultSortOrder("title", table.sorter)}
                />
                <RA.Table.Column
                    dataIndex="originalURL"
                    title="Original Url"
                    sorter={
                        {}
                    }
                    render={ (value)=> {
                        return <FieldView.ER_ImageViewOnList value={ value } />
                    } }
                    filterDropdown={(props) => (
                        <RA.FilterDropdown {...props}>
                            <RA.Input />
                        </RA.FilterDropdown>
                    )}
                    defaultSortOrder={RA.getDefaultSortOrder("original_url", table.sorter)}
                />
                <RA.Table.Column<Interfaces.IImage>
                    title="Actions"
                    dataIndex="actions"
                    render={(_, record) => (
                        <RA.Space>
                            <RA.ShowButton
                                hideText={true}
                                resource="Image"
                                resourceNameOrRouteName="Image"
                                size="small"
                                recordItemId={record.id}
                            />
                            <RA.DeleteButton
                                hideText={true}
                                resource="Image"
                                resourceNameOrRouteName="Image"
                                size="small"
                                recordItemId={record.id}
                            />
                            <RA.EditButton
                                hideText={true}
                                resource="Image"
                                resourceNameOrRouteName="Image"
                                size="small"
                                recordItemId={record.id}
                            />
                        </RA.Space>
                    )}
                />
            </RA.Table>

            <RA.Space style={ {marginTop: 20} }>
                <RA.Typography.Text type="secondary">Total {data?.total || 0}</RA.Typography.Text>
                <RA.Button
                    disabled={!Boolean(data?.pageInfo?.hasPreviousPage)}
                    onClick={() => {
                        setCursors((ov)=>({
                            ...ov,
                            before: data?.pageInfo?.startCursor,
                            last: perPage,
                            after: undefined,
                            first: undefined,
                        }))
                    }
                    }>
                    <RA.Icons.LeftOutlined/>
                    Prev
                </RA.Button>
                <RA.Button
                    disabled={!Boolean(data?.pageInfo?.hasNextPage)}
                    onClick={() => {
                        setCursors((ov)=>{
                            return {
                                ...ov,
                                after: data?.pageInfo?.endCursor,
                                first: perPage,
                                before: undefined,
                                last: undefined,
                            }
                        })
                    }}>
                    Next
                    <RA.Icons.RightOutlined/>
                </RA.Button>
                <RA.Select
                    labelInValue
                    defaultValue={ { value: 10, label: '10 / page' } }
                    style={ { width: 110 } }
                    onChange={(value)=>{
                        setPerPage(value.value)
                        setCursors((ov)=>({
                            ...ov,
                            // Return to first page
                            first: value.value,
                            last: undefined,
                            before: undefined,
                            after: undefined,
                        }))
                    }}
                    options={[
                        {value: 10, label: '10 / page'},
                        {value: 20, label: '20 / page'},
                        {value: 50, label: '50 / page'},
                        {value: 100, label: '100 / page'},
                    ]}
                />
            </RA.Space>
        </>
    );
};
export const LocationTable :React.FC<IResourceComponentsProps & {extendTable?: RA.useTableProps<Interfaces.ILocation, HttpError>}> = ( props ) => {

    const [cursors, setCursors] = useState<Cursors>({
        first: 10,
    })

    const [perPage, setPerPage] = useState<number>(10)
    const table = RA.useTable<Interfaces.ILocation>({
        resource: "Location",
        initialSorter: [
            {
                field: "title",
                order: "asc",
            },
        ],
        initialFilter: [
            {
                field: "id",
                value: null,
                operator: "eq",
            },{
                field: "title",
                value: null,
                operator: "contains",
            },{
                field: "description",
                value: null,
                operator: "contains",
            },{
                field: "latitude",
                value: null,
                operator: "eq",
            },{
                field: "longitude",
                value: null,
                operator: "eq",
            },{
                field: "address",
                value: null,
                operator: "contains",
            },{
                field: "postcode",
                value: null,
                operator: "eq",
            },{
                field: "type",
                value: null,
                operator: "eq",
            },{
                field: "state",
                value: null,
                operator: "contains",
            },{
                field: "suburb",
                value: null,
                operator: "contains",
            },{
                field: "streetType",
                value: null,
                operator: "eq",
            },{
                field: "streetName",
                value: null,
                operator: "contains",
            },],
        metaData: {
            fields: [
                "id",
                "title",
                "description",
                "latitude",
                "longitude",
                "address",
                "postcode",
                "type",
                "state",
                "suburb",
                "streetType",
                "streetName",
            ],
            cursors,
        },
        hasPagination: true,
        ...props.extendTable,
    });

    const data = table.tableQueryResult.data as any

    return (
        <>
            <RA.Table {...table.tableProps} pagination={false} rowKey="id">
                <RA.Table.Column
                    dataIndex="id"
                    title="Id"
                    render={ (value)=> {
                        return <FieldView.ER_UUIDViewOnList value={ value } />
                    } }
                    filterDropdown={(props) => (
                        <RA.FilterDropdown {...props}>
                            <RA.Input />
                        </RA.FilterDropdown>
                    )}
                    defaultSortOrder={RA.getDefaultSortOrder("id", table.sorter)}
                />
                <RA.Table.Column
                    dataIndex="title"
                    title="Title"
                    sorter={
                        {}
                    }
                    render={ (value)=> {
                        return <FieldView.ER_StringViewOnList value={ value } />
                    } }
                    filterDropdown={(props) => (
                        <RA.FilterDropdown {...props}>
                            <RA.Input />
                        </RA.FilterDropdown>
                    )}
                    defaultSortOrder={RA.getDefaultSortOrder("title", table.sorter)}
                />
                <RA.Table.Column
                    dataIndex="description"
                    title="Description"
                    sorter={
                        {}
                    }
                    render={ (value)=> {
                        return <FieldView.ER_StringViewOnList value={ value } />
                    } }
                    filterDropdown={(props) => (
                        <RA.FilterDropdown {...props}>
                            <RA.Input />
                        </RA.FilterDropdown>
                    )}
                    defaultSortOrder={RA.getDefaultSortOrder("description", table.sorter)}
                />
                <RA.Table.Column
                    dataIndex="latitude"
                    title="Latitude"
                    sorter={
                        {}
                    }
                    render={ (value)=> {
                        return <FieldView.ER_StringViewOnList value={ value } />
                    } }
                    filterDropdown={(props) => (
                        <RA.FilterDropdown {...props}>
                            <RA.Input />
                        </RA.FilterDropdown>
                    )}
                    defaultSortOrder={RA.getDefaultSortOrder("latitude", table.sorter)}
                />
                <RA.Table.Column
                    dataIndex="longitude"
                    title="Longitude"
                    sorter={
                        {}
                    }
                    render={ (value)=> {
                        return <FieldView.ER_StringViewOnList value={ value } />
                    } }
                    filterDropdown={(props) => (
                        <RA.FilterDropdown {...props}>
                            <RA.Input />
                        </RA.FilterDropdown>
                    )}
                    defaultSortOrder={RA.getDefaultSortOrder("longitude", table.sorter)}
                />
                <RA.Table.Column
                    dataIndex="address"
                    title="Address"
                    sorter={
                        {}
                    }
                    render={ (value)=> {
                        return <FieldView.ER_StringViewOnList value={ value } />
                    } }
                    filterDropdown={(props) => (
                        <RA.FilterDropdown {...props}>
                            <RA.Input />
                        </RA.FilterDropdown>
                    )}
                    defaultSortOrder={RA.getDefaultSortOrder("address", table.sorter)}
                />
                <RA.Table.Column
                    dataIndex="postcode"
                    title="Postcode"
                    sorter={
                        {}
                    }
                    render={ (value)=> {
                        return <FieldView.ER_StringViewOnList value={ value } />
                    } }
                    filterDropdown={(props) => (
                        <RA.FilterDropdown {...props}>
                            <RA.Input />
                        </RA.FilterDropdown>
                    )}
                    defaultSortOrder={RA.getDefaultSortOrder("postcode", table.sorter)}
                />
                <RA.Table.Column
                    dataIndex="type"
                    title="Type"
                    sorter={
                        {}
                    }
                    render={ (value)=> {
                        return <FieldView.ER_StringViewOnList value={ value } />
                    } }
                    filterDropdown={(props) => (
                        <RA.FilterDropdown {...props}>
                            <RA.Input />
                        </RA.FilterDropdown>
                    )}
                    defaultSortOrder={RA.getDefaultSortOrder("type", table.sorter)}
                />
                <RA.Table.Column
                    dataIndex="state"
                    title="State"
                    sorter={
                        {}
                    }
                    render={ (value)=> {
                        return <FieldView.ER_StringViewOnList value={ value } />
                    } }
                    filterDropdown={(props) => (
                        <RA.FilterDropdown {...props}>
                            <RA.Input />
                        </RA.FilterDropdown>
                    )}
                    defaultSortOrder={RA.getDefaultSortOrder("state", table.sorter)}
                />
                <RA.Table.Column
                    dataIndex="suburb"
                    title="Suburb"
                    sorter={
                        {}
                    }
                    render={ (value)=> {
                        return <FieldView.ER_StringViewOnList value={ value } />
                    } }
                    filterDropdown={(props) => (
                        <RA.FilterDropdown {...props}>
                            <RA.Input />
                        </RA.FilterDropdown>
                    )}
                    defaultSortOrder={RA.getDefaultSortOrder("suburb", table.sorter)}
                />
                <RA.Table.Column
                    dataIndex="streetType"
                    title="Street Type"
                    sorter={
                        {}
                    }
                    render={ (value)=> {
                        return <FieldView.ER_StringViewOnList value={ value } />
                    } }
                    filterDropdown={(props) => (
                        <RA.FilterDropdown {...props}>
                            <RA.Input />
                        </RA.FilterDropdown>
                    )}
                    defaultSortOrder={RA.getDefaultSortOrder("street_type", table.sorter)}
                />
                <RA.Table.Column
                    dataIndex="streetName"
                    title="Street Name"
                    sorter={
                        {}
                    }
                    render={ (value)=> {
                        return <FieldView.ER_StringViewOnList value={ value } />
                    } }
                    filterDropdown={(props) => (
                        <RA.FilterDropdown {...props}>
                            <RA.Input />
                        </RA.FilterDropdown>
                    )}
                    defaultSortOrder={RA.getDefaultSortOrder("street_name", table.sorter)}
                />
                <RA.Table.Column<Interfaces.ILocation>
                    title="Actions"
                    dataIndex="actions"
                    render={(_, record) => (
                        <RA.Space>
                            <RA.ShowButton
                                hideText={true}
                                resource="Location"
                                resourceNameOrRouteName="Location"
                                size="small"
                                recordItemId={record.id}
                            />
                            <RA.DeleteButton
                                hideText={true}
                                resource="Location"
                                resourceNameOrRouteName="Location"
                                size="small"
                                recordItemId={record.id}
                            />
                            <RA.EditButton
                                hideText={true}
                                resource="Location"
                                resourceNameOrRouteName="Location"
                                size="small"
                                recordItemId={record.id}
                            />
                        </RA.Space>
                    )}
                />
            </RA.Table>

            <RA.Space style={ {marginTop: 20} }>
                <RA.Typography.Text type="secondary">Total {data?.total || 0}</RA.Typography.Text>
                <RA.Button
                    disabled={!Boolean(data?.pageInfo?.hasPreviousPage)}
                    onClick={() => {
                        setCursors((ov)=>({
                            ...ov,
                            before: data?.pageInfo?.startCursor,
                            last: perPage,
                            after: undefined,
                            first: undefined,
                        }))
                    }
                    }>
                    <RA.Icons.LeftOutlined/>
                    Prev
                </RA.Button>
                <RA.Button
                    disabled={!Boolean(data?.pageInfo?.hasNextPage)}
                    onClick={() => {
                        setCursors((ov)=>{
                            return {
                                ...ov,
                                after: data?.pageInfo?.endCursor,
                                first: perPage,
                                before: undefined,
                                last: undefined,
                            }
                        })
                    }}>
                    Next
                    <RA.Icons.RightOutlined/>
                </RA.Button>
                <RA.Select
                    labelInValue
                    defaultValue={ { value: 10, label: '10 / page' } }
                    style={ { width: 110 } }
                    onChange={(value)=>{
                        setPerPage(value.value)
                        setCursors((ov)=>({
                            ...ov,
                            // Return to first page
                            first: value.value,
                            last: undefined,
                            before: undefined,
                            after: undefined,
                        }))
                    }}
                    options={[
                        {value: 10, label: '10 / page'},
                        {value: 20, label: '20 / page'},
                        {value: 50, label: '50 / page'},
                        {value: 100, label: '100 / page'},
                    ]}
                />
            </RA.Space>
        </>
    );
};
export const PhoneTable :React.FC<IResourceComponentsProps & {extendTable?: RA.useTableProps<Interfaces.IPhone, HttpError>}> = ( props ) => {

    const [cursors, setCursors] = useState<Cursors>({
        first: 10,
    })

    const [perPage, setPerPage] = useState<number>(10)
    const table = RA.useTable<Interfaces.IPhone>({
        resource: "Phone",
        initialSorter: [
            {
                field: "title",
                order: "asc",
            },
        ],
        initialFilter: [
            {
                field: "id",
                value: null,
                operator: "eq",
            },{
                field: "title",
                value: null,
                operator: "contains",
            },{
                field: "description",
                value: null,
                operator: "contains",
            },{
                field: "number",
                value: null,
                operator: "eq",
            },{
                field: "type",
                value: null,
                operator: "eq",
            },],
        metaData: {
            fields: [
                "id",
                "title",
                "description",
                "number",
                "type",
            ],
            cursors,
        },
        hasPagination: true,
        ...props.extendTable,
    });

    const data = table.tableQueryResult.data as any

    return (
        <>
            <RA.Table {...table.tableProps} pagination={false} rowKey="id">
                <RA.Table.Column
                    dataIndex="id"
                    title="Id"
                    render={ (value)=> {
                        return <FieldView.ER_UUIDViewOnList value={ value } />
                    } }
                    filterDropdown={(props) => (
                        <RA.FilterDropdown {...props}>
                            <RA.Input />
                        </RA.FilterDropdown>
                    )}
                    defaultSortOrder={RA.getDefaultSortOrder("id", table.sorter)}
                />
                <RA.Table.Column
                    dataIndex="title"
                    title="Title"
                    sorter={
                        {}
                    }
                    render={ (value)=> {
                        return <FieldView.ER_StringViewOnList value={ value } />
                    } }
                    filterDropdown={(props) => (
                        <RA.FilterDropdown {...props}>
                            <RA.Input />
                        </RA.FilterDropdown>
                    )}
                    defaultSortOrder={RA.getDefaultSortOrder("title", table.sorter)}
                />
                <RA.Table.Column
                    dataIndex="description"
                    title="Description"
                    sorter={
                        {}
                    }
                    render={ (value)=> {
                        return <FieldView.ER_StringViewOnList value={ value } />
                    } }
                    filterDropdown={(props) => (
                        <RA.FilterDropdown {...props}>
                            <RA.Input />
                        </RA.FilterDropdown>
                    )}
                    defaultSortOrder={RA.getDefaultSortOrder("description", table.sorter)}
                />
                <RA.Table.Column
                    dataIndex="number"
                    title="Number"
                    sorter={
                        {}
                    }
                    render={ (value)=> {
                        return <FieldView.ER_StringViewOnList value={ value } />
                    } }
                    filterDropdown={(props) => (
                        <RA.FilterDropdown {...props}>
                            <RA.Input />
                        </RA.FilterDropdown>
                    )}
                    defaultSortOrder={RA.getDefaultSortOrder("number", table.sorter)}
                />
                <RA.Table.Column
                    dataIndex="type"
                    title="Type"
                    sorter={
                        {}
                    }
                    render={ (value)=> {
                        return <FieldView.ER_StringViewOnList value={ value } />
                    } }
                    filterDropdown={(props) => (
                        <RA.FilterDropdown {...props}>
                            <RA.Input />
                        </RA.FilterDropdown>
                    )}
                    defaultSortOrder={RA.getDefaultSortOrder("type", table.sorter)}
                />
                <RA.Table.Column<Interfaces.IPhone>
                    title="Actions"
                    dataIndex="actions"
                    render={(_, record) => (
                        <RA.Space>
                            <RA.ShowButton
                                hideText={true}
                                resource="Phone"
                                resourceNameOrRouteName="Phone"
                                size="small"
                                recordItemId={record.id}
                            />
                            <RA.DeleteButton
                                hideText={true}
                                resource="Phone"
                                resourceNameOrRouteName="Phone"
                                size="small"
                                recordItemId={record.id}
                            />
                            <RA.EditButton
                                hideText={true}
                                resource="Phone"
                                resourceNameOrRouteName="Phone"
                                size="small"
                                recordItemId={record.id}
                            />
                        </RA.Space>
                    )}
                />
            </RA.Table>

            <RA.Space style={ {marginTop: 20} }>
                <RA.Typography.Text type="secondary">Total {data?.total || 0}</RA.Typography.Text>
                <RA.Button
                    disabled={!Boolean(data?.pageInfo?.hasPreviousPage)}
                    onClick={() => {
                        setCursors((ov)=>({
                            ...ov,
                            before: data?.pageInfo?.startCursor,
                            last: perPage,
                            after: undefined,
                            first: undefined,
                        }))
                    }
                    }>
                    <RA.Icons.LeftOutlined/>
                    Prev
                </RA.Button>
                <RA.Button
                    disabled={!Boolean(data?.pageInfo?.hasNextPage)}
                    onClick={() => {
                        setCursors((ov)=>{
                            return {
                                ...ov,
                                after: data?.pageInfo?.endCursor,
                                first: perPage,
                                before: undefined,
                                last: undefined,
                            }
                        })
                    }}>
                    Next
                    <RA.Icons.RightOutlined/>
                </RA.Button>
                <RA.Select
                    labelInValue
                    defaultValue={ { value: 10, label: '10 / page' } }
                    style={ { width: 110 } }
                    onChange={(value)=>{
                        setPerPage(value.value)
                        setCursors((ov)=>({
                            ...ov,
                            // Return to first page
                            first: value.value,
                            last: undefined,
                            before: undefined,
                            after: undefined,
                        }))
                    }}
                    options={[
                        {value: 10, label: '10 / page'},
                        {value: 20, label: '20 / page'},
                        {value: 50, label: '50 / page'},
                        {value: 100, label: '100 / page'},
                    ]}
                />
            </RA.Space>
        </>
    );
};
export const ProductTable :React.FC<IResourceComponentsProps & {extendTable?: RA.useTableProps<Interfaces.IProduct, HttpError>}> = ( props ) => {

    const [cursors, setCursors] = useState<Cursors>({
        first: 10,
    })

    const [perPage, setPerPage] = useState<number>(10)
    const table = RA.useTable<Interfaces.IProduct>({
        resource: "Product",
        initialSorter: [
            {
                field: "name",
                order: "asc",
            },
        ],
        initialFilter: [
            {
                field: "id",
                value: null,
                operator: "eq",
            },{
                field: "name",
                value: null,
                operator: "contains",
            },{
                field: "image",
                value: null,
                operator: "eq",
            },{
                field: "url",
                value: null,
                operator: "contains",
            },{
                field: "lastSell",
                value: null,
                operator: "eq",
            },{
                field: "createdAt",
                value: null,
                operator: "eq",
            },{
                field: "status",
                value: null,
                operator: "eq",
            },{
                field: "buildStatus",
                value: null,
                operator: "eq",
            },],
        metaData: {
            fields: [
                "id",
                "name",
                "description",
                "image",
                "url",
                "lastSell",
                "createdAt",
                "status",
                "buildStatus",
            ],
            cursors,
        },
        hasPagination: true,
        ...props.extendTable,
    });

    const data = table.tableQueryResult.data as any

    return (
        <>
            <RA.Table {...table.tableProps} pagination={false} rowKey="id">
                <RA.Table.Column
                    dataIndex="id"
                    title="Id"
                    render={ (value)=> {
                        return <FieldView.ER_UUIDViewOnList value={ value } />
                    } }
                    filterDropdown={(props) => (
                        <RA.FilterDropdown {...props}>
                            <RA.Input />
                        </RA.FilterDropdown>
                    )}
                    defaultSortOrder={RA.getDefaultSortOrder("id", table.sorter)}
                />
                <RA.Table.Column
                    dataIndex="name"
                    title="Name"
                    sorter={
                        {}
                    }
                    render={ (value)=> {
                        return <FieldView.ER_StringViewOnList value={ value } />
                    } }
                    filterDropdown={(props) => (
                        <RA.FilterDropdown {...props}>
                            <RA.Input />
                        </RA.FilterDropdown>
                    )}
                    defaultSortOrder={RA.getDefaultSortOrder("name", table.sorter)}
                />
                <RA.Table.Column
                    dataIndex="image"
                    title="Image"
                    sorter={
                        {}
                    }
                    render={ (value)=> {
                        return <FieldView.ER_ImageViewOnList value={ value } />
                    } }
                    filterDropdown={(props) => (
                        <RA.FilterDropdown {...props}>
                            <RA.Input />
                        </RA.FilterDropdown>
                    )}
                    defaultSortOrder={RA.getDefaultSortOrder("image", table.sorter)}
                />
                <RA.Table.Column
                    dataIndex="url"
                    title="Url"
                    sorter={
                        {}
                    }
                    render={ (value)=> {
                        return <FieldView.ER_URLViewOnList value={ value } />
                    } }
                    filterDropdown={(props) => (
                        <RA.FilterDropdown {...props}>
                            <RA.Input />
                        </RA.FilterDropdown>
                    )}
                    defaultSortOrder={RA.getDefaultSortOrder("url", table.sorter)}
                />
                <RA.Table.Column
                    dataIndex="lastSell"
                    title="Last Sell"
                    sorter={
                        {}
                    }
                    render={ (value)=> {
                        return <FieldView.ER_DateViewOnList value={ value } />
                    } }
                    filterDropdown={(props) => (
                        <RA.FilterDropdown {...props}>
                            <RA.Input />
                        </RA.FilterDropdown>
                    )}
                    defaultSortOrder={RA.getDefaultSortOrder("last_sell", table.sorter)}
                />
                <RA.Table.Column
                    dataIndex="createdAt"
                    title="Created At"
                    sorter={
                        {}
                    }
                    render={ (value)=> {
                        return <FieldView.ER_DateViewOnList value={ value } />
                    } }
                    filterDropdown={(props) => (
                        <RA.FilterDropdown {...props}>
                            <RA.Input />
                        </RA.FilterDropdown>
                    )}
                    defaultSortOrder={RA.getDefaultSortOrder("created_at", table.sorter)}
                />
                <RA.Table.Column
                    dataIndex="status"
                    title="Status"
                    sorter={
                        {}
                    }
                    render={ (value)=> {
                        return <FieldView.ER_Enums_ProcessStatusViewOnList value={ value } />
                    } }
                    filterDropdown={(props) => (
                        <RA.FilterDropdown {...props}>
                            <RA.Select
                                options={[
                                    {
                                        value: "none",
                                        label: "none",
                                    },
                                    {
                                        value: "done",
                                        label: "done",
                                    },
                                    {
                                        value: "enqueued",
                                        label: "enqueued",
                                    },
                                    {
                                        value: "in_progress",
                                        label: "in_progress",
                                    },
                                    {
                                        value: "failed",
                                        label: "failed",
                                    },
                                ]}
                                style={ { width: '100%', minWidth: "100px" } }
                            />
                        </RA.FilterDropdown>
                    )}
                    defaultSortOrder={RA.getDefaultSortOrder("status", table.sorter)}
                />
                <RA.Table.Column
                    dataIndex="buildStatus"
                    title="Build Status"
                    sorter={
                        {}
                    }
                    render={ (value)=> {
                        return <FieldView.ER_Enums_ProcessStatusViewOnList value={ value } />
                    } }
                    filterDropdown={(props) => (
                        <RA.FilterDropdown {...props}>
                            <RA.Select
                                options={[
                                    {
                                        value: "none",
                                        label: "none",
                                    },
                                    {
                                        value: "done",
                                        label: "done",
                                    },
                                    {
                                        value: "enqueued",
                                        label: "enqueued",
                                    },
                                    {
                                        value: "in_progress",
                                        label: "in_progress",
                                    },
                                    {
                                        value: "failed",
                                        label: "failed",
                                    },
                                ]}
                                style={ { width: '100%', minWidth: "100px" } }
                            />
                        </RA.FilterDropdown>
                    )}
                    defaultSortOrder={RA.getDefaultSortOrder("build_status", table.sorter)}
                />
                <RA.Table.Column<Interfaces.IProduct>
                    title="Actions"
                    dataIndex="actions"
                    render={(_, record) => (
                        <RA.Space>
                            <RA.ShowButton
                                hideText={true}
                                resource="Product"
                                resourceNameOrRouteName="Product"
                                size="small"
                                recordItemId={record.id}
                            />
                            <RA.EditButton
                                hideText={true}
                                resource="Product"
                                resourceNameOrRouteName="Product"
                                size="small"
                                recordItemId={record.id}
                            />
                            <RA.DeleteButton
                                hideText={true}
                                resource="Product"
                                resourceNameOrRouteName="Product"
                                size="small"
                                recordItemId={record.id}
                            />
                            <Custom.MyCustomActionButton
                                hideText={true}
                                resource="Product"
                                resourceNameOrRouteName="Product"
                                size="small"
                                recordItemId={record.id}
                            />
                        </RA.Space>
                    )}
                />
            </RA.Table>

            <RA.Space style={ {marginTop: 20} }>
                <RA.Typography.Text type="secondary">Total {data?.total || 0}</RA.Typography.Text>
                <RA.Button
                    disabled={!Boolean(data?.pageInfo?.hasPreviousPage)}
                    onClick={() => {
                        setCursors((ov)=>({
                            ...ov,
                            before: data?.pageInfo?.startCursor,
                            last: perPage,
                            after: undefined,
                            first: undefined,
                        }))
                    }
                    }>
                    <RA.Icons.LeftOutlined/>
                    Prev
                </RA.Button>
                <RA.Button
                    disabled={!Boolean(data?.pageInfo?.hasNextPage)}
                    onClick={() => {
                        setCursors((ov)=>{
                            return {
                                ...ov,
                                after: data?.pageInfo?.endCursor,
                                first: perPage,
                                before: undefined,
                                last: undefined,
                            }
                        })
                    }}>
                    Next
                    <RA.Icons.RightOutlined/>
                </RA.Button>
                <RA.Select
                    labelInValue
                    defaultValue={ { value: 10, label: '10 / page' } }
                    style={ { width: 110 } }
                    onChange={(value)=>{
                        setPerPage(value.value)
                        setCursors((ov)=>({
                            ...ov,
                            // Return to first page
                            first: value.value,
                            last: undefined,
                            before: undefined,
                            after: undefined,
                        }))
                    }}
                    options={[
                        {value: 10, label: '10 / page'},
                        {value: 20, label: '20 / page'},
                        {value: 50, label: '50 / page'},
                        {value: 100, label: '100 / page'},
                    ]}
                />
            </RA.Space>
        </>
    );
};
export const VendorTable :React.FC<IResourceComponentsProps & {extendTable?: RA.useTableProps<Interfaces.IVendor, HttpError>}> = ( props ) => {

    const [cursors, setCursors] = useState<Cursors>({
        first: 10,
    })

    const [perPage, setPerPage] = useState<number>(10)
    const table = RA.useTable<Interfaces.IVendor>({
        resource: "Vendor",
        initialSorter: [
            {
                field: "name",
                order: "asc",
            },
        ],
        initialFilter: [
            {
                field: "id",
                value: null,
                operator: "eq",
            },{
                field: "name",
                value: null,
                operator: "contains",
            },{
                field: "schema",
                value: null,
                operator: "contains",
            },],
        metaData: {
            fields: [
                "id",
                "name",
                "schema",
            ],
            cursors,
        },
        hasPagination: true,
        ...props.extendTable,
    });

    const data = table.tableQueryResult.data as any

    return (
        <>
            <RA.Table {...table.tableProps} pagination={false} rowKey="id">
                <RA.Table.Column
                    dataIndex="id"
                    title="Id"
                    render={ (value)=> {
                        return <FieldView.ER_UUIDViewOnList value={ value } />
                    } }
                    filterDropdown={(props) => (
                        <RA.FilterDropdown {...props}>
                            <RA.Input />
                        </RA.FilterDropdown>
                    )}
                    defaultSortOrder={RA.getDefaultSortOrder("id", table.sorter)}
                />
                <RA.Table.Column
                    dataIndex="name"
                    title="Name"
                    sorter={
                        {}
                    }
                    render={ (value)=> {
                        return <FieldView.ER_StringViewOnList value={ value } />
                    } }
                    filterDropdown={(props) => (
                        <RA.FilterDropdown {...props}>
                            <RA.Input />
                        </RA.FilterDropdown>
                    )}
                    defaultSortOrder={RA.getDefaultSortOrder("name", table.sorter)}
                />
                <RA.Table.Column
                    dataIndex="schema"
                    title="Schema"
                    sorter={
                        {}
                    }
                    render={ (value)=> {
                        return <FieldView.ER_CodeViewOnList value={ value } />
                    } }
                    filterDropdown={(props) => (
                        <RA.FilterDropdown {...props}>
                            <RA.Input />
                        </RA.FilterDropdown>
                    )}
                    defaultSortOrder={RA.getDefaultSortOrder("schema", table.sorter)}
                />
                <RA.Table.Column<Interfaces.IVendor>
                    title="Actions"
                    dataIndex="actions"
                    render={(_, record) => (
                        <RA.Space>
                            <RA.ShowButton
                                hideText={true}
                                resource="Vendor"
                                resourceNameOrRouteName="Vendor"
                                size="small"
                                recordItemId={record.id}
                            />
                            <RA.DeleteButton
                                hideText={true}
                                resource="Vendor"
                                resourceNameOrRouteName="Vendor"
                                size="small"
                                recordItemId={record.id}
                            />
                            <RA.EditButton
                                hideText={true}
                                resource="Vendor"
                                resourceNameOrRouteName="Vendor"
                                size="small"
                                recordItemId={record.id}
                            />
                        </RA.Space>
                    )}
                />
            </RA.Table>

            <RA.Space style={ {marginTop: 20} }>
                <RA.Typography.Text type="secondary">Total {data?.total || 0}</RA.Typography.Text>
                <RA.Button
                    disabled={!Boolean(data?.pageInfo?.hasPreviousPage)}
                    onClick={() => {
                        setCursors((ov)=>({
                            ...ov,
                            before: data?.pageInfo?.startCursor,
                            last: perPage,
                            after: undefined,
                            first: undefined,
                        }))
                    }
                    }>
                    <RA.Icons.LeftOutlined/>
                    Prev
                </RA.Button>
                <RA.Button
                    disabled={!Boolean(data?.pageInfo?.hasNextPage)}
                    onClick={() => {
                        setCursors((ov)=>{
                            return {
                                ...ov,
                                after: data?.pageInfo?.endCursor,
                                first: perPage,
                                before: undefined,
                                last: undefined,
                            }
                        })
                    }}>
                    Next
                    <RA.Icons.RightOutlined/>
                </RA.Button>
                <RA.Select
                    labelInValue
                    defaultValue={ { value: 10, label: '10 / page' } }
                    style={ { width: 110 } }
                    onChange={(value)=>{
                        setPerPage(value.value)
                        setCursors((ov)=>({
                            ...ov,
                            // Return to first page
                            first: value.value,
                            last: undefined,
                            before: undefined,
                            after: undefined,
                        }))
                    }}
                    options={[
                        {value: 10, label: '10 / page'},
                        {value: 20, label: '20 / page'},
                        {value: 50, label: '50 / page'},
                        {value: 100, label: '100 / page'},
                    ]}
                />
            </RA.Space>
        </>
    );
};
export const WarehouseTable :React.FC<IResourceComponentsProps & {extendTable?: RA.useTableProps<Interfaces.IWarehouse, HttpError>}> = ( props ) => {

    const [cursors, setCursors] = useState<Cursors>({
        first: 10,
    })

    const [perPage, setPerPage] = useState<number>(10)
    const table = RA.useTable<Interfaces.IWarehouse>({
        resource: "Warehouse",
        initialSorter: [
            {
                field: "name",
                order: "asc",
            },
        ],
        initialFilter: [
            {
                field: "id",
                value: null,
                operator: "eq",
            },{
                field: "name",
                value: null,
                operator: "contains",
            },{
                field: "lastUpdate",
                value: null,
                operator: "eq",
            },{
                field: "originalData",
                value: null,
                operator: "contains",
            },{
                field: "enabled",
                value: null,
                operator: "eq",
            },{
                field: "filters",
                value: null,
                operator: "eq",
            },],
        metaData: {
            fields: [
                "id",
                "name",
                "lastUpdate",
                "originalData",
                "enabled",
                "filters",
            ],
            cursors,
        },
        hasPagination: true,
        ...props.extendTable,
    });

    const data = table.tableQueryResult.data as any

    return (
        <>
            <RA.Table {...table.tableProps} pagination={false} rowKey="id">
                <RA.Table.Column
                    dataIndex="id"
                    title="Id"
                    render={ (value)=> {
                        return <FieldView.ER_UUIDViewOnList value={ value } />
                    } }
                    filterDropdown={(props) => (
                        <RA.FilterDropdown {...props}>
                            <RA.Input />
                        </RA.FilterDropdown>
                    )}
                    defaultSortOrder={RA.getDefaultSortOrder("id", table.sorter)}
                />
                <RA.Table.Column
                    dataIndex="name"
                    title="Name"
                    sorter={
                        {}
                    }
                    render={ (value)=> {
                        return <FieldView.ER_StringViewOnList value={ value } />
                    } }
                    filterDropdown={(props) => (
                        <RA.FilterDropdown {...props}>
                            <RA.Input />
                        </RA.FilterDropdown>
                    )}
                    defaultSortOrder={RA.getDefaultSortOrder("name", table.sorter)}
                />
                <RA.Table.Column
                    dataIndex="lastUpdate"
                    title="Last Update"
                    sorter={
                        {}
                    }
                    render={ (value)=> {
                        return <FieldView.ER_DateViewOnList value={ value } />
                    } }
                    filterDropdown={(props) => (
                        <RA.FilterDropdown {...props}>
                            <RA.Input />
                        </RA.FilterDropdown>
                    )}
                    defaultSortOrder={RA.getDefaultSortOrder("last_update", table.sorter)}
                />
                <RA.Table.Column
                    dataIndex="originalData"
                    title="Original Data"
                    render={ (value)=> {
                        return <FieldView.ER_CodeViewOnList value={ value } />
                    } }
                    filterDropdown={(props) => (
                        <RA.FilterDropdown {...props}>
                            <RA.Input />
                        </RA.FilterDropdown>
                    )}
                    defaultSortOrder={RA.getDefaultSortOrder("original_data", table.sorter)}
                />
                <RA.Table.Column
                    dataIndex="enabled"
                    title="Enabled"
                    sorter={
                        {}
                    }
                    render={ (value)=> {
                        return <FieldView.ER_BooleanViewOnList value={ value } />
                    } }
                    filterDropdown={(props) => (
                        <RA.FilterDropdown {...props}>
                            <RA.Input />
                        </RA.FilterDropdown>
                    )}
                    defaultSortOrder={RA.getDefaultSortOrder("enabled", table.sorter)}
                />
                <RA.Table.Column
                    dataIndex="filters"
                    title="Filters"
                    render={ (value)=> {
                        return <FieldView.ER_StringListViewOnList value={ value } />
                    } }
                    filterDropdown={(props) => (
                        <RA.FilterDropdown {...props}>
                            <RA.Input />
                        </RA.FilterDropdown>
                    )}
                    defaultSortOrder={RA.getDefaultSortOrder("filters", table.sorter)}
                />
                <RA.Table.Column<Interfaces.IWarehouse>
                    title="Actions"
                    dataIndex="actions"
                    render={(_, record) => (
                        <RA.Space>
                            <RA.ShowButton
                                hideText={true}
                                resource="Warehouse"
                                resourceNameOrRouteName="Warehouse"
                                size="small"
                                recordItemId={record.id}
                            />
                            <RA.DeleteButton
                                hideText={true}
                                resource="Warehouse"
                                resourceNameOrRouteName="Warehouse"
                                size="small"
                                recordItemId={record.id}
                            />
                            <RA.EditButton
                                hideText={true}
                                resource="Warehouse"
                                resourceNameOrRouteName="Warehouse"
                                size="small"
                                recordItemId={record.id}
                            />
                        </RA.Space>
                    )}
                />
            </RA.Table>

            <RA.Space style={ {marginTop: 20} }>
                <RA.Typography.Text type="secondary">Total {data?.total || 0}</RA.Typography.Text>
                <RA.Button
                    disabled={!Boolean(data?.pageInfo?.hasPreviousPage)}
                    onClick={() => {
                        setCursors((ov)=>({
                            ...ov,
                            before: data?.pageInfo?.startCursor,
                            last: perPage,
                            after: undefined,
                            first: undefined,
                        }))
                    }
                    }>
                    <RA.Icons.LeftOutlined/>
                    Prev
                </RA.Button>
                <RA.Button
                    disabled={!Boolean(data?.pageInfo?.hasNextPage)}
                    onClick={() => {
                        setCursors((ov)=>{
                            return {
                                ...ov,
                                after: data?.pageInfo?.endCursor,
                                first: perPage,
                                before: undefined,
                                last: undefined,
                            }
                        })
                    }}>
                    Next
                    <RA.Icons.RightOutlined/>
                </RA.Button>
                <RA.Select
                    labelInValue
                    defaultValue={ { value: 10, label: '10 / page' } }
                    style={ { width: 110 } }
                    onChange={(value)=>{
                        setPerPage(value.value)
                        setCursors((ov)=>({
                            ...ov,
                            // Return to first page
                            first: value.value,
                            last: undefined,
                            before: undefined,
                            after: undefined,
                        }))
                    }}
                    options={[
                        {value: 10, label: '10 / page'},
                        {value: 20, label: '20 / page'},
                        {value: 50, label: '50 / page'},
                        {value: 100, label: '100 / page'},
                    ]}
                />
            </RA.Space>
        </>
    );
};
export const WebsiteTable :React.FC<IResourceComponentsProps & {extendTable?: RA.useTableProps<Interfaces.IWebsite, HttpError>}> = ( props ) => {

    const [cursors, setCursors] = useState<Cursors>({
        first: 10,
    })

    const [perPage, setPerPage] = useState<number>(10)
    const table = RA.useTable<Interfaces.IWebsite>({
        resource: "Website",
        initialSorter: [
            {
                field: "title",
                order: "asc",
            },
        ],
        initialFilter: [
            {
                field: "id",
                value: null,
                operator: "eq",
            },{
                field: "title",
                value: null,
                operator: "contains",
            },{
                field: "description",
                value: null,
                operator: "contains",
            },{
                field: "url",
                value: null,
                operator: "contains",
            },],
        metaData: {
            fields: [
                "id",
                "title",
                "description",
                "url",
            ],
            cursors,
        },
        hasPagination: true,
        ...props.extendTable,
    });

    const data = table.tableQueryResult.data as any

    return (
        <>
            <RA.Table {...table.tableProps} pagination={false} rowKey="id">
                <RA.Table.Column
                    dataIndex="id"
                    title="Id"
                    render={ (value)=> {
                        return <FieldView.ER_UUIDViewOnList value={ value } />
                    } }
                    filterDropdown={(props) => (
                        <RA.FilterDropdown {...props}>
                            <RA.Input />
                        </RA.FilterDropdown>
                    )}
                    defaultSortOrder={RA.getDefaultSortOrder("id", table.sorter)}
                />
                <RA.Table.Column
                    dataIndex="title"
                    title="Title"
                    sorter={
                        {}
                    }
                    render={ (value)=> {
                        return <FieldView.ER_StringViewOnList value={ value } />
                    } }
                    filterDropdown={(props) => (
                        <RA.FilterDropdown {...props}>
                            <RA.Input />
                        </RA.FilterDropdown>
                    )}
                    defaultSortOrder={RA.getDefaultSortOrder("title", table.sorter)}
                />
                <RA.Table.Column
                    dataIndex="description"
                    title="Description"
                    sorter={
                        {}
                    }
                    render={ (value)=> {
                        return <FieldView.ER_StringViewOnList value={ value } />
                    } }
                    filterDropdown={(props) => (
                        <RA.FilterDropdown {...props}>
                            <RA.Input />
                        </RA.FilterDropdown>
                    )}
                    defaultSortOrder={RA.getDefaultSortOrder("description", table.sorter)}
                />
                <RA.Table.Column
                    dataIndex="url"
                    title="Url"
                    sorter={
                        {}
                    }
                    render={ (value)=> {
                        return <FieldView.ER_URLViewOnList value={ value } />
                    } }
                    filterDropdown={(props) => (
                        <RA.FilterDropdown {...props}>
                            <RA.Input />
                        </RA.FilterDropdown>
                    )}
                    defaultSortOrder={RA.getDefaultSortOrder("url", table.sorter)}
                />
                <RA.Table.Column<Interfaces.IWebsite>
                    title="Actions"
                    dataIndex="actions"
                    render={(_, record) => (
                        <RA.Space>
                            <RA.ShowButton
                                hideText={true}
                                resource="Website"
                                resourceNameOrRouteName="Website"
                                size="small"
                                recordItemId={record.id}
                            />
                            <RA.DeleteButton
                                hideText={true}
                                resource="Website"
                                resourceNameOrRouteName="Website"
                                size="small"
                                recordItemId={record.id}
                            />
                            <RA.EditButton
                                hideText={true}
                                resource="Website"
                                resourceNameOrRouteName="Website"
                                size="small"
                                recordItemId={record.id}
                            />
                        </RA.Space>
                    )}
                />
            </RA.Table>

            <RA.Space style={ {marginTop: 20} }>
                <RA.Typography.Text type="secondary">Total {data?.total || 0}</RA.Typography.Text>
                <RA.Button
                    disabled={!Boolean(data?.pageInfo?.hasPreviousPage)}
                    onClick={() => {
                        setCursors((ov)=>({
                            ...ov,
                            before: data?.pageInfo?.startCursor,
                            last: perPage,
                            after: undefined,
                            first: undefined,
                        }))
                    }
                    }>
                    <RA.Icons.LeftOutlined/>
                    Prev
                </RA.Button>
                <RA.Button
                    disabled={!Boolean(data?.pageInfo?.hasNextPage)}
                    onClick={() => {
                        setCursors((ov)=>{
                            return {
                                ...ov,
                                after: data?.pageInfo?.endCursor,
                                first: perPage,
                                before: undefined,
                                last: undefined,
                            }
                        })
                    }}>
                    Next
                    <RA.Icons.RightOutlined/>
                </RA.Button>
                <RA.Select
                    labelInValue
                    defaultValue={ { value: 10, label: '10 / page' } }
                    style={ { width: 110 } }
                    onChange={(value)=>{
                        setPerPage(value.value)
                        setCursors((ov)=>({
                            ...ov,
                            // Return to first page
                            first: value.value,
                            last: undefined,
                            before: undefined,
                            after: undefined,
                        }))
                    }}
                    options={[
                        {value: 10, label: '10 / page'},
                        {value: 20, label: '20 / page'},
                        {value: 50, label: '50 / page'},
                        {value: 100, label: '100 / page'},
                    ]}
                />
            </RA.Space>
        </>
    );
};