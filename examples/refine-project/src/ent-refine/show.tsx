import { useState } from "react";
import {BaseKey} from "@pankod/refine-core/dist/interfaces";
import { useShow, useOne } from "@pankod/refine-core";
import * as RA  from "@pankod/refine-antd";
import RefineReactRouter from "@pankod/refine-react-router-v6";
import {Canvas, Label, Node, Edge} from "reaflow";

import * as Tables from "./tables";
import * as Lists from "./list";
import * as Interfaces from "./interfaces";
import * as FieldView from "./field-view";
import * as Custom from "./custom";
import * as Badge  from "./badge";

const { Link } = RefineReactRouter;



export type CompanyShowProps = {
    id?: BaseKey,
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
                "logo",
                "description",
                {
                    "countries": [
                        {
                            edges: [
                                {
                                    node: [ "id", "name" ],
                                }
                            ]
                        }
                    ]
                },
                {
                    "phones": [
                        {
                            edges: [
                                {
                                    node: [ "id", "title" ],
                                }
                            ]
                        }
                    ]
                },
                {
                    "emails": [
                        {
                            edges: [
                                {
                                    node: [ "id", "title" ],
                                }
                            ]
                        }
                    ]
                },
                {
                    "websites": [
                        {
                            edges: [
                                {
                                    node: [ "id", "title" ],
                                }
                            ]
                        }
                    ]
                },
                {
                    "locations": [
                        {
                            edges: [
                                {
                                    node: [ "id", "title" ],
                                }
                            ]
                        }
                    ]
                },
                {
                    "logoImage": [ "id", "title" ]
                },
                {
                    "coverImage": [ "id", "title" ]
                },
                {
                    "galleryImages": [
                        {
                            edges: [
                                {
                                    node: [ "id", "title" ],
                                }
                            ]
                        }
                    ]
                },
            ],
        },
    });

    const { data, isLoading } = queryResult;
    const record = data?.data

    const [idTreeView, setIdTreeView] = useState(false)

    if(!record){
        return <></>
    }

    type nodeType = {id: string; text: string, data: Record<string, any>}
    type edgeType = {id: string, from: string, to: string, text: string}
    const nodes: Array<nodeType|undefined> = [
        {
            id: record.id,
            text: record.id,
            data: {
                title: record.name
            }
        },
        ...(record.countries || []).map((i)=>{
            return {
                id: i.id,
                text: i.id,
                data: {
                    title: i.name
                }
            }
        }),
        ...(record.phones || []).map((i)=>{
            return {
                id: i.id,
                text: i.id,
                data: {
                    title: i.title
                }
            }
        }),
        ...(record.emails || []).map((i)=>{
            return {
                id: i.id,
                text: i.id,
                data: {
                    title: i.title
                }
            }
        }),
        ...(record.websites || []).map((i)=>{
            return {
                id: i.id,
                text: i.id,
                data: {
                    title: i.title
                }
            }
        }),
        ...(record.locations || []).map((i)=>{
            return {
                id: i.id,
                text: i.id,
                data: {
                    title: i.title
                }
            }
        }),
        record.logoImage ? {
            id: record.logoImage.id || "n/a",
            text: record.logoImage.id ||"n/a",
            data: {
                title: record.logoImage.title
            }
        } : undefined,
        record.coverImage ? {
            id: record.coverImage.id || "n/a",
            text: record.coverImage.id ||"n/a",
            data: {
                title: record.coverImage.title
            }
        } : undefined,
        ...(record.galleryImages || []).map((i)=>{
            return {
                id: i.id,
                text: i.id,
                data: {
                    title: i.title
                }
            }
        }),
    ]
    const edges: Array<edgeType|undefined> = [
        ...(record.countries || []).map((i)=>{
           return {
               id: record.id+"-"+i.id,
               from: record.id,
               to: i.id,
               text: "Countries"
           }
        }),
        ...(record.phones || []).map((i)=>{
           return {
               id: record.id+"-"+i.id,
               from: record.id,
               to: i.id,
               text: "Phones"
           }
        }),
        ...(record.emails || []).map((i)=>{
           return {
               id: record.id+"-"+i.id,
               from: record.id,
               to: i.id,
               text: "Emails"
           }
        }),
        ...(record.websites || []).map((i)=>{
           return {
               id: record.id+"-"+i.id,
               from: record.id,
               to: i.id,
               text: "Websites"
           }
        }),
        ...(record.locations || []).map((i)=>{
           return {
               id: record.id+"-"+i.id,
               from: record.id,
               to: i.id,
               text: "Locations"
           }
        }),
        record.logoImage ? {
            id: record.id+"-"+(record.logoImage?.id || "n/a"),
            from: record.id,
            to: record.logoImage?.id || "n/a",
            text: "Logo Image"
        } : undefined,
        record.coverImage ? {
            id: record.id+"-"+(record.coverImage?.id || "n/a"),
            from: record.id,
            to: record.coverImage?.id || "n/a",
            text: "Cover Image"
        } : undefined,
        ...(record.galleryImages || []).map((i)=>{
           return {
               id: record.id+"-"+i.id,
               from: record.id,
               to: i.id,
               text: "Gallery Images"
           }
        }),
    ]


    
    return (
        <RA.Show isLoading={isLoading}
                 headerButtons={({ defaultButtons }) => (
                     <>
                     {defaultButtons}
                     <RA.Button icon={<RA.Icons.ClusterOutlined />} type="primary" onClick={ ()=>{ setIdTreeView(!idTreeView) } }>ID tree</RA.Button>
                     </>
                 )}
                 {...showProps}
        >
            {!idTreeView ? <>
                <RA.Typography.Title level={5}>Id</RA.Typography.Title>
                <FieldView.ER_UUIDViewOnShow value={ record?.id } />
                <RA.Typography.Title level={5}>Name</RA.Typography.Title>
                
                <Custom.MyCustomTitle value={ record?.name } />
                <RA.Typography.Title level={5}>Logo</RA.Typography.Title>
                <FieldView.ER_ImageViewOnShow value={ record?.logo } />
                <RA.Typography.Title level={5}>Description</RA.Typography.Title>
                <FieldView.ER_RichTextViewOnShow value={ record?.description } />

                {withEdges ? <>
                    <RA.Typography.Title level={3}>Edges</RA.Typography.Title>
                    <RA.Descriptions>
                        <RA.Descriptions.Item label="Logo Image">
                            <Badge.ImageBadge id={ record?.logoImage?.id } title={ record?.logoImage?.title }/>
                        </RA.Descriptions.Item>
                        <RA.Descriptions.Item label="Cover Image">
                            <Badge.ImageBadge id={ record?.coverImage?.id } title={ record?.coverImage?.title }/>
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

            {idTreeView ? <Canvas
                height={600}
                pannable={true}
                nodes={nodes.filter((n): n is nodeType => typeof n !== "undefined")}
                edges={edges.filter((e): e is edgeType => typeof e !== "undefined")}

                node={<Node
                    style={ { stroke: '#000000', fill: '#001628', strokeWidth: 1 } }
                    label={ <Label style={ { fill: '#ffffff' } } /> }
                >{event => (
                    <span>{event.node.data.title}</span>
                )}</Node>}
                edge={<Edge label={<Label style={ { fill: 'black' } } />}></Edge>}
            /> : null}

        </RA.Show>
    );
};

export type CountryShowProps = {
    id?: BaseKey,
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
                    "companies": [
                        {
                            edges: [
                                {
                                    node: [ "id", "name" ],
                                }
                            ]
                        }
                    ]
                },
                {
                    "phones": [
                        {
                            edges: [
                                {
                                    node: [ "id", "title" ],
                                }
                            ]
                        }
                    ]
                },
                {
                    "emails": [
                        {
                            edges: [
                                {
                                    node: [ "id", "title" ],
                                }
                            ]
                        }
                    ]
                },
                {
                    "websites": [
                        {
                            edges: [
                                {
                                    node: [ "id", "title" ],
                                }
                            ]
                        }
                    ]
                },
                {
                    "locations": [
                        {
                            edges: [
                                {
                                    node: [ "id", "title" ],
                                }
                            ]
                        }
                    ]
                },
            ],
        },
    });

    const { data, isLoading } = queryResult;
    const record = data?.data

    const [idTreeView, setIdTreeView] = useState(false)

    if(!record){
        return <></>
    }

    type nodeType = {id: string; text: string, data: Record<string, any>}
    type edgeType = {id: string, from: string, to: string, text: string}
    const nodes: Array<nodeType|undefined> = [
        {
            id: record.id,
            text: record.id,
            data: {
                title: record.name
            }
        },
        ...(record.companies || []).map((i)=>{
            return {
                id: i.id,
                text: i.id,
                data: {
                    title: i.name
                }
            }
        }),
        ...(record.phones || []).map((i)=>{
            return {
                id: i.id,
                text: i.id,
                data: {
                    title: i.title
                }
            }
        }),
        ...(record.emails || []).map((i)=>{
            return {
                id: i.id,
                text: i.id,
                data: {
                    title: i.title
                }
            }
        }),
        ...(record.websites || []).map((i)=>{
            return {
                id: i.id,
                text: i.id,
                data: {
                    title: i.title
                }
            }
        }),
        ...(record.locations || []).map((i)=>{
            return {
                id: i.id,
                text: i.id,
                data: {
                    title: i.title
                }
            }
        }),
    ]
    const edges: Array<edgeType|undefined> = [
        ...(record.companies || []).map((i)=>{
           return {
               id: record.id+"-"+i.id,
               from: record.id,
               to: i.id,
               text: "Companies"
           }
        }),
        ...(record.phones || []).map((i)=>{
           return {
               id: record.id+"-"+i.id,
               from: record.id,
               to: i.id,
               text: "Phones"
           }
        }),
        ...(record.emails || []).map((i)=>{
           return {
               id: record.id+"-"+i.id,
               from: record.id,
               to: i.id,
               text: "Emails"
           }
        }),
        ...(record.websites || []).map((i)=>{
           return {
               id: record.id+"-"+i.id,
               from: record.id,
               to: i.id,
               text: "Websites"
           }
        }),
        ...(record.locations || []).map((i)=>{
           return {
               id: record.id+"-"+i.id,
               from: record.id,
               to: i.id,
               text: "Locations"
           }
        }),
    ]


    
    return (
        <RA.Show isLoading={isLoading}
                 headerButtons={({ defaultButtons }) => (
                     <>
                     {defaultButtons}
                     <RA.Button icon={<RA.Icons.ClusterOutlined />} type="primary" onClick={ ()=>{ setIdTreeView(!idTreeView) } }>ID tree</RA.Button>
                     </>
                 )}
                 {...showProps}
        >
            {!idTreeView ? <>
                <RA.Typography.Title level={5}>Id</RA.Typography.Title>
                <FieldView.ER_UUIDViewOnShow value={ record?.id } />
                <RA.Typography.Title level={5}>Name</RA.Typography.Title>
                <FieldView.ER_StringViewOnShow value={ record?.name } />
                <RA.Typography.Title level={5}>Code</RA.Typography.Title>
                <FieldView.ER_StringViewOnShow value={ record?.code } />

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

            {idTreeView ? <Canvas
                height={600}
                pannable={true}
                nodes={nodes.filter((n): n is nodeType => typeof n !== "undefined")}
                edges={edges.filter((e): e is edgeType => typeof e !== "undefined")}

                node={<Node
                    style={ { stroke: '#000000', fill: '#001628', strokeWidth: 1 } }
                    label={ <Label style={ { fill: '#ffffff' } } /> }
                >{event => (
                    <span>{event.node.data.title}</span>
                )}</Node>}
                edge={<Edge label={<Label style={ { fill: 'black' } } />}></Edge>}
            /> : null}

        </RA.Show>
    );
};

