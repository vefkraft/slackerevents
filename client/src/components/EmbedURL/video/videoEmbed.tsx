import React from "react";

type Props = {
  embedCode: string;
};

const toEmbedUrl = (url: string) => {
  if (url.includes("watch?v=")) {
    const id = url.split("v=")[1].split("&")[0];
    return `https://www.youtube.com/embed/${id}`;
  }
  if (url.includes("youtu.be/")) {
    const id = url.split("youtu.be/")[1].split("?")[0];
    return `https://www.youtube.com/embed/${id}`;
  }
  return url;
};

const VideoEmbed: React.FC<Props> = ({ embedCode }) => {
  const baseUrl = toEmbedUrl(embedCode);
  const separator = baseUrl.includes("?") ? "&" : "?";
  const finalUrl = `${baseUrl}${separator}autoplay=1&controls=0&mute=1&rel=0`;

  return (
   <div className="aspect-video w-full relative">
      <iframe
        src={finalUrl}
        title="YouTube video"
        allow="autoplay; encrypted-media"
        allowFullScreen
        className="w-full h-full"
      />
      <div className="absolute top-0 left-0 w-full h-full z-10 pointer-events-auto bg-transparent" />
    </div>


  );
};

export default VideoEmbed;
