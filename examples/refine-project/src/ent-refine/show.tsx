/* eslint no-use-before-define: 0 */
import React, { useState } from "react";
import { useShow } from "@pankod/refine-core";
import * as RA  from "@pankod/refine-antd";
import * as Lists from "./list";
import * as Diagram from "./diagram";
import * as Interfaces from "./interfaces";
import * as View from "./view";
import * as Custom from "./custom";

export type CompanyShowProps = {
    id?: Interfaces.EntID,
    withEdges?: boolean,
} & RA.ShowProps
export const CompanyShow : React.FC<CompanyShowProps> = ({id, withEdges, ...showProps}) => {
    const { queryResult } = useShow<Interfaces.ICompany>({
        resource: "Company",
        id,
        metaData: {
            fields: [
                "id",
                "name",
                "description",
                {
                    operation: "countries",
                    fields: [
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
                    ],
                    variables: {
                        first: 10
                    }
                },
                {
                    operation: "phones",
                    fields: [
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
                    ],
                    variables: {
                        first: 10
                    }
                },
                {
                    operation: "emails",
                    fields: [
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
                    ],
                    variables: {
                        first: 10
                    }
                },
                {
                    operation: "websites",
                    fields: [
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
                    ],
                    variables: {
                        first: 10
                    }
                },
                {
                    operation: "locations",
                    fields: [
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
                    ],
                    variables: {
                        first: 10
                    }
                },
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
                {
                    operation: "galleryImages",
                    fields: [
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
                    ],
                    variables: {
                        first: 10
                    }
                },
            ],
        },
    });

    const { data, isLoading } = queryResult;
    const record = data?.data

    const [edgesDiagram, setedgesDiagram] = useState(false)

    if(!record){
        return <></>
    }

    const nodes: Array<Diagram.Node|undefined> =  [
            {
                id: record.id,
                label: record.id,
                
            },
            ...(record.countries || []).map((i)=>{
                return {
                    id: i.id,
                    label: i.id,
                }
            }),
            Number(record._countries?.totalCount) > Number(record.countries?.length)
                ? {
                    id: "Country_more",
                    label: `More ${Number(record._countries?.totalCount) - Number(record.countries?.length)}`
                }
                : undefined,
            ...(record.phones || []).map((i)=>{
                return {
                    id: i.id,
                    label: i.id,
                }
            }),
            Number(record._phones?.totalCount) > Number(record.phones?.length)
                ? {
                    id: "Phone_more",
                    label: `More ${Number(record._phones?.totalCount) - Number(record.phones?.length)}`
                }
                : undefined,
            ...(record.emails || []).map((i)=>{
                return {
                    id: i.id,
                    label: i.id,
                }
            }),
            Number(record._emails?.totalCount) > Number(record.emails?.length)
                ? {
                    id: "Email_more",
                    label: `More ${Number(record._emails?.totalCount) - Number(record.emails?.length)}`
                }
                : undefined,
            ...(record.websites || []).map((i)=>{
                return {
                    id: i.id,
                    label: i.id,
                }
            }),
            Number(record._websites?.totalCount) > Number(record.websites?.length)
                ? {
                    id: "Website_more",
                    label: `More ${Number(record._websites?.totalCount) - Number(record.websites?.length)}`
                }
                : undefined,
            ...(record.locations || []).map((i)=>{
                return {
                    id: i.id,
                    label: i.id,
                }
            }),
            Number(record._locations?.totalCount) > Number(record.locations?.length)
                ? {
                    id: "Location_more",
                    label: `More ${Number(record._locations?.totalCount) - Number(record.locations?.length)}`
                }
                : undefined,
            record.logoImage ? {
                id: record.logoImage.id || "n/a",
                label: record.logoImage.id ||"n/a",
            } : undefined,
            record.coverImage ? {
                id: record.coverImage.id || "n/a",
                label: record.coverImage.id ||"n/a",
            } : undefined,
            ...(record.galleryImages || []).map((i)=>{
                return {
                    id: i.id,
                    label: i.id,
                }
            }),
            Number(record._galleryImages?.totalCount) > Number(record.galleryImages?.length)
                ? {
                    id: "Image_more",
                    label: `More ${Number(record._galleryImages?.totalCount) - Number(record.galleryImages?.length)}`
                }
                : undefined,
        ];
    const links:Array<Diagram.Link|undefined> = [
            ...(record.countries || []).map((i)=>{
                return {
                    source: record.id,
                    target: i.id,
                    label: "Countries"
                }
            }),
            Number(record._countries?.totalCount) > Number(record.countries?.length)
            ? {
                source: record.id,
                target: "Country_more",
                label: "Countries"
            }
            : undefined,
            ...(record.phones || []).map((i)=>{
                return {
                    source: record.id,
                    target: i.id,
                    label: "Phones"
                }
            }),
            Number(record._phones?.totalCount) > Number(record.phones?.length)
            ? {
                source: record.id,
                target: "Phone_more",
                label: "Phones"
            }
            : undefined,
            ...(record.emails || []).map((i)=>{
                return {
                    source: record.id,
                    target: i.id,
                    label: "Emails"
                }
            }),
            Number(record._emails?.totalCount) > Number(record.emails?.length)
            ? {
                source: record.id,
                target: "Email_more",
                label: "Emails"
            }
            : undefined,
            ...(record.websites || []).map((i)=>{
                return {
                    source: record.id,
                    target: i.id,
                    label: "Websites"
                }
            }),
            Number(record._websites?.totalCount) > Number(record.websites?.length)
            ? {
                source: record.id,
                target: "Website_more",
                label: "Websites"
            }
            : undefined,
            ...(record.locations || []).map((i)=>{
                return {
                    source: record.id,
                    target: i.id,
                    label: "Locations"
                }
            }),
            Number(record._locations?.totalCount) > Number(record.locations?.length)
            ? {
                source: record.id,
                target: "Location_more",
                label: "Locations"
            }
            : undefined,
            record.logoImage ? {
                source: record.id,
                target: record.logoImage?.id || "n/a",
                label: "Logo Image"
            } : undefined,
            record.coverImage ? {
                source: record.id,
                target: record.coverImage?.id || "n/a",
                label: "Cover Image"
            } : undefined,
            ...(record.galleryImages || []).map((i)=>{
                return {
                    source: record.id,
                    target: i.id,
                    label: "Gallery Images"
                }
            }),
            Number(record._galleryImages?.totalCount) > Number(record.galleryImages?.length)
            ? {
                source: record.id,
                target: "Image_more",
                label: "Gallery Images"
            }
            : undefined,
        ]

    return (
        <RA.Show isLoading={isLoading}
                 headerButtons={({ defaultButtons }) => (
                     <>
                     {defaultButtons}
                     <RA.Button icon={<RA.Icons.ClusterOutlined />} type="primary" onClick={ ()=>{ setedgesDiagram(!edgesDiagram) } }>Edges Diagram</RA.Button>
                     </>
                 )}
                 {...showProps}
        >
            {!edgesDiagram ? <>
                <RA.Typography.Title level={5}>Id</RA.Typography.Title>
                <View.EntUUIDViewOnShow value={ record?.id } />
                <RA.Typography.Title level={5}>Name</RA.Typography.Title>
                
                <Custom.MyCustomTitle value={ record?.name } />
                <RA.Typography.Title level={5}>Description</RA.Typography.Title>
                <View.EntRichTextViewOnShow value={ record?.description } />

                {withEdges ? <>
                    <RA.Typography.Title level={3}>Edges</RA.Typography.Title>
                    <RA.Descriptions>
                        <RA.Descriptions.Item label="Logo Image">
                            <View.ImageBadge { ...record?.logoImage } />
                        </RA.Descriptions.Item>
                        <RA.Descriptions.Item label="Cover Image">
                            <View.ImageBadge { ...record?.coverImage } />
                        </RA.Descriptions.Item>
                    </RA.Descriptions>
                    <RA.Tabs
                    defaultActiveKey="0"
                    items={[
                        {
                            label: <span>
                                <RA.Icons.GlobalOutlined />
                                Countries
                            </span>,
                            key: "0",
                            children: <Lists.CountryList
                                key={ "countries-companiesSlice" }
                                breadcrumb={ false }
                                tableProps={ {
                                    extendTable: {
                                        permanentFilter: [
                                            { operator: "hasCompaniesWith" as any, field: "", value: {id: record?.id} }
                                        ]
                                    }
                                }
                                }
                            />
                        },
                        {
                            label: <span>
                                <RA.Icons.PhoneOutlined />
                                Phones
                            </span>,
                            key: "1",
                            children: <Lists.PhoneList
                                key={ "phones-companies" }
                                breadcrumb={ false }
                                tableProps={ {
                                    extendTable: {
                                        permanentFilter: [
                                            { operator: "hasCompanyWith" as any, field: "", value: {id: record?.id} }
                                        ]
                                    }
                                }
                                }
                            />
                        },
                        {
                            label: <span>
                                <RA.Icons.MailOutlined />
                                Emails
                            </span>,
                            key: "2",
                            children: <Lists.EmailList
                                key={ "emails-companies" }
                                breadcrumb={ false }
                                tableProps={ {
                                    extendTable: {
                                        permanentFilter: [
                                            { operator: "hasCompanyWith" as any, field: "", value: {id: record?.id} }
                                        ]
                                    }
                                }
                                }
                            />
                        },
                        {
                            label: <span>
                                <RA.Icons.LinkOutlined />
                                Websites
                            </span>,
                            key: "3",
                            children: <Lists.WebsiteList
                                key={ "websites-companies" }
                                breadcrumb={ false }
                                tableProps={ {
                                    extendTable: {
                                        permanentFilter: [
                                            { operator: "hasCompanyWith" as any, field: "", value: {id: record?.id} }
                                        ]
                                    }
                                }
                                }
                            />
                        },
                        {
                            label: <span>
                                <RA.Icons.PushpinOutlined />
                                Locations
                            </span>,
                            key: "4",
                            children: <Lists.LocationList
                                key={ "locations-companies" }
                                breadcrumb={ false }
                                tableProps={ {
                                    extendTable: {
                                        permanentFilter: [
                                            { operator: "hasCompanyWith" as any, field: "", value: {id: record?.id} }
                                        ]
                                    }
                                }
                                }
                            />
                        },
                        {
                            label: <span>
                                <RA.Icons.CameraOutlined />
                                Gallery Images
                            </span>,
                            key: "7",
                            children: <Lists.ImageList
                                key={ "gallery_images-gallery_companies" }
                                breadcrumb={ false }
                                tableProps={ {
                                    extendTable: {
                                        permanentFilter: [
                                            { operator: "hasGalleryCompanyWith" as any, field: "", value: {id: record?.id} }
                                        ]
                                    }
                                }
                                }
                            />
                        },
                    ]}
                />

                </> : null }
            </> : null }

            { edgesDiagram ?
                <Diagram.GoJS
                    nodes={ nodes.filter((n): n is Diagram.Node => typeof n !== "undefined") }
                    links={ links.filter((n): n is Diagram.Link => typeof n !== "undefined") }
                />
            : null }

        </RA.Show>
    )
}

