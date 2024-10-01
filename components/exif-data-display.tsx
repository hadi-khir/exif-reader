import { useState } from 'react';

interface ExifDataProps {
  exifData: Record<string, unknown> | null;
}

export default function ExifDataDisplay({ exifData }: ExifDataProps) {
  const [showRawJson, setShowRawJson] = useState(false);

  if (!exifData || Object.keys(exifData).length === 0) {
    return <p>No EXIF data available.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4">Image EXIF Data</h2>

      {/* Toggle Button to Show Raw JSON */}
      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md"
        onClick={() => setShowRawJson((prev) => !prev)}
      >
        {showRawJson ? 'Hide Raw JSON' : 'Show Raw JSON'}
      </button>

      {/* Show Raw JSON if toggled */}
      {showRawJson ? (
        <pre className="p-4 text-sm rounded-md overflow-x-auto">
          {JSON.stringify(exifData, null, 2)}
        </pre>
      ) : (
        <table className="table-auto text-left min-w-full max-w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Key</th>
              <th className="px-4 py-2">Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(exifData).map(([key, value], index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{key}</td>
                <td className="border px-4 py-2">
                  {typeof value === 'object' && value !== null ? JSON.stringify(value) : String(value)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
