import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="container mx-auto py-4">
      <h1 className="text-3xl font-bold text-center mb-6">Exif Reader</h1>

      <Card className="w-full mx-auto p-6 max-w-3xl">
        <CardContent>
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-lg p-8">
            <input
              type="file"
              className="focus:outline-none focus:ring"
            />
          </div>
        </CardContent>
      </Card>
    </div>

  );
}
