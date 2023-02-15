import React from "react";
import * as RA from "@pankod/refine-antd";
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

export const CompanyShowAction: React.FC<CompanyShowActionProps> = ({recordItemIDs, onSuccess, ...props}) => {
    return <RA.ShowButton
        hideText={true}
        resource="Company"
        resourceNameOrRouteName="Company"
        recordItemId={ recordItemIDs[0] }
        {...props}
    />
}

export type CompanyDeleteActionProps = ButtonProps &
    RefineButtonCommonProps &
    RefineButtonSingleProps &
    RefineButtonLinkingProps & {
    recordItemIDs: Type.EntID[],
    onSuccess?: (data: any)=>void
}

export const CompanyDeleteAction: React.FC<CompanyDeleteActionProps> = ({recordItemIDs, onSuccess, ...props}) => {

    const  notification = useNotification();
    const { mutate, isLoading } = useCustomMutation<Type.ICompany>();
    const additionalProps = {"danger":true} || {};
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
                    onSuccess: (value) => {
                        notification.open?.({
                            type: "success",
                            message: "Successfully",
                        })
                        !onSuccess || onSuccess(value);
                    },
                    onError: (err) => {
                        notification.open?.({
                            type: "error",
                            message: err.message,
                        })
                    },
                },
            );
        }}
    >
        <RA.Button icon={ <RA.Icons.DeleteOutlined/> } {...additionalProps} {...props} >
            {!props.hideText &&
                (props.children ?? "Delete")}
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

export const CompanyEditAction: React.FC<CompanyEditActionProps> = ({recordItemIDs, onSuccess, ...props}) => {
    return <RA.EditButton
        hideText={true}
        resource="Company"
        resourceNameOrRouteName="Company"
        recordItemId={ recordItemIDs[0] }
        {...props}
    />
}

export type CountryShowActionProps = ButtonProps &
    RefineButtonCommonProps &
    RefineButtonSingleProps &
    RefineButtonLinkingProps & {
    recordItemIDs: Type.EntID[],
    onSuccess?: (data: any)=>void
}

export const CountryShowAction: React.FC<CountryShowActionProps> = ({recordItemIDs, onSuccess, ...props}) => {
    return <RA.ShowButton
        hideText={true}
        resource="Country"
        resourceNameOrRouteName="Country"
        recordItemId={ recordItemIDs[0] }
        {...props}
    />
}

export type CountryDeleteActionProps = ButtonProps &
    RefineButtonCommonProps &
    RefineButtonSingleProps &
    RefineButtonLinkingProps & {
    recordItemIDs: Type.EntID[],
    onSuccess?: (data: any)=>void
}

export const CountryDeleteAction: React.FC<CountryDeleteActionProps> = ({recordItemIDs, onSuccess, ...props}) => {

    const  notification = useNotification();
    const { mutate, isLoading } = useCustomMutation<Type.ICountry>();
    const additionalProps = {"danger":true} || {};
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
                    onSuccess: (value) => {
                        notification.open?.({
                            type: "success",
                            message: "Successfully",
                        })
                        !onSuccess || onSuccess(value);
                    },
                    onError: (err) => {
                        notification.open?.({
                            type: "error",
                            message: err.message,
                        })
                    },
                },
            );
        }}
    >
        <RA.Button icon={ <RA.Icons.DeleteOutlined/> } {...additionalProps} {...props} >
            {!props.hideText &&
                (props.children ?? "Delete")}
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

export const CountryEditAction: React.FC<CountryEditActionProps> = ({recordItemIDs, onSuccess, ...props}) => {
    return <RA.EditButton
        hideText={true}
        resource="Country"
        resourceNameOrRouteName="Country"
        recordItemId={ recordItemIDs[0] }
        {...props}
    />
}

export type EmailShowActionProps = ButtonProps &
    RefineButtonCommonProps &
    RefineButtonSingleProps &
    RefineButtonLinkingProps & {
    recordItemIDs: Type.EntID[],
    onSuccess?: (data: any)=>void
}

