import React from "react";

export default function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="animate-spin rounded-full h-20 w-20 border-t-8 border-cyan-700 border-solid"></div>
    </div>
  );
}
