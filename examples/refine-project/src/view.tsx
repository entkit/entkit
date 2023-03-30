import React from "react";
import * as RA from "@refinedev/antd";
import * as Antd from "antd";
import * as AntdIcons from "@ant-design/icons";
import { useLink } from "@refinedev/core";
import * as Show from "./show";
import * as Type from "./interfaces";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import CodeEditor from "@uiw/react-textarea-code-editor";

export type ViewProps<T> = Omit<React.HTMLProps<HTMLElement>, "value"> & {
    value: T | undefined;
};

// region Date
export const EntDateViewOnShow: React.FC<ViewProps<Date>> = ({ value }) => {
    return value ? (
        <RA.DateField format="LLL" value={value} />
    ) : (
        <RA.TextField value="Never" />
    );
};
export const EntDateViewOnList: React.FC<ViewProps<Date>> = EntDateViewOnShow;
export const EntDateViewOnForm: React.FC = (props) => {
    return <Antd.DatePicker {...props} showTime={true} />;
};
// endregion Date

// region Boolean
export const EntBooleanViewOnShow: React.FC<ViewProps<Type.EntBoolean>> = ({
    value,
}) => {
    return <RA.TextField value={value ? "Yes" : "No"} />;
};
export const EntBooleanViewOnList = EntBooleanViewOnShow;
export const EntBooleanViewOnForm: React.FC = (props) => {
    return (
        <Antd.Radio.Group {...props}>
            <Antd.Radio value={true}>Yes</Antd.Radio>
            <Antd.Radio value={false}>No</Antd.Radio>
        </Antd.Radio.Group>
    );
};
// endregion Boolean

// region String
export const EntStringViewOnShow: React.FC<ViewProps<Type.EntString>> = ({
    value,
}) => {
    return <Antd.Typography.Text copyable={true}>{value}</Antd.Typography.Text>;
};
export const EntStringViewOnList: React.FC<ViewProps<Type.EntString>> = ({
    value,
}) => {
    return (
        <Antd.Tooltip title={value}>
            <RA.TextField
                value={value}
                ellipsis={true}
                style={{ width: "100px" }}
            />
        </Antd.Tooltip>
    );
};
export const EntStringViewOnForm: React.FC = (props) => {
    return <Antd.Input {...props} />;
};
// endregion String

// region Number
export const EntNumberViewOnShow: React.FC<ViewProps<Type.EntNumber>> = ({
    value,
    ...props
}) => {
    return <EntStringViewOnShow value={String(value)} {...props} />;
};
export const EntNumberViewOnList: React.FC<ViewProps<Type.EntNumber>> = ({
    value,
    ...props
}) => {
    return <EntNumberViewOnShow value={value} {...props} />;
};
export const EntNumberViewOnForm: React.FC = (props) => {
    return <Antd.InputNumber {...props} />;
};
// endregion Number

// region String List
export const EntStringListViewOnShow: React.FC<
    ViewProps<Type.EntStringList>
> = ({ value }) => {
    return (
        <>
            {value?.map((v, i) => (
                <EntStringViewOnShow key={i} value={String(i + 1) + ". " + v} />
            ))}
        </>
    );
};
export const EntStringListViewOnList: React.FC<
    ViewProps<Type.EntStringList>
> = ({ value }) => {
    return (
        <Antd.Typography.Text>
            {String(value?.length || 0) + " items"}
        </Antd.Typography.Text>
    );
};
export const EntStringListViewOnForm: React.FC = (props) => {
    return <Antd.Select {...props} mode="tags" />;
};
// endregion

// region Image
export const EntImageViewOnShow: React.FC<ViewProps<Type.EntImage>> = ({
    value,
}) => {
    return (
        <Antd.Image style={{ width: "100%", maxWidth: "256px" }} src={value} />
    );
};
export const EntImageViewOnList: React.FC<ViewProps<Type.EntImage>> = ({
    value,
}) => {
    return <Antd.Image width={48} src={value} />;
};
export const EntImageViewOnForm: React.FC = EntStringViewOnForm;
// endregion Image

// region UUID
export const EntUUIDViewOnShow: React.FC<ViewProps<Type.EntUUID>> =
    EntStringViewOnShow;
export const EntUUIDViewOnList: React.FC<ViewProps<Type.EntUUID>> =
    EntStringViewOnList;
export const EntUUIDViewOnForm: React.FC = EntStringListViewOnForm;
// endregion UUID

