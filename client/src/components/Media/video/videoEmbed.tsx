"use client";
// ------------ Imports ---------------
import React from "react";

type Props = {
  src: string;
};

const VideoPlayer: React.FC<Props> = ({ src }) => (
  <div className="aspect-video w-full relative">
    <video
      src={src}
      controls
      autoPlay
      muted
      className="w-full h-full"
      style={{ objectFit: "cover" }}
    />
  </div>
);

export default VideoPlayer;
