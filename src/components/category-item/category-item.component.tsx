import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";

// Utilities
import Category from "../../types/category.type";

// Styles
import { CategoryItemContainer, CategoryName } from "./category-item.style";

interface CategoryItemProps {
    category: Category;
}

const CategoryItem: FunctionComponent<CategoryItemProps> = ( { category }) => {
    const navigate = useNavigate();

    const handleExploreClick = () => {
        navigate(`/category/${category.id}`);
    }

    return (
        <CategoryItemContainer backgroundImage={category.imageUrl} >
            <CategoryName onClick={handleExploreClick}>
                <p>{category.displayName}</p>
                <p>Explore</p>

            </CategoryName>
        </CategoryItemContainer>
    )

}

export default CategoryItem;