// Unsigned client-side upload to Cloudinary. No SDK needed — we POST the file
// to Cloudinary's REST endpoint using an *unsigned* upload preset, so no secret
// key is ever exposed in the browser.
//
// Setup (one time): Cloudinary Dashboard → Settings → Upload → Add upload preset
//   • Signing Mode: Unsigned
//   • Copy the preset name into VITE_CLOUDINARY_UPLOAD_PRESET
//   • Copy your cloud name into VITE_CLOUDINARY_CLOUD_NAME

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

export const isCloudinaryConfigured = Boolean(CLOUD_NAME && UPLOAD_PRESET)

/**
 * Upload a single File/Blob to Cloudinary.
 * @param {File} file
 * @param {(pct:number)=>void} [onProgress] optional 0–100 progress callback
 * @returns {Promise<{url:string, publicId:string, format:string, bytes:number}>}
 */
export function uploadToCloudinary(file, onProgress) {
  if (!isCloudinaryConfigured) {
    return Promise.reject(
      new Error('Cloudinary is not configured. Set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET in .env')
    )
  }

  const endpoint = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`
  const form = new FormData()
  form.append('file', file)
  form.append('upload_preset', UPLOAD_PRESET)

  // XHR (not fetch) so we can report upload progress.
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', endpoint)

    xhr.upload.onprogress = (e) => {
      if (onProgress && e.lengthComputable) {
        onProgress(Math.round((e.loaded / e.total) * 100))
      }
    }

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const res = JSON.parse(xhr.responseText)
        resolve({
          url: res.secure_url,
          publicId: res.public_id,
          format: res.format,
          bytes: res.bytes,
        })
      } else {
        reject(new Error(`Cloudinary upload failed (${xhr.status})`))
      }
    }
    xhr.onerror = () => reject(new Error('Cloudinary upload failed (network error)'))
    xhr.send(form)
  })
}
