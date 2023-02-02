// Write your custom components here

import {ViewProps} from "./view";
import * as RA from "@pankod/refine-antd";
import {useNotification} from "@pankod/refine-core";
import {ButtonProps} from "@pankod/refine-antd";
import {
    RefineButtonCommonProps,
    RefineButtonLinkingProps,
    RefineButtonResourceProps,
    RefineButtonSingleProps
} from "@pankod/refine-ui-types/src/types/button";

export type MyCustomActionButtonProps = ButtonProps &
    RefineButtonCommonProps &
    RefineButtonResourceProps &
    RefineButtonSingleProps &
    RefineButtonLinkingProps & {
    onSuccess?: (value: any) => void;
}
export const MyCustomActionButton: React.FC<MyCustomActionButtonProps> = (props) => {
    const  notification = useNotification();

    return <RA.Popconfirm
        key="delete"
        okText="Request to scrap"
        cancelText="Cancel"
        okType="primary"
        title="Are you sure?"
        onConfirm={(): void => {
            notification.open?.({
                type: "success",
                message: "Successfully done",
            })
        }}
    >
        <RA.Button icon={<RA.Icons.RadarChartOutlined/>} />
    </RA.Popconfirm>
}

export const MyCustomTitle: React.FC<ViewProps<string>> = ({value}) => {
    return <RA.Typography.Text copyable={true} style={ {color: "red"} }>{ value }</RA.Typography.Text>
}