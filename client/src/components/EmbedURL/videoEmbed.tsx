import React from "react";

type VideoEmbedProps = {
  embedCode: string;
};

const VideoEmbed: React.FC<VideoEmbedProps> = ({ embedCode }) => {
  return (
    <div
      style={{ borderRadius: "12px", overflow: "hidden" }}
      dangerouslySetInnerHTML={{ __html: embedCode }}
    />
  );
};

export default VideoEmbed;
