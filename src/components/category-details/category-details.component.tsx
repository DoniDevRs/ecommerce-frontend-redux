import { FunctionComponent, useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { BiChevronLeft } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

// Utilities
import { db } from "../../config/firebase.config";
import { categoryConverter } from "../../converters/firestore.converter";
import Category from "../../types/category.type";

// Components
import LoadingComponent from "../loading/loading.component";
import ProductItem from "../product-item/product-item.component";

//Styles
import { 
  Container, 
  CategoryTitle, 
  IconContainer, 
  ProductsContainer } from "./category-details.styles";
interface CategoryDetailsProps {
    categoryId: string
}       

const CategoryDetails: FunctionComponent<CategoryDetailsProps> = ({ categoryId }) => {
    const [category, setCategory] = useState<Category | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('/');
    }

    useEffect(() => { 
        const fetchCategory = async () => {
          try {
            setIsLoading(true);
            const querySnapshot = await getDocs(
              query(
                collection(db, "categories").withConverter(categoryConverter),
                where("id", "==", categoryId)
              )
            );

            const category = querySnapshot.docs[0]?.data();

            setCategory(category);


          } catch (error) {
            console.error("Error fetching category details:", error);
          } finally {
            setIsLoading(false);
          }
        };

        fetchCategory();
    }, [categoryId]);

    if (isLoading) return <LoadingComponent />
    
    return (
        <Container>
          <CategoryTitle>
            <IconContainer onClick={handleBackClick}>
              <BiChevronLeft size={36} />
            </IconContainer>
                <p>Explorar {category?.displayName}</p>
          </CategoryTitle>

          <ProductsContainer>
            {category?.products.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </ProductsContainer>
        </Container>
    ) 
}

export default CategoryDetails;