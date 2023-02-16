import React from "react";
import * as RA from "@pankod/refine-antd";
import {useInvalidate} from "@pankod/refine-core";
import {
    RefineButtonCommonProps,
    RefineButtonLinkingProps,
    RefineButtonResourceProps,
    RefineButtonSingleProps
} from "@pankod/refine-ui-types/src/types/button";
import {ButtonProps} from "antd";
import {DeleteOneResponse, useCan, useCustomMutation, useNotification, useResource} from "@pankod/refine-core";
import {ViewProps} from "./view";
import * as Custom from "./custom";
import * as Type from "./interfaces";

export type CompanyShowActionProps = ButtonProps &
    RefineButtonCommonProps &
    RefineButtonSingleProps &
    RefineButtonLinkingProps & {
    recordItemIDs: Type.EntID[],
    onSuccess?: (data: any)=>void
}

export const CompanyShowAction: React.FC<CompanyShowActionProps> = ({recordItemIDs, hideText, onSuccess, ...props}) => {
    return <RA.ShowButton
        resource="Company"
        resourceNameOrRouteName="Company"
        recordItemId={ recordItemIDs[0] }
        {...props}
    >
        {hideText || "Show"}
    </RA.ShowButton>
}

export type CompanyDeleteActionProps = ButtonProps &
    RefineButtonCommonProps &
    RefineButtonSingleProps &
    RefineButtonLinkingProps & {
    recordItemIDs: Type.EntID[],
    onSuccess?: (data: any)=>void
}

export const CompanyDeleteAction: React.FC<CompanyDeleteActionProps> = ({recordItemIDs, hideText, onSuccess, ...props}) => {

    const  notification = useNotification();
    const { mutate, isLoading } = useCustomMutation<Type.ICompany>();
    const additionalProps = {"danger":true} || {};
    const invalidate = useInvalidate();

    return <RA.Popconfirm
        key="deleteCompanies"
        okText="Delete"
        cancelText="Cancel"
        okType="primary"
        title="Are you sure?"
        okButtonProps={ { disabled: isLoading } }
        onConfirm={(): void => {
            mutate(
                {
                    method: "post",
                    url: "",
                    values: {},
                    metaData: {
                        operation: "deleteCompanies",
                        variables: {
                            where: {
                                value: {
                                    idIn: recordItemIDs
                                },
                                type: "CompanyWhereInput",
                                required: true
                            },
                        },
                        fields: null || undefined,
                    },
                },
                {
                    onSuccess: (resp: any) => {
                        recordItemIDs.forEach((id)=>{
                            invalidate({
                                resource: "Company",
                                invalidates: ["resourceAll"],
                                id,
                            });
                        })
                        notification.open?.({
                            type: "success",
                            message: `Successfully`,
                        })
                        !onSuccess || onSuccess(resp);
                    },
                    onError: (error) => {
                        notification.open?.({
                            type: "error",
                            message: error.message,
                        })
                    },
                },
            );
        }}
    >
        <RA.Button icon={ <RA.Icons.DeleteOutlined/> } {...additionalProps} {...props} >
            {hideText || "Delete"}
        </RA.Button>
    </RA.Popconfirm>
}

export type CompanyEditActionProps = ButtonProps &
    RefineButtonCommonProps &
    RefineButtonSingleProps &
    RefineButtonLinkingProps & {
    recordItemIDs: Type.EntID[],
    onSuccess?: (data: any)=>void
}

export const CompanyEditAction: React.FC<CompanyEditActionProps> = ({recordItemIDs, hideText, onSuccess, ...props}) => {
    return <RA.EditButton
        resource="Company"
        resourceNameOrRouteName="Company"
        recordItemId={ recordItemIDs[0] }
        {...props}
    >
        {hideText || "Edit"}
    </RA.EditButton>
}

export type CountryShowActionProps = ButtonProps &
    RefineButtonCommonProps &
    RefineButtonSingleProps &
    RefineButtonLinkingProps & {
    recordItemIDs: Type.EntID[],
    onSuccess?: (data: any)=>void
}

export const CountryShowAction: React.FC<CountryShowActionProps> = ({recordItemIDs, hideText, onSuccess, ...props}) => {
    return <RA.ShowButton
        resource="Country"
        resourceNameOrRouteName="Country"
        recordItemId={ recordItemIDs[0] }
        {...props}
    >
        {hideText || "Show"}
    </RA.ShowButton>
}

