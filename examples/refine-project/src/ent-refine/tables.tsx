/* eslint no-use-before-define: 0 */
import React, {useState} from "react";
import {IResourceComponentsProps, HttpError} from "@pankod/refine-core";
import RefineReactRouter from "@pankod/refine-react-router-v6";
import * as RA from "@pankod/refine-antd";
import * as Interfaces from "./interfaces";
import { Cursors } from "./data-provider";
import * as Custom from "./custom";
import * as View from "./view";


export type CompanyTableProps = RA.TableProps<Interfaces.ICompany> & { extendTable?: RA.useTableProps<Interfaces.ICompany, HttpError> }
export const CompanyTable :React.FC<CompanyTableProps> = ({extendTable, ...props} ) => {

    const [cursors, setCursors] = useState<Cursors>({first: 10,})
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
            },],
        metaData: {
            fields: [
                "id",
                "name",
                "description",
                {"countries": [
                    {
                        edges: [
                            {
                                node: [
                                    "id",
                                    "name",
                                    "code",
                                ]
                            },
                        ],
                    },
                    "totalCount",
                ]},
                {"phones": [
                    {
                        edges: [
                            {
                                node: [
                                    "id",
                                    "title",
                                    "description",
                                    "number",
                                    "type",
                                ]
                            },
                        ],
                    },
                    "totalCount",
                ]},
                {"emails": [
                    {
                        edges: [
                            {
                                node: [
                                    "id",
                                    "title",
                                    "description",
                                    "address",
                                ]
                            },
                        ],
                    },
                    "totalCount",
                ]},
                {"websites": [
                    {
                        edges: [
                            {
                                node: [
                                    "id",
                                    "title",
                                    "description",
                                    "url",
                                ]
                            },
                        ],
                    },
                    "totalCount",
                ]},
                {"locations": [
                    {
                        edges: [
                            {
                                node: [
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
                                ]
                            },
                        ],
                    },
                    "totalCount",
                ]},
                {
                    "logoImage": [
                        "id",
                        "title",
                        "originalURL",
                    ]
                },
                {
                    "coverImage": [
                        "id",
                        "title",
                        "originalURL",
                    ]
                },
                {"galleryImages": [
                    {
                        edges: [
                            {
                                node: [
                                    "id",
                                    "title",
                                    "originalURL",
                                ]
                            },
                        ],
                    },
                    "totalCount",
                ]},
            ],
            cursors,
        },
        hasPagination: true,
        ...extendTable,
    });


    const data = table.tableQueryResult.data as any
    const { Link } = RefineReactRouter;

    return (
        <>
            <RA.Table {...table.tableProps} pagination={false} rowKey="id" {...props}>
                { /* region Fields */ }
                <RA.Table.Column
                    dataIndex="id"
                    title="Id"
                    render={ (value)=> {
                        return <View.ER_UUIDViewOnList value={ value } />
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
                {/* endregion */}

                { /* region Edges */ }
                <RA.Table.Column
                    dataIndex="countries"
                    title="Countries"
                    render={
                        (value)=><span>{ value?.totalCount || "No" } Items</span>
                    }
                />
                <RA.Table.Column
                    dataIndex="phones"
                    title="Phones"
                    render={
                        (value)=><span>{ value?.totalCount || "No" } Items</span>
                    }
                />
                <RA.Table.Column
                    dataIndex="emails"
                    title="Emails"
                    render={
                        (value)=><span>{ value?.totalCount || "No" } Items</span>
                    }
                />
                <RA.Table.Column
                    dataIndex="websites"
                    title="Websites"
                    render={
                        (value)=><span>{ value?.totalCount || "No" } Items</span>
                    }
                />
                <RA.Table.Column
                    dataIndex="locations"
                    title="Locations"
                    render={
                        (value)=><span>{ value?.totalCount || "No" } Items</span>
                    }
                />
                <RA.Table.Column
                    dataIndex="logoImage"
                    title="Logo Image"
                    render={
                        (value)=>(<View.ImageBadge { ...value } />)
                    }
                />
                <RA.Table.Column
                    dataIndex="coverImage"
                    title="Cover Image"
                    render={
                        (value)=>(<View.ImageBadge { ...value } />)
                    }
                />
                <RA.Table.Column
                    dataIndex="galleryImages"
                    title="Gallery Images"
                    render={
                        (value)=><span>{ value?.totalCount || "No" } Items</span>
                    }
                />
                {/* endregion Edges*/}

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
export type CountryTableProps = RA.TableProps<Interfaces.ICountry> & { extendTable?: RA.useTableProps<Interfaces.ICountry, HttpError> }
export const CountryTable :React.FC<CountryTableProps> = ({extendTable, ...props} ) => {

    const [cursors, setCursors] = useState<Cursors>({first: 10,})
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
                {"companies": [
                    {
                        edges: [
                            {
                                node: [
                                    "id",
                                    "name",
                                    "description",
                                ]
                            },
                        ],
                    },
                    "totalCount",
                ]},
                {"phones": [
                    {
                        edges: [
                            {
                                node: [
                                    "id",
                                    "title",
                                    "description",
                                    "number",
                                    "type",
                                ]
                            },
                        ],
                    },
                    "totalCount",
                ]},
                {"emails": [
                    {
                        edges: [
                            {
                                node: [
                                    "id",
                                    "title",
                                    "description",
                                    "address",
                                ]
                            },
                        ],
                    },
                    "totalCount",
                ]},
                {"websites": [
                    {
                        edges: [
                            {
                                node: [
                                    "id",
                                    "title",
                                    "description",
                                    "url",
                                ]
                            },
                        ],
                    },
                    "totalCount",
                ]},
                {"locations": [
                    {
                        edges: [
                            {
                                node: [
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
                                ]
                            },
                        ],
                    },
                    "totalCount",
                ]},
            ],
            cursors,
        },
        hasPagination: true,
        ...extendTable,
    });


    const data = table.tableQueryResult.data as any
    const { Link } = RefineReactRouter;

    return (
        <>
            <RA.Table {...table.tableProps} pagination={false} rowKey="id" {...props}>
                { /* region Fields */ }
                <RA.Table.Column
                    dataIndex="id"
                    title="Id"
                    render={ (value)=> {
                        return <View.ER_UUIDViewOnList value={ value } />
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
                        return <View.ER_StringViewOnList value={ value } />
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
                        return <View.ER_StringViewOnList value={ value } />
                    } }
                    filterDropdown={(props) => (
                        <RA.FilterDropdown {...props}>
                            <RA.Input />
                        </RA.FilterDropdown>
                    )}
                    defaultSortOrder={RA.getDefaultSortOrder("code", table.sorter)}
                />
                {/* endregion */}

                { /* region Edges */ }
                <RA.Table.Column
                    dataIndex="companies"
                    title="Companies"
                    render={
                        (value)=><span>{ value?.totalCount || "No" } Items</span>
                    }
                />
                <RA.Table.Column
                    dataIndex="phones"
                    title="Phones"
                    render={
                        (value)=><span>{ value?.totalCount || "No" } Items</span>
                    }
                />
                <RA.Table.Column
                    dataIndex="emails"
                    title="Emails"
                    render={
                        (value)=><span>{ value?.totalCount || "No" } Items</span>
                    }
                />
                <RA.Table.Column
                    dataIndex="websites"
                    title="Websites"
                    render={
                        (value)=><span>{ value?.totalCount || "No" } Items</span>
                    }
                />
                <RA.Table.Column
                    dataIndex="locations"
                    title="Locations"
                    render={
                        (value)=><span>{ value?.totalCount || "No" } Items</span>
                    }
                />
                {/* endregion Edges*/}

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
export type EmailTableProps = RA.TableProps<Interfaces.IEmail> & { extendTable?: RA.useTableProps<Interfaces.IEmail, HttpError> }
export const EmailTable :React.FC<EmailTableProps> = ({extendTable, ...props} ) => {

    const [cursors, setCursors] = useState<Cursors>({first: 10,})
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
                {
                    "company": [
                        "id",
                        "name",
                        "description",
                    ]
                },
                {
                    "country": [
                        "id",
                        "name",
                        "code",
                    ]
                },
            ],
            cursors,
        },
        hasPagination: true,
        ...extendTable,
    });


    const data = table.tableQueryResult.data as any
    const { Link } = RefineReactRouter;

    return (
        <>
            <RA.Table {...table.tableProps} pagination={false} rowKey="id" {...props}>
                { /* region Fields */ }
                <RA.Table.Column
                    dataIndex="id"
                    title="Id"
                    render={ (value)=> {
                        return <View.ER_UUIDViewOnList value={ value } />
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
                        return <View.ER_StringViewOnList value={ value } />
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
                        return <View.ER_StringViewOnList value={ value } />
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
                        return <View.ER_StringViewOnList value={ value } />
                    } }
                    filterDropdown={(props) => (
                        <RA.FilterDropdown {...props}>
                            <RA.Input />
                        </RA.FilterDropdown>
                    )}
                    defaultSortOrder={RA.getDefaultSortOrder("address", table.sorter)}
                />
                {/* endregion */}

                { /* region Edges */ }
                <RA.Table.Column
                    dataIndex="company"
                    title="Company"
                    render={
                        (value)=>(<View.CompanyBadge { ...value } />)
                    }
                />
                <RA.Table.Column
                    dataIndex="country"
                    title="Country"
                    render={
                        (value)=>(<View.CountryBadge { ...value } />)
                    }
                />
                {/* endregion Edges*/}

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
export type ImageTableProps = RA.TableProps<Interfaces.IImage> & { extendTable?: RA.useTableProps<Interfaces.IImage, HttpError> }
export const ImageTable :React.FC<ImageTableProps> = ({extendTable, ...props} ) => {

    const [cursors, setCursors] = useState<Cursors>({first: 10,})
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
                {
                    "galleryCompany": [
                        "id",
                        "name",
                        "description",
                    ]
                },
                {
                    "logoCompany": [
                        "id",
                        "name",
                        "description",
                    ]
                },
                {
                    "coverCompany": [
                        "id",
                        "name",
                        "description",
                    ]
                },
            ],
            cursors,
        },
        hasPagination: true,
        ...extendTable,
    });


    const data = table.tableQueryResult.data as any
    const { Link } = RefineReactRouter;

    return (
        <>
            <RA.Table {...table.tableProps} pagination={false} rowKey="id" {...props}>
                { /* region Fields */ }
                <RA.Table.Column
                    dataIndex="id"
                    title="Id"
                    render={ (value)=> {
                        return <View.ER_UUIDViewOnList value={ value } />
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
                        return <View.ER_StringViewOnList value={ value } />
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
                        return <View.ER_ImageViewOnList value={ value } />
                    } }
                    filterDropdown={(props) => (
                        <RA.FilterDropdown {...props}>
                            <RA.Input />
                        </RA.FilterDropdown>
                    )}
                    defaultSortOrder={RA.getDefaultSortOrder("original_url", table.sorter)}
                />
                {/* endregion */}

                { /* region Edges */ }
                <RA.Table.Column
                    dataIndex="galleryCompany"
                    title="Gallery Company"
                    render={
                        (value)=>(<View.CompanyBadge { ...value } />)
                    }
                />
                <RA.Table.Column
                    dataIndex="logoCompany"
                    title="Logo Company"
                    render={
                        (value)=>(<View.CompanyBadge { ...value } />)
                    }
                />
                <RA.Table.Column
                    dataIndex="coverCompany"
                    title="Cover Company"
                    render={
                        (value)=>(<View.CompanyBadge { ...value } />)
                    }
                />
                {/* endregion Edges*/}

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
export type LocationTableProps = RA.TableProps<Interfaces.ILocation> & { extendTable?: RA.useTableProps<Interfaces.ILocation, HttpError> }
export const LocationTable :React.FC<LocationTableProps> = ({extendTable, ...props} ) => {

    const [cursors, setCursors] = useState<Cursors>({first: 10,})
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
                {
                    "company": [
                        "id",
                        "name",
                        "description",
                    ]
                },
                {
                    "country": [
                        "id",
                        "name",
                        "code",
                    ]
                },
            ],
            cursors,
        },
        hasPagination: true,
        ...extendTable,
    });


    const data = table.tableQueryResult.data as any
    const { Link } = RefineReactRouter;

    return (
        <>
            <RA.Table {...table.tableProps} pagination={false} rowKey="id" {...props}>
                { /* region Fields */ }
                <RA.Table.Column
                    dataIndex="id"
                    title="Id"
                    render={ (value)=> {
                        return <View.ER_UUIDViewOnList value={ value } />
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
                        return <View.ER_StringViewOnList value={ value } />
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
                        return <View.ER_StringViewOnList value={ value } />
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
                        return <View.ER_StringViewOnList value={ value } />
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
                        return <View.ER_StringViewOnList value={ value } />
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
                        return <View.ER_StringViewOnList value={ value } />
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
                        return <View.ER_StringViewOnList value={ value } />
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
                        return <View.ER_StringViewOnList value={ value } />
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
                        return <View.ER_StringViewOnList value={ value } />
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
                        return <View.ER_StringViewOnList value={ value } />
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
                        return <View.ER_StringViewOnList value={ value } />
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
                        return <View.ER_StringViewOnList value={ value } />
                    } }
                    filterDropdown={(props) => (
                        <RA.FilterDropdown {...props}>
                            <RA.Input />
                        </RA.FilterDropdown>
                    )}
                    defaultSortOrder={RA.getDefaultSortOrder("street_name", table.sorter)}
                />
                {/* endregion */}

                { /* region Edges */ }
                <RA.Table.Column
                    dataIndex="company"
                    title="Company"
                    render={
                        (value)=>(<View.CompanyBadge { ...value } />)
                    }
                />
                <RA.Table.Column
                    dataIndex="country"
                    title="Country"
                    render={
                        (value)=>(<View.CountryBadge { ...value } />)
                    }
                />
                {/* endregion Edges*/}

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
export type PhoneTableProps = RA.TableProps<Interfaces.IPhone> & { extendTable?: RA.useTableProps<Interfaces.IPhone, HttpError> }
export const PhoneTable :React.FC<PhoneTableProps> = ({extendTable, ...props} ) => {

    const [cursors, setCursors] = useState<Cursors>({first: 10,})
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
                {
                    "company": [
                        "id",
                        "name",
                        "description",
                    ]
                },
                {
                    "country": [
                        "id",
                        "name",
                        "code",
                    ]
                },
            ],
            cursors,
        },
        hasPagination: true,
        ...extendTable,
    });


    const data = table.tableQueryResult.data as any
    const { Link } = RefineReactRouter;

    return (
        <>
            <RA.Table {...table.tableProps} pagination={false} rowKey="id" {...props}>
                { /* region Fields */ }
                <RA.Table.Column
                    dataIndex="id"
                    title="Id"
                    render={ (value)=> {
                        return <View.ER_UUIDViewOnList value={ value } />
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
                        return <View.ER_StringViewOnList value={ value } />
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
                        return <View.ER_StringViewOnList value={ value } />
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
                        return <View.ER_StringViewOnList value={ value } />
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
                        return <View.ER_StringViewOnList value={ value } />
                    } }
                    filterDropdown={(props) => (
                        <RA.FilterDropdown {...props}>
                            <RA.Input />
                        </RA.FilterDropdown>
                    )}
                    defaultSortOrder={RA.getDefaultSortOrder("type", table.sorter)}
                />
                {/* endregion */}

                { /* region Edges */ }
                <RA.Table.Column
                    dataIndex="company"
                    title="Company"
                    render={
                        (value)=>(<View.CompanyBadge { ...value } />)
                    }
                />
                <RA.Table.Column
                    dataIndex="country"
                    title="Country"
                    render={
                        (value)=>(<View.CountryBadge { ...value } />)
                    }
                />
                {/* endregion Edges*/}

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
export type ProductTableProps = RA.TableProps<Interfaces.IProduct> & { extendTable?: RA.useTableProps<Interfaces.IProduct, HttpError> }
export const ProductTable :React.FC<ProductTableProps> = ({extendTable, ...props} ) => {

    const [cursors, setCursors] = useState<Cursors>({first: 10,})
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
                {
                    "warehouse": [
                        "id",
                        "name",
                        "lastUpdate",
                        "originalData",
                        "enabled",
                        "filters",
                    ]
                },
                {
                    "vendor": [
                        "id",
                        "name",
                        "schema",
                    ]
                },
            ],
            cursors,
        },
        hasPagination: true,
        ...extendTable,
    });


    const data = table.tableQueryResult.data as any
    const { Link } = RefineReactRouter;

    return (
        <>
            <RA.Table {...table.tableProps} pagination={false} rowKey="id" {...props}>
                { /* region Fields */ }
                <RA.Table.Column
                    dataIndex="id"
                    title="Id"
                    render={ (value)=> {
                        return <View.ER_UUIDViewOnList value={ value } />
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
                        return <View.ER_StringViewOnList value={ value } />
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
                        return <View.ER_ImageViewOnList value={ value } />
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
                        return <View.ER_URLViewOnList value={ value } />
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
                        return <View.ER_DateViewOnList value={ value } />
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
                        return <View.ER_DateViewOnList value={ value } />
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
                        return <View.ER_Enums_ProcessStatusViewOnList value={ value } />
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
                        return <View.ER_Enums_ProcessStatusViewOnList value={ value } />
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
                {/* endregion */}

                { /* region Edges */ }
                <RA.Table.Column
                    dataIndex="warehouse"
                    title="Warehouse"
                    render={
                        (value)=>(<View.WarehouseBadge { ...value } />)
                    }
                />
                <RA.Table.Column
                    dataIndex="vendor"
                    title="Vendor"
                    render={
                        (value)=>(<View.VendorBadge { ...value } />)
                    }
                />
                {/* endregion Edges*/}

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
export type VendorTableProps = RA.TableProps<Interfaces.IVendor> & { extendTable?: RA.useTableProps<Interfaces.IVendor, HttpError> }
export const VendorTable :React.FC<VendorTableProps> = ({extendTable, ...props} ) => {

    const [cursors, setCursors] = useState<Cursors>({first: 10,})
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
                {"warehouses": [
                    {
                        edges: [
                            {
                                node: [
                                    "id",
                                    "name",
                                    "lastUpdate",
                                    "originalData",
                                    "enabled",
                                    "filters",
                                ]
                            },
                        ],
                    },
                    "totalCount",
                ]},
                {"products": [
                    {
                        edges: [
                            {
                                node: [
                                    "id",
                                    "name",
                                    "description",
                                    "image",
                                    "url",
                                    "lastSell",
                                    "createdAt",
                                    "status",
                                    "buildStatus",
                                ]
                            },
                        ],
                    },
                    "totalCount",
                ]},
            ],
            cursors,
        },
        hasPagination: true,
        ...extendTable,
    });


    const data = table.tableQueryResult.data as any
    const { Link } = RefineReactRouter;

    return (
        <>
            <RA.Table {...table.tableProps} pagination={false} rowKey="id" {...props}>
                { /* region Fields */ }
                <RA.Table.Column
                    dataIndex="id"
                    title="Id"
                    render={ (value)=> {
                        return <View.ER_UUIDViewOnList value={ value } />
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
                        return <View.ER_StringViewOnList value={ value } />
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
                        return <View.ER_CodeViewOnList value={ value } />
                    } }
                    filterDropdown={(props) => (
                        <RA.FilterDropdown {...props}>
                            <RA.Input />
                        </RA.FilterDropdown>
                    )}
                    defaultSortOrder={RA.getDefaultSortOrder("schema", table.sorter)}
                />
                {/* endregion */}

                { /* region Edges */ }
                <RA.Table.Column
                    dataIndex="warehouses"
                    title="Warehouses"
                    render={
                        (value)=><span>{ value?.totalCount || "No" } Items</span>
                    }
                />
                <RA.Table.Column
                    dataIndex="products"
                    title="Products"
                    render={
                        (value)=><span>{ value?.totalCount || "No" } Items</span>
                    }
                />
                {/* endregion Edges*/}

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
export type WarehouseTableProps = RA.TableProps<Interfaces.IWarehouse> & { extendTable?: RA.useTableProps<Interfaces.IWarehouse, HttpError> }
export const WarehouseTable :React.FC<WarehouseTableProps> = ({extendTable, ...props} ) => {

    const [cursors, setCursors] = useState<Cursors>({first: 10,})
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
                {"products": [
                    {
                        edges: [
                            {
                                node: [
                                    "id",
                                    "name",
                                    "description",
                                    "image",
                                    "url",
                                    "lastSell",
                                    "createdAt",
                                    "status",
                                    "buildStatus",
                                ]
                            },
                        ],
                    },
                    "totalCount",
                ]},
                {
                    "vendor": [
                        "id",
                        "name",
                        "schema",
                    ]
                },
            ],
            cursors,
        },
        hasPagination: true,
        ...extendTable,
    });


    const data = table.tableQueryResult.data as any
    const { Link } = RefineReactRouter;

    return (
        <>
            <RA.Table {...table.tableProps} pagination={false} rowKey="id" {...props}>
                { /* region Fields */ }
                <RA.Table.Column
                    dataIndex="id"
                    title="Id"
                    render={ (value)=> {
                        return <View.ER_UUIDViewOnList value={ value } />
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
                        return <View.ER_StringViewOnList value={ value } />
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
                        return <View.ER_DateViewOnList value={ value } />
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
                        return <View.ER_CodeViewOnList value={ value } />
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
                        return <View.ER_BooleanViewOnList value={ value } />
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
                        return <View.ER_StringListViewOnList value={ value } />
                    } }
                    filterDropdown={(props) => (
                        <RA.FilterDropdown {...props}>
                            <RA.Input />
                        </RA.FilterDropdown>
                    )}
                    defaultSortOrder={RA.getDefaultSortOrder("filters", table.sorter)}
                />
                {/* endregion */}

                { /* region Edges */ }
                <RA.Table.Column
                    dataIndex="products"
                    title="Products"
                    render={
                        (value)=><span>{ value?.totalCount || "No" } Items</span>
                    }
                />
                <RA.Table.Column
                    dataIndex="vendor"
                    title="Vendor"
                    render={
                        (value)=>(<View.VendorBadge { ...value } />)
                    }
                />
                {/* endregion Edges*/}

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
export type WebsiteTableProps = RA.TableProps<Interfaces.IWebsite> & { extendTable?: RA.useTableProps<Interfaces.IWebsite, HttpError> }
export const WebsiteTable :React.FC<WebsiteTableProps> = ({extendTable, ...props} ) => {

    const [cursors, setCursors] = useState<Cursors>({first: 10,})
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
                {
                    "company": [
                        "id",
                        "name",
                        "description",
                    ]
                },
                {
                    "country": [
                        "id",
                        "name",
                        "code",
                    ]
                },
            ],
            cursors,
        },
        hasPagination: true,
        ...extendTable,
    });


    const data = table.tableQueryResult.data as any
    const { Link } = RefineReactRouter;

    return (
        <>
            <RA.Table {...table.tableProps} pagination={false} rowKey="id" {...props}>
                { /* region Fields */ }
                <RA.Table.Column
                    dataIndex="id"
                    title="Id"
                    render={ (value)=> {
                        return <View.ER_UUIDViewOnList value={ value } />
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
                        return <View.ER_StringViewOnList value={ value } />
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
                        return <View.ER_StringViewOnList value={ value } />
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
                        return <View.ER_URLViewOnList value={ value } />
                    } }
                    filterDropdown={(props) => (
                        <RA.FilterDropdown {...props}>
                            <RA.Input />
                        </RA.FilterDropdown>
                    )}
                    defaultSortOrder={RA.getDefaultSortOrder("url", table.sorter)}
                />
                {/* endregion */}

                { /* region Edges */ }
                <RA.Table.Column
                    dataIndex="company"
                    title="Company"
                    render={
                        (value)=>(<View.CompanyBadge { ...value } />)
                    }
                />
                <RA.Table.Column
                    dataIndex="country"
                    title="Country"
                    render={
                        (value)=>(<View.CountryBadge { ...value } />)
                    }
                />
                {/* endregion Edges*/}

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
};/* eslint no-use-before-define: 2 */