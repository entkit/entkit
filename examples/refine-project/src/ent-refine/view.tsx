/* eslint no-use-before-define: 0 */
import React from "react";
import * as RA  from "@pankod/refine-antd";
import RefineReactRouter from "@pankod/refine-react-router-v6";
import { BaseKey } from "@pankod/refine-core/dist/interfaces";
import * as Show from "./show";
import * as Type  from "./interfaces";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import CodeEditor from '@uiw/react-textarea-code-editor';

export interface ViewProps<T> {
    value: T | undefined
}

// region Date
export const ER_DateViewOnShow: React.FC<ViewProps<Date>> = ({value}) => {
    return value ? <RA.DateField format="LLL" value={ value }/> : <RA.TextField value="Never"/>
}
export const ER_DateViewOnList: React.FC<ViewProps<Date>> = ER_DateViewOnShow
export const ER_DateViewOnForm: React.FC = (props) => {
    return <RA.DatePicker {...props} showTime={true} />
}
// endregion Date

// region Boolean
export const ER_BooleanViewOnShow: React.FC<ViewProps<Type.ER_Boolean>> = ({value}) => {
    return <RA.TextField value={ value ? "Yes" : "No"}/>
}
export const ER_BooleanViewOnList = ER_BooleanViewOnShow
export const ER_BooleanViewOnForm: React.FC = (props)=>{
    return <RA.Radio.Group {...props} >
        <RA.Radio value={true}>Yes</RA.Radio>
        <RA.Radio value={false}>No</RA.Radio>
    </RA.Radio.Group>
}
// endregion Boolean

// region String
export const ER_StringViewOnShow: React.FC<ViewProps<Type.ER_String>> = ({value}) => {
    return <RA.Typography.Text copyable={true}>{ value }</RA.Typography.Text>
}
export const ER_StringViewOnList: React.FC<ViewProps<Type.ER_String>> = ({value}) => {
    return <RA.Tooltip title={value}>
        <RA.TextField value={value} ellipsis={true} style={ {width: '100px'} }/>
    </RA.Tooltip>
}
export const ER_StringViewOnForm: React.FC = (props) => {
    return <RA.Input {...props} />
}
// endregion String

// region Number
export const ER_NumberViewOnShow: React.FC<ViewProps<Type.ER_Number>> = ({value, ...props}) => {
    return <ER_StringViewOnShow value={String(value)} {...props} />
}
export const ER_NumberViewOnList: React.FC<ViewProps<Type.ER_Number>> = ({value, ...props}) => {
    return <ER_NumberViewOnShow value={value} {...props} />
}
export const ER_NumberViewOnForm: React.FC = (props) => {
    return <RA.InputNumber {...props} />
}
// endregion Number

// region String List
export const ER_StringListViewOnShow: React.FC<ViewProps<Type.ER_StringList>> = ({value}) => {
    return <>{ value?.map( (v, i) => <ER_StringViewOnShow value={ String(i+1) + '. ' + v}/> ) }</>;
}
export const ER_StringListViewOnList: React.FC<ViewProps<Type.ER_StringList>> = ({value}) => {
    return <RA.Typography.Text>{ String( value?.length || 0 )+" items" }</RA.Typography.Text>
}
export const ER_StringListViewOnForm: React.FC = (props) => {
    return <RA.Select {...props}  mode="tags" />
}
// endregion

// region Image
export const ER_ImageViewOnShow: React.FC<ViewProps<Type.ER_Image>> = ({value}) => {
    return <RA.Image style={ {width: '100%', maxWidth: '256px' } } src={value}/>
}
export const ER_ImageViewOnList: React.FC<ViewProps<Type.ER_Image>> = ({value}) => {
    return <RA.Image width={48} src={value}/>
}
export const ER_ImageViewOnForm: React.FC = ER_StringViewOnForm
// endregion Image

// region UUID
export const ER_UUIDViewOnShow: React.FC<ViewProps<Type.ER_UUID>> = ER_StringViewOnShow
export const ER_UUIDViewOnList: React.FC<ViewProps<Type.ER_UUID>> = ER_StringViewOnList
export const ER_UUIDViewOnForm: React.FC = ER_StringListViewOnForm
// endregion UUID

