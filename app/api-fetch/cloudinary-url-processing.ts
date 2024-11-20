export function processCloudinaryUrl(url: string, width: number, height: number, type: string) {
  const splitUrl = url.split("/");
  const publicId = splitUrl[splitUrl.length - 1].split(".")[0];
  return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/w_${width},h_${height},c_fill/${type}/${publicId}.jpg`;
}