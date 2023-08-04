import { useParams } from "react-router-dom";
import ContentLayout from "../components/ContentLayout";
import BookSection from "../components/BookSection";
import BookDisplay from "../components/BookDisplay";

function CategoryPage() {
  const { category, type } = useParams();

  return (
    <ContentLayout>
      <BookDisplay>
        <BookSection key={category} category={category} />
      </BookDisplay>
    </ContentLayout>
  );
}

export default CategoryPage;
