import React, { useState } from "react";
import { useShow } from "@refinedev/core";
import * as RA from "@refinedev/antd";
import * as Antd from "antd";
import * as AntdIcons from "@ant-design/icons";

import * as Lists from "./list";
import * as Diagram from "./diagram";
import * as Interfaces from "./interfaces";
import * as View from "./view";
import * as Custom from "./custom";
import * as Action from "./action";

export type CompanyShowProps = {
    id?: Interfaces.EntID;
    withEdges?: boolean;
} & RA.ShowProps;
export const CompanyShow: React.FC<CompanyShowProps> = ({
    id,
    withEdges,
    ...showProps
}) => {
    const { queryResult } = useShow<Interfaces.ICompany>({
        resource: "company",
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
                                    node: ["id", "name", "code"],
                                },
                            ],
                        },
                        "totalCount",
                    ],
                    variables: {
                        first: 10,
                    },
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
                                    ],
                                },
                            ],
                        },
                        "totalCount",
                    ],
                    variables: {
                        first: 10,
                    },
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
                                    ],
                                },
                            ],
                        },
                        "totalCount",
                    ],
                    variables: {
                        first: 10,
                    },
                },
                {
                    operation: "websites",
                    fields: [
                        {
                            edges: [
                                {
                                    node: ["id", "title", "description", "url"],
                                },
                            ],
                        },
                        "totalCount",
                    ],
                    variables: {
                        first: 10,
                    },
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
                                    ],
                                },
                            ],
                        },
                        "totalCount",
                    ],
                    variables: {
                        first: 10,
                    },
                },
                {
                    logoImage: ["id", "title", "originalURL"],
                },
                {
                    coverImage: ["id", "title", "originalURL"],
                },
                {
                    operation: "galleryImages",
                    fields: [
                        {
                            edges: [
                                {
                                    node: ["id", "title", "originalURL"],
                                },
                            ],
                        },
                        "totalCount",
                    ],
                    variables: {
                        first: 10,
                    },
                },
            ],
        },
    });

    const { data, isLoading } = queryResult;
    const record = data?.data;

    const [edgesDiagram, setEdgesDiagram] = useState(false);

    if (!record) {
        return <></>;
    }

    const nodes: Array<Diagram.Node | undefined> = [
        {
            id: record.id,
            label: record.id,
        },
        ...(record.countries || []).map((i) => {
            return {
                id: i.id,
                label: i.id,
            };
        }),
        Number(record._countries?.totalCount) > Number(record.countries?.length)
            ? {
                  id: "Country_more",
                  label: `More ${
                      Number(record._countries?.totalCount) -
                      Number(record.countries?.length)
                  }`,
              }
            : undefined,
        ...(record.phones || []).map((i) => {
            return {
                id: i.id,
                label: i.id,
            };
        }),
        Number(record._phones?.totalCount) > Number(record.phones?.length)
            ? {
                  id: "Phone_more",
                  label: `More ${
                      Number(record._phones?.totalCount) -
                      Number(record.phones?.length)
                  }`,
              }
            : undefined,
        ...(record.emails || []).map((i) => {
            return {
                id: i.id,
                label: i.id,
            };
        }),
        Number(record._emails?.totalCount) > Number(record.emails?.length)
            ? {
                  id: "Email_more",
                  label: `More ${
                      Number(record._emails?.totalCount) -
                      Number(record.emails?.length)
                  }`,
              }
            : undefined,
        ...(record.websites || []).map((i) => {
            return {
                id: i.id,
                label: i.id,
            };
        }),
        Number(record._websites?.totalCount) > Number(record.websites?.length)
            ? {
                  id: "Website_more",
                  label: `More ${
                      Number(record._websites?.totalCount) -
                      Number(record.websites?.length)
                  }`,
              }
            : undefined,
        ...(record.locations || []).map((i) => {
            return {
                id: i.id,
                label: i.id,
            };
        }),
        Number(record._locations?.totalCount) > Number(record.locations?.length)
            ? {
                  id: "Location_more",
                  label: `More ${
                      Number(record._locations?.totalCount) -
                      Number(record.locations?.length)
                  }`,
              }
            : undefined,
        record.logoImage
            ? {
                  id: record.logoImage.id || "n/a",
                  label: record.logoImage.id || "n/a",
              }
            : undefined,
        record.coverImage
            ? {
                  id: record.coverImage.id || "n/a",
                  label: record.coverImage.id || "n/a",
              }
            : undefined,
        ...(record.galleryImages || []).map((i) => {
            return {
                id: i.id,
                label: i.id,
            };
        }),
        Number(record._galleryImages?.totalCount) >
        Number(record.galleryImages?.length)
            ? {
                  id: "Image_more",
                  label: `More ${
                      Number(record._galleryImages?.totalCount) -
                      Number(record.galleryImages?.length)
                  }`,
              }
            : undefined,
    ];
    const links: Array<Diagram.Link | undefined> = [
        ...(record.countries || []).map((i) => {
            return {
                source: record.id,
                target: i.id,
                label: "Countries",
            };
        }),
        Number(record._countries?.totalCount) > Number(record.countries?.length)
            ? {
                  source: record.id,
                  target: "Country_more",
                  label: "Countries",
              }
            : undefined,
        ...(record.phones || []).map((i) => {
            return {
                source: record.id,
                target: i.id,
                label: "Phones",
            };
        }),
        Number(record._phones?.totalCount) > Number(record.phones?.length)
            ? {
                  source: record.id,
                  target: "Phone_more",
                  label: "Phones",
              }
            : undefined,
        ...(record.emails || []).map((i) => {
            return {
                source: record.id,
                target: i.id,
                label: "Emails",
            };
        }),
        Number(record._emails?.totalCount) > Number(record.emails?.length)
            ? {
                  source: record.id,
                  target: "Email_more",
                  label: "Emails",
              }
            : undefined,
        ...(record.websites || []).map((i) => {
            return {
                source: record.id,
                target: i.id,
                label: "Websites",
            };
        }),
        Number(record._websites?.totalCount) > Number(record.websites?.length)
            ? {
                  source: record.id,
                  target: "Website_more",
                  label: "Websites",
              }
            : undefined,
        ...(record.locations || []).map((i) => {
            return {
                source: record.id,
                target: i.id,
                label: "Locations",
            };
        }),
        Number(record._locations?.totalCount) > Number(record.locations?.length)
            ? {
                  source: record.id,
                  target: "Location_more",
                  label: "Locations",
              }
            : undefined,
        record.logoImage
            ? {
                  source: record.id,
                  target: record.logoImage?.id || "n/a",
                  label: "Logo Image",
              }
            : undefined,
        record.coverImage
            ? {
                  source: record.id,
                  target: record.coverImage?.id || "n/a",
                  label: "Cover Image",
              }
            : undefined,
        ...(record.galleryImages || []).map((i) => {
            return {
                source: record.id,
                target: i.id,
                label: "Gallery Images",
            };
        }),
        Number(record._galleryImages?.totalCount) >
        Number(record.galleryImages?.length)
            ? {
                  source: record.id,
                  target: "Image_more",
                  label: "Gallery Images",
              }
            : undefined,
    ];

    return (
        <RA.Show
            isLoading={isLoading}
            headerButtons={({ defaultButtons }) => (
                <>
                    <Antd.Button
                        icon={<AntdIcons.ClusterOutlined />}
                        type="primary"
                        onClick={() => {
                            setEdgesDiagram(!edgesDiagram);
                        }}
                    >
                        Edges Diagram
                    </Antd.Button>

                    <Action.CompanyListAction recordItemIDs={[record.id]} />

                    <Action.CompanyDeleteAction recordItemIDs={[record.id]} />

                    <Action.CompanyEditAction recordItemIDs={[record.id]} />
                </>
            )}
            {...showProps}
        >
            {!edgesDiagram ? (
                <>
                    <Antd.Typography.Title level={5}>Id</Antd.Typography.Title>
                    <View.EntUUIDViewOnShow value={record?.id} />
                    <Antd.Typography.Title level={5}>
                        Name
                    </Antd.Typography.Title>

                    <Custom.MyCustomTitle value={record?.name} />
                    <Antd.Typography.Title level={5}>
                        Description
                    </Antd.Typography.Title>
                    <View.EntRichTextViewOnShow value={record?.description} />

                    {withEdges ? (
                        <>
                            <Antd.Typography.Title level={3}>
                                Edges
                            </Antd.Typography.Title>
                            <Antd.Descriptions>
                                <Antd.Descriptions.Item label="Logo Image">
                                    <View.ImageBadge {...record?.logoImage} />
                                </Antd.Descriptions.Item>
                                <Antd.Descriptions.Item label="Cover Image">
                                    <View.ImageBadge {...record?.coverImage} />
                                </Antd.Descriptions.Item>
                            </Antd.Descriptions>
                            <Antd.Tabs
                                defaultActiveKey="0"
                                items={[
                                    {
                                        label: (
                                            <span>
                                                <AntdIcons.GlobalOutlined />
                                                Countries
                                            </span>
                                        ),
                                        key: "0",
                                        children: (
                                            <Lists.CountryList
                                                key={"countries-companiesSlice"}
                                                breadcrumb={false}
                                                tableProps={{
                                                    extendTable: {
                                                        permanentFilter: [
                                                            {
                                                                operator:
                                                                    "hasCompaniesWith" as any,
                                                                field: "",
                                                                value: {
                                                                    id: record?.id,
                                                                },
                                                            },
                                                        ],
                                                    },
                                                }}
                                            />
                                        ),
                                    },
                                    {
                                        label: (
                                            <span>
                                                <AntdIcons.PhoneOutlined />
                                                Phones
                                            </span>
                                        ),
                                        key: "1",
                                        children: (
                                            <Lists.PhoneList
                                                key={"phones-companies"}
                                                breadcrumb={false}
                                                tableProps={{
                                                    extendTable: {
                                                        permanentFilter: [
                                                            {
                                                                operator:
                                                                    "hasCompanyWith" as any,
                                                                field: "",
                                                                value: {
                                                                    id: record?.id,
                                                                },
                                                            },
                                                        ],
                                                    },
                                                }}
                                            />
                                        ),
                                    },
                                    {
                                        label: (
                                            <span>
                                                <AntdIcons.MailOutlined />
                                                Emails
                                            </span>
                                        ),
                                        key: "2",
                                        children: (
                                            <Lists.EmailList
                                                key={"emails-companies"}
                                                breadcrumb={false}
                                                tableProps={{
                                                    extendTable: {
                                                        permanentFilter: [
                                                            {
                                                                operator:
                                                                    "hasCompanyWith" as any,
                                                                field: "",
                                                                value: {
                                                                    id: record?.id,
                                                                },
                                                            },
                                                        ],
                                                    },
                                                }}
                                            />
                                        ),
                                    },
                                    {
                                        label: (
                                            <span>
                                                <AntdIcons.LinkOutlined />
                                                Websites
                                            </span>
                                        ),
                                        key: "3",
                                        children: (
                                            <Lists.WebsiteList
                                                key={"websites-companies"}
                                                breadcrumb={false}
                                                tableProps={{
                                                    extendTable: {
                                                        permanentFilter: [
                                                            {
                                                                operator:
                                                                    "hasCompanyWith" as any,
                                                                field: "",
                                                                value: {
                                                                    id: record?.id,
                                                                },
                                                            },
                                                        ],
                                                    },
                                                }}
                                            />
                                        ),
                                    },
                                    {
                                        label: (
                                            <span>
                                                <AntdIcons.PushpinOutlined />
                                                Locations
                                            </span>
                                        ),
                                        key: "4",
                                        children: (
                                            <Lists.LocationList
                                                key={"locations-companies"}
                                                breadcrumb={false}
                                                tableProps={{
                                                    extendTable: {
                                                        permanentFilter: [
                                                            {
                                                                operator:
                                                                    "hasCompanyWith" as any,
                                                                field: "",
                                                                value: {
                                                                    id: record?.id,
                                                                },
                                                            },
                                                        ],
                                                    },
                                                }}
                                            />
                                        ),
                                    },
                                    {
                                        label: (
                                            <span>
                                                <AntdIcons.CameraOutlined />
                                                Gallery Images
                                            </span>
                                        ),
                                        key: "7",
                                        children: (
                                            <Lists.ImageList
                                                key={
                                                    "gallery_images-gallery_companies"
                                                }
                                                breadcrumb={false}
                                                tableProps={{
                                                    extendTable: {
                                                        permanentFilter: [
                                                            {
                                                                operator:
                                                                    "hasGalleryCompanyWith" as any,
                                                                field: "",
                                                                value: {
                                                                    id: record?.id,
                                                                },
                                                            },
                                                        ],
                                                    },
                                                }}
                                            />
                                        ),
                                    },
                                ]}
                            />
                        </>
                    ) : null}
                </>
            ) : null}

            {edgesDiagram ? (
                <Diagram.GoJS
                    nodes={nodes.filter(
                        (n): n is Diagram.Node => typeof n !== "undefined",
                    )}
                    links={links.filter(
                        (n): n is Diagram.Link => typeof n !== "undefined",
                    )}
                />
            ) : null}
        </RA.Show>
    );
};

