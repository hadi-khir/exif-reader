import { createUploadthing, FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
    productImage: f({
        image: { maxFileSize: "4MB", maxFileCount: 1 },
    }).onUploadComplete(async ({ metadata, file }) => {

        //@ts-expect-error metadata null error expected.
        const userId = (metadata).userId;
        console.log("Upload complete for userId:", userId);
        console.log("file url", file.url);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;