import { DiscussionEmbed } from "disqus-react";
import { useEffect, useState } from "react";
const DisqusComments = ({
  post,
  postURL,
}: {
  post: { id: string; title: string };
  postURL: string;
}) => {
  const [currentTheme, setTheme] = useState("dark");

  useEffect(() => {
    window.onstorage = () => {
      const theme = localStorage.getItem("theme");
    };

    return () => {};
  }, []);

  const disqusShortname = "kune-2";
  const disqusConfig = {
    url: postURL,
    identifier: post.id,
    title: post.title,
  };
  return (
    <div>
      <DiscussionEmbed
        key={currentTheme}
        shortname={disqusShortname}
        config={disqusConfig}
      />
    </div>
  );
};
export default DisqusComments;
