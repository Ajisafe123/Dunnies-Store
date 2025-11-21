import React from "react";

interface LoaderProps {
  text?: string;
  fullScreen?: boolean;
}

export default function Loader({ text, fullScreen = false }: LoaderProps) {
  const content = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="loader"></div>
      {text && <p className="text-gray-600 text-sm mt-4">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
        {content}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-12">{content}</div>
  );
}