export type CountryDeleteActionProps = ButtonProps &
    RefineButtonCommonProps &
    RefineButtonSingleProps &
    RefineButtonLinkingProps & {
    recordItemIDs: Type.EntID[],
    onSuccess?: (data: any)=>void
}

export const CountryDeleteAction: React.FC<CountryDeleteActionProps> = ({recordItemIDs, hideText, onSuccess, ...props}) => {

    const  notification = useNotification();
    const { mutate, isLoading } = useCustomMutation<Type.ICountry>();
    const additionalProps = {"danger":true} || {};
    const invalidate = useInvalidate();

    return <RA.Popconfirm
        key="deleteCountries"
        okText="Delete"
        cancelText="Cancel"
        okType="primary"
        title="Are you sure?"
        okButtonProps={ { disabled: isLoading } }
        onConfirm={(): void => {
            mutate(
                {
                    method: "post",
                    url: "",
                    values: {},
                    metaData: {
                        operation: "deleteCountries",
                        variables: {
                            where: {
                                value: {
                                    idIn: recordItemIDs
                                },
                                type: "CountryWhereInput",
                                required: true
                            },
                        },
                        fields: null || undefined,
                    },
                },
                {
                    onSuccess: (resp: any) => {
                        recordItemIDs.forEach((id)=>{
                            invalidate({
                                resource: "Country",
                                invalidates: ["resourceAll"],
                                id,
                            });
                        })
                        notification.open?.({
                            type: "success",
                            message: `Successfully`,
                        })
                        !onSuccess || onSuccess(resp);
                    },
                    onError: (error) => {
                        notification.open?.({
                            type: "error",
                            message: error.message,
                        })
                    },
                },
            );
        }}
    >
        <RA.Button icon={ <RA.Icons.DeleteOutlined/> } {...additionalProps} {...props} >
            {hideText || "Delete"}
        </RA.Button>
    </RA.Popconfirm>
}

export type CountryEditActionProps = ButtonProps &
    RefineButtonCommonProps &
    RefineButtonSingleProps &
    RefineButtonLinkingProps & {
    recordItemIDs: Type.EntID[],
    onSuccess?: (data: any)=>void
}

export const CountryEditAction: React.FC<CountryEditActionProps> = ({recordItemIDs, hideText, onSuccess, ...props}) => {
    return <RA.EditButton
        resource="Country"
        resourceNameOrRouteName="Country"
        recordItemId={ recordItemIDs[0] }
        {...props}
    >
        {hideText || "Edit"}
    </RA.EditButton>
}

export type EmailShowActionProps = ButtonProps &
    RefineButtonCommonProps &
    RefineButtonSingleProps &
    RefineButtonLinkingProps & {
    recordItemIDs: Type.EntID[],
    onSuccess?: (data: any)=>void
}

export const EmailShowAction: React.FC<EmailShowActionProps> = ({recordItemIDs, hideText, onSuccess, ...props}) => {
    return <RA.ShowButton
        resource="Email"
        resourceNameOrRouteName="Email"
        recordItemId={ recordItemIDs[0] }
        {...props}
    >
        {hideText || "Show"}
    </RA.ShowButton>
}

export type EmailDeleteActionProps = ButtonProps &
    RefineButtonCommonProps &
    RefineButtonSingleProps &
    RefineButtonLinkingProps & {
    recordItemIDs: Type.EntID[],
    onSuccess?: (data: any)=>void
}