export type EmailShowProps = {
    id?: BaseKey,
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
                    "company": [ "id", "name" ]
                },
                {
                    "country": [ "id", "name" ]
                },
            ],
        },
    });

    const { data, isLoading } = queryResult;
    const record = data?.data

    const [idTreeView, setIdTreeView] = useState(false)

    if(!record){
        return <></>
    }

    type nodeType = {id: string; text: string, data: Record<string, any>}
    type edgeType = {id: string, from: string, to: string, text: string}
    const nodes: Array<nodeType|undefined> = [
        {
            id: record.id,
            text: record.id,
            data: {
                title: record.title
            }
        },
        record.company ? {
            id: record.company.id || "n/a",
            text: record.company.id ||"n/a",
            data: {
                title: record.company.name
            }
        } : undefined,
        record.country ? {
            id: record.country.id || "n/a",
            text: record.country.id ||"n/a",
            data: {
                title: record.country.name
            }
        } : undefined,
    ]
    const edges: Array<edgeType|undefined> = [
        record.company ? {
            id: record.id+"-"+(record.company?.id || "n/a"),
            from: record.id,
            to: record.company?.id || "n/a",
            text: "Company"
        } : undefined,
        record.country ? {
            id: record.id+"-"+(record.country?.id || "n/a"),
            from: record.id,
            to: record.country?.id || "n/a",
            text: "Country"
        } : undefined,
    ]


    
    return (
        <RA.Show isLoading={isLoading}
                 headerButtons={({ defaultButtons }) => (
                     <>
                     {defaultButtons}
                     <RA.Button icon={<RA.Icons.ClusterOutlined />} type="primary" onClick={ ()=>{ setIdTreeView(!idTreeView) } }>ID tree</RA.Button>
                     </>
                 )}
                 {...showProps}
        >
            {!idTreeView ? <>
                <RA.Typography.Title level={5}>Id</RA.Typography.Title>
                <FieldView.ER_UUIDViewOnShow value={ record?.id } />
                <RA.Typography.Title level={5}>Title</RA.Typography.Title>
                <FieldView.ER_StringViewOnShow value={ record?.title } />
                <RA.Typography.Title level={5}>Description</RA.Typography.Title>
                <FieldView.ER_StringViewOnShow value={ record?.description } />
                <RA.Typography.Title level={5}>Address</RA.Typography.Title>
                <FieldView.ER_StringViewOnShow value={ record?.address } />

                {withEdges ? <>
                    <RA.Typography.Title level={3}>Edges</RA.Typography.Title>
                    <RA.Descriptions>
                        <RA.Descriptions.Item label="Company">
                            <Badge.CompanyBadge id={ record?.company?.id } title={ record?.company?.name }/>
                        </RA.Descriptions.Item>
                        <RA.Descriptions.Item label="Country">
                            <Badge.CountryBadge id={ record?.country?.id } title={ record?.country?.name }/>
                        </RA.Descriptions.Item>
                    </RA.Descriptions>
                    <RA.Tabs
                    defaultActiveKey="0"
                    items={[
                    ]}
                />

                </> : null }
            </> : null }

            {idTreeView ? <Canvas
                height={600}
                pannable={true}
                nodes={nodes.filter((n): n is nodeType => typeof n !== "undefined")}
                edges={edges.filter((e): e is edgeType => typeof e !== "undefined")}

                node={<Node
                    style={ { stroke: '#000000', fill: '#001628', strokeWidth: 1 } }
                    label={ <Label style={ { fill: '#ffffff' } } /> }
                >{event => (
                    <span>{event.node.data.title}</span>
                )}</Node>}
                edge={<Edge label={<Label style={ { fill: 'black' } } />}></Edge>}
            /> : null}

        </RA.Show>
    );
};

