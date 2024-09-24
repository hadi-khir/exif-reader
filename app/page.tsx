"use client"

import { Card, CardContent } from "@/components/ui/card";
import { ChangeEventHandler, useState } from "react";

export default function Home() {

  const [uploadedImage, setUploadedImage] = useState<File>();
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  const fileToDataString = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onerror = (error) => reject(error);
      reader.onload = () => resolve(reader.result as string);
    });
  };

  const handleImageUpload: ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {

    const files = event.target.files as FileList;
    const file = files[0];
    if (file) {
      setUploadedImage(file)

      try {
        const imgUrl = await fileToDataString(file);
        setImagePreviewUrl(imgUrl);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className="container mx-auto py-4">
      <h1 className="text-3xl font-bold text-center mb-6">Exif Reader</h1>
      <Card className="w-full mx-auto p-6 max-w-3xl">
        <CardContent>
          <div className="flex flex-col items-center justify-center rounded-lg p-8">
            <input
              type="file"
              className="focus:outline-none focus:ring"
              onChange={handleImageUpload}
              accept="image/*"
            />
          </div>
          {imagePreviewUrl && (
            <div className="mt-4">
              <img src={imagePreviewUrl} alt="Uploaded" className="max-w-full h-auto mx-auto" />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
