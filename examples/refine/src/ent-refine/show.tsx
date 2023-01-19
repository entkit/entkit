import { useShow, useOne } from "@pankod/refine-core";
import * as RA  from "@pankod/refine-antd";
import RefineReactRouter from "@pankod/refine-react-router-v6";
import * as Tables from "./tables";
import * as Interfaces from "./interfaces";
import * as FieldView from "./field-view";
import * as Custom from "./custom";

const { Link } = RefineReactRouter;export const CompanyShow = () => {
    const { queryResult } = useShow<Interfaces.ICompany>({
        resource: "Company",
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

    
    return (
        <RA.Show isLoading={isLoading}>
            <RA.Typography.Title level={5}>Id</RA.Typography.Title>
            <FieldView.ER_UUIDViewOnShow value={ record?.id } />
            <RA.Typography.Title level={5}>Name</RA.Typography.Title>
            
            <Custom.MyCustomTitle value={ record?.name } />
            <RA.Typography.Title level={5}>Logo</RA.Typography.Title>
            <FieldView.ER_ImageViewOnShow value={ record?.logo } />
            <RA.Typography.Title level={5}>Description</RA.Typography.Title>
            <FieldView.ER_RichTextViewOnShow value={ record?.description } />

            <RA.Typography.Title level={3}>Edges</RA.Typography.Title>
            <RA.Descriptions>
                <RA.Descriptions.Item label="Logo Image">
                    <Link key={ "logo_image-" + record?.logoImage?.id + "-link"} to={ "/Image/show/"+ record?.logoImage?.id}>
                        { record?.logoImage?.title }
                    </Link>
                </RA.Descriptions.Item>
            </RA.Descriptions>

            <RA.Row gutter={[16,32]}>
                <RA.Col span={12}>
                    <RA.Typography.Title key={ "countries-label" } level={5}>
                        <RA.Space size={8}>
                            <RA.Icons.GlobalOutlined/>
                            Countries
                        </RA.Space>
                    </RA.Typography.Title>
                    <Tables.CountryTable key={ "countries-companiesSlice"} extendTable={ {permanentFilter: [{operator: "hasCompaniesWith" as any, field: "", value: {id: record?.id}}]} }></Tables.CountryTable>
                </RA.Col>
                <RA.Col span={12}>
                    <RA.Typography.Title key={ "phones-label" } level={5}>
                        <RA.Space size={8}>
                            <RA.Icons.PhoneOutlined/>
                            Phones
                        </RA.Space>
                    </RA.Typography.Title>
                    <Tables.PhoneTable key={ "phones-companies"} extendTable={ {permanentFilter: [{operator: "hasCompanyWith" as any, field: "", value: {id: record?.id}}]} }></Tables.PhoneTable>
                </RA.Col>
                <RA.Col span={12}>
                    <RA.Typography.Title key={ "emails-label" } level={5}>
                        <RA.Space size={8}>
                            <RA.Icons.MailOutlined/>
                            Emails
                        </RA.Space>
                    </RA.Typography.Title>
                    <Tables.EmailTable key={ "emails-companies"} extendTable={ {permanentFilter: [{operator: "hasCompanyWith" as any, field: "", value: {id: record?.id}}]} }></Tables.EmailTable>
                </RA.Col>
                <RA.Col span={12}>
                    <RA.Typography.Title key={ "websites-label" } level={5}>
                        <RA.Space size={8}>
                            <RA.Icons.LinkOutlined/>
                            Websites
                        </RA.Space>
                    </RA.Typography.Title>
                    <Tables.WebsiteTable key={ "websites-companies"} extendTable={ {permanentFilter: [{operator: "hasCompanyWith" as any, field: "", value: {id: record?.id}}]} }></Tables.WebsiteTable>
                </RA.Col>
                <RA.Col span={12}>
                    <RA.Typography.Title key={ "locations-label" } level={5}>
                        <RA.Space size={8}>
                            <RA.Icons.PushpinOutlined/>
                            Locations
                        </RA.Space>
                    </RA.Typography.Title>
                    <Tables.LocationTable key={ "locations-companies"} extendTable={ {permanentFilter: [{operator: "hasCompanyWith" as any, field: "", value: {id: record?.id}}]} }></Tables.LocationTable>
                </RA.Col>
                <RA.Col span={12}>
                    <RA.Typography.Title key={ "gallery_images-label" } level={5}>
                        <RA.Space size={8}>
                            <RA.Icons.CameraOutlined/>
                            Gallery Images
                        </RA.Space>
                    </RA.Typography.Title>
                    <Tables.ImageTable key={ "gallery_images-gallery_companies"} extendTable={ {permanentFilter: [{operator: "hasGalleryCompanyWith" as any, field: "", value: {id: record?.id}}]} }></Tables.ImageTable>
                </RA.Col>
            </RA.Row>
        </RA.Show>
    );
};export const CountryShow = () => {
    const { queryResult } = useShow<Interfaces.ICountry>({
        resource: "Country",
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

    
    return (
        <RA.Show isLoading={isLoading}>
            <RA.Typography.Title level={5}>Id</RA.Typography.Title>
            <FieldView.ER_UUIDViewOnShow value={ record?.id } />
            <RA.Typography.Title level={5}>Name</RA.Typography.Title>
            <FieldView.ER_StringViewOnShow value={ record?.name } />
            <RA.Typography.Title level={5}>Code</RA.Typography.Title>
            <FieldView.ER_StringViewOnShow value={ record?.code } />

            <RA.Typography.Title level={3}>Edges</RA.Typography.Title>
            <RA.Descriptions>
            </RA.Descriptions>

            <RA.Row gutter={[16,32]}>
                <RA.Col span={12}>
                    <RA.Typography.Title key={ "companies-label" } level={5}>
                        <RA.Space size={8}>
                            <RA.Icons.ShopOutlined/>
                            Companies
                        </RA.Space>
                    </RA.Typography.Title>
                    <Tables.CompanyTable key={ "companies-countriesSlice"} extendTable={ {permanentFilter: [{operator: "hasCountriesWith" as any, field: "", value: {id: record?.id}}]} }></Tables.CompanyTable>
                </RA.Col>
                <RA.Col span={12}>
                    <RA.Typography.Title key={ "phones-label" } level={5}>
                        <RA.Space size={8}>
                            <RA.Icons.PhoneOutlined/>
                            Phones
                        </RA.Space>
                    </RA.Typography.Title>
                    <Tables.PhoneTable key={ "phones-countries"} extendTable={ {permanentFilter: [{operator: "hasCountryWith" as any, field: "", value: {id: record?.id}}]} }></Tables.PhoneTable>
                </RA.Col>
                <RA.Col span={12}>
                    <RA.Typography.Title key={ "emails-label" } level={5}>
                        <RA.Space size={8}>
                            <RA.Icons.MailOutlined/>
                            Emails
                        </RA.Space>
                    </RA.Typography.Title>
                    <Tables.EmailTable key={ "emails-countries"} extendTable={ {permanentFilter: [{operator: "hasCountryWith" as any, field: "", value: {id: record?.id}}]} }></Tables.EmailTable>
                </RA.Col>
                <RA.Col span={12}>
                    <RA.Typography.Title key={ "websites-label" } level={5}>
                        <RA.Space size={8}>
                            <RA.Icons.LinkOutlined/>
                            Websites
                        </RA.Space>
                    </RA.Typography.Title>
                    <Tables.WebsiteTable key={ "websites-countries"} extendTable={ {permanentFilter: [{operator: "hasCountryWith" as any, field: "", value: {id: record?.id}}]} }></Tables.WebsiteTable>
                </RA.Col>
                <RA.Col span={12}>
                    <RA.Typography.Title key={ "locations-label" } level={5}>
                        <RA.Space size={8}>
                            <RA.Icons.PushpinOutlined/>
                            Locations
                        </RA.Space>
                    </RA.Typography.Title>
                    <Tables.LocationTable key={ "locations-countries"} extendTable={ {permanentFilter: [{operator: "hasCountryWith" as any, field: "", value: {id: record?.id}}]} }></Tables.LocationTable>
                </RA.Col>
            </RA.Row>
        </RA.Show>
    );
};export const EmailShow = () => {
    const { queryResult } = useShow<Interfaces.IEmail>({
        resource: "Email",
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

    
    return (
        <RA.Show isLoading={isLoading}>
            <RA.Typography.Title level={5}>Id</RA.Typography.Title>
            <FieldView.ER_UUIDViewOnShow value={ record?.id } />
            <RA.Typography.Title level={5}>Title</RA.Typography.Title>
            <FieldView.ER_StringViewOnShow value={ record?.title } />
            <RA.Typography.Title level={5}>Description</RA.Typography.Title>
            <FieldView.ER_StringViewOnShow value={ record?.description } />
            <RA.Typography.Title level={5}>Address</RA.Typography.Title>
            <FieldView.ER_StringViewOnShow value={ record?.address } />

            <RA.Typography.Title level={3}>Edges</RA.Typography.Title>
            <RA.Descriptions>
                <RA.Descriptions.Item label="Company">
                    <Link key={ "company-" + record?.company?.id + "-link"} to={ "/Company/show/"+ record?.company?.id}>
                        { record?.company?.name }
                    </Link>
                </RA.Descriptions.Item>
                <RA.Descriptions.Item label="Country">
                    <Link key={ "country-" + record?.country?.id + "-link"} to={ "/Country/show/"+ record?.country?.id}>
                        { record?.country?.name }
                    </Link>
                </RA.Descriptions.Item>
            </RA.Descriptions>

            <RA.Row gutter={[16,32]}>
            </RA.Row>
        </RA.Show>
    );
};export const ImageShow = () => {
    const { queryResult } = useShow<Interfaces.IImage>({
        resource: "Image",
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
            ],
        },
    });

    const { data, isLoading } = queryResult;
    const record = data?.data

    
    return (
        <RA.Show isLoading={isLoading}>
            <RA.Typography.Title level={5}>Id</RA.Typography.Title>
            <FieldView.ER_UUIDViewOnShow value={ record?.id } />
            <RA.Typography.Title level={5}>Title</RA.Typography.Title>
            <FieldView.ER_StringViewOnShow value={ record?.title } />
            <RA.Typography.Title level={5}>Original Url</RA.Typography.Title>
            <FieldView.ER_ImageViewOnShow value={ record?.originalURL } />

            <RA.Typography.Title level={3}>Edges</RA.Typography.Title>
            <RA.Descriptions>
                <RA.Descriptions.Item label="Gallery Company">
                    <Link key={ "gallery_company-" + record?.galleryCompany?.id + "-link"} to={ "/Company/show/"+ record?.galleryCompany?.id}>
                        { record?.galleryCompany?.name }
                    </Link>
                </RA.Descriptions.Item>
                <RA.Descriptions.Item label="Logo Company">
                    <Link key={ "logo_company-" + record?.logoCompany?.id + "-link"} to={ "/Company/show/"+ record?.logoCompany?.id}>
                        { record?.logoCompany?.name }
                    </Link>
                </RA.Descriptions.Item>
            </RA.Descriptions>

            <RA.Row gutter={[16,32]}>
            </RA.Row>
        </RA.Show>
    );
};export const LocationShow = () => {
    const { queryResult } = useShow<Interfaces.ILocation>({
        resource: "Location",
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

    
    return (
        <RA.Show isLoading={isLoading}>
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

            <RA.Typography.Title level={3}>Edges</RA.Typography.Title>
            <RA.Descriptions>
                <RA.Descriptions.Item label="Company">
                    <Link key={ "company-" + record?.company?.id + "-link"} to={ "/Company/show/"+ record?.company?.id}>
                        { record?.company?.name }
                    </Link>
                </RA.Descriptions.Item>
                <RA.Descriptions.Item label="Country">
                    <Link key={ "country-" + record?.country?.id + "-link"} to={ "/Country/show/"+ record?.country?.id}>
                        { record?.country?.name }
                    </Link>
                </RA.Descriptions.Item>
            </RA.Descriptions>

            <RA.Row gutter={[16,32]}>
            </RA.Row>
        </RA.Show>
    );
};export const PhoneShow = () => {
    const { queryResult } = useShow<Interfaces.IPhone>({
        resource: "Phone",
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

    
    return (
        <RA.Show isLoading={isLoading}>
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

            <RA.Typography.Title level={3}>Edges</RA.Typography.Title>
            <RA.Descriptions>
                <RA.Descriptions.Item label="Company">
                    <Link key={ "company-" + record?.company?.id + "-link"} to={ "/Company/show/"+ record?.company?.id}>
                        { record?.company?.name }
                    </Link>
                </RA.Descriptions.Item>
                <RA.Descriptions.Item label="Country">
                    <Link key={ "country-" + record?.country?.id + "-link"} to={ "/Country/show/"+ record?.country?.id}>
                        { record?.country?.name }
                    </Link>
                </RA.Descriptions.Item>
            </RA.Descriptions>

            <RA.Row gutter={[16,32]}>
            </RA.Row>
        </RA.Show>
    );
};export const ProductShow = () => {
    const { queryResult } = useShow<Interfaces.IProduct>({
        resource: "Product",
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

    
    return (
        <RA.Show isLoading={isLoading}>
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

            <RA.Typography.Title level={3}>Edges</RA.Typography.Title>
            <RA.Descriptions>
                <RA.Descriptions.Item label="Warehouse">
                    <Link key={ "warehouse-" + record?.warehouse?.id + "-link"} to={ "/Warehouse/show/"+ record?.warehouse?.id}>
                        { record?.warehouse?.name }
                    </Link>
                </RA.Descriptions.Item>
                <RA.Descriptions.Item label="Vendor">
                    <Link key={ "vendor-" + record?.vendor?.id + "-link"} to={ "/Vendor/show/"+ record?.vendor?.id}>
                        { record?.vendor?.name }
                    </Link>
                </RA.Descriptions.Item>
            </RA.Descriptions>

            <RA.Row gutter={[16,32]}>
            </RA.Row>
        </RA.Show>
    );
};export const VendorShow = () => {
    const { queryResult } = useShow<Interfaces.IVendor>({
        resource: "Vendor",
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

    
    return (
        <RA.Show isLoading={isLoading}>
            <RA.Typography.Title level={5}>Id</RA.Typography.Title>
            <FieldView.ER_UUIDViewOnShow value={ record?.id } />
            <RA.Typography.Title level={5}>Name</RA.Typography.Title>
            <FieldView.ER_StringViewOnShow value={ record?.name } />
            <RA.Typography.Title level={5}>Schema</RA.Typography.Title>
            <FieldView.ER_CodeViewOnShow value={ record?.schema } />

            <RA.Typography.Title level={3}>Edges</RA.Typography.Title>
            <RA.Descriptions>
            </RA.Descriptions>

            <RA.Row gutter={[16,32]}>
                <RA.Col span={12}>
                    <RA.Typography.Title key={ "warehouses-label" } level={5}>
                        <RA.Space size={8}>
                            <RA.Icons.OrderedListOutlined/>
                            Warehouses
                        </RA.Space>
                    </RA.Typography.Title>
                    <Tables.WarehouseTable key={ "warehouses-vendors"} extendTable={ {permanentFilter: [{operator: "hasVendorWith" as any, field: "", value: {id: record?.id}}]} }></Tables.WarehouseTable>
                </RA.Col>
                <RA.Col span={12}>
                    <RA.Typography.Title key={ "products-label" } level={5}>
                        <RA.Space size={8}>
                            <RA.Icons.FileOutlined/>
                            Products
                        </RA.Space>
                    </RA.Typography.Title>
                    <Tables.ProductTable key={ "products-vendors"} extendTable={ {permanentFilter: [{operator: "hasVendorWith" as any, field: "", value: {id: record?.id}}]} }></Tables.ProductTable>
                </RA.Col>
            </RA.Row>
        </RA.Show>
    );
};export const WarehouseShow = () => {
    const { queryResult } = useShow<Interfaces.IWarehouse>({
        resource: "Warehouse",
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

    
    return (
        <RA.Show isLoading={isLoading}>
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

            <RA.Typography.Title level={3}>Edges</RA.Typography.Title>
            <RA.Descriptions>
                <RA.Descriptions.Item label="Vendor">
                    <Link key={ "vendor-" + record?.vendor?.id + "-link"} to={ "/Vendor/show/"+ record?.vendor?.id}>
                        { record?.vendor?.name }
                    </Link>
                </RA.Descriptions.Item>
            </RA.Descriptions>

            <RA.Row gutter={[16,32]}>
                <RA.Col span={12}>
                    <RA.Typography.Title key={ "products-label" } level={5}>
                        <RA.Space size={8}>
                            <RA.Icons.FileOutlined/>
                            Products
                        </RA.Space>
                    </RA.Typography.Title>
                    <Tables.ProductTable key={ "products-warehouses"} extendTable={ {permanentFilter: [{operator: "hasWarehouseWith" as any, field: "", value: {id: record?.id}}]} }></Tables.ProductTable>
                </RA.Col>
            </RA.Row>
        </RA.Show>
    );
};export const WebsiteShow = () => {
    const { queryResult } = useShow<Interfaces.IWebsite>({
        resource: "Website",
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

    
    return (
        <RA.Show isLoading={isLoading}>
            <RA.Typography.Title level={5}>Id</RA.Typography.Title>
            <FieldView.ER_UUIDViewOnShow value={ record?.id } />
            <RA.Typography.Title level={5}>Title</RA.Typography.Title>
            <FieldView.ER_StringViewOnShow value={ record?.title } />
            <RA.Typography.Title level={5}>Description</RA.Typography.Title>
            <FieldView.ER_StringViewOnShow value={ record?.description } />
            <RA.Typography.Title level={5}>Url</RA.Typography.Title>
            <FieldView.ER_URLViewOnShow value={ record?.url } />

            <RA.Typography.Title level={3}>Edges</RA.Typography.Title>
            <RA.Descriptions>
                <RA.Descriptions.Item label="Company">
                    <Link key={ "company-" + record?.company?.id + "-link"} to={ "/Company/show/"+ record?.company?.id}>
                        { record?.company?.name }
                    </Link>
                </RA.Descriptions.Item>
                <RA.Descriptions.Item label="Country">
                    <Link key={ "country-" + record?.country?.id + "-link"} to={ "/Country/show/"+ record?.country?.id}>
                        { record?.country?.name }
                    </Link>
                </RA.Descriptions.Item>
            </RA.Descriptions>

            <RA.Row gutter={[16,32]}>
            </RA.Row>
        </RA.Show>
    );
};