export const EmailDeleteAction: React.FC<EmailDeleteActionProps> = ({recordItemIDs, hideText, onSuccess, ...props}) => {

    const  notification = useNotification();
    const { mutate, isLoading } = useCustomMutation<Type.IEmail>();
    const additionalProps = {"danger":true} || {};
    const invalidate = useInvalidate();

    return <RA.Popconfirm
        key="deleteEmails"
        okText="Delete"
        cancelText="Cancel"
        okType="primary"
        title="Are you sure?"
        okButtonProps={ { disabled: isLoading } }
        onConfirm={(): void => {
            mutate(
                {
                    method: "post",
                    url: "",
                    values: {},
                    metaData: {
                        operation: "deleteEmails",
                        variables: {
                            where: {
                                value: {
                                    idIn: recordItemIDs
                                },
                                type: "EmailWhereInput",
                                required: true
                            },
                        },
                        fields: null || undefined,
                    },
                },
                {
                    onSuccess: (resp: any) => {
                        recordItemIDs.forEach((id)=>{
                            invalidate({
                                resource: "Email",
                                invalidates: ["resourceAll"],
                                id,
                            });
                        })
                        notification.open?.({
                            type: "success",
                            message: `Successfully`,
                        })
                        !onSuccess || onSuccess(resp);
                    },
                    onError: (error) => {
                        notification.open?.({
                            type: "error",
                            message: error.message,
                        })
                    },
                },
            );
        }}
    >
        <RA.Button icon={ <RA.Icons.DeleteOutlined/> } {...additionalProps} {...props} >
            {hideText || "Delete"}
        </RA.Button>
    </RA.Popconfirm>
}

export type EmailEditActionProps = ButtonProps &
    RefineButtonCommonProps &
    RefineButtonSingleProps &
    RefineButtonLinkingProps & {
    recordItemIDs: Type.EntID[],
    onSuccess?: (data: any)=>void
}

export const EmailEditAction: React.FC<EmailEditActionProps> = ({recordItemIDs, hideText, onSuccess, ...props}) => {
    return <RA.EditButton
        resource="Email"
        resourceNameOrRouteName="Email"
        recordItemId={ recordItemIDs[0] }
        {...props}
    >
        {hideText || "Edit"}
    </RA.EditButton>
}

export type ImageShowActionProps = ButtonProps &
    RefineButtonCommonProps &
    RefineButtonSingleProps &
    RefineButtonLinkingProps & {
    recordItemIDs: Type.EntID[],
    onSuccess?: (data: any)=>void
}

export const ImageShowAction: React.FC<ImageShowActionProps> = ({recordItemIDs, hideText, onSuccess, ...props}) => {
    return <RA.ShowButton
        resource="Image"
        resourceNameOrRouteName="Image"
        recordItemId={ recordItemIDs[0] }
        {...props}
    >
        {hideText || "Show"}
    </RA.ShowButton>
}

export type ImageDeleteActionProps = ButtonProps &
    RefineButtonCommonProps &
    RefineButtonSingleProps &
    RefineButtonLinkingProps & {
    recordItemIDs: Type.EntID[],
    onSuccess?: (data: any)=>void
}

export const ImageDeleteAction: React.FC<ImageDeleteActionProps> = ({recordItemIDs, hideText, onSuccess, ...props}) => {

    const  notification = useNotification();
    const { mutate, isLoading } = useCustomMutation<Type.IImage>();
    const additionalProps = {"danger":true} || {};
    const invalidate = useInvalidate();

    return <RA.Popconfirm
        key="deleteImages"
        okText="Delete"
        cancelText="Cancel"
        okType="primary"
        title="Are you sure?"
        okButtonProps={ { disabled: isLoading } }
        onConfirm={(): void => {
            mutate(
                {
                    method: "post",
                    url: "",
                    values: {},
                    metaData: {
                        operation: "deleteImages",
                        variables: {
                            where: {
                                value: {
                                    idIn: recordItemIDs
                                },
                                type: "ImageWhereInput",
                                required: true
                            },
                        },
                        fields: null || undefined,
                    },
                },
                {
                    onSuccess: (resp: any) => {
                        recordItemIDs.forEach((id)=>{
                            invalidate({
                                resource: "Image",
                                invalidates: ["resourceAll"],
                                id,
                            });
                        })
                        notification.open?.({
                            type: "success",
                            message: `Successfully`,
                        })
                        !onSuccess || onSuccess(resp);
                    },
                    onError: (error) => {
                        notification.open?.({
                            type: "error",
                            message: error.message,
                        })
                    },
                },
            );
        }}
    >
        <RA.Button icon={ <RA.Icons.DeleteOutlined/> } {...additionalProps} {...props} >
            {hideText || "Delete"}
        </RA.Button>
    </RA.Popconfirm>
}

export type ImageEditActionProps = ButtonProps &
    RefineButtonCommonProps &
    RefineButtonSingleProps &
    RefineButtonLinkingProps & {
    recordItemIDs: Type.EntID[],
    onSuccess?: (data: any)=>void
}

