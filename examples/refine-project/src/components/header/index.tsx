import {
    Grid,
    Row,
    Col,
    AntdLayout,
} from "@pankod/refine-antd";
import {SearchComponent} from "../../entrefine/search-component";

const { Header: AntdHeader } = AntdLayout;

const { useBreakpoint } = Grid;


interface IOptionGroup {
    value: string;
    label: string | React.ReactNode;
}

interface IOptions {
    label: string | React.ReactNode;
    options: IOptionGroup[];
}

export const Header: React.FC = () => {
    const screens = useBreakpoint();

    return (
        <AntdHeader
            style={{
                padding: "0 24px",
                background: "white",
            }}
        >
            <Row
                align="middle"
                style={{
                    justifyContent: screens.sm ? "space-between" : "end",
                }}
            >
                <Col sm={12} xs={36}>
                    <SearchComponent/>
                </Col>
            </Row>
        </AntdHeader>
    );
};