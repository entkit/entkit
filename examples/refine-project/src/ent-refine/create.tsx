import {useState} from "react";
import * as RA from "@pankod/refine-antd";
import * as Interfaces from "./interfaces";
import {Cursors} from "./data-provider";
import dayjs from "dayjs";
import CodeEditor from '@uiw/react-textarea-code-editor';
import * as FieldView from "./field-view";
import * as Custom from "./custom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';export const CompanyCreate: React.FC = () => {
    const {formProps, saveButtonProps, queryResult} = RA.useForm<Interfaces.ICompany>();
    
    const [ countriesCursors, setCountriesCursors] = useState<Cursors>({})
    const { selectProps: countriesSelectProps } = RA.useSelect<Interfaces.ICompany>({
        resource: "Country",
        optionLabel: "name",
        optionValue: "id",
        metaData:{
            cursors: countriesCursors,
            fields: ["id", "name"]
        },
        onSearch: (value) => [
            {
                field: "name",
                operator: "contains",
                value,
            },
        ],
    });
    const [ phonesCursors, setPhonesCursors] = useState<Cursors>({})
    const { selectProps: phonesSelectProps } = RA.useSelect<Interfaces.ICompany>({
        resource: "Phone",
        optionLabel: "title",
        optionValue: "id",
        metaData:{
            cursors: phonesCursors,
            fields: ["id", "title"]
        },
        onSearch: (value) => [
            {
                field: "title",
                operator: "contains",
                value,
            },
        ],
    });
    const [ emailsCursors, setEmailsCursors] = useState<Cursors>({})
    const { selectProps: emailsSelectProps } = RA.useSelect<Interfaces.ICompany>({
        resource: "Email",
        optionLabel: "title",
        optionValue: "id",
        metaData:{
            cursors: emailsCursors,
            fields: ["id", "title"]
        },
        onSearch: (value) => [
            {
                field: "title",
                operator: "contains",
                value,
            },
        ],
    });
    const [ websitesCursors, setWebsitesCursors] = useState<Cursors>({})
    const { selectProps: websitesSelectProps } = RA.useSelect<Interfaces.ICompany>({
        resource: "Website",
        optionLabel: "title",
        optionValue: "id",
        metaData:{
            cursors: websitesCursors,
            fields: ["id", "title"]
        },
        onSearch: (value) => [
            {
                field: "title",
                operator: "contains",
                value,
            },
        ],
    });
    const [ locationsCursors, setLocationsCursors] = useState<Cursors>({})
    const { selectProps: locationsSelectProps } = RA.useSelect<Interfaces.ICompany>({
        resource: "Location",
        optionLabel: "title",
        optionValue: "id",
        metaData:{
            cursors: locationsCursors,
            fields: ["id", "title"]
        },
        onSearch: (value) => [
            {
                field: "title",
                operator: "contains",
                value,
            },
        ],
    });
    const [ logo_imageCursors, setLogoImageCursors] = useState<Cursors>({})
    const { selectProps: logo_imageSelectProps } = RA.useSelect<Interfaces.ICompany>({
        resource: "Image",
        optionLabel: "title",
        optionValue: "id",
        metaData:{
            cursors: logo_imageCursors,
            fields: ["id", "title"]
        },
        onSearch: (value) => [
            {
                field: "title",
                operator: "contains",
                value,
            },
        ],
    });
    const [ cover_imageCursors, setCoverImageCursors] = useState<Cursors>({})
    const { selectProps: cover_imageSelectProps } = RA.useSelect<Interfaces.ICompany>({
        resource: "Image",
        optionLabel: "title",
        optionValue: "id",
        metaData:{
            cursors: cover_imageCursors,
            fields: ["id", "title"]
        },
        onSearch: (value) => [
            {
                field: "title",
                operator: "contains",
                value,
            },
        ],
    });
    const [ gallery_imagesCursors, setGalleryImagesCursors] = useState<Cursors>({})
    const { selectProps: gallery_imagesSelectProps } = RA.useSelect<Interfaces.ICompany>({
        resource: "Image",
        optionLabel: "title",
        optionValue: "id",
        metaData:{
            cursors: gallery_imagesCursors,
            fields: ["id", "title"]
        },
        onSearch: (value) => [
            {
                field: "title",
                operator: "contains",
                value,
            },
        ],
    });

    return (
        <RA.Create saveButtonProps={saveButtonProps}>
            <RA.Form {...formProps} layout="vertical">
                <RA.Form.Item
                    name="name"
                    label="Name"
                    rules={[{required: true}]}
                >
                     <FieldView.ER_StringViewOnForm/>
                </RA.Form.Item>
                <RA.Form.Item
                    name="logo"
                    label="Logo"
                    rules={[{required: false}]}
                >
                     <FieldView.ER_ImageViewOnForm/>
                </RA.Form.Item>
                <RA.Form.Item
                    name="description"
                    label="Description"
                    rules={[{required: true}]}
                >
                     <FieldView.ER_RichTextViewOnForm/>
                </RA.Form.Item>
                
                <RA.Form.Item label="countries" name={["countryIDs"]} rules={[{required: false}]}>
                    <RA.Select {...countriesSelectProps} mode={ "multiple" }/>
                </RA.Form.Item>
                <RA.Form.Item label="phones" name={["phoneIDs"]} rules={[{required: false}]}>
                    <RA.Select {...phonesSelectProps} mode={ "multiple" }/>
                </RA.Form.Item>
                <RA.Form.Item label="emails" name={["emailIDs"]} rules={[{required: false}]}>
                    <RA.Select {...emailsSelectProps} mode={ "multiple" }/>
                </RA.Form.Item>
                <RA.Form.Item label="websites" name={["websiteIDs"]} rules={[{required: false}]}>
                    <RA.Select {...websitesSelectProps} mode={ "multiple" }/>
                </RA.Form.Item>
                <RA.Form.Item label="locations" name={["locationIDs"]} rules={[{required: false}]}>
                    <RA.Select {...locationsSelectProps} mode={ "multiple" }/>
                </RA.Form.Item>
                <RA.Form.Item label="logo_image" name="logoImageID" rules={[{required: false}]}>
                    <RA.Select {...logo_imageSelectProps} mode={ undefined }/>
                </RA.Form.Item>
                <RA.Form.Item label="cover_image" name="coverImageID" rules={[{required: false}]}>
                    <RA.Select {...cover_imageSelectProps} mode={ undefined }/>
                </RA.Form.Item>
                <RA.Form.Item label="gallery_images" name={["galleryImageIDs"]} rules={[{required: false}]}>
                    <RA.Select {...gallery_imagesSelectProps} mode={ "multiple" }/>
                </RA.Form.Item>
            </RA.Form>
        </RA.Create>
    );
};export const CountryCreate: React.FC = () => {
    const {formProps, saveButtonProps, queryResult} = RA.useForm<Interfaces.ICountry>();
    
    const [ companiesCursors, setCompaniesCursors] = useState<Cursors>({})
    const { selectProps: companiesSelectProps } = RA.useSelect<Interfaces.ICountry>({
        resource: "Company",
        optionLabel: "name",
        optionValue: "id",
        metaData:{
            cursors: companiesCursors,
            fields: ["id", "name"]
        },
        onSearch: (value) => [
            {
                field: "name",
                operator: "contains",
                value,
            },
        ],
    });
    const [ phonesCursors, setPhonesCursors] = useState<Cursors>({})
    const { selectProps: phonesSelectProps } = RA.useSelect<Interfaces.ICountry>({
        resource: "Phone",
        optionLabel: "title",
        optionValue: "id",
        metaData:{
            cursors: phonesCursors,
            fields: ["id", "title"]
        },
        onSearch: (value) => [
            {
                field: "title",
                operator: "contains",
                value,
            },
        ],
    });
    const [ emailsCursors, setEmailsCursors] = useState<Cursors>({})
    const { selectProps: emailsSelectProps } = RA.useSelect<Interfaces.ICountry>({
        resource: "Email",
        optionLabel: "title",
        optionValue: "id",
        metaData:{
            cursors: emailsCursors,
            fields: ["id", "title"]
        },
        onSearch: (value) => [
            {
                field: "title",
                operator: "contains",
                value,
            },
        ],
    });
    const [ websitesCursors, setWebsitesCursors] = useState<Cursors>({})
    const { selectProps: websitesSelectProps } = RA.useSelect<Interfaces.ICountry>({
        resource: "Website",
        optionLabel: "title",
        optionValue: "id",
        metaData:{
            cursors: websitesCursors,
            fields: ["id", "title"]
        },
        onSearch: (value) => [
            {
                field: "title",
                operator: "contains",
                value,
            },
        ],
    });
    const [ locationsCursors, setLocationsCursors] = useState<Cursors>({})
    const { selectProps: locationsSelectProps } = RA.useSelect<Interfaces.ICountry>({
        resource: "Location",
        optionLabel: "title",
        optionValue: "id",
        metaData:{
            cursors: locationsCursors,
            fields: ["id", "title"]
        },
        onSearch: (value) => [
            {
                field: "title",
                operator: "contains",
                value,
            },
        ],
    });

    return (
        <RA.Create saveButtonProps={saveButtonProps}>
            <RA.Form {...formProps} layout="vertical">
                <RA.Form.Item
                    name="name"
                    label="Name"
                    rules={[{required: true}]}
                >
                     <FieldView.ER_StringViewOnForm/>
                </RA.Form.Item>
                <RA.Form.Item
                    name="code"
                    label="Code"
                    rules={[{required: true}]}
                >
                     <FieldView.ER_StringViewOnForm/>
                </RA.Form.Item>
                
                <RA.Form.Item label="companies" name={["companyIDs"]} rules={[{required: false}]}>
                    <RA.Select {...companiesSelectProps} mode={ "multiple" }/>
                </RA.Form.Item>
                <RA.Form.Item label="phones" name={["phoneIDs"]} rules={[{required: false}]}>
                    <RA.Select {...phonesSelectProps} mode={ "multiple" }/>
                </RA.Form.Item>
                <RA.Form.Item label="emails" name={["emailIDs"]} rules={[{required: false}]}>
                    <RA.Select {...emailsSelectProps} mode={ "multiple" }/>
                </RA.Form.Item>
                <RA.Form.Item label="websites" name={["websiteIDs"]} rules={[{required: false}]}>
                    <RA.Select {...websitesSelectProps} mode={ "multiple" }/>
                </RA.Form.Item>
                <RA.Form.Item label="locations" name={["locationIDs"]} rules={[{required: false}]}>
                    <RA.Select {...locationsSelectProps} mode={ "multiple" }/>
                </RA.Form.Item>
            </RA.Form>
        </RA.Create>
    );
};export const EmailCreate: React.FC = () => {
    const {formProps, saveButtonProps, queryResult} = RA.useForm<Interfaces.IEmail>();
    
    const [ companyCursors, setCompanyCursors] = useState<Cursors>({})
    const { selectProps: companySelectProps } = RA.useSelect<Interfaces.IEmail>({
        resource: "Company",
        optionLabel: "name",
        optionValue: "id",
        metaData:{
            cursors: companyCursors,
            fields: ["id", "name"]
        },
        onSearch: (value) => [
            {
                field: "name",
                operator: "contains",
                value,
            },
        ],
    });
    const [ countryCursors, setCountryCursors] = useState<Cursors>({})
    const { selectProps: countrySelectProps } = RA.useSelect<Interfaces.IEmail>({
        resource: "Country",
        optionLabel: "name",
        optionValue: "id",
        metaData:{
            cursors: countryCursors,
            fields: ["id", "name"]
        },
        onSearch: (value) => [
            {
                field: "name",
                operator: "contains",
                value,
            },
        ],
    });

    return (
        <RA.Create saveButtonProps={saveButtonProps}>
            <RA.Form {...formProps} layout="vertical">
                <RA.Form.Item
                    name="title"
                    label="Title"
                    rules={[{required: true}]}
                >
                     <FieldView.ER_StringViewOnForm/>
                </RA.Form.Item>
                <RA.Form.Item
                    name="description"
                    label="Description"
                    rules={[{required: true}]}
                >
                     <FieldView.ER_StringViewOnForm/>
                </RA.Form.Item>
                <RA.Form.Item
                    name="address"
                    label="Address"
                    rules={[{required: true}]}
                >
                     <FieldView.ER_StringViewOnForm/>
                </RA.Form.Item>
                
                <RA.Form.Item label="company" name="companyID" rules={[{required: false}]}>
                    <RA.Select {...companySelectProps} mode={ undefined }/>
                </RA.Form.Item>
                <RA.Form.Item label="country" name="countryID" rules={[{required: false}]}>
                    <RA.Select {...countrySelectProps} mode={ undefined }/>
                </RA.Form.Item>
            </RA.Form>
        </RA.Create>
    );
};export const ImageCreate: React.FC = () => {
    const {formProps, saveButtonProps, queryResult} = RA.useForm<Interfaces.IImage>();
    
    const [ gallery_companyCursors, setGalleryCompanyCursors] = useState<Cursors>({})
    const { selectProps: gallery_companySelectProps } = RA.useSelect<Interfaces.IImage>({
        resource: "Company",
        optionLabel: "name",
        optionValue: "id",
        metaData:{
            cursors: gallery_companyCursors,
            fields: ["id", "name"]
        },
        onSearch: (value) => [
            {
                field: "name",
                operator: "contains",
                value,
            },
        ],
    });
    const [ logo_companyCursors, setLogoCompanyCursors] = useState<Cursors>({})
    const { selectProps: logo_companySelectProps } = RA.useSelect<Interfaces.IImage>({
        resource: "Company",
        optionLabel: "name",
        optionValue: "id",
        metaData:{
            cursors: logo_companyCursors,
            fields: ["id", "name"]
        },
        onSearch: (value) => [
            {
                field: "name",
                operator: "contains",
                value,
            },
        ],
    });
    const [ cover_companyCursors, setCoverCompanyCursors] = useState<Cursors>({})
    const { selectProps: cover_companySelectProps } = RA.useSelect<Interfaces.IImage>({
        resource: "Company",
        optionLabel: "name",
        optionValue: "id",
        metaData:{
            cursors: cover_companyCursors,
            fields: ["id", "name"]
        },
        onSearch: (value) => [
            {
                field: "name",
                operator: "contains",
                value,
            },
        ],
    });

    return (
        <RA.Create saveButtonProps={saveButtonProps}>
            <RA.Form {...formProps} layout="vertical">
                <RA.Form.Item
                    name="title"
                    label="Title"
                    rules={[{required: true}]}
                >
                     <FieldView.ER_StringViewOnForm/>
                </RA.Form.Item>
                <RA.Form.Item
                    name="originalURL"
                    label="Original Url"
                    rules={[{required: true}]}
                >
                     <FieldView.ER_ImageViewOnForm/>
                </RA.Form.Item>
                
                <RA.Form.Item label="gallery_company" name="galleryCompanyID" rules={[{required: false}]}>
                    <RA.Select {...gallery_companySelectProps} mode={ undefined }/>
                </RA.Form.Item>
                <RA.Form.Item label="logo_company" name="logoCompanyID" rules={[{required: false}]}>
                    <RA.Select {...logo_companySelectProps} mode={ undefined }/>
                </RA.Form.Item>
                <RA.Form.Item label="cover_company" name="coverCompanyID" rules={[{required: false}]}>
                    <RA.Select {...cover_companySelectProps} mode={ undefined }/>
                </RA.Form.Item>
            </RA.Form>
        </RA.Create>
    );
};export const LocationCreate: React.FC = () => {
    const {formProps, saveButtonProps, queryResult} = RA.useForm<Interfaces.ILocation>();
    
    const [ companyCursors, setCompanyCursors] = useState<Cursors>({})
    const { selectProps: companySelectProps } = RA.useSelect<Interfaces.ILocation>({
        resource: "Company",
        optionLabel: "name",
        optionValue: "id",
        metaData:{
            cursors: companyCursors,
            fields: ["id", "name"]
        },
        onSearch: (value) => [
            {
                field: "name",
                operator: "contains",
                value,
            },
        ],
    });
    const [ countryCursors, setCountryCursors] = useState<Cursors>({})
    const { selectProps: countrySelectProps } = RA.useSelect<Interfaces.ILocation>({
        resource: "Country",
        optionLabel: "name",
        optionValue: "id",
        metaData:{
            cursors: countryCursors,
            fields: ["id", "name"]
        },
        onSearch: (value) => [
            {
                field: "name",
                operator: "contains",
                value,
            },
        ],
    });

    return (
        <RA.Create saveButtonProps={saveButtonProps}>
            <RA.Form {...formProps} layout="vertical">
                <RA.Form.Item
                    name="title"
                    label="Title"
                    rules={[{required: true}]}
                >
                     <FieldView.ER_StringViewOnForm/>
                </RA.Form.Item>
                <RA.Form.Item
                    name="description"
                    label="Description"
                    rules={[{required: true}]}
                >
                     <FieldView.ER_StringViewOnForm/>
                </RA.Form.Item>
                <RA.Form.Item
                    name="latitude"
                    label="Latitude"
                    rules={[{required: true}]}
                >
                     <FieldView.ER_StringViewOnForm/>
                </RA.Form.Item>
                <RA.Form.Item
                    name="longitude"
                    label="Longitude"
                    rules={[{required: true}]}
                >
                     <FieldView.ER_StringViewOnForm/>
                </RA.Form.Item>
                <RA.Form.Item
                    name="address"
                    label="Address"
                    rules={[{required: true}]}
                >
                     <FieldView.ER_StringViewOnForm/>
                </RA.Form.Item>
                <RA.Form.Item
                    name="postcode"
                    label="Postcode"
                    rules={[{required: true}]}
                >
                     <FieldView.ER_StringViewOnForm/>
                </RA.Form.Item>
                <RA.Form.Item
                    name="type"
                    label="Type"
                    rules={[{required: true}]}
                >
                     <FieldView.ER_StringViewOnForm/>
                </RA.Form.Item>
                <RA.Form.Item
                    name="state"
                    label="State"
                    rules={[{required: true}]}
                >
                     <FieldView.ER_StringViewOnForm/>
                </RA.Form.Item>
                <RA.Form.Item
                    name="suburb"
                    label="Suburb"
                    rules={[{required: true}]}
                >
                     <FieldView.ER_StringViewOnForm/>
                </RA.Form.Item>
                <RA.Form.Item
                    name="streetType"
                    label="Street Type"
                    rules={[{required: true}]}
                >
                     <FieldView.ER_StringViewOnForm/>
                </RA.Form.Item>
                <RA.Form.Item
                    name="streetName"
                    label="Street Name"
                    rules={[{required: true}]}
                >
                     <FieldView.ER_StringViewOnForm/>
                </RA.Form.Item>
                
                <RA.Form.Item label="company" name="companyID" rules={[{required: false}]}>
                    <RA.Select {...companySelectProps} mode={ undefined }/>
                </RA.Form.Item>
                <RA.Form.Item label="country" name="countryID" rules={[{required: false}]}>
                    <RA.Select {...countrySelectProps} mode={ undefined }/>
                </RA.Form.Item>
            </RA.Form>
        </RA.Create>
    );
};export const PhoneCreate: React.FC = () => {
    const {formProps, saveButtonProps, queryResult} = RA.useForm<Interfaces.IPhone>();
    
    const [ companyCursors, setCompanyCursors] = useState<Cursors>({})
    const { selectProps: companySelectProps } = RA.useSelect<Interfaces.IPhone>({
        resource: "Company",
        optionLabel: "name",
        optionValue: "id",
        metaData:{
            cursors: companyCursors,
            fields: ["id", "name"]
        },
        onSearch: (value) => [
            {
                field: "name",
                operator: "contains",
                value,
            },
        ],
    });
    const [ countryCursors, setCountryCursors] = useState<Cursors>({})
    const { selectProps: countrySelectProps } = RA.useSelect<Interfaces.IPhone>({
        resource: "Country",
        optionLabel: "name",
        optionValue: "id",
        metaData:{
            cursors: countryCursors,
            fields: ["id", "name"]
        },
        onSearch: (value) => [
            {
                field: "name",
                operator: "contains",
                value,
            },
        ],
    });

    return (
        <RA.Create saveButtonProps={saveButtonProps}>
            <RA.Form {...formProps} layout="vertical">
                <RA.Form.Item
                    name="title"
                    label="Title"
                    rules={[{required: true}]}
                >
                     <FieldView.ER_StringViewOnForm/>
                </RA.Form.Item>
                <RA.Form.Item
                    name="description"
                    label="Description"
                    rules={[{required: true}]}
                >
                     <FieldView.ER_StringViewOnForm/>
                </RA.Form.Item>
                <RA.Form.Item
                    name="number"
                    label="Number"
                    rules={[{required: true}]}
                >
                     <FieldView.ER_StringViewOnForm/>
                </RA.Form.Item>
                <RA.Form.Item
                    name="type"
                    label="Type"
                    rules={[{required: true}]}
                >
                     <FieldView.ER_StringViewOnForm/>
                </RA.Form.Item>
                
                <RA.Form.Item label="company" name="companyID" rules={[{required: false}]}>
                    <RA.Select {...companySelectProps} mode={ undefined }/>
                </RA.Form.Item>
                <RA.Form.Item label="country" name="countryID" rules={[{required: false}]}>
                    <RA.Select {...countrySelectProps} mode={ undefined }/>
                </RA.Form.Item>
            </RA.Form>
        </RA.Create>
    );
};export const ProductCreate: React.FC = () => {
    const {formProps, saveButtonProps, queryResult} = RA.useForm<Interfaces.IProduct>();
    
    const [ warehouseCursors, setWarehouseCursors] = useState<Cursors>({})
    const { selectProps: warehouseSelectProps } = RA.useSelect<Interfaces.IProduct>({
        resource: "Warehouse",
        optionLabel: "name",
        optionValue: "id",
        metaData:{
            cursors: warehouseCursors,
            fields: ["id", "name"]
        },
        onSearch: (value) => [
            {
                field: "name",
                operator: "contains",
                value,
            },
        ],
    });
    const [ vendorCursors, setVendorCursors] = useState<Cursors>({})
    const { selectProps: vendorSelectProps } = RA.useSelect<Interfaces.IProduct>({
        resource: "Vendor",
        optionLabel: "name",
        optionValue: "id",
        metaData:{
            cursors: vendorCursors,
            fields: ["id", "name"]
        },
        onSearch: (value) => [
            {
                field: "name",
                operator: "contains",
                value,
            },
        ],
    });

    return (
        <RA.Create saveButtonProps={saveButtonProps}>
            <RA.Form {...formProps} layout="vertical">
                <RA.Form.Item
                    name="name"
                    label="Name"
                    rules={[{required: true}]}
                >
                     <FieldView.ER_StringViewOnForm/>
                </RA.Form.Item>
                <RA.Form.Item
                    name="description"
                    label="Description"
                    rules={[{required: true}]}
                >
                     <FieldView.ER_RichTextViewOnForm/>
                </RA.Form.Item>
                <RA.Form.Item
                    name="image"
                    label="Image"
                    rules={[{required: true}]}
                >
                     <FieldView.ER_ImageViewOnForm/>
                </RA.Form.Item>
                <RA.Form.Item
                    name="url"
                    label="Url"
                    rules={[{required: true}]}
                >
                     <FieldView.ER_URLViewOnForm/>
                </RA.Form.Item>
                <RA.Form.Item
                    name="status"
                    label="Status"
                    rules={[{required: true}]}
                >
                     <FieldView.ER_Enums_ProcessStatusViewOnForm/>
                </RA.Form.Item>
                <RA.Form.Item
                    name="buildStatus"
                    label="Build Status"
                    rules={[{required: true}]}
                >
                     <FieldView.ER_Enums_ProcessStatusViewOnForm/>
                </RA.Form.Item>
                
                <RA.Form.Item label="warehouse" name="warehouseID" rules={[{required: false}]}>
                    <RA.Select {...warehouseSelectProps} mode={ undefined }/>
                </RA.Form.Item>
                <RA.Form.Item label="vendor" name="vendorID" rules={[{required: false}]}>
                    <RA.Select {...vendorSelectProps} mode={ undefined }/>
                </RA.Form.Item>
            </RA.Form>
        </RA.Create>
    );
};export const VendorCreate: React.FC = () => {
    const {formProps, saveButtonProps, queryResult} = RA.useForm<Interfaces.IVendor>();
    
    const [ warehousesCursors, setWarehousesCursors] = useState<Cursors>({})
    const { selectProps: warehousesSelectProps } = RA.useSelect<Interfaces.IVendor>({
        resource: "Warehouse",
        optionLabel: "name",
        optionValue: "id",
        metaData:{
            cursors: warehousesCursors,
            fields: ["id", "name"]
        },
        onSearch: (value) => [
            {
                field: "name",
                operator: "contains",
                value,
            },
        ],
    });
    const [ productsCursors, setProductsCursors] = useState<Cursors>({})
    const { selectProps: productsSelectProps } = RA.useSelect<Interfaces.IVendor>({
        resource: "Product",
        optionLabel: "url",
        optionValue: "id",
        metaData:{
            cursors: productsCursors,
            fields: ["id", "url"]
        },
        onSearch: (value) => [
            {
                field: "url",
                operator: "contains",
                value,
            },
        ],
    });

    return (
        <RA.Create saveButtonProps={saveButtonProps}>
            <RA.Form {...formProps} layout="vertical">
                <RA.Form.Item
                    name="name"
                    label="Name"
                    rules={[{required: true}]}
                >
                     <FieldView.ER_StringViewOnForm/>
                </RA.Form.Item>
                <RA.Form.Item
                    name="schema"
                    label="Schema"
                    rules={[{required: true}]}
                >
                     <FieldView.ER_CodeViewOnForm/>
                </RA.Form.Item>
                
                <RA.Form.Item label="warehouses" name={["warehouseIDs"]} rules={[{required: false}]}>
                    <RA.Select {...warehousesSelectProps} mode={ "multiple" }/>
                </RA.Form.Item>
                <RA.Form.Item label="products" name={["productIDs"]} rules={[{required: false}]}>
                    <RA.Select {...productsSelectProps} mode={ "multiple" }/>
                </RA.Form.Item>
            </RA.Form>
        </RA.Create>
    );
};export const WarehouseCreate: React.FC = () => {
    const {formProps, saveButtonProps, queryResult} = RA.useForm<Interfaces.IWarehouse>();
    
    const [ productsCursors, setProductsCursors] = useState<Cursors>({})
    const { selectProps: productsSelectProps } = RA.useSelect<Interfaces.IWarehouse>({
        resource: "Product",
        optionLabel: "url",
        optionValue: "id",
        metaData:{
            cursors: productsCursors,
            fields: ["id", "url"]
        },
        onSearch: (value) => [
            {
                field: "url",
                operator: "contains",
                value,
            },
        ],
    });
    const [ vendorCursors, setVendorCursors] = useState<Cursors>({})
    const { selectProps: vendorSelectProps } = RA.useSelect<Interfaces.IWarehouse>({
        resource: "Vendor",
        optionLabel: "name",
        optionValue: "id",
        metaData:{
            cursors: vendorCursors,
            fields: ["id", "name"]
        },
        onSearch: (value) => [
            {
                field: "name",
                operator: "contains",
                value,
            },
        ],
    });

    return (
        <RA.Create saveButtonProps={saveButtonProps}>
            <RA.Form {...formProps} layout="vertical">
                <RA.Form.Item
                    name="name"
                    label="Name"
                    rules={[{required: true}]}
                >
                     <FieldView.ER_StringViewOnForm/>
                </RA.Form.Item>
                <RA.Form.Item
                    name="originalData"
                    label="Original Data"
                    rules={[{required: false}]}
                >
                     <FieldView.ER_CodeViewOnForm/>
                </RA.Form.Item>
                <RA.Form.Item
                    name="enabled"
                    label="Enabled"
                    rules={[{required: true}]}
                >
                     <FieldView.ER_BooleanViewOnForm/>
                </RA.Form.Item>
                <RA.Form.Item
                    name="filters"
                    label="Filters"
                    rules={[{required: false}]}
                >
                     <FieldView.ER_StringListViewOnForm/>
                </RA.Form.Item>
                
                <RA.Form.Item label="products" name={["productIDs"]} rules={[{required: false}]}>
                    <RA.Select {...productsSelectProps} mode={ "multiple" }/>
                </RA.Form.Item>
                <RA.Form.Item label="vendor" name="vendorID" rules={[{required: false}]}>
                    <RA.Select {...vendorSelectProps} mode={ undefined }/>
                </RA.Form.Item>
            </RA.Form>
        </RA.Create>
    );
};export const WebsiteCreate: React.FC = () => {
    const {formProps, saveButtonProps, queryResult} = RA.useForm<Interfaces.IWebsite>();
    
    const [ companyCursors, setCompanyCursors] = useState<Cursors>({})
    const { selectProps: companySelectProps } = RA.useSelect<Interfaces.IWebsite>({
        resource: "Company",
        optionLabel: "name",
        optionValue: "id",
        metaData:{
            cursors: companyCursors,
            fields: ["id", "name"]
        },
        onSearch: (value) => [
            {
                field: "name",
                operator: "contains",
                value,
            },
        ],
    });
    const [ countryCursors, setCountryCursors] = useState<Cursors>({})
    const { selectProps: countrySelectProps } = RA.useSelect<Interfaces.IWebsite>({
        resource: "Country",
        optionLabel: "name",
        optionValue: "id",
        metaData:{
            cursors: countryCursors,
            fields: ["id", "name"]
        },
        onSearch: (value) => [
            {
                field: "name",
                operator: "contains",
                value,
            },
        ],
    });

    return (
        <RA.Create saveButtonProps={saveButtonProps}>
            <RA.Form {...formProps} layout="vertical">
                <RA.Form.Item
                    name="title"
                    label="Title"
                    rules={[{required: true}]}
                >
                     <FieldView.ER_StringViewOnForm/>
                </RA.Form.Item>
                <RA.Form.Item
                    name="description"
                    label="Description"
                    rules={[{required: true}]}
                >
                     <FieldView.ER_StringViewOnForm/>
                </RA.Form.Item>
                <RA.Form.Item
                    name="url"
                    label="Url"
                    rules={[{required: true}]}
                >
                     <FieldView.ER_URLViewOnForm/>
                </RA.Form.Item>
                
                <RA.Form.Item label="company" name="companyID" rules={[{required: false}]}>
                    <RA.Select {...companySelectProps} mode={ undefined }/>
                </RA.Form.Item>
                <RA.Form.Item label="country" name="countryID" rules={[{required: false}]}>
                    <RA.Select {...countrySelectProps} mode={ undefined }/>
                </RA.Form.Item>
            </RA.Form>
        </RA.Create>
    );
};