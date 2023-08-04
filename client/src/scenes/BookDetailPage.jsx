import ContentLayout from "../components/ContentLayout";
import BookDescription from "../components/BookDescription";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

function BookDetailPage() {
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ContentLayout>
      <BookDescription id={id} />
    </ContentLayout>
  );
}

export default BookDetailPage;
