import ContentLayout from "../components/ContentLayout";
import BookDescription from "../components/BookDescription";
import apiRequest from "../apiRequest";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function BookDetailPage() {
  const [book, setBook] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const [errMsg, setErrorMsg] = useState("");
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