// region Code
export const ER_CodeViewOnForm: React.FC<any> = (props) => {
    return <CodeEditor
        {...props}
        language={props.Language || 'js'}
        padding={15}
        style={ {
            fontSize: 12,
            backgroundColor: "#000",
            fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
        } }
    />
}
export const ER_CodeViewOnShow: React.FC<ViewProps<Type.ER_Code>> = ({value}) => {
    return <ER_CodeViewOnForm value={value} readOnly={true}/>
}
export const ER_CodeViewOnList: React.FC<ViewProps<Type.ER_Code>> = ({value}) => {
    return <RA.TextField value={value} code={true} ellipsis={true} style={ {width: '100px'} }/>
}
// endregion Code

// region Rich Text
export const ER_RichTextViewOnShow: React.FC<ViewProps<Type.ER_RichText>> = ({value})=>{
    return <div dangerouslySetInnerHTML={ {__html: value || ""} }></div>
}
export const ER_RichTextViewOnList: React.FC<ViewProps<Type.ER_RichText>> = ER_StringViewOnList
export const ER_RichTextViewOnForm: React.FC = (props) => <ReactQuill {...props} theme="snow"/>
// endregion Rich Text

// region URL
export const ER_URLViewOnShow: React.FC<ViewProps<Type.ER_URL>> = ({value}) => {
    return <RA.Button type="primary" href={ value } target="_blank" icon={<RA.Icons.LinkOutlined/>}>{ value }</RA.Button>
}
export const ER_URLViewOnList: React.FC<ViewProps<Type.ER_URL>> = ({value}) => {
    return <RA.Button type="primary" href={ value } target="_blank" icon={<RA.Icons.LinkOutlined/>}>Open</RA.Button>
}
export const ER_URLViewOnForm: React.FC = ER_StringViewOnForm
// endregion URL

// region Enums

export const ER_Enums_ProcessStatusViewOnShow = ER_StringViewOnShow
export const ER_Enums_ProcessStatusViewOnList = ER_StringViewOnList
export const ER_Enums_ProcessStatusViewOnForm: React.FC = (props)=>{
    return  <RA.Select
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
}
// endregion Enums

// region Entity Badges
const { Link } = RefineReactRouter;

export const CompanyBadge: React.FC<Partial<Type.ICompany>> = (props) => {
    return <RA.Popover
        overlayInnerStyle={ {width: "50vw", height: "40vh", maxHeight:"400px", maxWidth:"500px", overflow: "auto"} }
        content={
            <Show.CompanyShow
                breadcrumb={false}
                title={props.name }
                id={ props.id }
                withEdges={false}
                headerButtons={[]}
            />
        }
    >
        <Link to={ "/Company/show/"+ props.id}>
            { props.name }
        </Link>
    </RA.Popover>
}

export const CountryBadge: React.FC<Partial<Type.ICountry>> = (props) => {
    return <RA.Popover
        overlayInnerStyle={ {width: "50vw", height: "40vh", maxHeight:"400px", maxWidth:"500px", overflow: "auto"} }
        content={
            <Show.CountryShow
                breadcrumb={false}
                title={props.name }
                id={ props.id }
                withEdges={false}
                headerButtons={[]}
            />
        }
    >
        <Link to={ "/Country/show/"+ props.id}>
            { props.name }
        </Link>
    </RA.Popover>
}

export const EmailBadge: React.FC<Partial<Type.IEmail>> = (props) => {
    return <RA.Popover
        overlayInnerStyle={ {width: "50vw", height: "40vh", maxHeight:"400px", maxWidth:"500px", overflow: "auto"} }
        content={
            <Show.EmailShow
                breadcrumb={false}
                title={props.title }
                id={ props.id }
                withEdges={false}
                headerButtons={[]}
            />
        }
    >
        <Link to={ "/Email/show/"+ props.id}>
            { props.title }
        </Link>
    </RA.Popover>
}