export type ImageShowProps = {
    id?: BaseKey,
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
                    "galleryCompany": [ "id", "name" ]
                },
                {
                    "logoCompany": [ "id", "name" ]
                },
                {
                    "coverCompany": [ "id", "name" ]
                },
            ],
        },
    });

    const { data, isLoading } = queryResult;
    const record = data?.data

    const [idTreeView, setIdTreeView] = useState(false)

    if(!record){
        return <></>
    }

    type nodeType = {id: string; text: string, data: Record<string, any>}
    type edgeType = {id: string, from: string, to: string, text: string}
    const nodes: Array<nodeType|undefined> = [
        {
            id: record.id,
            text: record.id,
            data: {
                title: record.title
            }
        },
        record.galleryCompany ? {
            id: record.galleryCompany.id || "n/a",
            text: record.galleryCompany.id ||"n/a",
            data: {
                title: record.galleryCompany.name
            }
        } : undefined,
        record.logoCompany ? {
            id: record.logoCompany.id || "n/a",
            text: record.logoCompany.id ||"n/a",
            data: {
                title: record.logoCompany.name
            }
        } : undefined,
        record.coverCompany ? {
            id: record.coverCompany.id || "n/a",
            text: record.coverCompany.id ||"n/a",
            data: {
                title: record.coverCompany.name
            }
        } : undefined,
    ]
    const edges: Array<edgeType|undefined> = [
        record.galleryCompany ? {
            id: record.id+"-"+(record.galleryCompany?.id || "n/a"),
            from: record.id,
            to: record.galleryCompany?.id || "n/a",
            text: "Gallery Company"
        } : undefined,
        record.logoCompany ? {
            id: record.id+"-"+(record.logoCompany?.id || "n/a"),
            from: record.id,
            to: record.logoCompany?.id || "n/a",
            text: "Logo Company"
        } : undefined,
        record.coverCompany ? {
            id: record.id+"-"+(record.coverCompany?.id || "n/a"),
            from: record.id,
            to: record.coverCompany?.id || "n/a",
            text: "Cover Company"
        } : undefined,
    ]


    
    return (
        <RA.Show isLoading={isLoading}
                 headerButtons={({ defaultButtons }) => (
                     <>
                     {defaultButtons}
                     <RA.Button icon={<RA.Icons.ClusterOutlined />} type="primary" onClick={ ()=>{ setIdTreeView(!idTreeView) } }>ID tree</RA.Button>
                     </>
                 )}
                 {...showProps}
        >
            {!idTreeView ? <>
                <RA.Typography.Title level={5}>Id</RA.Typography.Title>
                <FieldView.ER_UUIDViewOnShow value={ record?.id } />
                <RA.Typography.Title level={5}>Title</RA.Typography.Title>
                <FieldView.ER_StringViewOnShow value={ record?.title } />
                <RA.Typography.Title level={5}>Original Url</RA.Typography.Title>
                <FieldView.ER_ImageViewOnShow value={ record?.originalURL } />

                {withEdges ? <>
                    <RA.Typography.Title level={3}>Edges</RA.Typography.Title>
                    <RA.Descriptions>
                        <RA.Descriptions.Item label="Gallery Company">
                            <Badge.CompanyBadge id={ record?.galleryCompany?.id } title={ record?.galleryCompany?.name }/>
                        </RA.Descriptions.Item>
                        <RA.Descriptions.Item label="Logo Company">
                            <Badge.CompanyBadge id={ record?.logoCompany?.id } title={ record?.logoCompany?.name }/>
                        </RA.Descriptions.Item>
                        <RA.Descriptions.Item label="Cover Company">
                            <Badge.CompanyBadge id={ record?.coverCompany?.id } title={ record?.coverCompany?.name }/>
                        </RA.Descriptions.Item>
                    </RA.Descriptions>
                    <RA.Tabs
                    defaultActiveKey="0"
                    items={[
                    ]}
                />

                </> : null }
            </> : null }

            {idTreeView ? <Canvas
                height={600}
                pannable={true}
                nodes={nodes.filter((n): n is nodeType => typeof n !== "undefined")}
                edges={edges.filter((e): e is edgeType => typeof e !== "undefined")}

                node={<Node
                    style={ { stroke: '#000000', fill: '#001628', strokeWidth: 1 } }
                    label={ <Label style={ { fill: '#ffffff' } } /> }
                >{event => (
                    <span>{event.node.data.title}</span>
                )}</Node>}
                edge={<Edge label={<Label style={ { fill: 'black' } } />}></Edge>}
            /> : null}

        </RA.Show>
    );
};

