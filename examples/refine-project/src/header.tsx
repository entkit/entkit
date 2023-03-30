import { Col, Grid, Layout as AntdLayout, Row } from "antd";
import { SearchComponent } from "search-component";

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
                <Col xs={0} sm={12}>
                    <SearchComponent />
                </Col>
                <Col></Col>
            </Row>
        </AntdHeader>
    );
};