export const CompanyMainShow: React.FC = () => {
    return <CompanyShow withEdges={true} />;
};

export const CompanyPartialShow: React.FC = () => {
    return <CompanyShow withEdges={false} />;
};

export type CountryShowProps = {
    id?: Interfaces.EntID;
    withEdges?: boolean;
} & RA.ShowProps;
export const CountryShow: React.FC<CountryShowProps> = ({
    id,
    withEdges,
    ...showProps
}) => {
    const { queryResult } = useShow<Interfaces.ICountry>({
        resource: "country",
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
                                    node: ["id", "name", "description"],
                                },
                            ],
                        },
                        "totalCount",
                    ],
                    variables: {
                        first: 10,
                    },
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
                                    ],
                                },
                            ],
                        },
                        "totalCount",
                    ],
                    variables: {
                        first: 10,
                    },
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
                                    ],
                                },
                            ],
                        },
                        "totalCount",
                    ],
                    variables: {
                        first: 10,
                    },
                },
                {
                    operation: "websites",
                    fields: [
                        {
                            edges: [
                                {
                                    node: ["id", "title", "description", "url"],
                                },
                            ],
                        },
                        "totalCount",
                    ],
                    variables: {
                        first: 10,
                    },
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
                                    ],
                                },
                            ],
                        },
                        "totalCount",
                    ],
                    variables: {
                        first: 10,
                    },
                },
            ],
        },
    });

    const { data, isLoading } = queryResult;
    const record = data?.data;

    const [edgesDiagram, setEdgesDiagram] = useState(false);

    if (!record) {
        return <></>;
    }

    const nodes: Array<Diagram.Node | undefined> = [
        {
            id: record.id,
            label: record.id,
        },
        ...(record.companies || []).map((i) => {
            return {
                id: i.id,
                label: i.id,
            };
        }),
        Number(record._companies?.totalCount) > Number(record.companies?.length)
            ? {
                  id: "Company_more",
                  label: `More ${
                      Number(record._companies?.totalCount) -
                      Number(record.companies?.length)
                  }`,
              }
            : undefined,
        ...(record.phones || []).map((i) => {
            return {
                id: i.id,
                label: i.id,
            };
        }),
        Number(record._phones?.totalCount) > Number(record.phones?.length)
            ? {
                  id: "Phone_more",
                  label: `More ${
                      Number(record._phones?.totalCount) -
                      Number(record.phones?.length)
                  }`,
              }
            : undefined,
        ...(record.emails || []).map((i) => {
            return {
                id: i.id,
                label: i.id,
            };
        }),
        Number(record._emails?.totalCount) > Number(record.emails?.length)
            ? {
                  id: "Email_more",
                  label: `More ${
                      Number(record._emails?.totalCount) -
                      Number(record.emails?.length)
                  }`,
              }
            : undefined,
        ...(record.websites || []).map((i) => {
            return {
                id: i.id,
                label: i.id,
            };
        }),
        Number(record._websites?.totalCount) > Number(record.websites?.length)
            ? {
                  id: "Website_more",
                  label: `More ${
                      Number(record._websites?.totalCount) -
                      Number(record.websites?.length)
                  }`,
              }
            : undefined,
        ...(record.locations || []).map((i) => {
            return {
                id: i.id,
                label: i.id,
            };
        }),
        Number(record._locations?.totalCount) > Number(record.locations?.length)
            ? {
                  id: "Location_more",
                  label: `More ${
                      Number(record._locations?.totalCount) -
                      Number(record.locations?.length)
                  }`,
              }
            : undefined,
    ];
    const links: Array<Diagram.Link | undefined> = [
        ...(record.companies || []).map((i) => {
            return {
                source: record.id,
                target: i.id,
                label: "Companies",
            };
        }),
        Number(record._companies?.totalCount) > Number(record.companies?.length)
            ? {
                  source: record.id,
                  target: "Company_more",
                  label: "Companies",
              }
            : undefined,
        ...(record.phones || []).map((i) => {
            return {
                source: record.id,
                target: i.id,
                label: "Phones",
            };
        }),
        Number(record._phones?.totalCount) > Number(record.phones?.length)
            ? {
                  source: record.id,
                  target: "Phone_more",
                  label: "Phones",
              }
            : undefined,
        ...(record.emails || []).map((i) => {
            return {
                source: record.id,
                target: i.id,
                label: "Emails",
            };
        }),
        Number(record._emails?.totalCount) > Number(record.emails?.length)
            ? {
                  source: record.id,
                  target: "Email_more",
                  label: "Emails",
              }
            : undefined,
        ...(record.websites || []).map((i) => {
            return {
                source: record.id,
                target: i.id,
                label: "Websites",
            };
        }),
        Number(record._websites?.totalCount) > Number(record.websites?.length)
            ? {
                  source: record.id,
                  target: "Website_more",
                  label: "Websites",
              }
            : undefined,
        ...(record.locations || []).map((i) => {
            return {
                source: record.id,
                target: i.id,
                label: "Locations",
            };
        }),
        Number(record._locations?.totalCount) > Number(record.locations?.length)
            ? {
                  source: record.id,
                  target: "Location_more",
                  label: "Locations",
              }
            : undefined,
    ];

    return (
        <RA.Show
            isLoading={isLoading}
            headerButtons={({ defaultButtons }) => (
                <>
                    <Antd.Button
                        icon={<AntdIcons.ClusterOutlined />}
                        type="primary"
                        onClick={() => {
                            setEdgesDiagram(!edgesDiagram);
                        }}
                    >
                        Edges Diagram
                    </Antd.Button>

                    <Action.CountryListAction recordItemIDs={[record.id]} />

                    <Action.CountryDeleteAction recordItemIDs={[record.id]} />

                    <Action.CountryEditAction recordItemIDs={[record.id]} />
                </>
            )}
            {...showProps}
        >
            {!edgesDiagram ? (
                <>
                    <Antd.Typography.Title level={5}>Id</Antd.Typography.Title>
                    <View.EntUUIDViewOnShow value={record?.id} />
                    <Antd.Typography.Title level={5}>
                        Name
                    </Antd.Typography.Title>
                    <View.EntStringViewOnShow value={record?.name} />
                    <Antd.Typography.Title level={5}>
                        Code
                    </Antd.Typography.Title>
                    <View.EntStringViewOnShow value={record?.code} />

                    {withEdges ? (
                        <>
                            <Antd.Typography.Title level={3}>
                                Edges
                            </Antd.Typography.Title>
                            <Antd.Descriptions></Antd.Descriptions>
                            <Antd.Tabs
                                defaultActiveKey="0"
                                items={[
                                    {
                                        label: (
                                            <span>
                                                <AntdIcons.ShopOutlined />
                                                Companies
                                            </span>
                                        ),
                                        key: "0",
                                        children: (
                                            <Lists.CompanyList
                                                key={"companies-countriesSlice"}
                                                breadcrumb={false}
                                                tableProps={{
                                                    extendTable: {
                                                        permanentFilter: [
                                                            {
                                                                operator:
                                                                    "hasCountriesWith" as any,
                                                                field: "",
                                                                value: {
                                                                    id: record?.id,
                                                                },
                                                            },
                                                        ],
                                                    },
                                                }}
                                            />
                                        ),
                                    },
                                    {
                                        label: (
                                            <span>
                                                <AntdIcons.PhoneOutlined />
                                                Phones
                                            </span>
                                        ),
                                        key: "1",
                                        children: (
                                            <Lists.PhoneList
                                                key={"phones-countries"}
                                                breadcrumb={false}
                                                tableProps={{
                                                    extendTable: {
                                                        permanentFilter: [
                                                            {
                                                                operator:
                                                                    "hasCountryWith" as any,
                                                                field: "",
                                                                value: {
                                                                    id: record?.id,
                                                                },
                                                            },
                                                        ],
                                                    },
                                                }}
                                            />
                                        ),
                                    },
                                    {
                                        label: (
                                            <span>
                                                <AntdIcons.MailOutlined />
                                                Emails
                                            </span>
                                        ),
                                        key: "2",
                                        children: (
                                            <Lists.EmailList
                                                key={"emails-countries"}
                                                breadcrumb={false}
                                                tableProps={{
                                                    extendTable: {
                                                        permanentFilter: [
                                                            {
                                                                operator:
                                                                    "hasCountryWith" as any,
                                                                field: "",
                                                                value: {
                                                                    id: record?.id,
                                                                },
                                                            },
                                                        ],
                                                    },
                                                }}
                                            />
                                        ),
                                    },
                                    {
                                        label: (
                                            <span>
                                                <AntdIcons.LinkOutlined />
                                                Websites
                                            </span>
                                        ),
                                        key: "3",
                                        children: (
                                            <Lists.WebsiteList
                                                key={"websites-countries"}
                                                breadcrumb={false}
                                                tableProps={{
                                                    extendTable: {
                                                        permanentFilter: [
                                                            {
                                                                operator:
                                                                    "hasCountryWith" as any,
                                                                field: "",
                                                                value: {
                                                                    id: record?.id,
                                                                },
                                                            },
                                                        ],
                                                    },
                                                }}
                                            />
                                        ),
                                    },
                                    {
                                        label: (
                                            <span>
                                                <AntdIcons.PushpinOutlined />
                                                Locations
                                            </span>
                                        ),
                                        key: "4",
                                        children: (
                                            <Lists.LocationList
                                                key={"locations-countries"}
                                                breadcrumb={false}
                                                tableProps={{
                                                    extendTable: {
                                                        permanentFilter: [
                                                            {
                                                                operator:
                                                                    "hasCountryWith" as any,
                                                                field: "",
                                                                value: {
                                                                    id: record?.id,
                                                                },
                                                            },
                                                        ],
                                                    },
                                                }}
                                            />
                                        ),
                                    },
                                ]}
                            />
                        </>
                    ) : null}
                </>
            ) : null}

            {edgesDiagram ? (
                <Diagram.GoJS
                    nodes={nodes.filter(
                        (n): n is Diagram.Node => typeof n !== "undefined",
                    )}
                    links={links.filter(
                        (n): n is Diagram.Link => typeof n !== "undefined",
                    )}
                />
            ) : null}
        </RA.Show>
    );
};