export type LocationShowProps = {
    id?: BaseKey,
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
                    "company": [ "id", "name" ]
                },
                {
                    "country": [ "id", "name" ]
                },
            ],
        },
    });

    const { data, isLoading } = queryResult;
    const record = data?.data

    const [idTreeView, setIdTreeView] = useState(false)

    if(!record){
        return <></>
    }

    type nodeType = {id: string; text: string, data: Record<string, any>}
    type edgeType = {id: string, from: string, to: string, text: string}
    const nodes: Array<nodeType|undefined> = [
        {
            id: record.id,
            text: record.id,
            data: {
                title: record.title
            }
        },
        record.company ? {
            id: record.company.id || "n/a",
            text: record.company.id ||"n/a",
            data: {
                title: record.company.name
            }
        } : undefined,
        record.country ? {
            id: record.country.id || "n/a",
            text: record.country.id ||"n/a",
            data: {
                title: record.country.name
            }
        } : undefined,
    ]
    const edges: Array<edgeType|undefined> = [
        record.company ? {
            id: record.id+"-"+(record.company?.id || "n/a"),
            from: record.id,
            to: record.company?.id || "n/a",
            text: "Company"
        } : undefined,
        record.country ? {
            id: record.id+"-"+(record.country?.id || "n/a"),
            from: record.id,
            to: record.country?.id || "n/a",
            text: "Country"
        } : undefined,
    ]


    
    return (
        <RA.Show isLoading={isLoading}
                 headerButtons={({ defaultButtons }) => (
                     <>
                     {defaultButtons}
                     <RA.Button icon={<RA.Icons.ClusterOutlined />} type="primary" onClick={ ()=>{ setIdTreeView(!idTreeView) } }>ID tree</RA.Button>
                     </>
                 )}
                 {...showProps}
        >
            {!idTreeView ? <>
                <RA.Typography.Title level={5}>Id</RA.Typography.Title>
                <FieldView.ER_UUIDViewOnShow value={ record?.id } />
                <RA.Typography.Title level={5}>Title</RA.Typography.Title>
                <FieldView.ER_StringViewOnShow value={ record?.title } />
                <RA.Typography.Title level={5}>Description</RA.Typography.Title>
                <FieldView.ER_StringViewOnShow value={ record?.description } />
                <RA.Typography.Title level={5}>Latitude</RA.Typography.Title>
                <FieldView.ER_StringViewOnShow value={ record?.latitude } />
                <RA.Typography.Title level={5}>Longitude</RA.Typography.Title>
                <FieldView.ER_StringViewOnShow value={ record?.longitude } />
                <RA.Typography.Title level={5}>Address</RA.Typography.Title>
                <FieldView.ER_StringViewOnShow value={ record?.address } />
                <RA.Typography.Title level={5}>Postcode</RA.Typography.Title>
                <FieldView.ER_StringViewOnShow value={ record?.postcode } />
                <RA.Typography.Title level={5}>Type</RA.Typography.Title>
                <FieldView.ER_StringViewOnShow value={ record?.type } />
                <RA.Typography.Title level={5}>State</RA.Typography.Title>
                <FieldView.ER_StringViewOnShow value={ record?.state } />
                <RA.Typography.Title level={5}>Suburb</RA.Typography.Title>
                <FieldView.ER_StringViewOnShow value={ record?.suburb } />
                <RA.Typography.Title level={5}>Street Type</RA.Typography.Title>
                <FieldView.ER_StringViewOnShow value={ record?.streetType } />
                <RA.Typography.Title level={5}>Street Name</RA.Typography.Title>
                <FieldView.ER_StringViewOnShow value={ record?.streetName } />

                {withEdges ? <>
                    <RA.Typography.Title level={3}>Edges</RA.Typography.Title>
                    <RA.Descriptions>
                        <RA.Descriptions.Item label="Company">
                            <Badge.CompanyBadge id={ record?.company?.id } title={ record?.company?.name }/>
                        </RA.Descriptions.Item>
                        <RA.Descriptions.Item label="Country">
                            <Badge.CountryBadge id={ record?.country?.id } title={ record?.country?.name }/>
                        </RA.Descriptions.Item>
                    </RA.Descriptions>
                    <RA.Tabs
                    defaultActiveKey="0"
                    items={[
                    ]}
                />

                </> : null }
            </> : null }

            {idTreeView ? <Canvas
                height={600}
                pannable={true}
                nodes={nodes.filter((n): n is nodeType => typeof n !== "undefined")}
                edges={edges.filter((e): e is edgeType => typeof e !== "undefined")}

                node={<Node
                    style={ { stroke: '#000000', fill: '#001628', strokeWidth: 1 } }
                    label={ <Label style={ { fill: '#ffffff' } } /> }
                >{event => (
                    <span>{event.node.data.title}</span>
                )}</Node>}
                edge={<Edge label={<Label style={ { fill: 'black' } } />}></Edge>}
            /> : null}

        </RA.Show>
    );
};