export const EmailShowAction: React.FC<EmailShowActionProps> = ({recordItemIDs, onSuccess, ...props}) => {
    return <RA.ShowButton
        hideText={true}
        resource="Email"
        resourceNameOrRouteName="Email"
        recordItemId={ recordItemIDs[0] }
        {...props}
    />
}

export type EmailDeleteActionProps = ButtonProps &
    RefineButtonCommonProps &
    RefineButtonSingleProps &
    RefineButtonLinkingProps & {
    recordItemIDs: Type.EntID[],
    onSuccess?: (data: any)=>void
}

export const EmailDeleteAction: React.FC<EmailDeleteActionProps> = ({recordItemIDs, onSuccess, ...props}) => {

    const  notification = useNotification();
    const { mutate, isLoading } = useCustomMutation<Type.IEmail>();
    const additionalProps = {"danger":true} || {};
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
                    onSuccess: (value) => {
                        notification.open?.({
                            type: "success",
                            message: "Successfully",
                        })
                        !onSuccess || onSuccess(value);
                    },
                    onError: (err) => {
                        notification.open?.({
                            type: "error",
                            message: err.message,
                        })
                    },
                },
            );
        }}
    >
        <RA.Button icon={ <RA.Icons.DeleteOutlined/> } {...additionalProps} {...props} >
            {!props.hideText &&
                (props.children ?? "Delete")}
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

export const EmailEditAction: React.FC<EmailEditActionProps> = ({recordItemIDs, onSuccess, ...props}) => {
    return <RA.EditButton
        hideText={true}
        resource="Email"
        resourceNameOrRouteName="Email"
        recordItemId={ recordItemIDs[0] }
        {...props}
    />
}

export type ImageShowActionProps = ButtonProps &
    RefineButtonCommonProps &
    RefineButtonSingleProps &
    RefineButtonLinkingProps & {
    recordItemIDs: Type.EntID[],
    onSuccess?: (data: any)=>void
}

export const ImageShowAction: React.FC<ImageShowActionProps> = ({recordItemIDs, onSuccess, ...props}) => {
    return <RA.ShowButton
        hideText={true}
        resource="Image"
        resourceNameOrRouteName="Image"
        recordItemId={ recordItemIDs[0] }
        {...props}
    />
}

export type ImageDeleteActionProps = ButtonProps &
    RefineButtonCommonProps &
    RefineButtonSingleProps &
    RefineButtonLinkingProps & {
    recordItemIDs: Type.EntID[],
    onSuccess?: (data: any)=>void
}

export const ImageDeleteAction: React.FC<ImageDeleteActionProps> = ({recordItemIDs, onSuccess, ...props}) => {

    const  notification = useNotification();
    const { mutate, isLoading } = useCustomMutation<Type.IImage>();
    const additionalProps = {"danger":true} || {};
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
                    onSuccess: (value) => {
                        notification.open?.({
                            type: "success",
                            message: "Successfully",
                        })
                        !onSuccess || onSuccess(value);
                    },
                    onError: (err) => {
                        notification.open?.({
                            type: "error",
                            message: err.message,
                        })
                    },
                },
            );
        }}
    >
        <RA.Button icon={ <RA.Icons.DeleteOutlined/> } {...additionalProps} {...props} >
            {!props.hideText &&
                (props.children ?? "Delete")}
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

export const ImageEditAction: React.FC<ImageEditActionProps> = ({recordItemIDs, onSuccess, ...props}) => {
    return <RA.EditButton
        hideText={true}
        resource="Image"
        resourceNameOrRouteName="Image"
        recordItemId={ recordItemIDs[0] }
        {...props}
    />
}

export type LocationShowActionProps = ButtonProps &
    RefineButtonCommonProps &
    RefineButtonSingleProps &
    RefineButtonLinkingProps & {
    recordItemIDs: Type.EntID[],
    onSuccess?: (data: any)=>void
}

export const LocationShowAction: React.FC<LocationShowActionProps> = ({recordItemIDs, onSuccess, ...props}) => {
    return <RA.ShowButton
        hideText={true}
        resource="Location"
        resourceNameOrRouteName="Location"
        recordItemId={ recordItemIDs[0] }
        {...props}
    />
}