export type CountryShowProps = {
    id?: Interfaces.EntID,
    withEdges?: boolean,
} & RA.ShowProps
export const CountryShow : React.FC<CountryShowProps> = ({id, withEdges, ...showProps}) => {
    const { queryResult } = useShow<Interfaces.ICountry>({
        resource: "Country",
        id,
        metaData: {
            fields: [
                "id",
                "name",
                "code",
                {
                    operation: "companies",
                    fields: [
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
                    ],
                    variables: {
                        first: 10
                    }
                },
                {
                    operation: "phones",
                    fields: [
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
                    ],
                    variables: {
                        first: 10
                    }
                },
                {
                    operation: "emails",
                    fields: [
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
                    ],
                    variables: {
                        first: 10
                    }
                },
                {
                    operation: "websites",
                    fields: [
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
                    ],
                    variables: {
                        first: 10
                    }
                },
                {
                    operation: "locations",
                    fields: [
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
                    ],
                    variables: {
                        first: 10
                    }
                },
            ],
        },
    });

    const { data, isLoading } = queryResult;
    const record = data?.data

    const [edgesDiagram, setedgesDiagram] = useState(false)

    if(!record){
        return <></>
    }

    const nodes: Array<Diagram.Node|undefined> =  [
            {
                id: record.id,
                label: record.id,
                
            },
            ...(record.companies || []).map((i)=>{
                return {
                    id: i.id,
                    label: i.id,
                }
            }),
            Number(record._companies?.totalCount) > Number(record.companies?.length)
                ? {
                    id: "Company_more",
                    label: `More ${Number(record._companies?.totalCount) - Number(record.companies?.length)}`
                }
                : undefined,
            ...(record.phones || []).map((i)=>{
                return {
                    id: i.id,
                    label: i.id,
                }
            }),
            Number(record._phones?.totalCount) > Number(record.phones?.length)
                ? {
                    id: "Phone_more",
                    label: `More ${Number(record._phones?.totalCount) - Number(record.phones?.length)}`
                }
                : undefined,
            ...(record.emails || []).map((i)=>{
                return {
                    id: i.id,
                    label: i.id,
                }
            }),
            Number(record._emails?.totalCount) > Number(record.emails?.length)
                ? {
                    id: "Email_more",
                    label: `More ${Number(record._emails?.totalCount) - Number(record.emails?.length)}`
                }
                : undefined,
            ...(record.websites || []).map((i)=>{
                return {
                    id: i.id,
                    label: i.id,
                }
            }),
            Number(record._websites?.totalCount) > Number(record.websites?.length)
                ? {
                    id: "Website_more",
                    label: `More ${Number(record._websites?.totalCount) - Number(record.websites?.length)}`
                }
                : undefined,
            ...(record.locations || []).map((i)=>{
                return {
                    id: i.id,
                    label: i.id,
                }
            }),
            Number(record._locations?.totalCount) > Number(record.locations?.length)
                ? {
                    id: "Location_more",
                    label: `More ${Number(record._locations?.totalCount) - Number(record.locations?.length)}`
                }
                : undefined,
        ];
    const links:Array<Diagram.Link|undefined> = [
            ...(record.companies || []).map((i)=>{
                return {
                    source: record.id,
                    target: i.id,
                    label: "Companies"
                }
            }),
            Number(record._companies?.totalCount) > Number(record.companies?.length)
            ? {
                source: record.id,
                target: "Company_more",
                label: "Companies"
            }
            : undefined,
            ...(record.phones || []).map((i)=>{
                return {
                    source: record.id,
                    target: i.id,
                    label: "Phones"
                }
            }),
            Number(record._phones?.totalCount) > Number(record.phones?.length)
            ? {
                source: record.id,
                target: "Phone_more",
                label: "Phones"
            }
            : undefined,
            ...(record.emails || []).map((i)=>{
                return {
                    source: record.id,
                    target: i.id,
                    label: "Emails"
                }
            }),
            Number(record._emails?.totalCount) > Number(record.emails?.length)
            ? {
                source: record.id,
                target: "Email_more",
                label: "Emails"
            }
            : undefined,
            ...(record.websites || []).map((i)=>{
                return {
                    source: record.id,
                    target: i.id,
                    label: "Websites"
                }
            }),
            Number(record._websites?.totalCount) > Number(record.websites?.length)
            ? {
                source: record.id,
                target: "Website_more",
                label: "Websites"
            }
            : undefined,
            ...(record.locations || []).map((i)=>{
                return {
                    source: record.id,
                    target: i.id,
                    label: "Locations"
                }
            }),
            Number(record._locations?.totalCount) > Number(record.locations?.length)
            ? {
                source: record.id,
                target: "Location_more",
                label: "Locations"
            }
            : undefined,
        ]

    return (
        <RA.Show isLoading={isLoading}
                 headerButtons={({ defaultButtons }) => (
                     <>
                     {defaultButtons}
                     <RA.Button icon={<RA.Icons.ClusterOutlined />} type="primary" onClick={ ()=>{ setedgesDiagram(!edgesDiagram) } }>Edges Diagram</RA.Button>
                     </>
                 )}
                 {...showProps}
        >
            {!edgesDiagram ? <>
                <RA.Typography.Title level={5}>Id</RA.Typography.Title>
                <View.EntUUIDViewOnShow value={ record?.id } />
                <RA.Typography.Title level={5}>Name</RA.Typography.Title>
                <View.EntStringViewOnShow value={ record?.name } />
                <RA.Typography.Title level={5}>Code</RA.Typography.Title>
                <View.EntStringViewOnShow value={ record?.code } />

                {withEdges ? <>
                    <RA.Typography.Title level={3}>Edges</RA.Typography.Title>
                    <RA.Descriptions>
                    </RA.Descriptions>
                    <RA.Tabs
                    defaultActiveKey="0"
                    items={[
                        {
                            label: <span>
                                <RA.Icons.ShopOutlined />
                                Companies
                            </span>,
                            key: "0",
                            children: <Lists.CompanyList
                                key={ "companies-countriesSlice" }
                                breadcrumb={ false }
                                tableProps={ {
                                    extendTable: {
                                        permanentFilter: [
                                            { operator: "hasCountriesWith" as any, field: "", value: {id: record?.id} }
                                        ]
                                    }
                                }
                                }
                            />
                        },
                        {
                            label: <span>
                                <RA.Icons.PhoneOutlined />
                                Phones
                            </span>,
                            key: "1",
                            children: <Lists.PhoneList
                                key={ "phones-countries" }
                                breadcrumb={ false }
                                tableProps={ {
                                    extendTable: {
                                        permanentFilter: [
                                            { operator: "hasCountryWith" as any, field: "", value: {id: record?.id} }
                                        ]
                                    }
                                }
                                }
                            />
                        },
                        {
                            label: <span>
                                <RA.Icons.MailOutlined />
                                Emails
                            </span>,
                            key: "2",
                            children: <Lists.EmailList
                                key={ "emails-countries" }
                                breadcrumb={ false }
                                tableProps={ {
                                    extendTable: {
                                        permanentFilter: [
                                            { operator: "hasCountryWith" as any, field: "", value: {id: record?.id} }
                                        ]
                                    }
                                }
                                }
                            />
                        },
                        {
                            label: <span>
                                <RA.Icons.LinkOutlined />
                                Websites
                            </span>,
                            key: "3",
                            children: <Lists.WebsiteList
                                key={ "websites-countries" }
                                breadcrumb={ false }
                                tableProps={ {
                                    extendTable: {
                                        permanentFilter: [
                                            { operator: "hasCountryWith" as any, field: "", value: {id: record?.id} }
                                        ]
                                    }
                                }
                                }
                            />
                        },
                        {
                            label: <span>
                                <RA.Icons.PushpinOutlined />
                                Locations
                            </span>,
                            key: "4",
                            children: <Lists.LocationList
                                key={ "locations-countries" }
                                breadcrumb={ false }
                                tableProps={ {
                                    extendTable: {
                                        permanentFilter: [
                                            { operator: "hasCountryWith" as any, field: "", value: {id: record?.id} }
                                        ]
                                    }
                                }
                                }
                            />
                        },
                    ]}
                />

                </> : null }
            </> : null }

            { edgesDiagram ?
                <Diagram.GoJS
                    nodes={ nodes.filter((n): n is Diagram.Node => typeof n !== "undefined") }
                    links={ links.filter((n): n is Diagram.Link => typeof n !== "undefined") }
                />
            : null }

        </RA.Show>
    )
}