export type PhoneShowProps = {
    id?: BaseKey,
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
                    "company": [ "id", "name" ]
                },
                {
                    "country": [ "id", "name" ]
                },
            ],
        },
    });

    const { data, isLoading } = queryResult;
    const record = data?.data

    const [idTreeView, setIdTreeView] = useState(false)

    if(!record){
        return <></>
    }

    type nodeType = {id: string; text: string, data: Record<string, any>}
    type edgeType = {id: string, from: string, to: string, text: string}
    const nodes: Array<nodeType|undefined> = [
        {
            id: record.id,
            text: record.id,
            data: {
                title: record.title
            }
        },
        record.company ? {
            id: record.company.id || "n/a",
            text: record.company.id ||"n/a",
            data: {
                title: record.company.name
            }
        } : undefined,
        record.country ? {
            id: record.country.id || "n/a",
            text: record.country.id ||"n/a",
            data: {
                title: record.country.name
            }
        } : undefined,
    ]
    const edges: Array<edgeType|undefined> = [
        record.company ? {
            id: record.id+"-"+(record.company?.id || "n/a"),
            from: record.id,
            to: record.company?.id || "n/a",
            text: "Company"
        } : undefined,
        record.country ? {
            id: record.id+"-"+(record.country?.id || "n/a"),
            from: record.id,
            to: record.country?.id || "n/a",
            text: "Country"
        } : undefined,
    ]


    
    return (
        <RA.Show isLoading={isLoading}
                 headerButtons={({ defaultButtons }) => (
                     <>
                     {defaultButtons}
                     <RA.Button icon={<RA.Icons.ClusterOutlined />} type="primary" onClick={ ()=>{ setIdTreeView(!idTreeView) } }>ID tree</RA.Button>
                     </>
                 )}
                 {...showProps}
        >
            {!idTreeView ? <>
                <RA.Typography.Title level={5}>Id</RA.Typography.Title>
                <FieldView.ER_UUIDViewOnShow value={ record?.id } />
                <RA.Typography.Title level={5}>Title</RA.Typography.Title>
                <FieldView.ER_StringViewOnShow value={ record?.title } />
                <RA.Typography.Title level={5}>Description</RA.Typography.Title>
                <FieldView.ER_StringViewOnShow value={ record?.description } />
                <RA.Typography.Title level={5}>Number</RA.Typography.Title>
                <FieldView.ER_StringViewOnShow value={ record?.number } />
                <RA.Typography.Title level={5}>Type</RA.Typography.Title>
                <FieldView.ER_StringViewOnShow value={ record?.type } />

                {withEdges ? <>
                    <RA.Typography.Title level={3}>Edges</RA.Typography.Title>
                    <RA.Descriptions>
                        <RA.Descriptions.Item label="Company">
                            <Badge.CompanyBadge id={ record?.company?.id } title={ record?.company?.name }/>
                        </RA.Descriptions.Item>
                        <RA.Descriptions.Item label="Country">
                            <Badge.CountryBadge id={ record?.country?.id } title={ record?.country?.name }/>
                        </RA.Descriptions.Item>
                    </RA.Descriptions>
                    <RA.Tabs
                    defaultActiveKey="0"
                    items={[
                    ]}
                />

                </> : null }
            </> : null }

            {idTreeView ? <Canvas
                height={600}
                pannable={true}
                nodes={nodes.filter((n): n is nodeType => typeof n !== "undefined")}
                edges={edges.filter((e): e is edgeType => typeof e !== "undefined")}

                node={<Node
                    style={ { stroke: '#000000', fill: '#001628', strokeWidth: 1 } }
                    label={ <Label style={ { fill: '#ffffff' } } /> }
                >{event => (
                    <span>{event.node.data.title}</span>
                )}</Node>}
                edge={<Edge label={<Label style={ { fill: 'black' } } />}></Edge>}
            /> : null}

        </RA.Show>
    );
};

