import React, { useEffect } from "react";
import axios from "axios";

function LandingPage() {
  useEffect(() => {
    axios
      .get("/api/hello")
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <h1>랜딩페이징</h1>
    </div>
  );
}

export default LandingPage;