export const CountryMainShow: React.FC = () => {
    return <CountryShow withEdges={true} />;
};

export const CountryPartialShow: React.FC = () => {
    return <CountryShow withEdges={false} />;
};

export type EmailShowProps = {
    id?: Interfaces.EntID;
    withEdges?: boolean;
} & RA.ShowProps;
export const EmailShow: React.FC<EmailShowProps> = ({
    id,
    withEdges,
    ...showProps
}) => {
    const { queryResult } = useShow<Interfaces.IEmail>({
        resource: "email",
        id,
        metaData: {
            fields: [
                "id",
                "title",
                "description",
                "address",
                {
                    company: ["id", "name", "description"],
                },
                {
                    country: ["id", "name", "code"],
                },
            ],
        },
    });

    const { data, isLoading } = queryResult;
    const record = data?.data;

    const [edgesDiagram, setEdgesDiagram] = useState(false);

    if (!record) {
        return <></>;
    }

    const nodes: Array<Diagram.Node | undefined> = [
        {
            id: record.id,
            label: record.id,
        },
        record.company
            ? {
                  id: record.company.id || "n/a",
                  label: record.company.id || "n/a",
              }
            : undefined,
        record.country
            ? {
                  id: record.country.id || "n/a",
                  label: record.country.id || "n/a",
              }
            : undefined,
    ];
    const links: Array<Diagram.Link | undefined> = [
        record.company
            ? {
                  source: record.id,
                  target: record.company?.id || "n/a",
                  label: "Company",
              }
            : undefined,
        record.country
            ? {
                  source: record.id,
                  target: record.country?.id || "n/a",
                  label: "Country",
              }
            : undefined,
    ];

    return (
        <RA.Show
            isLoading={isLoading}
            headerButtons={({ defaultButtons }) => (
                <>
                    <Antd.Button
                        icon={<AntdIcons.ClusterOutlined />}
                        type="primary"
                        onClick={() => {
                            setEdgesDiagram(!edgesDiagram);
                        }}
                    >
                        Edges Diagram
                    </Antd.Button>

                    <Action.EmailListAction recordItemIDs={[record.id]} />

                    <Action.EmailDeleteAction recordItemIDs={[record.id]} />

                    <Action.EmailEditAction recordItemIDs={[record.id]} />
                </>
            )}
            {...showProps}
        >
            {!edgesDiagram ? (
                <>
                    <Antd.Typography.Title level={5}>Id</Antd.Typography.Title>
                    <View.EntUUIDViewOnShow value={record?.id} />
                    <Antd.Typography.Title level={5}>
                        Title
                    </Antd.Typography.Title>
                    <View.EntStringViewOnShow value={record?.title} />
                    <Antd.Typography.Title level={5}>
                        Description
                    </Antd.Typography.Title>
                    <View.EntStringViewOnShow value={record?.description} />
                    <Antd.Typography.Title level={5}>
                        Address
                    </Antd.Typography.Title>
                    <View.EntStringViewOnShow value={record?.address} />

                    {withEdges ? (
                        <>
                            <Antd.Typography.Title level={3}>
                                Edges
                            </Antd.Typography.Title>
                            <Antd.Descriptions>
                                <Antd.Descriptions.Item label="Company">
                                    <View.CompanyBadge {...record?.company} />
                                </Antd.Descriptions.Item>
                                <Antd.Descriptions.Item label="Country">
                                    <View.CountryBadge {...record?.country} />
                                </Antd.Descriptions.Item>
                            </Antd.Descriptions>
                            <Antd.Tabs defaultActiveKey="0" items={[]} />
                        </>
                    ) : null}
                </>
            ) : null}

            {edgesDiagram ? (
                <Diagram.GoJS
                    nodes={nodes.filter(
                        (n): n is Diagram.Node => typeof n !== "undefined",
                    )}
                    links={links.filter(
                        (n): n is Diagram.Link => typeof n !== "undefined",
                    )}
                />
            ) : null}
        </RA.Show>
    );
};