export type ProductShowProps = {
    id?: BaseKey,
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
                    "warehouse": [ "id", "name" ]
                },
                {
                    "vendor": [ "id", "name" ]
                },
            ],
        },
    });

    const { data, isLoading } = queryResult;
    const record = data?.data

    const [idTreeView, setIdTreeView] = useState(false)

    if(!record){
        return <></>
    }

    type nodeType = {id: string; text: string, data: Record<string, any>}
    type edgeType = {id: string, from: string, to: string, text: string}
    const nodes: Array<nodeType|undefined> = [
        {
            id: record.id,
            text: record.id,
            data: {
                title: record.name
            }
        },
        record.warehouse ? {
            id: record.warehouse.id || "n/a",
            text: record.warehouse.id ||"n/a",
            data: {
                title: record.warehouse.name
            }
        } : undefined,
        record.vendor ? {
            id: record.vendor.id || "n/a",
            text: record.vendor.id ||"n/a",
            data: {
                title: record.vendor.name
            }
        } : undefined,
    ]
    const edges: Array<edgeType|undefined> = [
        record.warehouse ? {
            id: record.id+"-"+(record.warehouse?.id || "n/a"),
            from: record.id,
            to: record.warehouse?.id || "n/a",
            text: "Warehouse"
        } : undefined,
        record.vendor ? {
            id: record.id+"-"+(record.vendor?.id || "n/a"),
            from: record.id,
            to: record.vendor?.id || "n/a",
            text: "Vendor"
        } : undefined,
    ]


    
    return (
        <RA.Show isLoading={isLoading}
                 headerButtons={({ defaultButtons }) => (
                     <>
                     {defaultButtons}
                     <RA.Button icon={<RA.Icons.ClusterOutlined />} type="primary" onClick={ ()=>{ setIdTreeView(!idTreeView) } }>ID tree</RA.Button>
                     </>
                 )}
                 {...showProps}
        >
            {!idTreeView ? <>
                <RA.Typography.Title level={5}>Id</RA.Typography.Title>
                <FieldView.ER_UUIDViewOnShow value={ record?.id } />
                <RA.Typography.Title level={5}>Name</RA.Typography.Title>
                <FieldView.ER_StringViewOnShow value={ record?.name } />
                <RA.Typography.Title level={5}>Description</RA.Typography.Title>
                <FieldView.ER_RichTextViewOnShow value={ record?.description } />
                <RA.Typography.Title level={5}>Image</RA.Typography.Title>
                <FieldView.ER_ImageViewOnShow value={ record?.image } />
                <RA.Typography.Title level={5}>Url</RA.Typography.Title>
                <FieldView.ER_URLViewOnShow value={ record?.url } />
                <RA.Typography.Title level={5}>Last Sell</RA.Typography.Title>
                <FieldView.ER_DateViewOnShow value={ record?.lastSell } />
                <RA.Typography.Title level={5}>Created At</RA.Typography.Title>
                <FieldView.ER_DateViewOnShow value={ record?.createdAt } />
                <RA.Typography.Title level={5}>Status</RA.Typography.Title>
                <FieldView.ER_Enums_ProcessStatusViewOnShow value={ record?.status } />
                <RA.Typography.Title level={5}>Build Status</RA.Typography.Title>
                <FieldView.ER_Enums_ProcessStatusViewOnShow value={ record?.buildStatus } />

                {withEdges ? <>
                    <RA.Typography.Title level={3}>Edges</RA.Typography.Title>
                    <RA.Descriptions>
                        <RA.Descriptions.Item label="Warehouse">
                            <Badge.WarehouseBadge id={ record?.warehouse?.id } title={ record?.warehouse?.name }/>
                        </RA.Descriptions.Item>
                        <RA.Descriptions.Item label="Vendor">
                            <Badge.VendorBadge id={ record?.vendor?.id } title={ record?.vendor?.name }/>
                        </RA.Descriptions.Item>
                    </RA.Descriptions>
                    <RA.Tabs
                    defaultActiveKey="0"
                    items={[
                    ]}
                />

                </> : null }
            </> : null }

            {idTreeView ? <Canvas
                height={600}
                pannable={true}
                nodes={nodes.filter((n): n is nodeType => typeof n !== "undefined")}
                edges={edges.filter((e): e is edgeType => typeof e !== "undefined")}

                node={<Node
                    style={ { stroke: '#000000', fill: '#001628', strokeWidth: 1 } }
                    label={ <Label style={ { fill: '#ffffff' } } /> }
                >{event => (
                    <span>{event.node.data.title}</span>
                )}</Node>}
                edge={<Edge label={<Label style={ { fill: 'black' } } />}></Edge>}
            /> : null}

        </RA.Show>
    );
};

