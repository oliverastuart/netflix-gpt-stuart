import React from "react";

function SomethingWentWrong({
  message = "Oops! We couldn’t fetch any results.",
}) {
  return (
    <div className="w-full min-h-[20vh] px-4 py-8 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center max-w-md">
        <h2 className="text-xl font-semibold text-red-600 dark:text-red-400">
          {message}
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          This might be due to a network issue, no results found for your
          search, or the Gemini API quota being exceeded. Please try again in a
          while.
        </p>
      </div>
    </div>
  );
}

export default SomethingWentWrong;