export type EmailShowProps = {
    id?: Interfaces.EntID,
    withEdges?: boolean,
} & RA.ShowProps
export const EmailShow : React.FC<EmailShowProps> = ({id, withEdges, ...showProps}) => {
    const { queryResult } = useShow<Interfaces.IEmail>({
        resource: "Email",
        id,
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
        },
    });

    const { data, isLoading } = queryResult;
    const record = data?.data

    const [edgesDiagram, setedgesDiagram] = useState(false)

    if(!record){
        return <></>
    }

    const nodes: Array<Diagram.Node|undefined> =  [
            {
                id: record.id,
                label: record.id,
                
            },
            record.company ? {
                id: record.company.id || "n/a",
                label: record.company.id ||"n/a",
            } : undefined,
            record.country ? {
                id: record.country.id || "n/a",
                label: record.country.id ||"n/a",
            } : undefined,
        ];
    const links:Array<Diagram.Link|undefined> = [
            record.company ? {
                source: record.id,
                target: record.company?.id || "n/a",
                label: "Company"
            } : undefined,
            record.country ? {
                source: record.id,
                target: record.country?.id || "n/a",
                label: "Country"
            } : undefined,
        ]

    return (
        <RA.Show isLoading={isLoading}
                 headerButtons={({ defaultButtons }) => (
                     <>
                     {defaultButtons}
                     <RA.Button icon={<RA.Icons.ClusterOutlined />} type="primary" onClick={ ()=>{ setedgesDiagram(!edgesDiagram) } }>Edges Diagram</RA.Button>
                     </>
                 )}
                 {...showProps}
        >
            {!edgesDiagram ? <>
                <RA.Typography.Title level={5}>Id</RA.Typography.Title>
                <View.EntUUIDViewOnShow value={ record?.id } />
                <RA.Typography.Title level={5}>Title</RA.Typography.Title>
                <View.EntStringViewOnShow value={ record?.title } />
                <RA.Typography.Title level={5}>Description</RA.Typography.Title>
                <View.EntStringViewOnShow value={ record?.description } />
                <RA.Typography.Title level={5}>Address</RA.Typography.Title>
                <View.EntStringViewOnShow value={ record?.address } />

                {withEdges ? <>
                    <RA.Typography.Title level={3}>Edges</RA.Typography.Title>
                    <RA.Descriptions>
                        <RA.Descriptions.Item label="Company">
                            <View.CompanyBadge { ...record?.company } />
                        </RA.Descriptions.Item>
                        <RA.Descriptions.Item label="Country">
                            <View.CountryBadge { ...record?.country } />
                        </RA.Descriptions.Item>
                    </RA.Descriptions>
                    <RA.Tabs
                    defaultActiveKey="0"
                    items={[
                    ]}
                />

                </> : null }
            </> : null }

            { edgesDiagram ?
                <Diagram.GoJS
                    nodes={ nodes.filter((n): n is Diagram.Node => typeof n !== "undefined") }
                    links={ links.filter((n): n is Diagram.Link => typeof n !== "undefined") }
                />
            : null }

        </RA.Show>
    )
}

