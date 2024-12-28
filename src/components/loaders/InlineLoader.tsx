import React from "react";

export default function InlineLoader() {
  return (
    <span className="flex items-center justify-center space-x-2 p-2">
      <span className="w-3 h-3 bg-white rounded-full animate-bounce"></span>
      <span className="w-3 h-3 bg-white rounded-full animate-bounce delay-150"></span>
      <span className="w-3 h-3 bg-white rounded-full animate-bounce delay-300"></span>
    </span>
  );
}
