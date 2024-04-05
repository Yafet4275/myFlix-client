import React from "react";
import { Link, useNavigate } from 'react-router-dom';

export function NotFoundPage() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="flex flex-col gap-2">
      <h1>404 Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <button onClick={goBack}>Go back</button>
    </div>
  );
}