export const ImageEditAction: React.FC<ImageEditActionProps> = ({recordItemIDs, hideText, onSuccess, ...props}) => {
    return <RA.EditButton
        resource="Image"
        resourceNameOrRouteName="Image"
        recordItemId={ recordItemIDs[0] }
        {...props}
    >
        {hideText || "Edit"}
    </RA.EditButton>
}

export type LocationShowActionProps = ButtonProps &
    RefineButtonCommonProps &
    RefineButtonSingleProps &
    RefineButtonLinkingProps & {
    recordItemIDs: Type.EntID[],
    onSuccess?: (data: any)=>void
}

export const LocationShowAction: React.FC<LocationShowActionProps> = ({recordItemIDs, hideText, onSuccess, ...props}) => {
    return <RA.ShowButton
        resource="Location"
        resourceNameOrRouteName="Location"
        recordItemId={ recordItemIDs[0] }
        {...props}
    >
        {hideText || "Show"}
    </RA.ShowButton>
}

export type LocationDeleteActionProps = ButtonProps &
    RefineButtonCommonProps &
    RefineButtonSingleProps &
    RefineButtonLinkingProps & {
    recordItemIDs: Type.EntID[],
    onSuccess?: (data: any)=>void
}

export const LocationDeleteAction: React.FC<LocationDeleteActionProps> = ({recordItemIDs, hideText, onSuccess, ...props}) => {

    const  notification = useNotification();
    const { mutate, isLoading } = useCustomMutation<Type.ILocation>();
    const additionalProps = {"danger":true} || {};
    const invalidate = useInvalidate();

    return <RA.Popconfirm
        key="deleteLocations"
        okText="Delete"
        cancelText="Cancel"
        okType="primary"
        title="Are you sure?"
        okButtonProps={ { disabled: isLoading } }
        onConfirm={(): void => {
            mutate(
                {
                    method: "post",
                    url: "",
                    values: {},
                    metaData: {
                        operation: "deleteLocations",
                        variables: {
                            where: {
                                value: {
                                    idIn: recordItemIDs
                                },
                                type: "LocationWhereInput",
                                required: true
                            },
                        },
                        fields: null || undefined,
                    },
                },
                {
                    onSuccess: (resp: any) => {
                        recordItemIDs.forEach((id)=>{
                            invalidate({
                                resource: "Location",
                                invalidates: ["resourceAll"],
                                id,
                            });
                        })
                        notification.open?.({
                            type: "success",
                            message: `Successfully`,
                        })
                        !onSuccess || onSuccess(resp);
                    },
                    onError: (error) => {
                        notification.open?.({
                            type: "error",
                            message: error.message,
                        })
                    },
                },
            );
        }}
    >
        <RA.Button icon={ <RA.Icons.DeleteOutlined/> } {...additionalProps} {...props} >
            {hideText || "Delete"}
        </RA.Button>
    </RA.Popconfirm>
}

export type LocationEditActionProps = ButtonProps &
    RefineButtonCommonProps &
    RefineButtonSingleProps &
    RefineButtonLinkingProps & {
    recordItemIDs: Type.EntID[],
    onSuccess?: (data: any)=>void
}

export const LocationEditAction: React.FC<LocationEditActionProps> = ({recordItemIDs, hideText, onSuccess, ...props}) => {
    return <RA.EditButton
        resource="Location"
        resourceNameOrRouteName="Location"
        recordItemId={ recordItemIDs[0] }
        {...props}
    >
        {hideText || "Edit"}
    </RA.EditButton>
}

export type PhoneShowActionProps = ButtonProps &
    RefineButtonCommonProps &
    RefineButtonSingleProps &
    RefineButtonLinkingProps & {
    recordItemIDs: Type.EntID[],
    onSuccess?: (data: any)=>void
}

export const PhoneShowAction: React.FC<PhoneShowActionProps> = ({recordItemIDs, hideText, onSuccess, ...props}) => {
    return <RA.ShowButton
        resource="Phone"
        resourceNameOrRouteName="Phone"
        recordItemId={ recordItemIDs[0] }
        {...props}
    >
        {hideText || "Show"}
    </RA.ShowButton>
}

export type PhoneDeleteActionProps = ButtonProps &
    RefineButtonCommonProps &
    RefineButtonSingleProps &
    RefineButtonLinkingProps & {
    recordItemIDs: Type.EntID[],
    onSuccess?: (data: any)=>void
}

