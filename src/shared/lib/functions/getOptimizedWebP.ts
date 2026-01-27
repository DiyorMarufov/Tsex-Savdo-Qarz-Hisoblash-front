import imageCompression from "browser-image-compression";

const base64ToFile = (base64: string, filename: string): File => {
  const arr = base64.split(",");
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) u8arr[n] = bstr.charCodeAt(n);
  return new File([u8arr], filename, { type: mime });
};

export const getOptimizedWebP = async (
  fileOrBase64: any,
  filename: string,
): Promise<File> => {
  const file =
    typeof fileOrBase64 === "string"
      ? base64ToFile(fileOrBase64, filename)
      : fileOrBase64;

  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    fileType: "image/webp",
    initialQuality: 0.8,
    preserveExif: false,
  };

  try {
    const compressedBlob = await imageCompression(file, options);
    const newFileName = filename.replace(/\.[^/.]+$/, "") + ".webp";
    return new File([compressedBlob], newFileName, { type: "image/webp" });
  } catch (error) {
    return file;
  }
};