// region Code
export const EntCodeViewOnForm: React.FC<any> = (props) => {
    return (
        <CodeEditor
            {...props}
            language={props.Language || "js"}
            padding={15}
            style={{
                overflow: "auto",
                maxHeight: "80vh",
                minHeight: "400px",
                fontSize: 12,
                backgroundColor: "#222",
                fontFamily:
                    "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
            }}
        />
    );
};
export const EntCodeViewOnShow: React.FC<ViewProps<Type.EntCode>> = ({
    value,
}) => {
    return <EntCodeViewOnForm value={value} readOnly={true} />;
};
export const EntCodeViewOnList: React.FC<ViewProps<Type.EntCode>> = ({
    value,
}) => {
    return (
        <RA.TextField
            value={value}
            code={true}
            ellipsis={true}
            style={{ width: "100px" }}
        />
    );
};
// endregion Code

// region Rich Text
export const EntRichTextViewOnShow: React.FC<ViewProps<Type.EntRichText>> = ({
    value,
}) => {
    return <div dangerouslySetInnerHTML={{ __html: value || "" }}></div>;
};
export const EntRichTextViewOnList: React.FC<ViewProps<Type.EntRichText>> =
    EntStringViewOnList;
export const EntRichTextViewOnForm: React.FC = (props) => (
    <ReactQuill {...props} theme="snow" />
);
// endregion Rich Text

// region URL
export const EntURLViewOnShow: React.FC<ViewProps<Type.EntURL>> = ({
    value,
}) => {
    return (
        <Antd.Button
            href={value}
            target="_blank"
            icon={<AntdIcons.LinkOutlined />}
        >
            <RA.TextField
                value={value}
                ellipsis={true}
                style={{ width: "100%", maxWidth: "350px" }}
                type={"secondary"}
            />
        </Antd.Button>
    );
};
export const EntURLViewOnList: React.FC<ViewProps<Type.EntURL>> = ({
    value,
}) => {
    return (
        <Antd.Button
            type="primary"
            href={value}
            target="_blank"
            icon={<AntdIcons.LinkOutlined />}
        >
            Open
        </Antd.Button>
    );
};
export const EntURLViewOnForm: React.FC = EntStringViewOnForm;
// endregion URL

// region Enums

export const EntEnumsProcessStatusViewOnShow = EntStringViewOnShow;
export const EntEnumsProcessStatusViewOnList = EntStringViewOnList;
export const EntEnumsProcessStatusViewOnForm: React.FC = (props) => {
    return (
        <Antd.Select
            {...props}
            options={[
                {
                    value: "none",
                    label: "None",
                },
                {
                    value: "done",
                    label: "Done",
                },
                {
                    value: "enqueued",
                    label: "Enqueued",
                },
                {
                    value: "in_progress",
                    label: "In Progress",
                },
                {
                    value: "failed",
                    label: "Failed",
                },
            ]}
        />
    );
};
// endregion Enums

// region Entity Badges

export const CompanyBadge: React.FC<Partial<Type.ICompany>> = (props) => {
    const Link = useLink();
    return (
        <Antd.Popover
            overlayInnerStyle={{
                width: "50vw",
                height: "40vh",
                maxHeight: "400px",
                maxWidth: "500px",
                overflow: "auto",
            }}
            content={
                <Show.CompanyShow
                    breadcrumb={false}
                    title={props.name}
                    id={props.id}
                    withEdges={false}
                    headerButtons={[]}
                />
            }
        >
            <Link to={"/company/show/" + props.id}>{props.name}</Link>
        </Antd.Popover>
    );
};

export const CountryBadge: React.FC<Partial<Type.ICountry>> = (props) => {
    const Link = useLink();
    return (
        <Antd.Popover
            overlayInnerStyle={{
                width: "50vw",
                height: "40vh",
                maxHeight: "400px",
                maxWidth: "500px",
                overflow: "auto",
            }}
            content={
                <Show.CountryShow
                    breadcrumb={false}
                    title={props.name}
                    id={props.id}
                    withEdges={false}
                    headerButtons={[]}
                />
            }
        >
            <Link to={"/country/show/" + props.id}>{props.name}</Link>
        </Antd.Popover>
    );
};

export const EmailBadge: React.FC<Partial<Type.IEmail>> = (props) => {
    const Link = useLink();
    return (
        <Antd.Popover
            overlayInnerStyle={{
                width: "50vw",
                height: "40vh",
                maxHeight: "400px",
                maxWidth: "500px",
                overflow: "auto",
            }}
            content={
                <Show.EmailShow
                    breadcrumb={false}
                    title={props.title}
                    id={props.id}
                    withEdges={false}
                    headerButtons={[]}
                />
            }
        >
            <Link to={"/email/show/" + props.id}>{props.title}</Link>
        </Antd.Popover>
    );
};