export type VendorShowProps = {
    id?: BaseKey,
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
                    "warehouses": [
                        {
                            edges: [
                                {
                                    node: [ "id", "name" ],
                                }
                            ]
                        }
                    ]
                },
                {
                    "products": [
                        {
                            edges: [
                                {
                                    node: [ "id", "name" ],
                                }
                            ]
                        }
                    ]
                },
            ],
        },
    });

    const { data, isLoading } = queryResult;
    const record = data?.data

    const [idTreeView, setIdTreeView] = useState(false)

    if(!record){
        return <></>
    }

    type nodeType = {id: string; text: string, data: Record<string, any>}
    type edgeType = {id: string, from: string, to: string, text: string}
    const nodes: Array<nodeType|undefined> = [
        {
            id: record.id,
            text: record.id,
            data: {
                title: record.name
            }
        },
        ...(record.warehouses || []).map((i)=>{
            return {
                id: i.id,
                text: i.id,
                data: {
                    title: i.name
                }
            }
        }),
        ...(record.products || []).map((i)=>{
            return {
                id: i.id,
                text: i.id,
                data: {
                    title: i.name
                }
            }
        }),
    ]
    const edges: Array<edgeType|undefined> = [
        ...(record.warehouses || []).map((i)=>{
           return {
               id: record.id+"-"+i.id,
               from: record.id,
               to: i.id,
               text: "Warehouses"
           }
        }),
        ...(record.products || []).map((i)=>{
           return {
               id: record.id+"-"+i.id,
               from: record.id,
               to: i.id,
               text: "Products"
           }
        }),
    ]


    
    return (
        <RA.Show isLoading={isLoading}
                 headerButtons={({ defaultButtons }) => (
                     <>
                     {defaultButtons}
                     <RA.Button icon={<RA.Icons.ClusterOutlined />} type="primary" onClick={ ()=>{ setIdTreeView(!idTreeView) } }>ID tree</RA.Button>
                     </>
                 )}
                 {...showProps}
        >
            {!idTreeView ? <>
                <RA.Typography.Title level={5}>Id</RA.Typography.Title>
                <FieldView.ER_UUIDViewOnShow value={ record?.id } />
                <RA.Typography.Title level={5}>Name</RA.Typography.Title>
                <FieldView.ER_StringViewOnShow value={ record?.name } />
                <RA.Typography.Title level={5}>Schema</RA.Typography.Title>
                <FieldView.ER_CodeViewOnShow value={ record?.schema } />

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

            {idTreeView ? <Canvas
                height={600}
                pannable={true}
                nodes={nodes.filter((n): n is nodeType => typeof n !== "undefined")}
                edges={edges.filter((e): e is edgeType => typeof e !== "undefined")}

                node={<Node
                    style={ { stroke: '#000000', fill: '#001628', strokeWidth: 1 } }
                    label={ <Label style={ { fill: '#ffffff' } } /> }
                >{event => (
                    <span>{event.node.data.title}</span>
                )}</Node>}
                edge={<Edge label={<Label style={ { fill: 'black' } } />}></Edge>}
            /> : null}

        </RA.Show>
    );
};

