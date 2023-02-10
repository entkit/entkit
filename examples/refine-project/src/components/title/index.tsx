import {Logo} from "./styled";
import {Icons} from "@pankod/refine-antd"

type TitleProps = {
    collapsed: boolean;
};

export const Title: React.FC<TitleProps> = ({collapsed}) => {
    return (
        <Logo>
            {collapsed ? (
                <Icons.MenuOutlined style={{color: "white", fontSize: "32px"}}/>
            ) : (
                <img src="/images/logo.svg" alt="Finefood"/>
            )}
        </Logo>
    );
};