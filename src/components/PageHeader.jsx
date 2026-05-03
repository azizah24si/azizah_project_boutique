import React from "react";

export default function PageHeader({ title, breadcrumb, children }) {
    return (
        <div id="pageheader-container" className="flex items-center justify-between p-4 mb-4">
            <div id="pageheader-left" className="flex flex-col">
                <h1 id="page-title" className="text-3xl font-bold text-gray-900">
                    {title}
                </h1>
                <div id="breadcrumb-links" className="mt-2 text-sm text-gray-400 font-medium">
                    {Array.isArray(breadcrumb) ? breadcrumb.join(" / ") : breadcrumb}
                </div>
            </div>

            <div id="pageheader-right">
                {children}
            </div>
        </div>
    );
}