export type WarehouseShowProps = {
    id?: BaseKey,
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
                    "products": [
                        {
                            edges: [
                                {
                                    node: [ "id", "name" ],
                                }
                            ]
                        }
                    ]
                },
                {
                    "vendor": [ "id", "name" ]
                },
            ],
        },
    });

    const { data, isLoading } = queryResult;
    const record = data?.data

    const [idTreeView, setIdTreeView] = useState(false)

    if(!record){
        return <></>
    }

    type nodeType = {id: string; text: string, data: Record<string, any>}
    type edgeType = {id: string, from: string, to: string, text: string}
    const nodes: Array<nodeType|undefined> = [
        {
            id: record.id,
            text: record.id,
            data: {
                title: record.name
            }
        },
        ...(record.products || []).map((i)=>{
            return {
                id: i.id,
                text: i.id,
                data: {
                    title: i.name
                }
            }
        }),
        record.vendor ? {
            id: record.vendor.id || "n/a",
            text: record.vendor.id ||"n/a",
            data: {
                title: record.vendor.name
            }
        } : undefined,
    ]
    const edges: Array<edgeType|undefined> = [
        ...(record.products || []).map((i)=>{
           return {
               id: record.id+"-"+i.id,
               from: record.id,
               to: i.id,
               text: "Products"
           }
        }),
        record.vendor ? {
            id: record.id+"-"+(record.vendor?.id || "n/a"),
            from: record.id,
            to: record.vendor?.id || "n/a",
            text: "Vendor"
        } : undefined,
    ]


    
    return (
        <RA.Show isLoading={isLoading}
                 headerButtons={({ defaultButtons }) => (
                     <>
                     {defaultButtons}
                     <RA.Button icon={<RA.Icons.ClusterOutlined />} type="primary" onClick={ ()=>{ setIdTreeView(!idTreeView) } }>ID tree</RA.Button>
                     </>
                 )}
                 {...showProps}
        >
            {!idTreeView ? <>
                <RA.Typography.Title level={5}>Id</RA.Typography.Title>
                <FieldView.ER_UUIDViewOnShow value={ record?.id } />
                <RA.Typography.Title level={5}>Name</RA.Typography.Title>
                <FieldView.ER_StringViewOnShow value={ record?.name } />
                <RA.Typography.Title level={5}>Last Update</RA.Typography.Title>
                <FieldView.ER_DateViewOnShow value={ record?.lastUpdate } />
                <RA.Typography.Title level={5}>Original Data</RA.Typography.Title>
                <FieldView.ER_CodeViewOnShow value={ record?.originalData } />
                <RA.Typography.Title level={5}>Enabled</RA.Typography.Title>
                <FieldView.ER_BooleanViewOnShow value={ record?.enabled } />
                <RA.Typography.Title level={5}>Filters</RA.Typography.Title>
                <FieldView.ER_StringListViewOnShow value={ record?.filters } />

                {withEdges ? <>
                    <RA.Typography.Title level={3}>Edges</RA.Typography.Title>
                    <RA.Descriptions>
                        <RA.Descriptions.Item label="Vendor">
                            <Badge.VendorBadge id={ record?.vendor?.id } title={ record?.vendor?.name }/>
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

            {idTreeView ? <Canvas
                height={600}
                pannable={true}
                nodes={nodes.filter((n): n is nodeType => typeof n !== "undefined")}
                edges={edges.filter((e): e is edgeType => typeof e !== "undefined")}

                node={<Node
                    style={ { stroke: '#000000', fill: '#001628', strokeWidth: 1 } }
                    label={ <Label style={ { fill: '#ffffff' } } /> }
                >{event => (
                    <span>{event.node.data.title}</span>
                )}</Node>}
                edge={<Edge label={<Label style={ { fill: 'black' } } />}></Edge>}
            /> : null}

        </RA.Show>
    );
};

export type WebsiteShowProps = {
    id?: BaseKey,
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
                    "company": [ "id", "name" ]
                },
                {
                    "country": [ "id", "name" ]
                },
            ],
        },
    });

    const { data, isLoading } = queryResult;
    const record = data?.data

    const [idTreeView, setIdTreeView] = useState(false)

    if(!record){
        return <></>
    }

    type nodeType = {id: string; text: string, data: Record<string, any>}
    type edgeType = {id: string, from: string, to: string, text: string}
    const nodes: Array<nodeType|undefined> = [
        {
            id: record.id,
            text: record.id,
            data: {
                title: record.title
            }
        },
        record.company ? {
            id: record.company.id || "n/a",
            text: record.company.id ||"n/a",
            data: {
                title: record.company.name
            }
        } : undefined,
        record.country ? {
            id: record.country.id || "n/a",
            text: record.country.id ||"n/a",
            data: {
                title: record.country.name
            }
        } : undefined,
    ]
    const edges: Array<edgeType|undefined> = [
        record.company ? {
            id: record.id+"-"+(record.company?.id || "n/a"),
            from: record.id,
            to: record.company?.id || "n/a",
            text: "Company"
        } : undefined,
        record.country ? {
            id: record.id+"-"+(record.country?.id || "n/a"),
            from: record.id,
            to: record.country?.id || "n/a",
            text: "Country"
        } : undefined,
    ]


    
    return (
        <RA.Show isLoading={isLoading}
                 headerButtons={({ defaultButtons }) => (
                     <>
                     {defaultButtons}
                     <RA.Button icon={<RA.Icons.ClusterOutlined />} type="primary" onClick={ ()=>{ setIdTreeView(!idTreeView) } }>ID tree</RA.Button>
                     </>
                 )}
                 {...showProps}
        >
            {!idTreeView ? <>
                <RA.Typography.Title level={5}>Id</RA.Typography.Title>
                <FieldView.ER_UUIDViewOnShow value={ record?.id } />
                <RA.Typography.Title level={5}>Title</RA.Typography.Title>
                <FieldView.ER_StringViewOnShow value={ record?.title } />
                <RA.Typography.Title level={5}>Description</RA.Typography.Title>
                <FieldView.ER_StringViewOnShow value={ record?.description } />
                <RA.Typography.Title level={5}>Url</RA.Typography.Title>
                <FieldView.ER_URLViewOnShow value={ record?.url } />

                {withEdges ? <>
                    <RA.Typography.Title level={3}>Edges</RA.Typography.Title>
                    <RA.Descriptions>
                        <RA.Descriptions.Item label="Company">
                            <Badge.CompanyBadge id={ record?.company?.id } title={ record?.company?.name }/>
                        </RA.Descriptions.Item>
                        <RA.Descriptions.Item label="Country">
                            <Badge.CountryBadge id={ record?.country?.id } title={ record?.country?.name }/>
                        </RA.Descriptions.Item>
                    </RA.Descriptions>
                    <RA.Tabs
                    defaultActiveKey="0"
                    items={[
                    ]}
                />

                </> : null }
            </> : null }

            {idTreeView ? <Canvas
                height={600}
                pannable={true}
                nodes={nodes.filter((n): n is nodeType => typeof n !== "undefined")}
                edges={edges.filter((e): e is edgeType => typeof e !== "undefined")}

                node={<Node
                    style={ { stroke: '#000000', fill: '#001628', strokeWidth: 1 } }
                    label={ <Label style={ { fill: '#ffffff' } } /> }
                >{event => (
                    <span>{event.node.data.title}</span>
                )}</Node>}
                edge={<Edge label={<Label style={ { fill: 'black' } } />}></Edge>}
            /> : null}

        </RA.Show>
    );
};