export const EmailMainShow: React.FC = () => {
    return <EmailShow withEdges={true} />;
};

export const EmailPartialShow: React.FC = () => {
    return <EmailShow withEdges={false} />;
};

export type ImageShowProps = {
    id?: Interfaces.EntID;
    withEdges?: boolean;
} & RA.ShowProps;
export const ImageShow: React.FC<ImageShowProps> = ({
    id,
    withEdges,
    ...showProps
}) => {
    const { queryResult } = useShow<Interfaces.IImage>({
        resource: "image",
        id,
        metaData: {
            fields: [
                "id",
                "title",
                "originalURL",
                {
                    galleryCompany: ["id", "name", "description"],
                },
                {
                    logoCompany: ["id", "name", "description"],
                },
                {
                    coverCompany: ["id", "name", "description"],
                },
            ],
        },
    });

    const { data, isLoading } = queryResult;
    const record = data?.data;

    const [edgesDiagram, setEdgesDiagram] = useState(false);

    if (!record) {
        return <></>;
    }

    const nodes: Array<Diagram.Node | undefined> = [
        {
            id: record.id,
            label: record.id,
        },
        record.galleryCompany
            ? {
                  id: record.galleryCompany.id || "n/a",
                  label: record.galleryCompany.id || "n/a",
              }
            : undefined,
        record.logoCompany
            ? {
                  id: record.logoCompany.id || "n/a",
                  label: record.logoCompany.id || "n/a",
              }
            : undefined,
        record.coverCompany
            ? {
                  id: record.coverCompany.id || "n/a",
                  label: record.coverCompany.id || "n/a",
              }
            : undefined,
    ];
    const links: Array<Diagram.Link | undefined> = [
        record.galleryCompany
            ? {
                  source: record.id,
                  target: record.galleryCompany?.id || "n/a",
                  label: "Gallery Company",
              }
            : undefined,
        record.logoCompany
            ? {
                  source: record.id,
                  target: record.logoCompany?.id || "n/a",
                  label: "Logo Company",
              }
            : undefined,
        record.coverCompany
            ? {
                  source: record.id,
                  target: record.coverCompany?.id || "n/a",
                  label: "Cover Company",
              }
            : undefined,
    ];

    return (
        <RA.Show
            isLoading={isLoading}
            headerButtons={({ defaultButtons }) => (
                <>
                    <Antd.Button
                        icon={<AntdIcons.ClusterOutlined />}
                        type="primary"
                        onClick={() => {
                            setEdgesDiagram(!edgesDiagram);
                        }}
                    >
                        Edges Diagram
                    </Antd.Button>

                    <Action.ImageListAction recordItemIDs={[record.id]} />

                    <Action.ImageDeleteAction recordItemIDs={[record.id]} />

                    <Action.ImageEditAction recordItemIDs={[record.id]} />
                </>
            )}
            {...showProps}
        >
            {!edgesDiagram ? (
                <>
                    <Antd.Typography.Title level={5}>Id</Antd.Typography.Title>
                    <View.EntUUIDViewOnShow value={record?.id} />
                    <Antd.Typography.Title level={5}>
                        Title
                    </Antd.Typography.Title>
                    <View.EntStringViewOnShow value={record?.title} />
                    <Antd.Typography.Title level={5}>
                        Original Url
                    </Antd.Typography.Title>
                    <View.EntImageViewOnShow value={record?.originalURL} />

                    {withEdges ? (
                        <>
                            <Antd.Typography.Title level={3}>
                                Edges
                            </Antd.Typography.Title>
                            <Antd.Descriptions>
                                <Antd.Descriptions.Item label="Gallery Company">
                                    <View.CompanyBadge
                                        {...record?.galleryCompany}
                                    />
                                </Antd.Descriptions.Item>
                                <Antd.Descriptions.Item label="Logo Company">
                                    <View.CompanyBadge
                                        {...record?.logoCompany}
                                    />
                                </Antd.Descriptions.Item>
                                <Antd.Descriptions.Item label="Cover Company">
                                    <View.CompanyBadge
                                        {...record?.coverCompany}
                                    />
                                </Antd.Descriptions.Item>
                            </Antd.Descriptions>
                            <Antd.Tabs defaultActiveKey="0" items={[]} />
                        </>
                    ) : null}
                </>
            ) : null}

            {edgesDiagram ? (
                <Diagram.GoJS
                    nodes={nodes.filter(
                        (n): n is Diagram.Node => typeof n !== "undefined",
                    )}
                    links={links.filter(
                        (n): n is Diagram.Link => typeof n !== "undefined",
                    )}
                />
            ) : null}
        </RA.Show>
    );
};

