import * as Lists from "./list";
import * as Show from "./show";
import * as Create from "./create";
import * as Edit from "./edit";
import {
    Icons,
} from "@pankod/refine-antd";

export const Resources = [
    {
        name: "Company",
        list: Lists.CompanyList,
        show: Show.CompanyShow,
        create: Create.CompanyCreate,
        edit: Edit.CompanyEdit,
        icon: <Icons.ShopOutlined/>,
    },
    {
        name: "Country",
        list: Lists.CountryList,
        show: Show.CountryShow,
        create: Create.CountryCreate,
        edit: Edit.CountryEdit,
        icon: <Icons.GlobalOutlined/>,
    },
    {
        name: "Email",
        list: Lists.EmailList,
        show: Show.EmailShow,
        create: Create.EmailCreate,
        edit: Edit.EmailEdit,
        icon: <Icons.MailOutlined/>,
    },
    {
        name: "Image",
        list: Lists.ImageList,
        show: Show.ImageShow,
        create: Create.ImageCreate,
        edit: Edit.ImageEdit,
        icon: <Icons.CameraOutlined/>,
    },
    {
        name: "Location",
        list: Lists.LocationList,
        show: Show.LocationShow,
        create: Create.LocationCreate,
        edit: Edit.LocationEdit,
        icon: <Icons.PushpinOutlined/>,
    },
    {
        name: "Phone",
        list: Lists.PhoneList,
        show: Show.PhoneShow,
        create: Create.PhoneCreate,
        edit: Edit.PhoneEdit,
        icon: <Icons.PhoneOutlined/>,
    },
    {
        name: "Product",
        list: Lists.ProductList,
        show: Show.ProductShow,
        create: Create.ProductCreate,
        edit: Edit.ProductEdit,
        icon: <Icons.FileOutlined/>,
    },
    {
        name: "Vendor",
        list: Lists.VendorList,
        show: Show.VendorShow,
        create: Create.VendorCreate,
        edit: Edit.VendorEdit,
        icon: <Icons.StarOutlined/>,
    },
    {
        name: "Warehouse",
        list: Lists.WarehouseList,
        show: Show.WarehouseShow,
        create: Create.WarehouseCreate,
        edit: Edit.WarehouseEdit,
        icon: <Icons.OrderedListOutlined/>,
    },
    {
        name: "Website",
        list: Lists.WebsiteList,
        show: Show.WebsiteShow,
        create: Create.WebsiteCreate,
        edit: Edit.WebsiteEdit,
        icon: <Icons.LinkOutlined/>,
    },
];