export type ImageShowProps = {
    id?: Interfaces.EntID,
    withEdges?: boolean,
} & RA.ShowProps
export const ImageShow : React.FC<ImageShowProps> = ({id, withEdges, ...showProps}) => {
    const { queryResult } = useShow<Interfaces.IImage>({
        resource: "Image",
        id,
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
        },
    });

    const { data, isLoading } = queryResult;
    const record = data?.data

    const [edgesDiagram, setedgesDiagram] = useState(false)

    if(!record){
        return <></>
    }

    const nodes: Array<Diagram.Node|undefined> =  [
            {
                id: record.id,
                label: record.id,
                
            },
            record.galleryCompany ? {
                id: record.galleryCompany.id || "n/a",
                label: record.galleryCompany.id ||"n/a",
            } : undefined,
            record.logoCompany ? {
                id: record.logoCompany.id || "n/a",
                label: record.logoCompany.id ||"n/a",
            } : undefined,
            record.coverCompany ? {
                id: record.coverCompany.id || "n/a",
                label: record.coverCompany.id ||"n/a",
            } : undefined,
        ];
    const links:Array<Diagram.Link|undefined> = [
            record.galleryCompany ? {
                source: record.id,
                target: record.galleryCompany?.id || "n/a",
                label: "Gallery Company"
            } : undefined,
            record.logoCompany ? {
                source: record.id,
                target: record.logoCompany?.id || "n/a",
                label: "Logo Company"
            } : undefined,
            record.coverCompany ? {
                source: record.id,
                target: record.coverCompany?.id || "n/a",
                label: "Cover Company"
            } : undefined,
        ]

    return (
        <RA.Show isLoading={isLoading}
                 headerButtons={({ defaultButtons }) => (
                     <>
                     {defaultButtons}
                     <RA.Button icon={<RA.Icons.ClusterOutlined />} type="primary" onClick={ ()=>{ setedgesDiagram(!edgesDiagram) } }>Edges Diagram</RA.Button>
                     </>
                 )}
                 {...showProps}
        >
            {!edgesDiagram ? <>
                <RA.Typography.Title level={5}>Id</RA.Typography.Title>
                <View.EntUUIDViewOnShow value={ record?.id } />
                <RA.Typography.Title level={5}>Title</RA.Typography.Title>
                <View.EntStringViewOnShow value={ record?.title } />
                <RA.Typography.Title level={5}>Original Url</RA.Typography.Title>
                <View.EntImageViewOnShow value={ record?.originalURL } />

                {withEdges ? <>
                    <RA.Typography.Title level={3}>Edges</RA.Typography.Title>
                    <RA.Descriptions>
                        <RA.Descriptions.Item label="Gallery Company">
                            <View.CompanyBadge { ...record?.galleryCompany } />
                        </RA.Descriptions.Item>
                        <RA.Descriptions.Item label="Logo Company">
                            <View.CompanyBadge { ...record?.logoCompany } />
                        </RA.Descriptions.Item>
                        <RA.Descriptions.Item label="Cover Company">
                            <View.CompanyBadge { ...record?.coverCompany } />
                        </RA.Descriptions.Item>
                    </RA.Descriptions>
                    <RA.Tabs
                    defaultActiveKey="0"
                    items={[
                    ]}
                />

                </> : null }
            </> : null }

            { edgesDiagram ?
                <Diagram.GoJS
                    nodes={ nodes.filter((n): n is Diagram.Node => typeof n !== "undefined") }
                    links={ links.filter((n): n is Diagram.Link => typeof n !== "undefined") }
                />
            : null }

        </RA.Show>
    )
}