export const PhoneDeleteAction: React.FC<PhoneDeleteActionProps> = ({recordItemIDs, hideText, onSuccess, ...props}) => {

    const  notification = useNotification();
    const { mutate, isLoading } = useCustomMutation<Type.IPhone>();
    const additionalProps = {"danger":true} || {};
    const invalidate = useInvalidate();

    return <RA.Popconfirm
        key="deletePhones"
        okText="Delete"
        cancelText="Cancel"
        okType="primary"
        title="Are you sure?"
        okButtonProps={ { disabled: isLoading } }
        onConfirm={(): void => {
            mutate(
                {
                    method: "post",
                    url: "",
                    values: {},
                    metaData: {
                        operation: "deletePhones",
                        variables: {
                            where: {
                                value: {
                                    idIn: recordItemIDs
                                },
                                type: "PhoneWhereInput",
                                required: true
                            },
                        },
                        fields: null || undefined,
                    },
                },
                {
                    onSuccess: (resp: any) => {
                        recordItemIDs.forEach((id)=>{
                            invalidate({
                                resource: "Phone",
                                invalidates: ["resourceAll"],
                                id,
                            });
                        })
                        notification.open?.({
                            type: "success",
                            message: `Successfully`,
                        })
                        !onSuccess || onSuccess(resp);
                    },
                    onError: (error) => {
                        notification.open?.({
                            type: "error",
                            message: error.message,
                        })
                    },
                },
            );
        }}
    >
        <RA.Button icon={ <RA.Icons.DeleteOutlined/> } {...additionalProps} {...props} >
            {hideText || "Delete"}
        </RA.Button>
    </RA.Popconfirm>
}

export type PhoneEditActionProps = ButtonProps &
    RefineButtonCommonProps &
    RefineButtonSingleProps &
    RefineButtonLinkingProps & {
    recordItemIDs: Type.EntID[],
    onSuccess?: (data: any)=>void
}

export const PhoneEditAction: React.FC<PhoneEditActionProps> = ({recordItemIDs, hideText, onSuccess, ...props}) => {
    return <RA.EditButton
        resource="Phone"
        resourceNameOrRouteName="Phone"
        recordItemId={ recordItemIDs[0] }
        {...props}
    >
        {hideText || "Edit"}
    </RA.EditButton>
}

export type ProductShowActionProps = ButtonProps &
    RefineButtonCommonProps &
    RefineButtonSingleProps &
    RefineButtonLinkingProps & {
    recordItemIDs: Type.EntID[],
    onSuccess?: (data: any)=>void
}

export const ProductShowAction: React.FC<ProductShowActionProps> = ({recordItemIDs, hideText, onSuccess, ...props}) => {
    return <RA.ShowButton
        resource="Product"
        resourceNameOrRouteName="Product"
        recordItemId={ recordItemIDs[0] }
        {...props}
    >
        {hideText || "Show"}
    </RA.ShowButton>
}

export type ProductEditActionProps = ButtonProps &
    RefineButtonCommonProps &
    RefineButtonSingleProps &
    RefineButtonLinkingProps & {
    recordItemIDs: Type.EntID[],
    onSuccess?: (data: any)=>void
}

export const ProductEditAction: React.FC<ProductEditActionProps> = ({recordItemIDs, hideText, onSuccess, ...props}) => {
    return <RA.EditButton
        resource="Product"
        resourceNameOrRouteName="Product"
        recordItemId={ recordItemIDs[0] }
        {...props}
    >
        {hideText || "Edit"}
    </RA.EditButton>
}

export type ProductDeleteActionProps = ButtonProps &
    RefineButtonCommonProps &
    RefineButtonSingleProps &
    RefineButtonLinkingProps & {
    recordItemIDs: Type.EntID[],
    onSuccess?: (data: any)=>void
}

