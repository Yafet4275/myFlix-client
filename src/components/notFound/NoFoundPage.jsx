import React from "react";
import { Link } from 'react-router-dom';

export function NotFoundPage(errorElement) {
  return (
    <div className="flex flex-col gap-2">
      404 Not Found
      <Link to="/login">Login page</Link>
    </div>
  );
}