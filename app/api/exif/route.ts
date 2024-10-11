import { NextResponse } from "next/server";
import { generateExifData } from "./exif-service";

export async function GET() {

    return NextResponse.json(generateExifData());
}
