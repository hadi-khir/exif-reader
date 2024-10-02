# EXIF Data Reader

This is a simple EXIF data reader that runs entirely on the client. It allows users to upload an image and view its EXIF metadata directly in their browser. The application does not send any data to a server, ensuring user privacy.

## Features

    - Client-side processing: The image and its metadata are processed entirely in the browser.
    - EXIF data extraction: Automatically reads and displays EXIF metadata from uploaded images (such as camera model, date taken, image orientation, etc.).
    - Simple UI: Users can drag and drop an image or select one via the upload button.

## How to Use

    - Clone the repository: git clone https://github.com/hadi-khir/exif-reader.git cd exif-reader

    - run `pnpm install` followed by `pnpm run dev`.

    - Upload an image by clicking the upload button or dragging and dropping an image into the designated area.

    - View the extracted EXIF data on the webpage.