export const ProductDeleteAction: React.FC<ProductDeleteActionProps> = ({recordItemIDs, hideText, onSuccess, ...props}) => {

    const  notification = useNotification();
    const { mutate, isLoading } = useCustomMutation<Type.IProduct>();
    const additionalProps = {"danger":true} || {};
    const invalidate = useInvalidate();

    return <RA.Popconfirm
        key="deleteProducts"
        okText="Delete"
        cancelText="Cancel"
        okType="primary"
        title="Are you sure?"
        okButtonProps={ { disabled: isLoading } }
        onConfirm={(): void => {
            mutate(
                {
                    method: "post",
                    url: "",
                    values: {},
                    metaData: {
                        operation: "deleteProducts",
                        variables: {
                            where: {
                                value: {
                                    idIn: recordItemIDs
                                },
                                type: "ProductWhereInput",
                                required: true
                            },
                        },
                        fields: null || undefined,
                    },
                },
                {
                    onSuccess: (resp: any) => {
                        recordItemIDs.forEach((id)=>{
                            invalidate({
                                resource: "Product",
                                invalidates: ["resourceAll"],
                                id,
                            });
                        })
                        notification.open?.({
                            type: "success",
                            message: `Successfully`,
                        })
                        !onSuccess || onSuccess(resp);
                    },
                    onError: (error) => {
                        notification.open?.({
                            type: "error",
                            message: error.message,
                        })
                    },
                },
            );
        }}
    >
        <RA.Button icon={ <RA.Icons.DeleteOutlined/> } {...additionalProps} {...props} >
            {hideText || "Delete"}
        </RA.Button>
    </RA.Popconfirm>
}

export type ProductMyCustomActionButtonActionProps = ButtonProps &
    RefineButtonCommonProps &
    RefineButtonSingleProps &
    RefineButtonLinkingProps & {
    recordItemIDs: Type.EntID[],
    onSuccess?: (data: any)=>void
}

export const ProductMyCustomActionButtonAction: React.FC<ProductMyCustomActionButtonActionProps> = ({recordItemIDs, hideText, onSuccess, ...props}) => {

    const  notification = useNotification();
    const { mutate, isLoading } = useCustomMutation<Type.IProduct>();
    const additionalProps = null || {};
    const invalidate = useInvalidate();

    return <RA.Popconfirm
        key="MyCustomActionButton"
        okText="MyCustomActionButton"
        cancelText="Cancel"
        okType="primary"
        title="Are you sure?"
        okButtonProps={ { disabled: isLoading } }
        onConfirm={(): void => {
            mutate(
                {
                    method: "post",
                    url: "",
                    values: {},
                    metaData: {
                        operation: "MyCustomActionButton",
                        variables: {
                            where: {
                                value: {
                                    idIn: recordItemIDs
                                },
                                type: "ProductWhereInput",
                                required: true
                            },
                        },
                        fields: null || undefined,
                    },
                },
                {
                    onSuccess: (resp: any) => {
                        recordItemIDs.forEach((id)=>{
                            invalidate({
                                resource: "Product",
                                invalidates: ["resourceAll"],
                                id,
                            });
                        })
                        notification.open?.({
                            type: "success",
                            message: `Successfully`,
                        })
                        !onSuccess || onSuccess(resp);
                    },
                    onError: (error) => {
                        notification.open?.({
                            type: "error",
                            message: error.message,
                        })
                    },
                },
            );
        }}
    >
        <RA.Button icon={ <RA.Icons.FileOutlined/> } {...additionalProps} {...props} >
            {hideText || "MyCustomActionButton"}
        </RA.Button>
    </RA.Popconfirm>
}

export type VendorShowActionProps = ButtonProps &
    RefineButtonCommonProps &
    RefineButtonSingleProps &
    RefineButtonLinkingProps & {
    recordItemIDs: Type.EntID[],
    onSuccess?: (data: any)=>void
}

export const VendorShowAction: React.FC<VendorShowActionProps> = ({recordItemIDs, hideText, onSuccess, ...props}) => {
    return <RA.ShowButton
        resource="Vendor"
        resourceNameOrRouteName="Vendor"
        recordItemId={ recordItemIDs[0] }
        {...props}
    >
        {hideText || "Show"}
    </RA.ShowButton>
}

export type VendorDeleteActionProps = ButtonProps &
    RefineButtonCommonProps &
    RefineButtonSingleProps &
    RefineButtonLinkingProps & {
    recordItemIDs: Type.EntID[],
    onSuccess?: (data: any)=>void
}