export type LocationDeleteActionProps = ButtonProps &
    RefineButtonCommonProps &
    RefineButtonSingleProps &
    RefineButtonLinkingProps & {
    recordItemIDs: Type.EntID[],
    onSuccess?: (data: any)=>void
}

export const LocationDeleteAction: React.FC<LocationDeleteActionProps> = ({recordItemIDs, onSuccess, ...props}) => {

    const  notification = useNotification();
    const { mutate, isLoading } = useCustomMutation<Type.ILocation>();
    const additionalProps = {"danger":true} || {};
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
                    onSuccess: (value) => {
                        notification.open?.({
                            type: "success",
                            message: "Successfully",
                        })
                        !onSuccess || onSuccess(value);
                    },
                    onError: (err) => {
                        notification.open?.({
                            type: "error",
                            message: err.message,
                        })
                    },
                },
            );
        }}
    >
        <RA.Button icon={ <RA.Icons.DeleteOutlined/> } {...additionalProps} {...props} >
            {!props.hideText &&
                (props.children ?? "Delete")}
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

export const LocationEditAction: React.FC<LocationEditActionProps> = ({recordItemIDs, onSuccess, ...props}) => {
    return <RA.EditButton
        hideText={true}
        resource="Location"
        resourceNameOrRouteName="Location"
        recordItemId={ recordItemIDs[0] }
        {...props}
    />
}

export type PhoneShowActionProps = ButtonProps &
    RefineButtonCommonProps &
    RefineButtonSingleProps &
    RefineButtonLinkingProps & {
    recordItemIDs: Type.EntID[],
    onSuccess?: (data: any)=>void
}

export const PhoneShowAction: React.FC<PhoneShowActionProps> = ({recordItemIDs, onSuccess, ...props}) => {
    return <RA.ShowButton
        hideText={true}
        resource="Phone"
        resourceNameOrRouteName="Phone"
        recordItemId={ recordItemIDs[0] }
        {...props}
    />
}

export type PhoneDeleteActionProps = ButtonProps &
    RefineButtonCommonProps &
    RefineButtonSingleProps &
    RefineButtonLinkingProps & {
    recordItemIDs: Type.EntID[],
    onSuccess?: (data: any)=>void
}

export const PhoneDeleteAction: React.FC<PhoneDeleteActionProps> = ({recordItemIDs, onSuccess, ...props}) => {

    const  notification = useNotification();
    const { mutate, isLoading } = useCustomMutation<Type.IPhone>();
    const additionalProps = {"danger":true} || {};
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
                    onSuccess: (value) => {
                        notification.open?.({
                            type: "success",
                            message: "Successfully",
                        })
                        !onSuccess || onSuccess(value);
                    },
                    onError: (err) => {
                        notification.open?.({
                            type: "error",
                            message: err.message,
                        })
                    },
                },
            );
        }}
    >
        <RA.Button icon={ <RA.Icons.DeleteOutlined/> } {...additionalProps} {...props} >
            {!props.hideText &&
                (props.children ?? "Delete")}
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

export const PhoneEditAction: React.FC<PhoneEditActionProps> = ({recordItemIDs, onSuccess, ...props}) => {
    return <RA.EditButton
        hideText={true}
        resource="Phone"
        resourceNameOrRouteName="Phone"
        recordItemId={ recordItemIDs[0] }
        {...props}
    />
}

export type ProductShowActionProps = ButtonProps &
    RefineButtonCommonProps &
    RefineButtonSingleProps &
    RefineButtonLinkingProps & {
    recordItemIDs: Type.EntID[],
    onSuccess?: (data: any)=>void
}

export const ProductShowAction: React.FC<ProductShowActionProps> = ({recordItemIDs, onSuccess, ...props}) => {
    return <RA.ShowButton
        hideText={true}
        resource="Product"
        resourceNameOrRouteName="Product"
        recordItemId={ recordItemIDs[0] }
        {...props}
    />
}

