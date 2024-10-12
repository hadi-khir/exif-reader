"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import ImageUploadDropzone from "@/components/image-upload-dropzone";
import { ModeToggle } from "@/components/mode-toggle";
import ExifDataDisplay from "@/components/exif-data-display";
import { extractExifData, formatFileSize } from "@/lib/utils";
import Image from "next/image";

export default function Home() {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>("");
  const [exifData, setExifData] = useState<Record<string, unknown> | null>(
    null
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [filename, setFilename] = useState("");
  const [fileSize, setFileSize] = useState(Number);

  // State for mock EXIF data
  const [mockExifData, setMockExifData] = useState<Record<string, unknown> | null>(null);

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
      setFileSize(file.size);
    }
  };

  const fetchMockExifData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/exif');
      const data = await response.json();
      setMockExifData(data);
    } catch (error) {
      setErrorMessage(`Error fetching mock EXIF data: ${error}`);
    } finally {
      setLoading(false);
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
                <p>
                  File size: <strong>{formatFileSize(fileSize)}</strong>
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
              <Image
                src={imagePreviewUrl}
                alt="Uploaded Preview"
                className="max-w-full h-auto mx-auto"
              />
            </div>
          )}

          {!exifData && (
            <div className="mt-4 p-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">What is EXIF Data?</h2>
              <p className="mb-4">
                EXIF (Exchangeable Image File Format) data is metadata embedded
                in photos taken by digital cameras. It includes information like
                the camera settings, the date and time the photo was taken, the
                camera model, and sometimes even the GPS location where the
                photo was captured.
              </p>

              <hr className="my-4" />

              <h2 className="text-lg font-semibold mt-4">Privacy by default</h2>
              <p className="mt-2">
                This application runs entirely in your browser, ensuring that
                your images and their metadata never leave your device. All
                processing is done locally, keeping your data private and
                secure.
              </p>
            </div>
          )}

          {/* Button to generate mock EXIF data */}
          {
            !exifData &&
            <div className="mt-6 text-center">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                onClick={fetchMockExifData}
                disabled={loading}
              >
                {loading ? "Generating..." : "Generate Mock EXIF Data"}
              </button>
            </div>
          }

          {/* Display EXIF Data */}
          {exifData && !loading && (
            <div className="mt-4 p-4 rounded-lg">
              <ExifDataDisplay exifData={exifData} />
            </div>
          )}

          {/* Display Mock EXIF Data */}
          {mockExifData && !loading && !exifData && (
            <div className="mt-4 p-4 rounded-lg">
              <ExifDataDisplay exifData={mockExifData} />
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
