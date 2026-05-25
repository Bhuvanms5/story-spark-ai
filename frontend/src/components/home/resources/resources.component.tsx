import React from "react";
import { Link } from "react-router-dom";

const resources = [
  {
    icon: "fas fa-magic",
    title: "AI Writing Assistant",
    description:
      "Get smart suggestions and overcome writer's block with AI-powered assistance.",
    linkText: "Learn more",
    link: "/writing-assistant",
  },
  {
    icon: "fas fa-book",
    title: "Writing Templates",
    description:
      "Access professional templates for various writing styles and formats.",
    linkText: "Browse templates",
    link: "/templates",
  },
  {
    icon: "fas fa-users",
    title: "Writing Community",
    description:
      "Connect with fellow writers, share feedback, and grow together.",
    linkText: "Join now",
    link: "/community",
  },
];

const ResourceComponent = () => {
  return (
    <section className="story-section">
      <div className="story-page-shell">
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
          <h2 className="story-section-heading">
            Writing Tools &amp; Resources
          </h2>
          <p className="story-section-copy mt-4">
            Enhance your writing with our powerful tools and resources
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {resources.map((resource, index) => (
            <div
              key={index}
              className="motion-card-subtle story-panel group flex h-full flex-col rounded-lg p-6 hover:border-blue-400/35 sm:p-7"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg border border-blue-400/20 bg-blue-500/10 text-blue-300 transition-transform duration-300 group-hover:scale-105">
                <i className={`${resource.icon} text-2xl`}></i>
              </div>
              <h3 className="mb-3 text-xl font-bold text-slate-100 transition-colors group-hover:text-blue-300">
                {resource.title}
              </h3>
              <p className="mb-6 flex-grow leading-relaxed text-slate-400">
                {resource.description}
              </p>
              {resource.link.startsWith("/") ? (
                <Link
                  to={resource.link}
                  className="inline-flex items-center font-semibold text-blue-300 transition-colors hover:text-blue-200 group/link"
                >
                  {resource.linkText}
                  <i className="fa-solid fa-arrow-right ml-2 group-hover/link:translate-x-1 transition-transform"></i>
                </Link>
              ) : (
                <a
                  href={resource.link}
                  className="inline-flex items-center font-semibold text-blue-300 transition-colors hover:text-blue-200 group/link"
                >
                  {resource.linkText}
                  <i className="fa-solid fa-arrow-right ml-2 group-hover/link:translate-x-1 transition-transform"></i>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResourceComponent;