export const ImageMainShow: React.FC = () => {
    return <ImageShow withEdges={true} />;
};

export const ImagePartialShow: React.FC = () => {
    return <ImageShow withEdges={false} />;
};

export type LocationShowProps = {
    id?: Interfaces.EntID;
    withEdges?: boolean;
} & RA.ShowProps;
export const LocationShow: React.FC<LocationShowProps> = ({
    id,
    withEdges,
    ...showProps
}) => {
    const { queryResult } = useShow<Interfaces.ILocation>({
        resource: "location",
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
                    company: ["id", "name", "description"],
                },
                {
                    country: ["id", "name", "code"],
                },
            ],
        },
    });

    const { data, isLoading } = queryResult;
    const record = data?.data;

    const [edgesDiagram, setEdgesDiagram] = useState(false);

    if (!record) {
        return <></>;
    }

    const nodes: Array<Diagram.Node | undefined> = [
        {
            id: record.id,
            label: record.id,
        },
        record.company
            ? {
                  id: record.company.id || "n/a",
                  label: record.company.id || "n/a",
              }
            : undefined,
        record.country
            ? {
                  id: record.country.id || "n/a",
                  label: record.country.id || "n/a",
              }
            : undefined,
    ];
    const links: Array<Diagram.Link | undefined> = [
        record.company
            ? {
                  source: record.id,
                  target: record.company?.id || "n/a",
                  label: "Company",
              }
            : undefined,
        record.country
            ? {
                  source: record.id,
                  target: record.country?.id || "n/a",
                  label: "Country",
              }
            : undefined,
    ];

    return (
        <RA.Show
            isLoading={isLoading}
            headerButtons={({ defaultButtons }) => (
                <>
                    <Antd.Button
                        icon={<AntdIcons.ClusterOutlined />}
                        type="primary"
                        onClick={() => {
                            setEdgesDiagram(!edgesDiagram);
                        }}
                    >
                        Edges Diagram
                    </Antd.Button>

                    <Action.LocationListAction recordItemIDs={[record.id]} />

                    <Action.LocationDeleteAction recordItemIDs={[record.id]} />

                    <Action.LocationEditAction recordItemIDs={[record.id]} />
                </>
            )}
            {...showProps}
        >
            {!edgesDiagram ? (
                <>
                    <Antd.Typography.Title level={5}>Id</Antd.Typography.Title>
                    <View.EntUUIDViewOnShow value={record?.id} />
                    <Antd.Typography.Title level={5}>
                        Title
                    </Antd.Typography.Title>
                    <View.EntStringViewOnShow value={record?.title} />
                    <Antd.Typography.Title level={5}>
                        Description
                    </Antd.Typography.Title>
                    <View.EntStringViewOnShow value={record?.description} />
                    <Antd.Typography.Title level={5}>
                        Latitude
                    </Antd.Typography.Title>
                    <View.EntStringViewOnShow value={record?.latitude} />
                    <Antd.Typography.Title level={5}>
                        Longitude
                    </Antd.Typography.Title>
                    <View.EntStringViewOnShow value={record?.longitude} />
                    <Antd.Typography.Title level={5}>
                        Address
                    </Antd.Typography.Title>
                    <View.EntStringViewOnShow value={record?.address} />
                    <Antd.Typography.Title level={5}>
                        Postcode
                    </Antd.Typography.Title>
                    <View.EntStringViewOnShow value={record?.postcode} />
                    <Antd.Typography.Title level={5}>
                        Type
                    </Antd.Typography.Title>
                    <View.EntStringViewOnShow value={record?.type} />
                    <Antd.Typography.Title level={5}>
                        State
                    </Antd.Typography.Title>
                    <View.EntStringViewOnShow value={record?.state} />
                    <Antd.Typography.Title level={5}>
                        Suburb
                    </Antd.Typography.Title>
                    <View.EntStringViewOnShow value={record?.suburb} />
                    <Antd.Typography.Title level={5}>
                        Street Type
                    </Antd.Typography.Title>
                    <View.EntStringViewOnShow value={record?.streetType} />
                    <Antd.Typography.Title level={5}>
                        Street Name
                    </Antd.Typography.Title>
                    <View.EntStringViewOnShow value={record?.streetName} />

                    {withEdges ? (
                        <>
                            <Antd.Typography.Title level={3}>
                                Edges
                            </Antd.Typography.Title>
                            <Antd.Descriptions>
                                <Antd.Descriptions.Item label="Company">
                                    <View.CompanyBadge {...record?.company} />
                                </Antd.Descriptions.Item>
                                <Antd.Descriptions.Item label="Country">
                                    <View.CountryBadge {...record?.country} />
                                </Antd.Descriptions.Item>
                            </Antd.Descriptions>
                            <Antd.Tabs defaultActiveKey="0" items={[]} />
                        </>
                    ) : null}
                </>
            ) : null}

            {edgesDiagram ? (
                <Diagram.GoJS
                    nodes={nodes.filter(
                        (n): n is Diagram.Node => typeof n !== "undefined",
                    )}
                    links={links.filter(
                        (n): n is Diagram.Link => typeof n !== "undefined",
                    )}
                />
            ) : null}
        </RA.Show>
    );
};

export const LocationMainShow: React.FC = () => {
    return <LocationShow withEdges={true} />;
};

export const LocationPartialShow: React.FC = () => {
    return <LocationShow withEdges={false} />;
};

