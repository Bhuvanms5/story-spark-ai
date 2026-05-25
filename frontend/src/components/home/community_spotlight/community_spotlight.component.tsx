import { useGetLatestListsQuery } from "../../../redux/apis/post.api";
import { Post } from "../../../models/post";
import LoadingAnimation from "../../loading/loading.component";
import SSProfile from "../../ui-component/ss-profile/ss-profile";
import BookmarkButton from "../../BookmarkButton";
import { useNavigate } from "react-router-dom";
import { useToggleReactionMutation } from "../../../redux/apis/reaction.api";
import toast from "react-hot-toast";

const CommunitySpotlightComponent = () => {
  const { data, isLoading } = useGetLatestListsQuery(undefined);
  const navigate = useNavigate();
  const [toggleReaction] = useToggleReactionMutation();

  const calculateReadingTime = (content: string): number => {
    if (!content) return 1;
    const words = content.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200));
  };

  const handleLike = async (
    e: React.MouseEvent,
    postId: string
  ) => {
    e.stopPropagation();
    try {
      await toggleReaction({ postId }).unwrap();
    } catch (error) {
      console.error(error);
      toast.error("You need to login to perform this action");
    }
  };

  if (isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <section className="story-section">
      <div className="story-page-shell">
        <div className="mb-8 max-w-2xl">
          <h2 className="story-section-heading">
            Community Spotlight
          </h2>
          <p className="story-section-copy mt-3">
            Top stories handpicked from our community
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {(data?.posts?.length ?? 0) > 0 ? (
            data?.posts?.slice(0, 6).map((post: Post) => (
              <div
                key={post._id}
                onClick={() => navigate(`/post/${post._id}`)}
                className="motion-card-subtle story-panel group flex cursor-pointer flex-col justify-between rounded-lg p-5 hover:border-blue-400/35 sm:p-6"
              >
                <div>
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center">
                      <SSProfile name={post.author.name} size="h-9 w-9" />
                      <div className="ml-3 min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-300">
                          {post.author.name}
                        </p>
                        <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
                          <p className="text-xs text-slate-500">
                            {new Date(post.publishedAt).toLocaleDateString()}
                          </p>
                          <span className="text-xs text-slate-600">•</span>
                          <span className="text-xs font-medium text-indigo-300">
                            {calculateReadingTime(post.content)} min read
                          </span>
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
                  <h3 className="mb-2 text-lg font-bold leading-snug text-slate-100 transition-colors group-hover:text-blue-300">
                    {post.title}
                  </h3>
                  <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-slate-400">
                    {post.content}
                  </p>
                </div>

                <div className="mt-auto flex flex-col gap-4 border-t border-slate-700/70 pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <i className="far fa-eye"></i> {post.viewsCount}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => handleLike(e, post._id)}
                      className="motion-icon flex items-center gap-1 text-slate-500 hover:text-red-400"
                    >
                      <i className="far fa-heart"></i>
                      {post.likesCount}
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {post.topic.slice(0, 2).map((topic) => (
                      <span
                        key={topic._id}
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${topic.color}`}
                      >
                        {topic.title}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="story-panel rounded-lg px-4 py-4 text-slate-300 md:col-span-2 lg:col-span-3">
              No spotlight stories yet.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default CommunitySpotlightComponent;