export type LocationShowProps = {
    id?: Interfaces.EntID,
    withEdges?: boolean,
} & RA.ShowProps
export const LocationShow : React.FC<LocationShowProps> = ({id, withEdges, ...showProps}) => {
    const { queryResult } = useShow<Interfaces.ILocation>({
        resource: "Location",
        id,
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
        },
    });

    const { data, isLoading } = queryResult;
    const record = data?.data

    const [edgesDiagram, setedgesDiagram] = useState(false)

    if(!record){
        return <></>
    }

    const nodes: Array<Diagram.Node|undefined> =  [
            {
                id: record.id,
                label: record.id,
                
            },
            record.company ? {
                id: record.company.id || "n/a",
                label: record.company.id ||"n/a",
            } : undefined,
            record.country ? {
                id: record.country.id || "n/a",
                label: record.country.id ||"n/a",
            } : undefined,
        ];
    const links:Array<Diagram.Link|undefined> = [
            record.company ? {
                source: record.id,
                target: record.company?.id || "n/a",
                label: "Company"
            } : undefined,
            record.country ? {
                source: record.id,
                target: record.country?.id || "n/a",
                label: "Country"
            } : undefined,
        ]

    return (
        <RA.Show isLoading={isLoading}
                 headerButtons={({ defaultButtons }) => (
                     <>
                     {defaultButtons}
                     <RA.Button icon={<RA.Icons.ClusterOutlined />} type="primary" onClick={ ()=>{ setedgesDiagram(!edgesDiagram) } }>Edges Diagram</RA.Button>
                     </>
                 )}
                 {...showProps}
        >
            {!edgesDiagram ? <>
                <RA.Typography.Title level={5}>Id</RA.Typography.Title>
                <View.EntUUIDViewOnShow value={ record?.id } />
                <RA.Typography.Title level={5}>Title</RA.Typography.Title>
                <View.EntStringViewOnShow value={ record?.title } />
                <RA.Typography.Title level={5}>Description</RA.Typography.Title>
                <View.EntStringViewOnShow value={ record?.description } />
                <RA.Typography.Title level={5}>Latitude</RA.Typography.Title>
                <View.EntStringViewOnShow value={ record?.latitude } />
                <RA.Typography.Title level={5}>Longitude</RA.Typography.Title>
                <View.EntStringViewOnShow value={ record?.longitude } />
                <RA.Typography.Title level={5}>Address</RA.Typography.Title>
                <View.EntStringViewOnShow value={ record?.address } />
                <RA.Typography.Title level={5}>Postcode</RA.Typography.Title>
                <View.EntStringViewOnShow value={ record?.postcode } />
                <RA.Typography.Title level={5}>Type</RA.Typography.Title>
                <View.EntStringViewOnShow value={ record?.type } />
                <RA.Typography.Title level={5}>State</RA.Typography.Title>
                <View.EntStringViewOnShow value={ record?.state } />
                <RA.Typography.Title level={5}>Suburb</RA.Typography.Title>
                <View.EntStringViewOnShow value={ record?.suburb } />
                <RA.Typography.Title level={5}>Street Type</RA.Typography.Title>
                <View.EntStringViewOnShow value={ record?.streetType } />
                <RA.Typography.Title level={5}>Street Name</RA.Typography.Title>
                <View.EntStringViewOnShow value={ record?.streetName } />

                {withEdges ? <>
                    <RA.Typography.Title level={3}>Edges</RA.Typography.Title>
                    <RA.Descriptions>
                        <RA.Descriptions.Item label="Company">
                            <View.CompanyBadge { ...record?.company } />
                        </RA.Descriptions.Item>
                        <RA.Descriptions.Item label="Country">
                            <View.CountryBadge { ...record?.country } />
                        </RA.Descriptions.Item>
                    </RA.Descriptions>
                    <RA.Tabs
                    defaultActiveKey="0"
                    items={[
                    ]}
                />

                </> : null }
            </> : null }

            { edgesDiagram ?
                <Diagram.GoJS
                    nodes={ nodes.filter((n): n is Diagram.Node => typeof n !== "undefined") }
                    links={ links.filter((n): n is Diagram.Link => typeof n !== "undefined") }
                />
            : null }

        </RA.Show>
    )
}

