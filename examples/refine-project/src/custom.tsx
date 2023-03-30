// Write your custom components here
import { Button, Popconfirm, Typography } from "antd";
import React from "react";
import {
    RefineButtonCommonProps,
    RefineButtonLinkingProps,
    RefineButtonResourceProps,
    RefineButtonSingleProps,
} from "@refinedev/ui-types/src/types/button";
import { ButtonProps } from "antd";
import { useNotification } from "@refinedev/core";
import * as AntdIcons from "@ant-design/icons";
import { ViewProps } from "./view";

export type MyCustomActionButtonProps = ButtonProps &
    RefineButtonCommonProps &
    RefineButtonResourceProps &
    RefineButtonSingleProps &
    RefineButtonLinkingProps & {
        onSuccess?: (value: any) => void;
    };
export const MyCustomActionButton: React.FC<MyCustomActionButtonProps> = (
    props,
) => {
    const notification = useNotification();

    return (
        <Popconfirm
            key="delete"
            okText="Request to scrap"
            cancelText="Cancel"
            okType="primary"
            title="Are you sure?"
            onConfirm={(): void => {
                notification.open?.({
                    type: "success",
                    message: "Successfully done",
                });
            }}
        >
            <Button icon={<AntdIcons.RadarChartOutlined />} />
        </Popconfirm>
    );
};

export const MyCustomTitle: React.FC<ViewProps<string>> = ({ value }) => {
    return (
        <Typography.Text copyable={true} style={{ color: "red" }}>
            {value}
        </Typography.Text>
    );
};
