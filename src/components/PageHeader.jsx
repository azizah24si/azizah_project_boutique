import React from "react";

export default function PageHeader({
  title,
  breadcrumb,
  children,
}) {
  return (
    <div
      id="pageheader-container"
      className="flex items-center justify-between mb-6"
    >

      {/* LEFT */}
      <div id="pageheader-left">

        <p
          id="breadcrumb-links"
          className="text-sm text-gray-400 font-medium"
        >
          {Array.isArray(breadcrumb)
            ? breadcrumb.join(" / ")
            : breadcrumb}
        </p>

        <h1
          id="page-title"
          className="text-2xl font-bold text-gray-700 mt-1"
        >
          {title}
        </h1>

      </div>

      {/* RIGHT */}
      <div id="pageheader-right">
        {children}
      </div>

    </div>
  );
}