import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import exif from "exif-js";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function extractExifData(file: File): Promise<Record<string, unknown>> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function (event) {
      const image = new Image();
      image.src = event.target?.result as string;
      image.onload = function () {
        try {
          // @ts-expect-error type error with exif library
          exif.getData(image, function () {
            // @ts-expect-error type error with exif library
            const exifData: Record<string, unknown> = exif.getAllTags(this);
            resolve(exifData);
          });
        } catch {
          reject("No EXIF data found");
        }
      };
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export function formatFileSize(bytes: number): string {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

  if (bytes === 0) return '0 Bytes';

  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const fileSize = parseFloat((bytes / Math.pow(1024, i)).toFixed(2));

  return `${fileSize} ${sizes[i]}`;
}