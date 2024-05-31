import { DiscussionEmbed } from "disqus-react";
const DisqusComments = ({
  post,
}: {
  post: { url: string; id: string; title: string };
}) => {
  const disqusShortname = "your-disqus-shortname";
  const disqusConfig = {
    url: "https://your-site-url/post-slug",
    identifier: post.id, // Single post id
    title: post.title, // Single post title
  };
  return (
    <div>
      <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    </div>
  );
};
export default DisqusComments;