export const ImageBadge: React.FC<Partial<Type.IImage>> = (props) => {
    return <RA.Popover
        overlayInnerStyle={ {width: "50vw", height: "40vh", maxHeight:"400px", maxWidth:"500px", overflow: "auto"} }
        content={
            <Show.ImageShow
                breadcrumb={false}
                title={props.title }
                id={ props.id }
                withEdges={false}
                headerButtons={[]}
            />
        }
    >
        <Link to={ "/Image/show/"+ props.id}>
            { props.originalURL ? <RA.Image width={48} preview={false} src={props.originalURL }/> : null }
        </Link>
    </RA.Popover>
}

export const LocationBadge: React.FC<Partial<Type.ILocation>> = (props) => {
    return <RA.Popover
        overlayInnerStyle={ {width: "50vw", height: "40vh", maxHeight:"400px", maxWidth:"500px", overflow: "auto"} }
        content={
            <Show.LocationShow
                breadcrumb={false}
                title={props.title }
                id={ props.id }
                withEdges={false}
                headerButtons={[]}
            />
        }
    >
        <Link to={ "/Location/show/"+ props.id}>
            { props.title }
        </Link>
    </RA.Popover>
}

export const PhoneBadge: React.FC<Partial<Type.IPhone>> = (props) => {
    return <RA.Popover
        overlayInnerStyle={ {width: "50vw", height: "40vh", maxHeight:"400px", maxWidth:"500px", overflow: "auto"} }
        content={
            <Show.PhoneShow
                breadcrumb={false}
                title={props.title }
                id={ props.id }
                withEdges={false}
                headerButtons={[]}
            />
        }
    >
        <Link to={ "/Phone/show/"+ props.id}>
            { props.title }
        </Link>
    </RA.Popover>
}

export const ProductBadge: React.FC<Partial<Type.IProduct>> = (props) => {
    return <RA.Popover
        overlayInnerStyle={ {width: "50vw", height: "40vh", maxHeight:"400px", maxWidth:"500px", overflow: "auto"} }
        content={
            <Show.ProductShow
                breadcrumb={false}
                title={props.name }
                id={ props.id }
                withEdges={false}
                headerButtons={[]}
            />
        }
    >
        <Link to={ "/Product/show/"+ props.id}>
            { props.image ? <RA.Image width={48} preview={false} src={props.image }/> : null }
        </Link>
    </RA.Popover>
}

export const VendorBadge: React.FC<Partial<Type.IVendor>> = (props) => {
    return <RA.Popover
        overlayInnerStyle={ {width: "50vw", height: "40vh", maxHeight:"400px", maxWidth:"500px", overflow: "auto"} }
        content={
            <Show.VendorShow
                breadcrumb={false}
                title={props.name }
                id={ props.id }
                withEdges={false}
                headerButtons={[]}
            />
        }
    >
        <Link to={ "/Vendor/show/"+ props.id}>
            { props.name }
        </Link>
    </RA.Popover>
}

export const WarehouseBadge: React.FC<Partial<Type.IWarehouse>> = (props) => {
    return <RA.Popover
        overlayInnerStyle={ {width: "50vw", height: "40vh", maxHeight:"400px", maxWidth:"500px", overflow: "auto"} }
        content={
            <Show.WarehouseShow
                breadcrumb={false}
                title={props.name }
                id={ props.id }
                withEdges={false}
                headerButtons={[]}
            />
        }
    >
        <Link to={ "/Warehouse/show/"+ props.id}>
            { props.name }
        </Link>
    </RA.Popover>
}

export const WebsiteBadge: React.FC<Partial<Type.IWebsite>> = (props) => {
    return <RA.Popover
        overlayInnerStyle={ {width: "50vw", height: "40vh", maxHeight:"400px", maxWidth:"500px", overflow: "auto"} }
        content={
            <Show.WebsiteShow
                breadcrumb={false}
                title={props.title }
                id={ props.id }
                withEdges={false}
                headerButtons={[]}
            />
        }
    >
        <Link to={ "/Website/show/"+ props.id}>
            { props.title }
        </Link>
    </RA.Popover>
}

// endregion

/* eslint no-use-before-define: 2 */