export type PhoneShowProps = {
    id?: Interfaces.EntID;
    withEdges?: boolean;
} & RA.ShowProps;
export const PhoneShow: React.FC<PhoneShowProps> = ({
    id,
    withEdges,
    ...showProps
}) => {
    const { queryResult } = useShow<Interfaces.IPhone>({
        resource: "phone",
        id,
        metaData: {
            fields: [
                "id",
                "title",
                "description",
                "number",
                "type",
                {
                    company: ["id", "name", "description"],
                },
                {
                    country: ["id", "name", "code"],
                },
            ],
        },
    });

    const { data, isLoading } = queryResult;
    const record = data?.data;

    const [edgesDiagram, setEdgesDiagram] = useState(false);

    if (!record) {
        return <></>;
    }

    const nodes: Array<Diagram.Node | undefined> = [
        {
            id: record.id,
            label: record.id,
        },
        record.company
            ? {
                  id: record.company.id || "n/a",
                  label: record.company.id || "n/a",
              }
            : undefined,
        record.country
            ? {
                  id: record.country.id || "n/a",
                  label: record.country.id || "n/a",
              }
            : undefined,
    ];
    const links: Array<Diagram.Link | undefined> = [
        record.company
            ? {
                  source: record.id,
                  target: record.company?.id || "n/a",
                  label: "Company",
              }
            : undefined,
        record.country
            ? {
                  source: record.id,
                  target: record.country?.id || "n/a",
                  label: "Country",
              }
            : undefined,
    ];

    return (
        <RA.Show
            isLoading={isLoading}
            headerButtons={({ defaultButtons }) => (
                <>
                    <Antd.Button
                        icon={<AntdIcons.ClusterOutlined />}
                        type="primary"
                        onClick={() => {
                            setEdgesDiagram(!edgesDiagram);
                        }}
                    >
                        Edges Diagram
                    </Antd.Button>

                    <Action.PhoneListAction recordItemIDs={[record.id]} />

                    <Action.PhoneDeleteAction recordItemIDs={[record.id]} />

                    <Action.PhoneEditAction recordItemIDs={[record.id]} />
                </>
            )}
            {...showProps}
        >
            {!edgesDiagram ? (
                <>
                    <Antd.Typography.Title level={5}>Id</Antd.Typography.Title>
                    <View.EntUUIDViewOnShow value={record?.id} />
                    <Antd.Typography.Title level={5}>
                        Title
                    </Antd.Typography.Title>
                    <View.EntStringViewOnShow value={record?.title} />
                    <Antd.Typography.Title level={5}>
                        Description
                    </Antd.Typography.Title>
                    <View.EntStringViewOnShow value={record?.description} />
                    <Antd.Typography.Title level={5}>
                        Number
                    </Antd.Typography.Title>
                    <View.EntStringViewOnShow value={record?.number} />
                    <Antd.Typography.Title level={5}>
                        Type
                    </Antd.Typography.Title>
                    <View.EntStringViewOnShow value={record?.type} />

                    {withEdges ? (
                        <>
                            <Antd.Typography.Title level={3}>
                                Edges
                            </Antd.Typography.Title>
                            <Antd.Descriptions>
                                <Antd.Descriptions.Item label="Company">
                                    <View.CompanyBadge {...record?.company} />
                                </Antd.Descriptions.Item>
                                <Antd.Descriptions.Item label="Country">
                                    <View.CountryBadge {...record?.country} />
                                </Antd.Descriptions.Item>
                            </Antd.Descriptions>
                            <Antd.Tabs defaultActiveKey="0" items={[]} />
                        </>
                    ) : null}
                </>
            ) : null}

            {edgesDiagram ? (
                <Diagram.GoJS
                    nodes={nodes.filter(
                        (n): n is Diagram.Node => typeof n !== "undefined",
                    )}
                    links={links.filter(
                        (n): n is Diagram.Link => typeof n !== "undefined",
                    )}
                />
            ) : null}
        </RA.Show>
    );
};

export const PhoneMainShow: React.FC = () => {
    return <PhoneShow withEdges={true} />;
};

export const PhonePartialShow: React.FC = () => {
    return <PhoneShow withEdges={false} />;
};

export type ProductShowProps = {
    id?: Interfaces.EntID;
    withEdges?: boolean;
} & RA.ShowProps;
export const ProductShow: React.FC<ProductShowProps> = ({
    id,
    withEdges,
    ...showProps
}) => {
    const { queryResult } = useShow<Interfaces.IProduct>({
        resource: "product",
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
                    warehouse: [
                        "id",
                        "name",
                        "lastUpdate",
                        "originalData",
                        "enabled",
                        "filters",
                    ],
                },
                {
                    vendor: ["id", "name", "schema"],
                },
            ],
        },
    });

    const { data, isLoading } = queryResult;
    const record = data?.data;

    const [edgesDiagram, setEdgesDiagram] = useState(false);

    if (!record) {
        return <></>;
    }

    const nodes: Array<Diagram.Node | undefined> = [
        {
            id: record.id,
            label: record.id,
        },
        record.warehouse
            ? {
                  id: record.warehouse.id || "n/a",
                  label: record.warehouse.id || "n/a",
              }
            : undefined,
        record.vendor
            ? {
                  id: record.vendor.id || "n/a",
                  label: record.vendor.id || "n/a",
              }
            : undefined,
    ];
    const links: Array<Diagram.Link | undefined> = [
        record.warehouse
            ? {
                  source: record.id,
                  target: record.warehouse?.id || "n/a",
                  label: "Warehouse",
              }
            : undefined,
        record.vendor
            ? {
                  source: record.id,
                  target: record.vendor?.id || "n/a",
                  label: "Vendor",
              }
            : undefined,
    ];

    return (
        <RA.Show
            isLoading={isLoading}
            headerButtons={({ defaultButtons }) => (
                <>
                    <Antd.Button
                        icon={<AntdIcons.ClusterOutlined />}
                        type="primary"
                        onClick={() => {
                            setEdgesDiagram(!edgesDiagram);
                        }}
                    >
                        Edges Diagram
                    </Antd.Button>

                    <Action.ProductListAction recordItemIDs={[record.id]} />

                    <Action.ProductEditAction recordItemIDs={[record.id]} />

                    <Action.ProductDeleteAction recordItemIDs={[record.id]} />
                </>
            )}
            {...showProps}
        >
            {!edgesDiagram ? (
                <>
                    <Antd.Typography.Title level={5}>Id</Antd.Typography.Title>
                    <View.EntUUIDViewOnShow value={record?.id} />
                    <Antd.Typography.Title level={5}>
                        Name
                    </Antd.Typography.Title>
                    <View.EntStringViewOnShow value={record?.name} />
                    <Antd.Typography.Title level={5}>
                        Description
                    </Antd.Typography.Title>
                    <View.EntRichTextViewOnShow value={record?.description} />
                    <Antd.Typography.Title level={5}>
                        Image
                    </Antd.Typography.Title>
                    <View.EntImageViewOnShow value={record?.image} />
                    <Antd.Typography.Title level={5}>Url</Antd.Typography.Title>
                    <View.EntURLViewOnShow value={record?.url} />
                    <Antd.Typography.Title level={5}>
                        Last Sell
                    </Antd.Typography.Title>
                    <View.EntDateViewOnShow value={record?.lastSell} />
                    <Antd.Typography.Title level={5}>
                        Created At
                    </Antd.Typography.Title>
                    <View.EntDateViewOnShow value={record?.createdAt} />
                    <Antd.Typography.Title level={5}>
                        Status
                    </Antd.Typography.Title>
                    <View.EntEnumsProcessStatusViewOnShow
                        value={record?.status}
                    />
                    <Antd.Typography.Title level={5}>
                        Build Status
                    </Antd.Typography.Title>
                    <View.EntEnumsProcessStatusViewOnShow
                        value={record?.buildStatus}
                    />

                    {withEdges ? (
                        <>
                            <Antd.Typography.Title level={3}>
                                Edges
                            </Antd.Typography.Title>
                            <Antd.Descriptions>
                                <Antd.Descriptions.Item label="Warehouse">
                                    <View.WarehouseBadge
                                        {...record?.warehouse}
                                    />
                                </Antd.Descriptions.Item>
                                <Antd.Descriptions.Item label="Vendor">
                                    <View.VendorBadge {...record?.vendor} />
                                </Antd.Descriptions.Item>
                            </Antd.Descriptions>
                            <Antd.Tabs defaultActiveKey="0" items={[]} />
                        </>
                    ) : null}
                </>
            ) : null}

            {edgesDiagram ? (
                <Diagram.GoJS
                    nodes={nodes.filter(
                        (n): n is Diagram.Node => typeof n !== "undefined",
                    )}
                    links={links.filter(
                        (n): n is Diagram.Link => typeof n !== "undefined",
                    )}
                />
            ) : null}
        </RA.Show>
    );
};