export type PhoneShowProps = {
    id?: Interfaces.EntID,
    withEdges?: boolean,
} & RA.ShowProps
export const PhoneShow : React.FC<PhoneShowProps> = ({id, withEdges, ...showProps}) => {
    const { queryResult } = useShow<Interfaces.IPhone>({
        resource: "Phone",
        id,
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
        },
    });

    const { data, isLoading } = queryResult;
    const record = data?.data

    const [edgesDiagram, setedgesDiagram] = useState(false)

    if(!record){
        return <></>
    }

    const nodes: Array<Diagram.Node|undefined> =  [
            {
                id: record.id,
                label: record.id,
                
            },
            record.company ? {
                id: record.company.id || "n/a",
                label: record.company.id ||"n/a",
            } : undefined,
            record.country ? {
                id: record.country.id || "n/a",
                label: record.country.id ||"n/a",
            } : undefined,
        ];
    const links:Array<Diagram.Link|undefined> = [
            record.company ? {
                source: record.id,
                target: record.company?.id || "n/a",
                label: "Company"
            } : undefined,
            record.country ? {
                source: record.id,
                target: record.country?.id || "n/a",
                label: "Country"
            } : undefined,
        ]

    return (
        <RA.Show isLoading={isLoading}
                 headerButtons={({ defaultButtons }) => (
                     <>
                     {defaultButtons}
                     <RA.Button icon={<RA.Icons.ClusterOutlined />} type="primary" onClick={ ()=>{ setedgesDiagram(!edgesDiagram) } }>Edges Diagram</RA.Button>
                     </>
                 )}
                 {...showProps}
        >
            {!edgesDiagram ? <>
                <RA.Typography.Title level={5}>Id</RA.Typography.Title>
                <View.EntUUIDViewOnShow value={ record?.id } />
                <RA.Typography.Title level={5}>Title</RA.Typography.Title>
                <View.EntStringViewOnShow value={ record?.title } />
                <RA.Typography.Title level={5}>Description</RA.Typography.Title>
                <View.EntStringViewOnShow value={ record?.description } />
                <RA.Typography.Title level={5}>Number</RA.Typography.Title>
                <View.EntStringViewOnShow value={ record?.number } />
                <RA.Typography.Title level={5}>Type</RA.Typography.Title>
                <View.EntStringViewOnShow value={ record?.type } />

                {withEdges ? <>
                    <RA.Typography.Title level={3}>Edges</RA.Typography.Title>
                    <RA.Descriptions>
                        <RA.Descriptions.Item label="Company">
                            <View.CompanyBadge { ...record?.company } />
                        </RA.Descriptions.Item>
                        <RA.Descriptions.Item label="Country">
                            <View.CountryBadge { ...record?.country } />
                        </RA.Descriptions.Item>
                    </RA.Descriptions>
                    <RA.Tabs
                    defaultActiveKey="0"
                    items={[
                    ]}
                />

                </> : null }
            </> : null }

            { edgesDiagram ?
                <Diagram.GoJS
                    nodes={ nodes.filter((n): n is Diagram.Node => typeof n !== "undefined") }
                    links={ links.filter((n): n is Diagram.Link => typeof n !== "undefined") }
                />
            : null }

        </RA.Show>
    )
}

export type ProductShowProps = {
    id?: Interfaces.EntID,
    withEdges?: boolean,
} & RA.ShowProps
export const ProductShow : React.FC<ProductShowProps> = ({id, withEdges, ...showProps}) => {
    const { queryResult } = useShow<Interfaces.IProduct>({
        resource: "Product",
        id,
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
        },
    });

    const { data, isLoading } = queryResult;
    const record = data?.data

    const [edgesDiagram, setedgesDiagram] = useState(false)

    if(!record){
        return <></>
    }

    const nodes: Array<Diagram.Node|undefined> =  [
            {
                id: record.id,
                label: record.id,
                
            },
            record.warehouse ? {
                id: record.warehouse.id || "n/a",
                label: record.warehouse.id ||"n/a",
            } : undefined,
            record.vendor ? {
                id: record.vendor.id || "n/a",
                label: record.vendor.id ||"n/a",
            } : undefined,
        ];
    const links:Array<Diagram.Link|undefined> = [
            record.warehouse ? {
                source: record.id,
                target: record.warehouse?.id || "n/a",
                label: "Warehouse"
            } : undefined,
            record.vendor ? {
                source: record.id,
                target: record.vendor?.id || "n/a",
                label: "Vendor"
            } : undefined,
        ]

    return (
        <RA.Show isLoading={isLoading}
                 headerButtons={({ defaultButtons }) => (
                     <>
                     {defaultButtons}
                     <RA.Button icon={<RA.Icons.ClusterOutlined />} type="primary" onClick={ ()=>{ setedgesDiagram(!edgesDiagram) } }>Edges Diagram</RA.Button>
                     </>
                 )}
                 {...showProps}
        >
            {!edgesDiagram ? <>
                <RA.Typography.Title level={5}>Id</RA.Typography.Title>
                <View.EntUUIDViewOnShow value={ record?.id } />
                <RA.Typography.Title level={5}>Name</RA.Typography.Title>
                <View.EntStringViewOnShow value={ record?.name } />
                <RA.Typography.Title level={5}>Description</RA.Typography.Title>
                <View.EntRichTextViewOnShow value={ record?.description } />
                <RA.Typography.Title level={5}>Image</RA.Typography.Title>
                <View.EntImageViewOnShow value={ record?.image } />
                <RA.Typography.Title level={5}>Url</RA.Typography.Title>
                <View.EntURLViewOnShow value={ record?.url } />
                <RA.Typography.Title level={5}>Last Sell</RA.Typography.Title>
                <View.EntDateViewOnShow value={ record?.lastSell } />
                <RA.Typography.Title level={5}>Created At</RA.Typography.Title>
                <View.EntDateViewOnShow value={ record?.createdAt } />
                <RA.Typography.Title level={5}>Status</RA.Typography.Title>
                <View.EntEnums_ProcessStatusViewOnShow value={ record?.status } />
                <RA.Typography.Title level={5}>Build Status</RA.Typography.Title>
                <View.EntEnums_ProcessStatusViewOnShow value={ record?.buildStatus } />

                {withEdges ? <>
                    <RA.Typography.Title level={3}>Edges</RA.Typography.Title>
                    <RA.Descriptions>
                        <RA.Descriptions.Item label="Warehouse">
                            <View.WarehouseBadge { ...record?.warehouse } />
                        </RA.Descriptions.Item>
                        <RA.Descriptions.Item label="Vendor">
                            <View.VendorBadge { ...record?.vendor } />
                        </RA.Descriptions.Item>
                    </RA.Descriptions>
                    <RA.Tabs
                    defaultActiveKey="0"
                    items={[
                    ]}
                />

                </> : null }
            </> : null }

            { edgesDiagram ?
                <Diagram.GoJS
                    nodes={ nodes.filter((n): n is Diagram.Node => typeof n !== "undefined") }
                    links={ links.filter((n): n is Diagram.Link => typeof n !== "undefined") }
                />
            : null }

        </RA.Show>
    )
}

