import { useContext, useEffect } from "react";

//Components
import CategoryItem from "../category-item/category-item.component";

//Styles
import { CategoriesContainer, CategoriesContent } from "./categories.styles";
import LoadingComponent from "../loading/loading.component";
import { useDispatch } from "react-redux";
import { fetchCategories } from "../../store/reducers/category/category.actions";
import useAppSelector from "../hooks/redux.hooks";

const Categories = () => {
    const { categories, isLoading } = useAppSelector(state => state.categoryReducer);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategories() as any);
    }, [dispatch]);

    return (
        <CategoriesContainer>
            {isLoading && <LoadingComponent />}

            <CategoriesContent>
                {categories.map((category) => 
               <div key={category.id}>
                 <CategoryItem category={category} />
               </div>
            )} 
            </CategoriesContent>

        </CategoriesContainer>
    )
}

export default Categories;