export const VendorDeleteAction: React.FC<VendorDeleteActionProps> = ({recordItemIDs, hideText, onSuccess, ...props}) => {

    const  notification = useNotification();
    const { mutate, isLoading } = useCustomMutation<Type.IVendor>();
    const additionalProps = {"danger":true} || {};
    const invalidate = useInvalidate();

    return <RA.Popconfirm
        key="deleteVendors"
        okText="Delete"
        cancelText="Cancel"
        okType="primary"
        title="Are you sure?"
        okButtonProps={ { disabled: isLoading } }
        onConfirm={(): void => {
            mutate(
                {
                    method: "post",
                    url: "",
                    values: {},
                    metaData: {
                        operation: "deleteVendors",
                        variables: {
                            where: {
                                value: {
                                    idIn: recordItemIDs
                                },
                                type: "VendorWhereInput",
                                required: true
                            },
                        },
                        fields: null || undefined,
                    },
                },
                {
                    onSuccess: (resp: any) => {
                        recordItemIDs.forEach((id)=>{
                            invalidate({
                                resource: "Vendor",
                                invalidates: ["resourceAll"],
                                id,
                            });
                        })
                        notification.open?.({
                            type: "success",
                            message: `Successfully`,
                        })
                        !onSuccess || onSuccess(resp);
                    },
                    onError: (error) => {
                        notification.open?.({
                            type: "error",
                            message: error.message,
                        })
                    },
                },
            );
        }}
    >
        <RA.Button icon={ <RA.Icons.DeleteOutlined/> } {...additionalProps} {...props} >
            {hideText || "Delete"}
        </RA.Button>
    </RA.Popconfirm>
}

export type VendorEditActionProps = ButtonProps &
    RefineButtonCommonProps &
    RefineButtonSingleProps &
    RefineButtonLinkingProps & {
    recordItemIDs: Type.EntID[],
    onSuccess?: (data: any)=>void
}

export const VendorEditAction: React.FC<VendorEditActionProps> = ({recordItemIDs, hideText, onSuccess, ...props}) => {
    return <RA.EditButton
        resource="Vendor"
        resourceNameOrRouteName="Vendor"
        recordItemId={ recordItemIDs[0] }
        {...props}
    >
        {hideText || "Edit"}
    </RA.EditButton>
}

export type WarehouseShowActionProps = ButtonProps &
    RefineButtonCommonProps &
    RefineButtonSingleProps &
    RefineButtonLinkingProps & {
    recordItemIDs: Type.EntID[],
    onSuccess?: (data: any)=>void
}

export const WarehouseShowAction: React.FC<WarehouseShowActionProps> = ({recordItemIDs, hideText, onSuccess, ...props}) => {
    return <RA.ShowButton
        resource="Warehouse"
        resourceNameOrRouteName="Warehouse"
        recordItemId={ recordItemIDs[0] }
        {...props}
    >
        {hideText || "Show"}
    </RA.ShowButton>
}

export type WarehouseDeleteActionProps = ButtonProps &
    RefineButtonCommonProps &
    RefineButtonSingleProps &
    RefineButtonLinkingProps & {
    recordItemIDs: Type.EntID[],
    onSuccess?: (data: any)=>void
}

export const WarehouseDeleteAction: React.FC<WarehouseDeleteActionProps> = ({recordItemIDs, hideText, onSuccess, ...props}) => {

    const  notification = useNotification();
    const { mutate, isLoading } = useCustomMutation<Type.IWarehouse>();
    const additionalProps = {"danger":true} || {};
    const invalidate = useInvalidate();

    return <RA.Popconfirm
        key="deleteWarehouses"
        okText="Delete"
        cancelText="Cancel"
        okType="primary"
        title="Are you sure?"
        okButtonProps={ { disabled: isLoading } }
        onConfirm={(): void => {
            mutate(
                {
                    method: "post",
                    url: "",
                    values: {},
                    metaData: {
                        operation: "deleteWarehouses",
                        variables: {
                            where: {
                                value: {
                                    idIn: recordItemIDs
                                },
                                type: "WarehouseWhereInput",
                                required: true
                            },
                        },
                        fields: null || undefined,
                    },
                },
                {
                    onSuccess: (resp: any) => {
                        recordItemIDs.forEach((id)=>{
                            invalidate({
                                resource: "Warehouse",
                                invalidates: ["resourceAll"],
                                id,
                            });
                        })
                        notification.open?.({
                            type: "success",
                            message: `Successfully`,
                        })
                        !onSuccess || onSuccess(resp);
                    },
                    onError: (error) => {
                        notification.open?.({
                            type: "error",
                            message: error.message,
                        })
                    },
                },
            );
        }}
    >
        <RA.Button icon={ <RA.Icons.DeleteOutlined/> } {...additionalProps} {...props} >
            {hideText || "Delete"}
        </RA.Button>
    </RA.Popconfirm>
}