export const ProductMainShow: React.FC = () => {
    return <ProductShow withEdges={true} />;
};

export const ProductPartialShow: React.FC = () => {
    return <ProductShow withEdges={false} />;
};

export type VendorShowProps = {
    id?: Interfaces.EntID;
    withEdges?: boolean;
} & RA.ShowProps;
export const VendorShow: React.FC<VendorShowProps> = ({
    id,
    withEdges,
    ...showProps
}) => {
    const { queryResult } = useShow<Interfaces.IVendor>({
        resource: "vendor",
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
                                    ],
                                },
                            ],
                        },
                        "totalCount",
                    ],
                    variables: {
                        first: 10,
                    },
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
                                    ],
                                },
                            ],
                        },
                        "totalCount",
                    ],
                    variables: {
                        first: 10,
                    },
                },
            ],
        },
    });

    const { data, isLoading } = queryResult;
    const record = data?.data;

    const [edgesDiagram, setEdgesDiagram] = useState(false);

    if (!record) {
        return <></>;
    }

    const nodes: Array<Diagram.Node | undefined> = [
        {
            id: record.id,
            label: record.id,
        },
        ...(record.warehouses || []).map((i) => {
            return {
                id: i.id,
                label: i.id,
            };
        }),
        Number(record._warehouses?.totalCount) >
        Number(record.warehouses?.length)
            ? {
                  id: "Warehouse_more",
                  label: `More ${
                      Number(record._warehouses?.totalCount) -
                      Number(record.warehouses?.length)
                  }`,
              }
            : undefined,
        ...(record.products || []).map((i) => {
            return {
                id: i.id,
                label: i.id,
            };
        }),
        Number(record._products?.totalCount) > Number(record.products?.length)
            ? {
                  id: "Product_more",
                  label: `More ${
                      Number(record._products?.totalCount) -
                      Number(record.products?.length)
                  }`,
              }
            : undefined,
    ];
    const links: Array<Diagram.Link | undefined> = [
        ...(record.warehouses || []).map((i) => {
            return {
                source: record.id,
                target: i.id,
                label: "Warehouses",
            };
        }),
        Number(record._warehouses?.totalCount) >
        Number(record.warehouses?.length)
            ? {
                  source: record.id,
                  target: "Warehouse_more",
                  label: "Warehouses",
              }
            : undefined,
        ...(record.products || []).map((i) => {
            return {
                source: record.id,
                target: i.id,
                label: "Products",
            };
        }),
        Number(record._products?.totalCount) > Number(record.products?.length)
            ? {
                  source: record.id,
                  target: "Product_more",
                  label: "Products",
              }
            : undefined,
    ];

    return (
        <RA.Show
            isLoading={isLoading}
            headerButtons={({ defaultButtons }) => (
                <>
                    <Antd.Button
                        icon={<AntdIcons.ClusterOutlined />}
                        type="primary"
                        onClick={() => {
                            setEdgesDiagram(!edgesDiagram);
                        }}
                    >
                        Edges Diagram
                    </Antd.Button>

                    <Action.VendorListAction recordItemIDs={[record.id]} />

                    <Action.VendorDeleteAction recordItemIDs={[record.id]} />

                    <Action.VendorEditAction recordItemIDs={[record.id]} />
                </>
            )}
            {...showProps}
        >
            {!edgesDiagram ? (
                <>
                    <Antd.Typography.Title level={5}>Id</Antd.Typography.Title>
                    <View.EntUUIDViewOnShow value={record?.id} />
                    <Antd.Typography.Title level={5}>
                        Name
                    </Antd.Typography.Title>
                    <View.EntStringViewOnShow value={record?.name} />
                    <Antd.Typography.Title level={5}>
                        Schema
                    </Antd.Typography.Title>
                    <View.EntCodeViewOnShow value={record?.schema} />

                    {withEdges ? (
                        <>
                            <Antd.Typography.Title level={3}>
                                Edges
                            </Antd.Typography.Title>
                            <Antd.Descriptions></Antd.Descriptions>
                            <Antd.Tabs
                                defaultActiveKey="0"
                                items={[
                                    {
                                        label: (
                                            <span>
                                                <AntdIcons.OrderedListOutlined />
                                                Warehouses
                                            </span>
                                        ),
                                        key: "0",
                                        children: (
                                            <Lists.WarehouseList
                                                key={"warehouses-vendors"}
                                                breadcrumb={false}
                                                tableProps={{
                                                    extendTable: {
                                                        permanentFilter: [
                                                            {
                                                                operator:
                                                                    "hasVendorWith" as any,
                                                                field: "",
                                                                value: {
                                                                    id: record?.id,
                                                                },
                                                            },
                                                        ],
                                                    },
                                                }}
                                            />
                                        ),
                                    },
                                    {
                                        label: (
                                            <span>
                                                <AntdIcons.FileOutlined />
                                                Products
                                            </span>
                                        ),
                                        key: "1",
                                        children: (
                                            <Lists.ProductList
                                                key={"products-vendors"}
                                                breadcrumb={false}
                                                tableProps={{
                                                    extendTable: {
                                                        permanentFilter: [
                                                            {
                                                                operator:
                                                                    "hasVendorWith" as any,
                                                                field: "",
                                                                value: {
                                                                    id: record?.id,
                                                                },
                                                            },
                                                        ],
                                                    },
                                                }}
                                            />
                                        ),
                                    },
                                ]}
                            />
                        </>
                    ) : null}
                </>
            ) : null}

            {edgesDiagram ? (
                <Diagram.GoJS
                    nodes={nodes.filter(
                        (n): n is Diagram.Node => typeof n !== "undefined",
                    )}
                    links={links.filter(
                        (n): n is Diagram.Link => typeof n !== "undefined",
                    )}
                />
            ) : null}
        </RA.Show>
    );
};

export const VendorMainShow: React.FC = () => {
    return <VendorShow withEdges={true} />;
};

export const VendorPartialShow: React.FC = () => {
    return <VendorShow withEdges={false} />;
};

