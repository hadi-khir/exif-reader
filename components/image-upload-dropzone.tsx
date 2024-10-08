"use client"

import { useTheme } from "next-themes";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface ImageUploadDropzoneProps {
  onFileSelect: (files: File[]) => void;
}

export default function ImageUploadDropzone({
  onFileSelect,
}: ImageUploadDropzoneProps) {

  const { theme, systemTheme } = useTheme();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (onFileSelect) {
        onFileSelect(acceptedFiles);
      }
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    maxFiles: 1,
  });

  const SvgIcon = ({ fill, className }: { fill: string; className?: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="48px"
      viewBox="0 0 24 24"
      width="48px"
      fill={fill}
      className={className}
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M18 20H4V6h9V4H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-9h-2v9zm-7.79-3.17l-1.96-2.36L5.5 18h11l-3.54-4.71zM20 4V1h-2v3h-3c.01.01 0 2 0 2h3v2.99c.01.01 2 0 2 0V6h3V4h-3z" />
    </svg>
  );

  const getSvgIcon = () => {
    const isDark = theme === "dark" || (theme === "system" && systemTheme === "dark");
    const fill = isDark ? "#ffffff" : "#000000";
    const className = isDark ? "text-white" : "text-black";

    return <SvgIcon fill={fill} className={className} />;
  };

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer 
        ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"}
      `}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center">
        {getSvgIcon()}
        <p className="mt-2">Choose an image or drag and drop</p>
        <button
          type="button"
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Choose Image
        </button>
      </div>
    </div>
  );
}