export type ProductEditActionProps = ButtonProps &
    RefineButtonCommonProps &
    RefineButtonSingleProps &
    RefineButtonLinkingProps & {
    recordItemIDs: Type.EntID[],
    onSuccess?: (data: any)=>void
}

export const ProductEditAction: React.FC<ProductEditActionProps> = ({recordItemIDs, onSuccess, ...props}) => {
    return <RA.EditButton
        hideText={true}
        resource="Product"
        resourceNameOrRouteName="Product"
        recordItemId={ recordItemIDs[0] }
        {...props}
    />
}

export type ProductDeleteActionProps = ButtonProps &
    RefineButtonCommonProps &
    RefineButtonSingleProps &
    RefineButtonLinkingProps & {
    recordItemIDs: Type.EntID[],
    onSuccess?: (data: any)=>void
}

export const ProductDeleteAction: React.FC<ProductDeleteActionProps> = ({recordItemIDs, onSuccess, ...props}) => {

    const  notification = useNotification();
    const { mutate, isLoading } = useCustomMutation<Type.IProduct>();
    const additionalProps = {"danger":true} || {};
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
                    onSuccess: (value) => {
                        notification.open?.({
                            type: "success",
                            message: "Successfully",
                        })
                        !onSuccess || onSuccess(value);
                    },
                    onError: (err) => {
                        notification.open?.({
                            type: "error",
                            message: err.message,
                        })
                    },
                },
            );
        }}
    >
        <RA.Button icon={ <RA.Icons.DeleteOutlined/> } {...additionalProps} {...props} >
            {!props.hideText &&
                (props.children ?? "Delete")}
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

export const ProductMyCustomActionButtonAction: React.FC<ProductMyCustomActionButtonActionProps> = ({recordItemIDs, onSuccess, ...props}) => {

    const  notification = useNotification();
    const { mutate, isLoading } = useCustomMutation<Type.IProduct>();
    const additionalProps = null || {};
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
                    onSuccess: (value) => {
                        notification.open?.({
                            type: "success",
                            message: "Successfully",
                        })
                        !onSuccess || onSuccess(value);
                    },
                    onError: (err) => {
                        notification.open?.({
                            type: "error",
                            message: err.message,
                        })
                    },
                },
            );
        }}
    >
        <RA.Button icon={ <RA.Icons.FileOutlined/> } {...additionalProps} {...props} >
            {!props.hideText &&
                (props.children ?? "MyCustomActionButton")}
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

export const VendorShowAction: React.FC<VendorShowActionProps> = ({recordItemIDs, onSuccess, ...props}) => {
    return <RA.ShowButton
        hideText={true}
        resource="Vendor"
        resourceNameOrRouteName="Vendor"
        recordItemId={ recordItemIDs[0] }
        {...props}
    />
}

export type VendorDeleteActionProps = ButtonProps &
    RefineButtonCommonProps &
    RefineButtonSingleProps &
    RefineButtonLinkingProps & {
    recordItemIDs: Type.EntID[],
    onSuccess?: (data: any)=>void
}

export const VendorDeleteAction: React.FC<VendorDeleteActionProps> = ({recordItemIDs, onSuccess, ...props}) => {

    const  notification = useNotification();
    const { mutate, isLoading } = useCustomMutation<Type.IVendor>();
    const additionalProps = {"danger":true} || {};
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
                    onSuccess: (value) => {
                        notification.open?.({
                            type: "success",
                            message: "Successfully",
                        })
                        !onSuccess || onSuccess(value);
                    },
                    onError: (err) => {
                        notification.open?.({
                            type: "error",
                            message: err.message,
                        })
                    },
                },
            );
        }}
    >
        <RA.Button icon={ <RA.Icons.DeleteOutlined/> } {...additionalProps} {...props} >
            {!props.hideText &&
                (props.children ?? "Delete")}
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

export const VendorEditAction: React.FC<VendorEditActionProps> = ({recordItemIDs, onSuccess, ...props}) => {
    return <RA.EditButton
        hideText={true}
        resource="Vendor"
        resourceNameOrRouteName="Vendor"
        recordItemId={ recordItemIDs[0] }
        {...props}
    />
}

