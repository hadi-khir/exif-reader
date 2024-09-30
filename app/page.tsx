"use client";

import exif from "exif-js";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import ImageUploadDropzone from "@/components/image-dropzone";
import { ModeToggle } from "@/components/mode-toggle";

export default function Home() {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>("");
  const [exifData, setExifData] = useState<Record<string, unknown> | null>(
    null
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [filename, setFilename] = useState("");

  // Extract EXIF data function with proper return type
  const extractExifData = (file: File): Promise<Record<string, unknown>> => {
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

  // Convert file to Data URL for image preview
  const fileToDataString = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onerror = (error) => reject(error);
      reader.onload = () => resolve(reader.result as string);
    });
  };

  const handleImageUpload = async (files: File[]) => {
    const file = files[0];
    if (file) {
      setUploadedImage(file);
      setErrorMessage(null);
      setFilename(file.name);
    }
  };

  useEffect(() => {
    const processImage = async () => {
      if (uploadedImage) {
        setLoading(true);
        try {
          const imgUrl = await fileToDataString(uploadedImage);
          setImagePreviewUrl(imgUrl);

          const exif: Record<string, unknown> = await extractExifData(
            uploadedImage
          );
          setExifData(exif);
        } catch {
          setExifData(null);
          setErrorMessage("Unable to extract EXIF data or no EXIF data found.");
        } finally {
          setLoading(false);
        }
      }
    };

    processImage();
  }, [uploadedImage]);

  return (
    <div className="container mx-auto py-4">
      <div className="w-full max-w-3xl mx-auto">
        <div className="flex justify-between p-6 items-center mb-6">
          <h1 className="text-3xl font-bold text-center">EXIF Reader</h1>
          <ModeToggle />
        </div>
      </div>
      <Card className="w-full mx-auto border-gray-300 p-6 max-w-3xl">
        <CardContent>
          <div className="flex flex-col items-center justify-center rounded-lg border-gray-300 p-8">
            <ImageUploadDropzone onFileSelect={handleImageUpload} />

            {/* Display filename */}
            {filename && (
              <div className="mt-4">
                <p>
                  File uploaded: <strong>{filename}</strong>
                </p>
              </div>
            )}
          </div>

          {/* Display loading spinner */}
          {loading && (
            <div className="mt-4 text-center">
              <p>Loading EXIF data...</p>
            </div>
          )}

          {/* Display image preview */}
          {imagePreviewUrl && (
            <div className="mt-4">
              <img
                src={imagePreviewUrl}
                alt="Uploaded Preview"
                className="max-w-full h-auto mx-auto"
              />
            </div>
          )}

          {/* Display EXIF Data */}
          {exifData && !loading && (
            <div className="mt-4 p-4 rounded-lg">
              <h2 className="text-xl font-semibold">Image EXIF Data</h2>
              <pre className="whitespace-pre-wrap text-sm">
                {JSON.stringify(exifData, null, 2)}
              </pre>
            </div>
          )}

          {/* Error Message */}
          {errorMessage && !loading && (
            <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
              <p>{errorMessage}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