export type WarehouseEditActionProps = ButtonProps &
    RefineButtonCommonProps &
    RefineButtonSingleProps &
    RefineButtonLinkingProps & {
    recordItemIDs: Type.EntID[],
    onSuccess?: (data: any)=>void
}

export const WarehouseEditAction: React.FC<WarehouseEditActionProps> = ({recordItemIDs, hideText, onSuccess, ...props}) => {
    return <RA.EditButton
        resource="Warehouse"
        resourceNameOrRouteName="Warehouse"
        recordItemId={ recordItemIDs[0] }
        {...props}
    >
        {hideText || "Edit"}
    </RA.EditButton>
}

export type WebsiteShowActionProps = ButtonProps &
    RefineButtonCommonProps &
    RefineButtonSingleProps &
    RefineButtonLinkingProps & {
    recordItemIDs: Type.EntID[],
    onSuccess?: (data: any)=>void
}

export const WebsiteShowAction: React.FC<WebsiteShowActionProps> = ({recordItemIDs, hideText, onSuccess, ...props}) => {
    return <RA.ShowButton
        resource="Website"
        resourceNameOrRouteName="Website"
        recordItemId={ recordItemIDs[0] }
        {...props}
    >
        {hideText || "Show"}
    </RA.ShowButton>
}

export type WebsiteDeleteActionProps = ButtonProps &
    RefineButtonCommonProps &
    RefineButtonSingleProps &
    RefineButtonLinkingProps & {
    recordItemIDs: Type.EntID[],
    onSuccess?: (data: any)=>void
}

export const WebsiteDeleteAction: React.FC<WebsiteDeleteActionProps> = ({recordItemIDs, hideText, onSuccess, ...props}) => {

    const  notification = useNotification();
    const { mutate, isLoading } = useCustomMutation<Type.IWebsite>();
    const additionalProps = {"danger":true} || {};
    const invalidate = useInvalidate();

    return <RA.Popconfirm
        key="deleteWebsites"
        okText="Delete"
        cancelText="Cancel"
        okType="primary"
        title="Are you sure?"
        okButtonProps={ { disabled: isLoading } }
        onConfirm={(): void => {
            mutate(
                {
                    method: "post",
                    url: "",
                    values: {},
                    metaData: {
                        operation: "deleteWebsites",
                        variables: {
                            where: {
                                value: {
                                    idIn: recordItemIDs
                                },
                                type: "WebsiteWhereInput",
                                required: true
                            },
                        },
                        fields: null || undefined,
                    },
                },
                {
                    onSuccess: (resp: any) => {
                        recordItemIDs.forEach((id)=>{
                            invalidate({
                                resource: "Website",
                                invalidates: ["resourceAll"],
                                id,
                            });
                        })
                        notification.open?.({
                            type: "success",
                            message: `Successfully`,
                        })
                        !onSuccess || onSuccess(resp);
                    },
                    onError: (error) => {
                        notification.open?.({
                            type: "error",
                            message: error.message,
                        })
                    },
                },
            );
        }}
    >
        <RA.Button icon={ <RA.Icons.DeleteOutlined/> } {...additionalProps} {...props} >
            {hideText || "Delete"}
        </RA.Button>
    </RA.Popconfirm>
}

export type WebsiteEditActionProps = ButtonProps &
    RefineButtonCommonProps &
    RefineButtonSingleProps &
    RefineButtonLinkingProps & {
    recordItemIDs: Type.EntID[],
    onSuccess?: (data: any)=>void
}

export const WebsiteEditAction: React.FC<WebsiteEditActionProps> = ({recordItemIDs, hideText, onSuccess, ...props}) => {
    return <RA.EditButton
        resource="Website"
        resourceNameOrRouteName="Website"
        recordItemId={ recordItemIDs[0] }
        {...props}
    >
        {hideText || "Edit"}
    </RA.EditButton>
}