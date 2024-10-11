
const cameraMap = new Map<string, string[]>([
    ["Apple", ["iPhone 12 Pro", "iPhone 14"]],
    ["Canon", ["EOS 80D", "PowerShot G7 X"]],
    ["DJI", ["Mavic Air 2", "Phantom 4 Pro"]],
    ["Fujifilm", ["X-T4", "X100V"]],
    ["GoPro", ["Hero 9 Black", "Hero 11 Black"]],
    ["Kodak", ["PixPro FZ43", "PixPro AZ401"]],
    ["Leica", ["Q2", "M10"]],
    ["Nikon", ["D850", "Z6"]],
    ["Panasonic", ["Lumix GH5", "Lumix S5"]],
    ["Ricoh", ["GR III", "Theta Z1"]],
    ["Samsung", ["Galaxy S21 Ultra", "NX1"]],
    ["Sony", ["Alpha A7 III", "RX100 VII"]]
]);

const getMakeAndModel = (cameraMap: Map<string, string[]>): { make: string; model: string } => {
    const makes = Array.from(cameraMap.keys());
    const randomMakeIndex = Math.floor(Math.random() * makes.length);
    const randomMake = makes[randomMakeIndex];
    const models = cameraMap.get(randomMake);

    if (models) {
        const randomModelIndex = Math.floor(Math.random() * models.length);
        const randomModel = models[randomModelIndex];
        return { make: randomMake, model: randomModel };
    } else {
        throw new Error("No models found for the selected make.");
    }
}

const getRandomNumber = (min: number, max: number) => Math.random() * (max - min) + min;

const getRandomInt = (min: number, max: number) => Math.floor(getRandomNumber(min, max));

const generateISOSpeedRatings = () => getRandomInt(20, 800);

const generateFNumber = () => parseFloat(getRandomNumber(1.4, 16).toFixed(1));

const generateExposureTime = () => getRandomNumber(0.0001, 0.0333);

const generateDateTime = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(getRandomInt(1, 13)).padStart(2, '0');
    const day = String(getRandomInt(1, 29)).padStart(2, '0');
    const hours = String(getRandomInt(0, 24)).padStart(2, '0');
    const minutes = String(getRandomInt(0, 60)).padStart(2, '0');
    const seconds = String(getRandomInt(0, 60)).padStart(2, '0');
    return `${year}:${month}:${day} ${hours}:${minutes}:${seconds}`;
};

const generateGPSCoordinate = () => [getRandomInt(0, 90), getRandomInt(0, 60), getRandomNumber(0, 60).toFixed(2)];

const generateGPSAltitude = () => parseFloat(getRandomNumber(0, 10000).toFixed(6));

const generateGPSDirection = () => parseFloat(getRandomNumber(0, 360).toFixed(2));

const generateResolution = () => getRandomInt(72, 300);

const generateShutterSpeedValue = () => parseFloat(getRandomNumber(1, 12).toFixed(6));

const generateBrightnessValue = () => parseFloat(getRandomNumber(-5, 10).toFixed(6));

const generateApertureValue = () => parseFloat(getRandomNumber(1.4, 22).toFixed(6));

const generateFocalLength = () => parseFloat(getRandomNumber(4, 200).toFixed(1));

const generatePixelDimension = () => getRandomInt(2000, 6000);

const generateSubjectArea = () => [getRandomInt(1000, 3000), getRandomInt(1000, 3000), getRandomInt(1000, 3000), getRandomInt(1000, 3000)];

const generateGPSSpeed = () => parseFloat(getRandomNumber(0, 100).toFixed(6));

export const generateExifData = () => {
    const { make, model } = getMakeAndModel(cameraMap);

    return {
        Make: make,
        Model: model,
        Orientation: 1,
        XResolution: generateResolution(),
        YResolution: generateResolution(),
        ResolutionUnit: 2,
        Software: "16.7.8",
        DateTime: generateDateTime(),
        undefined: 25,
        YCbCrPositioning: 1,
        ExifIFDPointer: getRandomInt(200, 500),
        GPSInfoIFDPointer: getRandomInt(1000, 3000),
        ExposureTime: generateExposureTime(),
        FNumber: generateFNumber(),
        ExposureProgram: "Normal program",
        ISOSpeedRatings: generateISOSpeedRatings(),
        ExifVersion: "0232",
        DateTimeOriginal: generateDateTime(),
        DateTimeDigitized: generateDateTime(),
        ComponentsConfiguration: "YCbCr",
        ShutterSpeedValue: generateShutterSpeedValue(),
        ApertureValue: generateApertureValue(),
        BrightnessValue: generateBrightnessValue(),
        ExposureBias: 0,
        MeteringMode: "Pattern",
        Flash: "Flash did not fire, compulsory flash mode",
        FocalLength: generateFocalLength(),
        SubjectArea: generateSubjectArea(),
        SubsecTimeOriginal: String(getRandomInt(0, 1000)),
        SubsecTimeDigitized: String(getRandomInt(0, 1000)),
        FlashpixVersion: "0100",
        ColorSpace: 65535,
        PixelXDimension: generatePixelDimension(),
        PixelYDimension: generatePixelDimension(),
        SensingMethod: "One-chip color area sensor",
        SceneType: "Directly photographed",
        ExposureMode: 0,
        WhiteBalance: "Auto white balance",
        FocalLengthIn35mmFilm: getRandomInt(18, 200),
        SceneCaptureType: "Standard",
        GPSLatitudeRef: "N",
        GPSLatitude: generateGPSCoordinate(),
        GPSLongitudeRef: "E",
        GPSLongitude: generateGPSCoordinate(),
        GPSAltitudeRef: 0,
        GPSAltitude: generateGPSAltitude(),
        GPSSpeedRef: "K",
        GPSSpeed: generateGPSSpeed(),
        GPSImgDirectionRef: "T",
        GPSImgDirection: generateGPSDirection(),
        GPSDestBearingRef: "T",
        GPSDestBearing: generateGPSDirection(),
        thumbnail: {
            Compression: 6,
            XResolution: generateResolution(),
            YResolution: generateResolution(),
            ResolutionUnit: 2,
            JpegIFOffset: getRandomInt(1000, 5000),
            JpegIFByteCount: getRandomInt(500, 5000),
            blob: {}
        }
    };
};
