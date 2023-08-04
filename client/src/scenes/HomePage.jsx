import BookDisplay from "../components/BookDisplay";
import BookSection from "../components/BookSection";
import ContentLayout from "../components/ContentLayout";
import InfoMessage from "../components/InfoMessage";

import { useState, useEffect } from "react";

function HomePage() {
  const [errorMsg, setErrorMsg] = useState(null);

  return (
    <ContentLayout>
      {errorMsg && <InfoMessage text={errorMsg} type={"error"} />}
      <BookDisplay>
        <BookSection category={"Nonfiction"} />
      </BookDisplay>
    </ContentLayout>
  );
}

export default HomePage;
