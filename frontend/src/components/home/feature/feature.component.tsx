import { Post } from "../../../models/post";
import { useGetFeaturedListsQuery } from "../../../redux/apis/post.api";
import { formatDateShort } from "../../../utils/time-formate";
import LoadingAnimation from "../../loading/loading.component";
import SSProfile from "../../ui-component/ss-profile/ss-profile";
import { useNavigate } from "react-router-dom";
import BookmarkButton from "../../BookmarkButton";

import {
  FaTwitter,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa";

const FeatureComponent = () => {
  const { data, isLoading } = useGetFeaturedListsQuery(undefined);
  const navigate = useNavigate();

  const calculateReadingTime = (content: string): number => {
    if (!content) return 1;
    const words = content.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200));
  };

  if (isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <section className="mb-12 text-slate-100">
      <h2 className="mb-6 text-2xl font-bold tracking-tight text-slate-50 sm:text-3xl">
        Featured Posts
      </h2>

      <div className="grid gap-5 sm:grid-cols-2 lg:gap-6">
        {(data?.posts?.length ?? 0) > 0 ? (
          data?.posts?.map((post: Post) => {
            const postUrl = `${window.location.origin}/post/${post._id}`;

            return (
              <div
                key={post._id}
                onClick={() => navigate(`/post/${post._id}`)}
                className="motion-card story-panel group flex h-full cursor-pointer flex-col overflow-hidden rounded-lg hover:border-blue-400/35"
              >
                <div className="relative h-48 overflow-hidden sm:h-52">
                  <img
                    className="motion-image h-full w-full object-cover"
                    src={post.imageURL}
                    alt={post.title || "Featured Post"}
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                  <div>
                    <div className="mb-4 flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-center">
                        <SSProfile
                          name={post.author?.name || "Unknown User"}
                          size="h-8 w-8"
                        />
                        <div className="ml-3 min-w-0">
                          <p className="truncate text-sm font-semibold text-slate-300">
                            {post.author?.name || "Unknown User"}
                          </p>
                          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
                            <p className="text-xs text-slate-500">
                              {formatDateShort(post.createdAt)}
                            </p>
                            <span className="text-xs text-slate-600">•</span>
                            <p className="text-xs font-medium text-indigo-300">
                              {calculateReadingTime(post.content)} min read
                            </p>
                          </div>
                        </div>
                      </div>

                      <div onClick={(e) => e.stopPropagation()} className="relative z-10">
                        <BookmarkButton
                          storyId={post._id}
                          bookmarks={post.bookmarks}
                          className="rounded-full p-1.5 text-slate-400 transition-colors hover:bg-slate-700/40 hover:text-purple-300"
                        />
                      </div>
                    </div>

                    <h3 className="mb-2 text-xl font-bold leading-snug text-slate-100 transition-colors group-hover:text-blue-300">
                      {post.title}
                    </h3>

                    <p className="mb-5 line-clamp-2 leading-relaxed text-slate-400">
                      {post.content || ""}
                    </p>
                  </div>

                  <div className="mt-auto flex flex-col gap-4 border-t border-slate-700/70 pt-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <i className="far fa-heart"></i>
                        {post.likesCount ?? 0}
                      </span>
                      <span className="flex items-center gap-1">
                        <i className="far fa-comment"></i>
                        {post.commentsCount ?? 0}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-slate-400">
                      <a
                        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(post.title || "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Share on Twitter"
                        className="motion-icon hover:-translate-y-0.5 hover:text-sky-400"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaTwitter size={16} />
                      </a>

                      <a
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Share on LinkedIn"
                        className="motion-icon hover:-translate-y-0.5 hover:text-blue-500"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaLinkedin size={16} />
                      </a>

                      <a
                        href={`mailto:?subject=${encodeURIComponent(post.title || "")}&body=${encodeURIComponent(`${(post.content || "").slice(0, 120)}...\n\nRead more: ${postUrl}`)}`}
                        title="Share via Email"
                        className="motion-icon hover:-translate-y-0.5 hover:text-red-400"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaEnvelope size={16} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="story-panel rounded-lg px-4 py-5 text-slate-300">
            Featured posts are not available.
          </div>
        )}
      </div>
    </section>
  );
};

export default FeatureComponent;
