import {Logo} from "./styled";
import {Icons} from "@pankod/refine-antd"
import RefineReactRouter from "@pankod/refine-react-router-v6";

type TitleProps = {
    collapsed: boolean;
};
const { Link } = RefineReactRouter;

export const Title: React.FC<TitleProps> = ({collapsed}) => {
    return (
        <Link to={ "/" } >
            <Logo>
                {collapsed ? (
                    <Icons.MenuOutlined style={{color: "white", fontSize: "32px"}}/>
                ) : (
                    <img src="/images/logo.svg" alt="entrefine"/>
                )}
            </Logo>
        </Link>
    );
};