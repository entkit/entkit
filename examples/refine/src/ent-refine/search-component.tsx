import {useState, useEffect} from "react";
import * as RA from "@pankod/refine-antd";
import {
    useList,
} from "@pankod/refine-core";
import * as Interfaces from "./interfaces"
import debounce from "lodash/debounce";
import RefineReactRouter from "@pankod/refine-react-router-v6";

interface IOptionGroup {
    value: string;
    label: string | React.ReactNode;
}

interface IOptions {
    label: string | React.ReactNode;
    options: IOptionGroup[];
}

const { Link } = RefineReactRouter;
const { Text } = RA.Typography;

export const SearchComponent: React.FC = () => {
    const [options, setOptions] = useState<IOptions[]>([]);
    const [value, setValue] = useState<string>("");

    const renderTitle = (title: string) => (
        <RA.Typography.Title>
            <RA.Typography.Text style={
                { fontSize: "16px" }
            }>{title}</RA.Typography.Text>
            
        </RA.Typography.Title>
    );

    const renderItem = (title: string, imageUrl: string|null, link: string) => ({
        value: title,
        key: link,
        label: (
            <Link key={title+link} to={link} style={
                { display: "flex", alignItems: "center" }
            }>
                { imageUrl ? <RA.Avatar size={48} src={imageUrl} style={
                    { minWidth: "48px" }
                } /> : <RA.Icons.FileImageOutlined style={ {fontSize: '48px'} } />}
                <Text style={
                    { marginLeft: "16px" }
                }>{title}</Text>
            </Link>
        ),
    });const { refetch: refetchCompany } = useList<Interfaces.ICompany>({
        resource: "Company",
        metaData: {
            fields: [
                "id",
                "name",
                "logo",
            ],
            searchQuery: value,
        },
        queryOptions: {
            enabled: false,
            onSuccess: (data) => {
                const storeOptionGroup = data.data.map((item) =>
                    renderItem(
                        item.name,
                        `${item.logo}`,
                        `/Company/show/${item.id}`,
                    ),
                );
                if (storeOptionGroup.length > 0) {
                    setOptions((prevOptions) => [
                        ...prevOptions,
                        {
                            label: renderTitle("Company"),
                            options: storeOptionGroup,
                        },
                    ]);
                }
            },
        },
    });const { refetch: refetchCountry } = useList<Interfaces.ICountry>({
        resource: "Country",
        metaData: {
            fields: [
                "id",
                "name",
            ],
            searchQuery: value,
        },
        queryOptions: {
            enabled: false,
            onSuccess: (data) => {
                const storeOptionGroup = data.data.map((item) =>
                    renderItem(
                        item.name,
                        null,
                        `/Country/show/${item.id}`,
                    ),
                );
                if (storeOptionGroup.length > 0) {
                    setOptions((prevOptions) => [
                        ...prevOptions,
                        {
                            label: renderTitle("Country"),
                            options: storeOptionGroup,
                        },
                    ]);
                }
            },
        },
    });const { refetch: refetchEmail } = useList<Interfaces.IEmail>({
        resource: "Email",
        metaData: {
            fields: [
                "id",
                "title",
            ],
            searchQuery: value,
        },
        queryOptions: {
            enabled: false,
            onSuccess: (data) => {
                const storeOptionGroup = data.data.map((item) =>
                    renderItem(
                        item.title,
                        null,
                        `/Email/show/${item.id}`,
                    ),
                );
                if (storeOptionGroup.length > 0) {
                    setOptions((prevOptions) => [
                        ...prevOptions,
                        {
                            label: renderTitle("Email"),
                            options: storeOptionGroup,
                        },
                    ]);
                }
            },
        },
    });const { refetch: refetchImage } = useList<Interfaces.IImage>({
        resource: "Image",
        metaData: {
            fields: [
                "id",
                "title",
                "originalURL",
            ],
            searchQuery: value,
        },
        queryOptions: {
            enabled: false,
            onSuccess: (data) => {
                const storeOptionGroup = data.data.map((item) =>
                    renderItem(
                        item.title,
                        `${item.originalURL}`,
                        `/Image/show/${item.id}`,
                    ),
                );
                if (storeOptionGroup.length > 0) {
                    setOptions((prevOptions) => [
                        ...prevOptions,
                        {
                            label: renderTitle("Image"),
                            options: storeOptionGroup,
                        },
                    ]);
                }
            },
        },
    });const { refetch: refetchLocation } = useList<Interfaces.ILocation>({
        resource: "Location",
        metaData: {
            fields: [
                "id",
                "title",
            ],
            searchQuery: value,
        },
        queryOptions: {
            enabled: false,
            onSuccess: (data) => {
                const storeOptionGroup = data.data.map((item) =>
                    renderItem(
                        item.title,
                        null,
                        `/Location/show/${item.id}`,
                    ),
                );
                if (storeOptionGroup.length > 0) {
                    setOptions((prevOptions) => [
                        ...prevOptions,
                        {
                            label: renderTitle("Location"),
                            options: storeOptionGroup,
                        },
                    ]);
                }
            },
        },
    });const { refetch: refetchPhone } = useList<Interfaces.IPhone>({
        resource: "Phone",
        metaData: {
            fields: [
                "id",
                "title",
            ],
            searchQuery: value,
        },
        queryOptions: {
            enabled: false,
            onSuccess: (data) => {
                const storeOptionGroup = data.data.map((item) =>
                    renderItem(
                        item.title,
                        null,
                        `/Phone/show/${item.id}`,
                    ),
                );
                if (storeOptionGroup.length > 0) {
                    setOptions((prevOptions) => [
                        ...prevOptions,
                        {
                            label: renderTitle("Phone"),
                            options: storeOptionGroup,
                        },
                    ]);
                }
            },
        },
    });const { refetch: refetchProduct } = useList<Interfaces.IProduct>({
        resource: "Product",
        metaData: {
            fields: [
                "id",
                "name",
                "image",
            ],
            searchQuery: value,
        },
        queryOptions: {
            enabled: false,
            onSuccess: (data) => {
                const storeOptionGroup = data.data.map((item) =>
                    renderItem(
                        item.name,
                        `${item.image}`,
                        `/Product/show/${item.id}`,
                    ),
                );
                if (storeOptionGroup.length > 0) {
                    setOptions((prevOptions) => [
                        ...prevOptions,
                        {
                            label: renderTitle("Product"),
                            options: storeOptionGroup,
                        },
                    ]);
                }
            },
        },
    });const { refetch: refetchVendor } = useList<Interfaces.IVendor>({
        resource: "Vendor",
        metaData: {
            fields: [
                "id",
                "name",
            ],
            searchQuery: value,
        },
        queryOptions: {
            enabled: false,
            onSuccess: (data) => {
                const storeOptionGroup = data.data.map((item) =>
                    renderItem(
                        item.name,
                        null,
                        `/Vendor/show/${item.id}`,
                    ),
                );
                if (storeOptionGroup.length > 0) {
                    setOptions((prevOptions) => [
                        ...prevOptions,
                        {
                            label: renderTitle("Vendor"),
                            options: storeOptionGroup,
                        },
                    ]);
                }
            },
        },
    });const { refetch: refetchWarehouse } = useList<Interfaces.IWarehouse>({
        resource: "Warehouse",
        metaData: {
            fields: [
                "id",
                "name",
            ],
            searchQuery: value,
        },
        queryOptions: {
            enabled: false,
            onSuccess: (data) => {
                const storeOptionGroup = data.data.map((item) =>
                    renderItem(
                        item.name,
                        null,
                        `/Warehouse/show/${item.id}`,
                    ),
                );
                if (storeOptionGroup.length > 0) {
                    setOptions((prevOptions) => [
                        ...prevOptions,
                        {
                            label: renderTitle("Warehouse"),
                            options: storeOptionGroup,
                        },
                    ]);
                }
            },
        },
    });const { refetch: refetchWebsite } = useList<Interfaces.IWebsite>({
        resource: "Website",
        metaData: {
            fields: [
                "id",
                "title",
            ],
            searchQuery: value,
        },
        queryOptions: {
            enabled: false,
            onSuccess: (data) => {
                const storeOptionGroup = data.data.map((item) =>
                    renderItem(
                        item.title,
                        null,
                        `/Website/show/${item.id}`,
                    ),
                );
                if (storeOptionGroup.length > 0) {
                    setOptions((prevOptions) => [
                        ...prevOptions,
                        {
                            label: renderTitle("Website"),
                            options: storeOptionGroup,
                        },
                    ]);
                }
            },
        },
    });

    useEffect(() => {
        setOptions([]);
        if(value.length < 3){
            return
        }
        refetchCompany();
        refetchCountry();
        refetchEmail();
        refetchImage();
        refetchLocation();
        refetchPhone();
        refetchProduct();
        refetchVendor();
        refetchWarehouse();
        refetchWebsite();
    }, [value]);

    return (
        <RA.AutoComplete
            style={
                {
                    width: "100%",
                    maxWidth: "550px",
                }
            }
            options={options}
            filterOption={false}
            onSearch={debounce(
                (value: string) => setValue(value),
                300,
            )}
        >
            <RA.Input
                size="large"
                placeholder="Search"
                suffix={<RA.Icons.SearchOutlined/>}
            />
        </RA.AutoComplete>
    )
}