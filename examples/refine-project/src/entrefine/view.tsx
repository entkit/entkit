/* eslint no-use-before-define: 0 */
import React from "react";
import * as RA  from "@pankod/refine-antd";
import RefineReactRouter from "@pankod/refine-react-router-v6";
import * as Show from "./show";
import * as Type  from "./interfaces";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import CodeEditor from '@uiw/react-textarea-code-editor';

export type ViewProps<T> = Omit<React.HTMLProps<HTMLElement>, "value"> & {
    value: T | undefined
}

// region Date
export const EntDateViewOnShow: React.FC<ViewProps<Date>> = ({value}) => {
    return value ? <RA.DateField format="LLL" value={ value }/> : <RA.TextField value="Never"/>
}
export const EntDateViewOnList: React.FC<ViewProps<Date>> = EntDateViewOnShow
export const EntDateViewOnForm: React.FC = (props) => {
    return <RA.DatePicker {...props} showTime={true} />
}
// endregion Date

// region Boolean
export const EntBooleanViewOnShow: React.FC<ViewProps<Type.EntBoolean>> = ({value}) => {
    return <RA.TextField value={ value ? "Yes" : "No"}/>
}
export const EntBooleanViewOnList = EntBooleanViewOnShow
export const EntBooleanViewOnForm: React.FC = (props)=>{
    return <RA.Radio.Group {...props} >
        <RA.Radio value={true}>Yes</RA.Radio>
        <RA.Radio value={false}>No</RA.Radio>
    </RA.Radio.Group>
}
// endregion Boolean

// region String
export const EntStringViewOnShow: React.FC<ViewProps<Type.EntString>> = ({value}) => {
    return <RA.Typography.Text copyable={true}>{ value }</RA.Typography.Text>
}
export const EntStringViewOnList: React.FC<ViewProps<Type.EntString>> = ({value}) => {
    return <RA.Tooltip title={value}>
        <RA.TextField value={value} ellipsis={true} style={ {width: '100px'} }/>
    </RA.Tooltip>
}
export const EntStringViewOnForm: React.FC = (props) => {
    return <RA.Input {...props} />
}
// endregion String

// region Number
export const EntNumberViewOnShow: React.FC<ViewProps<Type.EntNumber>> = ({value, ...props}) => {
    return <EntStringViewOnShow value={String(value)} {...props} />
}
export const EntNumberViewOnList: React.FC<ViewProps<Type.EntNumber>> = ({value, ...props}) => {
    return <EntNumberViewOnShow value={value} {...props} />
}
export const EntNumberViewOnForm: React.FC = (props) => {
    return <RA.InputNumber {...props} />
}
// endregion Number

// region String List
export const EntStringListViewOnShow: React.FC<ViewProps<Type.EntStringList>> = ({value}) => {
    return <>{ value?.map( (v, i) => <EntStringViewOnShow key={i} value={ String(i+1) + '. ' + v}/> ) }</>;
}
export const EntStringListViewOnList: React.FC<ViewProps<Type.EntStringList>> = ({value}) => {
    return <RA.Typography.Text>{ String( value?.length || 0 )+" items" }</RA.Typography.Text>
}
export const EntStringListViewOnForm: React.FC = (props) => {
    return <RA.Select {...props}  mode="tags" />
}
// endregion

// region Image
export const EntImageViewOnShow: React.FC<ViewProps<Type.EntImage>> = ({value}) => {
    return <RA.Image style={ {width: '100%', maxWidth: '256px' } } src={value}/>
}
export const EntImageViewOnList: React.FC<ViewProps<Type.EntImage>> = ({value}) => {
    return <RA.Image width={48} src={value}/>
}
export const EntImageViewOnForm: React.FC = EntStringViewOnForm
// endregion Image

// region UUID
export const EntUUIDViewOnShow: React.FC<ViewProps<Type.EntUUID>> = EntStringViewOnShow
export const EntUUIDViewOnList: React.FC<ViewProps<Type.EntUUID>> = EntStringViewOnList
export const EntUUIDViewOnForm: React.FC = EntStringListViewOnForm
// endregion UUID

// region Code
export const EntCodeViewOnForm: React.FC<any> = (props) => {
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
export const EntCodeViewOnShow: React.FC<ViewProps<Type.EntCode>> = ({value}) => {
    return <EntCodeViewOnForm value={value} readOnly={true}/>
}
export const EntCodeViewOnList: React.FC<ViewProps<Type.EntCode>> = ({value}) => {
    return <RA.TextField value={value} code={true} ellipsis={true} style={ {width: '100px'} }/>
}
// endregion Code

// region Rich Text
export const EntRichTextViewOnShow: React.FC<ViewProps<Type.EntRichText>> = ({value})=>{
    return <div dangerouslySetInnerHTML={ {__html: value || ""} }></div>
}
export const EntRichTextViewOnList: React.FC<ViewProps<Type.EntRichText>> = EntStringViewOnList
export const EntRichTextViewOnForm: React.FC = (props) => <ReactQuill {...props} theme="snow"/>
// endregion Rich Text

// region URL
export const EntURLViewOnShow: React.FC<ViewProps<Type.EntURL>> = ({value}) => {
    return <RA.Button href={ value } target="_blank" icon={<RA.Icons.LinkOutlined/>}>
        <RA.TextField value={value} ellipsis={true} style={ {width: '100%', maxWidth: "350px"} } type={"secondary"} />
    </RA.Button>
}
export const EntURLViewOnList: React.FC<ViewProps<Type.EntURL>> = ({value}) => {
    return <RA.Button type="primary" href={ value } target="_blank" icon={<RA.Icons.LinkOutlined/>}>Open</RA.Button>
}
export const EntURLViewOnForm: React.FC = EntStringViewOnForm
// endregion URL

// region Enums

export const EntEnums_ProcessStatusViewOnShow = EntStringViewOnShow
export const EntEnums_ProcessStatusViewOnList = EntStringViewOnList
export const EntEnums_ProcessStatusViewOnForm: React.FC = (props)=>{
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