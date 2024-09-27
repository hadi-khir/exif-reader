"use client"

import exif from "exif-js";
import { Card, CardContent } from "@/components/ui/card";
import { ChangeEventHandler, useState } from "react";

export default function Home() {

  const [uploadedImage, setUploadedImage] = useState<File>();
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [exifData, setExifData] = useState(null);

  const extractExifData = (file: File) => {


    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = function (event) {
        const image = new Image();
        image.src = event.target?.result as string;
        image.onload = function () {
          
          //@ts-ignore
          exif.getData(image, () => {
            const exifData = exif.getAllTags(this);
            resolve(exifData);
          });
        };
      }
      reader.onerror = reject;
      reader.readAsDataURL(file);
    })
  }

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

        const exif: any = await extractExifData(file);
        setExifData(exif);
      } catch (error) {
        console.log(error);
      }
    }
  }

  console.log(exifData);


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


          {exifData && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <h2 className="text-xl font-semibold">Image EXIF Data</h2>
              <pre className="whitespace-pre-wrap text-sm">
                {JSON.stringify(exifData, null, 2)}
              </pre>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