export type VendorShowProps = {
    id?: Interfaces.EntID,
    withEdges?: boolean,
} & RA.ShowProps
export const VendorShow : React.FC<VendorShowProps> = ({id, withEdges, ...showProps}) => {
    const { queryResult } = useShow<Interfaces.IVendor>({
        resource: "Vendor",
        id,
        metaData: {
            fields: [
                "id",
                "name",
                "schema",
                {
                    operation: "warehouses",
                    fields: [
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
                    ],
                    variables: {
                        first: 10
                    }
                },
                {
                    operation: "products",
                    fields: [
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
                    ],
                    variables: {
                        first: 10
                    }
                },
            ],
        },
    });

    const { data, isLoading } = queryResult;
    const record = data?.data

    const [edgesDiagram, setedgesDiagram] = useState(false)

    if(!record){
        return <></>
    }

    const nodes: Array<Diagram.Node|undefined> =  [
            {
                id: record.id,
                label: record.id,
                
            },
            ...(record.warehouses || []).map((i)=>{
                return {
                    id: i.id,
                    label: i.id,
                }
            }),
            Number(record._warehouses?.totalCount) > Number(record.warehouses?.length)
                ? {
                    id: "Warehouse_more",
                    label: `More ${Number(record._warehouses?.totalCount) - Number(record.warehouses?.length)}`
                }
                : undefined,
            ...(record.products || []).map((i)=>{
                return {
                    id: i.id,
                    label: i.id,
                }
            }),
            Number(record._products?.totalCount) > Number(record.products?.length)
                ? {
                    id: "Product_more",
                    label: `More ${Number(record._products?.totalCount) - Number(record.products?.length)}`
                }
                : undefined,
        ];
    const links:Array<Diagram.Link|undefined> = [
            ...(record.warehouses || []).map((i)=>{
                return {
                    source: record.id,
                    target: i.id,
                    label: "Warehouses"
                }
            }),
            Number(record._warehouses?.totalCount) > Number(record.warehouses?.length)
            ? {
                source: record.id,
                target: "Warehouse_more",
                label: "Warehouses"
            }
            : undefined,
            ...(record.products || []).map((i)=>{
                return {
                    source: record.id,
                    target: i.id,
                    label: "Products"
                }
            }),
            Number(record._products?.totalCount) > Number(record.products?.length)
            ? {
                source: record.id,
                target: "Product_more",
                label: "Products"
            }
            : undefined,
        ]

    return (
        <RA.Show isLoading={isLoading}
                 headerButtons={({ defaultButtons }) => (
                     <>
                     {defaultButtons}
                     <RA.Button icon={<RA.Icons.ClusterOutlined />} type="primary" onClick={ ()=>{ setedgesDiagram(!edgesDiagram) } }>Edges Diagram</RA.Button>
                     </>
                 )}
                 {...showProps}
        >
            {!edgesDiagram ? <>
                <RA.Typography.Title level={5}>Id</RA.Typography.Title>
                <View.EntUUIDViewOnShow value={ record?.id } />
                <RA.Typography.Title level={5}>Name</RA.Typography.Title>
                <View.EntStringViewOnShow value={ record?.name } />
                <RA.Typography.Title level={5}>Schema</RA.Typography.Title>
                <View.EntCodeViewOnShow value={ record?.schema } />

                {withEdges ? <>
                    <RA.Typography.Title level={3}>Edges</RA.Typography.Title>
                    <RA.Descriptions>
                    </RA.Descriptions>
                    <RA.Tabs
                    defaultActiveKey="0"
                    items={[
                        {
                            label: <span>
                                <RA.Icons.OrderedListOutlined />
                                Warehouses
                            </span>,
                            key: "0",
                            children: <Lists.WarehouseList
                                key={ "warehouses-vendors" }
                                breadcrumb={ false }
                                tableProps={ {
                                    extendTable: {
                                        permanentFilter: [
                                            { operator: "hasVendorWith" as any, field: "", value: {id: record?.id} }
                                        ]
                                    }
                                }
                                }
                            />
                        },
                        {
                            label: <span>
                                <RA.Icons.FileOutlined />
                                Products
                            </span>,
                            key: "1",
                            children: <Lists.ProductList
                                key={ "products-vendors" }
                                breadcrumb={ false }
                                tableProps={ {
                                    extendTable: {
                                        permanentFilter: [
                                            { operator: "hasVendorWith" as any, field: "", value: {id: record?.id} }
                                        ]
                                    }
                                }
                                }
                            />
                        },
                    ]}
                />

                </> : null }
            </> : null }

            { edgesDiagram ?
                <Diagram.GoJS
                    nodes={ nodes.filter((n): n is Diagram.Node => typeof n !== "undefined") }
                    links={ links.filter((n): n is Diagram.Link => typeof n !== "undefined") }
                />
            : null }

        </RA.Show>
    )
}

