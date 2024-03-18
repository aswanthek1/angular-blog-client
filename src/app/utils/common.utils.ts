export const makePreviewImage = (image: File): string => {
    // if(!image) return;
    return URL.createObjectURL(image)
}