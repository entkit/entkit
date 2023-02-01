import RefineReactRouter from "@pankod/refine-react-router-v6";
import * as RA  from "@pankod/refine-antd";
import { BaseKey } from "@pankod/refine-core/dist/interfaces";
import * as Show from "./show";

const { Link } = RefineReactRouter;

export const CompanyBadge: React.FC<{id?: BaseKey, title?: string}> = ({id, title}) => {
    return <RA.Popover
        title={title}
        overlayInnerStyle={ {width: "50vw", height: "40vh", maxHeight:"400px", maxWidth:"500px", overflow: "auto"} }
        content={ <Show.CompanyShow breadcrumb={false} title={title} id={id} withEdges={false} headerButtons={[]}/> }
    >
        <Link to={ "/Company/show/"+ id}>
            { title }
        </Link>
    </RA.Popover>
}

export const CountryBadge: React.FC<{id?: BaseKey, title?: string}> = ({id, title}) => {
    return <RA.Popover
        title={title}
        overlayInnerStyle={ {width: "50vw", height: "40vh", maxHeight:"400px", maxWidth:"500px", overflow: "auto"} }
        content={ <Show.CountryShow breadcrumb={false} title={title} id={id} withEdges={false} headerButtons={[]}/> }
    >
        <Link to={ "/Country/show/"+ id}>
            { title }
        </Link>
    </RA.Popover>
}

export const EmailBadge: React.FC<{id?: BaseKey, title?: string}> = ({id, title}) => {
    return <RA.Popover
        title={title}
        overlayInnerStyle={ {width: "50vw", height: "40vh", maxHeight:"400px", maxWidth:"500px", overflow: "auto"} }
        content={ <Show.EmailShow breadcrumb={false} title={title} id={id} withEdges={false} headerButtons={[]}/> }
    >
        <Link to={ "/Email/show/"+ id}>
            { title }
        </Link>
    </RA.Popover>
}

export const ImageBadge: React.FC<{id?: BaseKey, title?: string}> = ({id, title}) => {
    return <RA.Popover
        title={title}
        overlayInnerStyle={ {width: "50vw", height: "40vh", maxHeight:"400px", maxWidth:"500px", overflow: "auto"} }
        content={ <Show.ImageShow breadcrumb={false} title={title} id={id} withEdges={false} headerButtons={[]}/> }
    >
        <Link to={ "/Image/show/"+ id}>
            { title }
        </Link>
    </RA.Popover>
}

export const LocationBadge: React.FC<{id?: BaseKey, title?: string}> = ({id, title}) => {
    return <RA.Popover
        title={title}
        overlayInnerStyle={ {width: "50vw", height: "40vh", maxHeight:"400px", maxWidth:"500px", overflow: "auto"} }
        content={ <Show.LocationShow breadcrumb={false} title={title} id={id} withEdges={false} headerButtons={[]}/> }
    >
        <Link to={ "/Location/show/"+ id}>
            { title }
        </Link>
    </RA.Popover>
}

export const PhoneBadge: React.FC<{id?: BaseKey, title?: string}> = ({id, title}) => {
    return <RA.Popover
        title={title}
        overlayInnerStyle={ {width: "50vw", height: "40vh", maxHeight:"400px", maxWidth:"500px", overflow: "auto"} }
        content={ <Show.PhoneShow breadcrumb={false} title={title} id={id} withEdges={false} headerButtons={[]}/> }
    >
        <Link to={ "/Phone/show/"+ id}>
            { title }
        </Link>
    </RA.Popover>
}

export const ProductBadge: React.FC<{id?: BaseKey, title?: string}> = ({id, title}) => {
    return <RA.Popover
        title={title}
        overlayInnerStyle={ {width: "50vw", height: "40vh", maxHeight:"400px", maxWidth:"500px", overflow: "auto"} }
        content={ <Show.ProductShow breadcrumb={false} title={title} id={id} withEdges={false} headerButtons={[]}/> }
    >
        <Link to={ "/Product/show/"+ id}>
            { title }
        </Link>
    </RA.Popover>
}

export const VendorBadge: React.FC<{id?: BaseKey, title?: string}> = ({id, title}) => {
    return <RA.Popover
        title={title}
        overlayInnerStyle={ {width: "50vw", height: "40vh", maxHeight:"400px", maxWidth:"500px", overflow: "auto"} }
        content={ <Show.VendorShow breadcrumb={false} title={title} id={id} withEdges={false} headerButtons={[]}/> }
    >
        <Link to={ "/Vendor/show/"+ id}>
            { title }
        </Link>
    </RA.Popover>
}

export const WarehouseBadge: React.FC<{id?: BaseKey, title?: string}> = ({id, title}) => {
    return <RA.Popover
        title={title}
        overlayInnerStyle={ {width: "50vw", height: "40vh", maxHeight:"400px", maxWidth:"500px", overflow: "auto"} }
        content={ <Show.WarehouseShow breadcrumb={false} title={title} id={id} withEdges={false} headerButtons={[]}/> }
    >
        <Link to={ "/Warehouse/show/"+ id}>
            { title }
        </Link>
    </RA.Popover>
}

export const WebsiteBadge: React.FC<{id?: BaseKey, title?: string}> = ({id, title}) => {
    return <RA.Popover
        title={title}
        overlayInnerStyle={ {width: "50vw", height: "40vh", maxHeight:"400px", maxWidth:"500px", overflow: "auto"} }
        content={ <Show.WebsiteShow breadcrumb={false} title={title} id={id} withEdges={false} headerButtons={[]}/> }
    >
        <Link to={ "/Website/show/"+ id}>
            { title }
        </Link>
    </RA.Popover>
}