export const ImageBadge: React.FC<Partial<Type.IImage>> = (props) => {
    const Link = useLink();
    return (
        <Antd.Popover
            overlayInnerStyle={{
                width: "50vw",
                height: "40vh",
                maxHeight: "400px",
                maxWidth: "500px",
                overflow: "auto",
            }}
            content={
                <Show.ImageShow
                    breadcrumb={false}
                    title={props.title}
                    id={props.id}
                    withEdges={false}
                    headerButtons={[]}
                />
            }
        >
            <Link to={"/image/show/" + props.id}>
                {props.originalURL ? (
                    <Antd.Image
                        width={48}
                        preview={false}
                        src={props.originalURL}
                    />
                ) : null}
            </Link>
        </Antd.Popover>
    );
};

export const LocationBadge: React.FC<Partial<Type.ILocation>> = (props) => {
    const Link = useLink();
    return (
        <Antd.Popover
            overlayInnerStyle={{
                width: "50vw",
                height: "40vh",
                maxHeight: "400px",
                maxWidth: "500px",
                overflow: "auto",
            }}
            content={
                <Show.LocationShow
                    breadcrumb={false}
                    title={props.title}
                    id={props.id}
                    withEdges={false}
                    headerButtons={[]}
                />
            }
        >
            <Link to={"/location/show/" + props.id}>{props.title}</Link>
        </Antd.Popover>
    );
};

export const PhoneBadge: React.FC<Partial<Type.IPhone>> = (props) => {
    const Link = useLink();
    return (
        <Antd.Popover
            overlayInnerStyle={{
                width: "50vw",
                height: "40vh",
                maxHeight: "400px",
                maxWidth: "500px",
                overflow: "auto",
            }}
            content={
                <Show.PhoneShow
                    breadcrumb={false}
                    title={props.title}
                    id={props.id}
                    withEdges={false}
                    headerButtons={[]}
                />
            }
        >
            <Link to={"/phone/show/" + props.id}>{props.title}</Link>
        </Antd.Popover>
    );
};

export const ProductBadge: React.FC<Partial<Type.IProduct>> = (props) => {
    const Link = useLink();
    return (
        <Antd.Popover
            overlayInnerStyle={{
                width: "50vw",
                height: "40vh",
                maxHeight: "400px",
                maxWidth: "500px",
                overflow: "auto",
            }}
            content={
                <Show.ProductShow
                    breadcrumb={false}
                    title={props.name}
                    id={props.id}
                    withEdges={false}
                    headerButtons={[]}
                />
            }
        >
            <Link to={"/product/show/" + props.id}>
                {props.image ? (
                    <Antd.Image width={48} preview={false} src={props.image} />
                ) : null}
            </Link>
        </Antd.Popover>
    );
};

export const VendorBadge: React.FC<Partial<Type.IVendor>> = (props) => {
    const Link = useLink();
    return (
        <Antd.Popover
            overlayInnerStyle={{
                width: "50vw",
                height: "40vh",
                maxHeight: "400px",
                maxWidth: "500px",
                overflow: "auto",
            }}
            content={
                <Show.VendorShow
                    breadcrumb={false}
                    title={props.name}
                    id={props.id}
                    withEdges={false}
                    headerButtons={[]}
                />
            }
        >
            <Link to={"/vendor/show/" + props.id}>{props.name}</Link>
        </Antd.Popover>
    );
};

export const WarehouseBadge: React.FC<Partial<Type.IWarehouse>> = (props) => {
    const Link = useLink();
    return (
        <Antd.Popover
            overlayInnerStyle={{
                width: "50vw",
                height: "40vh",
                maxHeight: "400px",
                maxWidth: "500px",
                overflow: "auto",
            }}
            content={
                <Show.WarehouseShow
                    breadcrumb={false}
                    title={props.name}
                    id={props.id}
                    withEdges={false}
                    headerButtons={[]}
                />
            }
        >
            <Link to={"/warehouse/show/" + props.id}>{props.name}</Link>
        </Antd.Popover>
    );
};

export const WebsiteBadge: React.FC<Partial<Type.IWebsite>> = (props) => {
    const Link = useLink();
    return (
        <Antd.Popover
            overlayInnerStyle={{
                width: "50vw",
                height: "40vh",
                maxHeight: "400px",
                maxWidth: "500px",
                overflow: "auto",
            }}
            content={
                <Show.WebsiteShow
                    breadcrumb={false}
                    title={props.title}
                    id={props.id}
                    withEdges={false}
                    headerButtons={[]}
                />
            }
        >
            <Link to={"/website/show/" + props.id}>{props.title}</Link>
        </Antd.Popover>
    );
};

// endregion
