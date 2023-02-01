import * as Lists from "./list";
import * as MainShow from "./main-show";
import * as Create from "./create";
import * as Edit from "./edit";
import {
    Icons,
} from "@pankod/refine-antd";

export const Resources = [
    {
        name: "Company",
        list: Lists.CompanyList,
        show: MainShow.CompanyMainShow,
        create: Create.CompanyCreate,
        edit: Edit.CompanyEdit,
        icon: <Icons.ShopOutlined/>,
    },
    {
        name: "Country",
        list: Lists.CountryList,
        show: MainShow.CountryMainShow,
        create: Create.CountryCreate,
        edit: Edit.CountryEdit,
        icon: <Icons.GlobalOutlined/>,
    },
    {
        name: "Email",
        list: Lists.EmailList,
        show: MainShow.EmailMainShow,
        create: Create.EmailCreate,
        edit: Edit.EmailEdit,
        icon: <Icons.MailOutlined/>,
    },
    {
        name: "Image",
        list: Lists.ImageList,
        show: MainShow.ImageMainShow,
        create: Create.ImageCreate,
        edit: Edit.ImageEdit,
        icon: <Icons.CameraOutlined/>,
    },
    {
        name: "Location",
        list: Lists.LocationList,
        show: MainShow.LocationMainShow,
        create: Create.LocationCreate,
        edit: Edit.LocationEdit,
        icon: <Icons.PushpinOutlined/>,
    },
    {
        name: "Phone",
        list: Lists.PhoneList,
        show: MainShow.PhoneMainShow,
        create: Create.PhoneCreate,
        edit: Edit.PhoneEdit,
        icon: <Icons.PhoneOutlined/>,
    },
    {
        name: "Product",
        list: Lists.ProductList,
        show: MainShow.ProductMainShow,
        create: Create.ProductCreate,
        edit: Edit.ProductEdit,
        icon: <Icons.FileOutlined/>,
    },
    {
        name: "Vendor",
        list: Lists.VendorList,
        show: MainShow.VendorMainShow,
        create: Create.VendorCreate,
        edit: Edit.VendorEdit,
        icon: <Icons.StarOutlined/>,
    },
    {
        name: "Warehouse",
        list: Lists.WarehouseList,
        show: MainShow.WarehouseMainShow,
        create: Create.WarehouseCreate,
        edit: Edit.WarehouseEdit,
        icon: <Icons.OrderedListOutlined/>,
    },
    {
        name: "Website",
        list: Lists.WebsiteList,
        show: MainShow.WebsiteMainShow,
        create: Create.WebsiteCreate,
        edit: Edit.WebsiteEdit,
        icon: <Icons.LinkOutlined/>,
    },
];