export type WarehouseShowProps = {
    id?: Interfaces.EntID;
    withEdges?: boolean;
} & RA.ShowProps;
export const WarehouseShow: React.FC<WarehouseShowProps> = ({
    id,
    withEdges,
    ...showProps
}) => {
    const { queryResult } = useShow<Interfaces.IWarehouse>({
        resource: "warehouse",
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
                                    ],
                                },
                            ],
                        },
                        "totalCount",
                    ],
                    variables: {
                        first: 10,
                    },
                },
                {
                    vendor: ["id", "name", "schema"],
                },
            ],
        },
    });

    const { data, isLoading } = queryResult;
    const record = data?.data;

    const [edgesDiagram, setEdgesDiagram] = useState(false);

    if (!record) {
        return <></>;
    }

    const nodes: Array<Diagram.Node | undefined> = [
        {
            id: record.id,
            label: record.id,
        },
        ...(record.products || []).map((i) => {
            return {
                id: i.id,
                label: i.id,
            };
        }),
        Number(record._products?.totalCount) > Number(record.products?.length)
            ? {
                  id: "Product_more",
                  label: `More ${
                      Number(record._products?.totalCount) -
                      Number(record.products?.length)
                  }`,
              }
            : undefined,
        record.vendor
            ? {
                  id: record.vendor.id || "n/a",
                  label: record.vendor.id || "n/a",
              }
            : undefined,
    ];
    const links: Array<Diagram.Link | undefined> = [
        ...(record.products || []).map((i) => {
            return {
                source: record.id,
                target: i.id,
                label: "Products",
            };
        }),
        Number(record._products?.totalCount) > Number(record.products?.length)
            ? {
                  source: record.id,
                  target: "Product_more",
                  label: "Products",
              }
            : undefined,
        record.vendor
            ? {
                  source: record.id,
                  target: record.vendor?.id || "n/a",
                  label: "Vendor",
              }
            : undefined,
    ];

    return (
        <RA.Show
            isLoading={isLoading}
            headerButtons={({ defaultButtons }) => (
                <>
                    <Antd.Button
                        icon={<AntdIcons.ClusterOutlined />}
                        type="primary"
                        onClick={() => {
                            setEdgesDiagram(!edgesDiagram);
                        }}
                    >
                        Edges Diagram
                    </Antd.Button>

                    <Action.WarehouseListAction recordItemIDs={[record.id]} />

                    <Action.WarehouseDeleteAction recordItemIDs={[record.id]} />

                    <Action.WarehouseEditAction recordItemIDs={[record.id]} />
                </>
            )}
            {...showProps}
        >
            {!edgesDiagram ? (
                <>
                    <Antd.Typography.Title level={5}>Id</Antd.Typography.Title>
                    <View.EntUUIDViewOnShow value={record?.id} />
                    <Antd.Typography.Title level={5}>
                        Name
                    </Antd.Typography.Title>
                    <View.EntStringViewOnShow value={record?.name} />
                    <Antd.Typography.Title level={5}>
                        Last Update
                    </Antd.Typography.Title>
                    <View.EntDateViewOnShow value={record?.lastUpdate} />
                    <Antd.Typography.Title level={5}>
                        Original Data
                    </Antd.Typography.Title>
                    <View.EntCodeViewOnShow value={record?.originalData} />
                    <Antd.Typography.Title level={5}>
                        Enabled
                    </Antd.Typography.Title>
                    <View.EntBooleanViewOnShow value={record?.enabled} />
                    <Antd.Typography.Title level={5}>
                        Filters
                    </Antd.Typography.Title>
                    <View.EntStringListViewOnShow value={record?.filters} />

                    {withEdges ? (
                        <>
                            <Antd.Typography.Title level={3}>
                                Edges
                            </Antd.Typography.Title>
                            <Antd.Descriptions>
                                <Antd.Descriptions.Item label="Vendor">
                                    <View.VendorBadge {...record?.vendor} />
                                </Antd.Descriptions.Item>
                            </Antd.Descriptions>
                            <Antd.Tabs
                                defaultActiveKey="0"
                                items={[
                                    {
                                        label: (
                                            <span>
                                                <AntdIcons.FileOutlined />
                                                Products
                                            </span>
                                        ),
                                        key: "0",
                                        children: (
                                            <Lists.ProductList
                                                key={"products-warehouses"}
                                                breadcrumb={false}
                                                tableProps={{
                                                    extendTable: {
                                                        permanentFilter: [
                                                            {
                                                                operator:
                                                                    "hasWarehouseWith" as any,
                                                                field: "",
                                                                value: {
                                                                    id: record?.id,
                                                                },
                                                            },
                                                        ],
                                                    },
                                                }}
                                            />
                                        ),
                                    },
                                ]}
                            />
                        </>
                    ) : null}
                </>
            ) : null}

            {edgesDiagram ? (
                <Diagram.GoJS
                    nodes={nodes.filter(
                        (n): n is Diagram.Node => typeof n !== "undefined",
                    )}
                    links={links.filter(
                        (n): n is Diagram.Link => typeof n !== "undefined",
                    )}
                />
            ) : null}
        </RA.Show>
    );
};

export const WarehouseMainShow: React.FC = () => {
    return <WarehouseShow withEdges={true} />;
};

export const WarehousePartialShow: React.FC = () => {
    return <WarehouseShow withEdges={false} />;
};

export type WebsiteShowProps = {
    id?: Interfaces.EntID;
    withEdges?: boolean;
} & RA.ShowProps;
export const WebsiteShow: React.FC<WebsiteShowProps> = ({
    id,
    withEdges,
    ...showProps
}) => {
    const { queryResult } = useShow<Interfaces.IWebsite>({
        resource: "website",
        id,
        metaData: {
            fields: [
                "id",
                "title",
                "description",
                "url",
                {
                    company: ["id", "name", "description"],
                },
                {
                    country: ["id", "name", "code"],
                },
            ],
        },
    });

    const { data, isLoading } = queryResult;
    const record = data?.data;

    const [edgesDiagram, setEdgesDiagram] = useState(false);

    if (!record) {
        return <></>;
    }

    const nodes: Array<Diagram.Node | undefined> = [
        {
            id: record.id,
            label: record.id,
        },
        record.company
            ? {
                  id: record.company.id || "n/a",
                  label: record.company.id || "n/a",
              }
            : undefined,
        record.country
            ? {
                  id: record.country.id || "n/a",
                  label: record.country.id || "n/a",
              }
            : undefined,
    ];
    const links: Array<Diagram.Link | undefined> = [
        record.company
            ? {
                  source: record.id,
                  target: record.company?.id || "n/a",
                  label: "Company",
              }
            : undefined,
        record.country
            ? {
                  source: record.id,
                  target: record.country?.id || "n/a",
                  label: "Country",
              }
            : undefined,
    ];

    return (
        <RA.Show
            isLoading={isLoading}
            headerButtons={({ defaultButtons }) => (
                <>
                    <Antd.Button
                        icon={<AntdIcons.ClusterOutlined />}
                        type="primary"
                        onClick={() => {
                            setEdgesDiagram(!edgesDiagram);
                        }}
                    >
                        Edges Diagram
                    </Antd.Button>

                    <Action.WebsiteListAction recordItemIDs={[record.id]} />

                    <Action.WebsiteDeleteAction recordItemIDs={[record.id]} />

                    <Action.WebsiteEditAction recordItemIDs={[record.id]} />
                </>
            )}
            {...showProps}
        >
            {!edgesDiagram ? (
                <>
                    <Antd.Typography.Title level={5}>Id</Antd.Typography.Title>
                    <View.EntUUIDViewOnShow value={record?.id} />
                    <Antd.Typography.Title level={5}>
                        Title
                    </Antd.Typography.Title>
                    <View.EntStringViewOnShow value={record?.title} />
                    <Antd.Typography.Title level={5}>
                        Description
                    </Antd.Typography.Title>
                    <View.EntStringViewOnShow value={record?.description} />
                    <Antd.Typography.Title level={5}>Url</Antd.Typography.Title>
                    <View.EntURLViewOnShow value={record?.url} />

                    {withEdges ? (
                        <>
                            <Antd.Typography.Title level={3}>
                                Edges
                            </Antd.Typography.Title>
                            <Antd.Descriptions>
                                <Antd.Descriptions.Item label="Company">
                                    <View.CompanyBadge {...record?.company} />
                                </Antd.Descriptions.Item>
                                <Antd.Descriptions.Item label="Country">
                                    <View.CountryBadge {...record?.country} />
                                </Antd.Descriptions.Item>
                            </Antd.Descriptions>
                            <Antd.Tabs defaultActiveKey="0" items={[]} />
                        </>
                    ) : null}
                </>
            ) : null}

            {edgesDiagram ? (
                <Diagram.GoJS
                    nodes={nodes.filter(
                        (n): n is Diagram.Node => typeof n !== "undefined",
                    )}
                    links={links.filter(
                        (n): n is Diagram.Link => typeof n !== "undefined",
                    )}
                />
            ) : null}
        </RA.Show>
    );
};

export const WebsiteMainShow: React.FC = () => {
    return <WebsiteShow withEdges={true} />;
};

export const WebsitePartialShow: React.FC = () => {
    return <WebsiteShow withEdges={false} />;
};
