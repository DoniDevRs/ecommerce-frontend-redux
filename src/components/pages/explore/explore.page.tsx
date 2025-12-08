import { FunctionComponent } from "react";

// Components
import Header from "../../header/header.component";
import CategoriesOverview from "../../categories-overview/categories-overview.component";

const ExplorePage: FunctionComponent = () => {
    return (
        <>
            <Header />
            <CategoriesOverview />
        </>
    )
}

export default ExplorePage;