export type WarehouseShowActionProps = ButtonProps &
    RefineButtonCommonProps &
    RefineButtonSingleProps &
    RefineButtonLinkingProps & {
    recordItemIDs: Type.EntID[],
    onSuccess?: (data: any)=>void
}

export const WarehouseShowAction: React.FC<WarehouseShowActionProps> = ({recordItemIDs, onSuccess, ...props}) => {
    return <RA.ShowButton
        hideText={true}
        resource="Warehouse"
        resourceNameOrRouteName="Warehouse"
        recordItemId={ recordItemIDs[0] }
        {...props}
    />
}

export type WarehouseDeleteActionProps = ButtonProps &
    RefineButtonCommonProps &
    RefineButtonSingleProps &
    RefineButtonLinkingProps & {
    recordItemIDs: Type.EntID[],
    onSuccess?: (data: any)=>void
}

export const WarehouseDeleteAction: React.FC<WarehouseDeleteActionProps> = ({recordItemIDs, onSuccess, ...props}) => {

    const  notification = useNotification();
    const { mutate, isLoading } = useCustomMutation<Type.IWarehouse>();
    const additionalProps = {"danger":true} || {};
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
                    onSuccess: (value) => {
                        notification.open?.({
                            type: "success",
                            message: "Successfully",
                        })
                        !onSuccess || onSuccess(value);
                    },
                    onError: (err) => {
                        notification.open?.({
                            type: "error",
                            message: err.message,
                        })
                    },
                },
            );
        }}
    >
        <RA.Button icon={ <RA.Icons.DeleteOutlined/> } {...additionalProps} {...props} >
            {!props.hideText &&
                (props.children ?? "Delete")}
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

export const WarehouseEditAction: React.FC<WarehouseEditActionProps> = ({recordItemIDs, onSuccess, ...props}) => {
    return <RA.EditButton
        hideText={true}
        resource="Warehouse"
        resourceNameOrRouteName="Warehouse"
        recordItemId={ recordItemIDs[0] }
        {...props}
    />
}

export type WebsiteShowActionProps = ButtonProps &
    RefineButtonCommonProps &
    RefineButtonSingleProps &
    RefineButtonLinkingProps & {
    recordItemIDs: Type.EntID[],
    onSuccess?: (data: any)=>void
}

export const WebsiteShowAction: React.FC<WebsiteShowActionProps> = ({recordItemIDs, onSuccess, ...props}) => {
    return <RA.ShowButton
        hideText={true}
        resource="Website"
        resourceNameOrRouteName="Website"
        recordItemId={ recordItemIDs[0] }
        {...props}
    />
}

export type WebsiteDeleteActionProps = ButtonProps &
    RefineButtonCommonProps &
    RefineButtonSingleProps &
    RefineButtonLinkingProps & {
    recordItemIDs: Type.EntID[],
    onSuccess?: (data: any)=>void
}

export const WebsiteDeleteAction: React.FC<WebsiteDeleteActionProps> = ({recordItemIDs, onSuccess, ...props}) => {

    const  notification = useNotification();
    const { mutate, isLoading } = useCustomMutation<Type.IWebsite>();
    const additionalProps = {"danger":true} || {};
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
                    onSuccess: (value) => {
                        notification.open?.({
                            type: "success",
                            message: "Successfully",
                        })
                        !onSuccess || onSuccess(value);
                    },
                    onError: (err) => {
                        notification.open?.({
                            type: "error",
                            message: err.message,
                        })
                    },
                },
            );
        }}
    >
        <RA.Button icon={ <RA.Icons.DeleteOutlined/> } {...additionalProps} {...props} >
            {!props.hideText &&
                (props.children ?? "Delete")}
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

export const WebsiteEditAction: React.FC<WebsiteEditActionProps> = ({recordItemIDs, onSuccess, ...props}) => {
    return <RA.EditButton
        hideText={true}
        resource="Website"
        resourceNameOrRouteName="Website"
        recordItemId={ recordItemIDs[0] }
        {...props}
    />
}