export type WarehouseShowProps = {
    id?: Interfaces.EntID,
    withEdges?: boolean,
} & RA.ShowProps
export const WarehouseShow : React.FC<WarehouseShowProps> = ({id, withEdges, ...showProps}) => {
    const { queryResult } = useShow<Interfaces.IWarehouse>({
        resource: "Warehouse",
        id,
        metaData: {
            fields: [
                "id",
                "name",
                "lastUpdate",
                "originalData",
                "enabled",
                "filters",
                {
                    operation: "products",
                    fields: [
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
                    ],
                    variables: {
                        first: 10
                    }
                },
                {
                    "vendor": [
                        "id",
                        "name",
                        "schema",
                    ]
                },
            ],
        },
    });

    const { data, isLoading } = queryResult;
    const record = data?.data

    const [edgesDiagram, setedgesDiagram] = useState(false)

    if(!record){
        return <></>
    }

    const nodes: Array<Diagram.Node|undefined> =  [
            {
                id: record.id,
                label: record.id,
                
            },
            ...(record.products || []).map((i)=>{
                return {
                    id: i.id,
                    label: i.id,
                }
            }),
            Number(record._products?.totalCount) > Number(record.products?.length)
                ? {
                    id: "Product_more",
                    label: `More ${Number(record._products?.totalCount) - Number(record.products?.length)}`
                }
                : undefined,
            record.vendor ? {
                id: record.vendor.id || "n/a",
                label: record.vendor.id ||"n/a",
            } : undefined,
        ];
    const links:Array<Diagram.Link|undefined> = [
            ...(record.products || []).map((i)=>{
                return {
                    source: record.id,
                    target: i.id,
                    label: "Products"
                }
            }),
            Number(record._products?.totalCount) > Number(record.products?.length)
            ? {
                source: record.id,
                target: "Product_more",
                label: "Products"
            }
            : undefined,
            record.vendor ? {
                source: record.id,
                target: record.vendor?.id || "n/a",
                label: "Vendor"
            } : undefined,
        ]

    return (
        <RA.Show isLoading={isLoading}
                 headerButtons={({ defaultButtons }) => (
                     <>
                     {defaultButtons}
                     <RA.Button icon={<RA.Icons.ClusterOutlined />} type="primary" onClick={ ()=>{ setedgesDiagram(!edgesDiagram) } }>Edges Diagram</RA.Button>
                     </>
                 )}
                 {...showProps}
        >
            {!edgesDiagram ? <>
                <RA.Typography.Title level={5}>Id</RA.Typography.Title>
                <View.EntUUIDViewOnShow value={ record?.id } />
                <RA.Typography.Title level={5}>Name</RA.Typography.Title>
                <View.EntStringViewOnShow value={ record?.name } />
                <RA.Typography.Title level={5}>Last Update</RA.Typography.Title>
                <View.EntDateViewOnShow value={ record?.lastUpdate } />
                <RA.Typography.Title level={5}>Original Data</RA.Typography.Title>
                <View.EntCodeViewOnShow value={ record?.originalData } />
                <RA.Typography.Title level={5}>Enabled</RA.Typography.Title>
                <View.EntBooleanViewOnShow value={ record?.enabled } />
                <RA.Typography.Title level={5}>Filters</RA.Typography.Title>
                <View.EntStringListViewOnShow value={ record?.filters } />

                {withEdges ? <>
                    <RA.Typography.Title level={3}>Edges</RA.Typography.Title>
                    <RA.Descriptions>
                        <RA.Descriptions.Item label="Vendor">
                            <View.VendorBadge { ...record?.vendor } />
                        </RA.Descriptions.Item>
                    </RA.Descriptions>
                    <RA.Tabs
                    defaultActiveKey="0"
                    items={[
                        {
                            label: <span>
                                <RA.Icons.FileOutlined />
                                Products
                            </span>,
                            key: "0",
                            children: <Lists.ProductList
                                key={ "products-warehouses" }
                                breadcrumb={ false }
                                tableProps={ {
                                    extendTable: {
                                        permanentFilter: [
                                            { operator: "hasWarehouseWith" as any, field: "", value: {id: record?.id} }
                                        ]
                                    }
                                }
                                }
                            />
                        },
                    ]}
                />

                </> : null }
            </> : null }

            { edgesDiagram ?
                <Diagram.GoJS
                    nodes={ nodes.filter((n): n is Diagram.Node => typeof n !== "undefined") }
                    links={ links.filter((n): n is Diagram.Link => typeof n !== "undefined") }
                />
            : null }

        </RA.Show>
    )
}

export type WebsiteShowProps = {
    id?: Interfaces.EntID,
    withEdges?: boolean,
} & RA.ShowProps
export const WebsiteShow : React.FC<WebsiteShowProps> = ({id, withEdges, ...showProps}) => {
    const { queryResult } = useShow<Interfaces.IWebsite>({
        resource: "Website",
        id,
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
        },
    });

    const { data, isLoading } = queryResult;
    const record = data?.data

    const [edgesDiagram, setedgesDiagram] = useState(false)

    if(!record){
        return <></>
    }

    const nodes: Array<Diagram.Node|undefined> =  [
            {
                id: record.id,
                label: record.id,
                
            },
            record.company ? {
                id: record.company.id || "n/a",
                label: record.company.id ||"n/a",
            } : undefined,
            record.country ? {
                id: record.country.id || "n/a",
                label: record.country.id ||"n/a",
            } : undefined,
        ];
    const links:Array<Diagram.Link|undefined> = [
            record.company ? {
                source: record.id,
                target: record.company?.id || "n/a",
                label: "Company"
            } : undefined,
            record.country ? {
                source: record.id,
                target: record.country?.id || "n/a",
                label: "Country"
            } : undefined,
        ]

    return (
        <RA.Show isLoading={isLoading}
                 headerButtons={({ defaultButtons }) => (
                     <>
                     {defaultButtons}
                     <RA.Button icon={<RA.Icons.ClusterOutlined />} type="primary" onClick={ ()=>{ setedgesDiagram(!edgesDiagram) } }>Edges Diagram</RA.Button>
                     </>
                 )}
                 {...showProps}
        >
            {!edgesDiagram ? <>
                <RA.Typography.Title level={5}>Id</RA.Typography.Title>
                <View.EntUUIDViewOnShow value={ record?.id } />
                <RA.Typography.Title level={5}>Title</RA.Typography.Title>
                <View.EntStringViewOnShow value={ record?.title } />
                <RA.Typography.Title level={5}>Description</RA.Typography.Title>
                <View.EntStringViewOnShow value={ record?.description } />
                <RA.Typography.Title level={5}>Url</RA.Typography.Title>
                <View.EntURLViewOnShow value={ record?.url } />

                {withEdges ? <>
                    <RA.Typography.Title level={3}>Edges</RA.Typography.Title>
                    <RA.Descriptions>
                        <RA.Descriptions.Item label="Company">
                            <View.CompanyBadge { ...record?.company } />
                        </RA.Descriptions.Item>
                        <RA.Descriptions.Item label="Country">
                            <View.CountryBadge { ...record?.country } />
                        </RA.Descriptions.Item>
                    </RA.Descriptions>
                    <RA.Tabs
                    defaultActiveKey="0"
                    items={[
                    ]}
                />

                </> : null }
            </> : null }

            { edgesDiagram ?
                <Diagram.GoJS
                    nodes={ nodes.filter((n): n is Diagram.Node => typeof n !== "undefined") }
                    links={ links.filter((n): n is Diagram.Link => typeof n !== "undefined") }
                />
            : null }

        </RA.Show>
    )
}/* eslint no-use-before-define: 2 */