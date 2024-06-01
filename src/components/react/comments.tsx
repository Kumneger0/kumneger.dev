import { DiscussionEmbed } from "disqus-react";
const DisqusComments = ({
  post,
  postURL,
}: {
  post: { id: string; title: string };
  postURL: string;
}) => {
  const disqusShortname = "kune-2";
  const disqusConfig = {
    url: postURL,
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
