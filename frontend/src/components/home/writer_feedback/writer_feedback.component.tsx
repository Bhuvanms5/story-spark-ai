import React from "react";
import { useGetReviewsQuery } from "../../../redux/apis/review.api";
import { Review } from "../../../models/review";

const WriterFeedbackComponent = () => {
  const { data: feedbackData = [], isLoading } =
    useGetReviewsQuery({});

  if (isLoading) {
    return (
      <div className="text-center text-gray-400 py-10">
        Loading reviews...
      </div>
    );
  }

  return (
    <section className="story-section">
      <div className="story-page-shell">
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
          <h2 className="story-section-heading">
            What Our Writers Say
          </h2>

          <p className="story-section-copy mt-4">
            Hear from our community of writers about their experience
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {feedbackData.map((writer: Review, index: number) => (
            <div
              key={index}
              className="motion-card-subtle story-panel rounded-lg p-6 hover:border-blue-400/35"
            >
              <div className="flex items-center mb-4">
                <img
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-blue-300/25"
                  src={writer.imgSrc}
                  alt={writer.name}
                />

                <div className="ml-4 min-w-0">
                  <h4 className="truncate text-lg font-bold text-slate-200">
                    {writer.name}
                  </h4>

                  <p className="text-sm text-slate-500">
                    {writer.role}
                  </p>
                </div>
              </div>

              <p className="leading-relaxed text-slate-400 italic">
                &#34;{writer.feedback}&#34;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WriterFeedbackComponent;
