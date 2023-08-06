import BookDisplay from "../components/BookDisplay";
import BookSection from "../components/BookSection";
import ContentLayout from "../components/ContentLayout";

function HomePage() {
  return (
    <ContentLayout>
      <BookDisplay>
        <BookSection category={"Nonfiction"} />
      </BookDisplay>
    </ContentLayout>
  );
}

export default HomePage;
