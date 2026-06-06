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
 * Return a Cloudinary delivery URL tuned for the highest quality at native
 * resolution (up to 4K — Cloudinary never upscales, so the source file must
 * itself be 4K). `q_auto:best` keeps top quality; no width/height = no
 * downscaling. Non-Cloudinary URLs are returned unchanged.
 */
export function highQualityVideo(url) {
  if (!url || !url.includes('/upload/')) return url
  if (/\/upload\/(q_|vc_|w_|h_)/.test(url)) return url // already transformed
  return url.replace('/upload/', '/upload/q_auto:best,vc_auto/')
}

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
        // Surface Cloudinary's actual reason (e.g. "Upload preset must be
        // whitelisted for unsigned uploads") instead of a bare status code.
        let detail = ''
        try {
          detail = JSON.parse(xhr.responseText)?.error?.message || ''
        } catch {
          /* response wasn't JSON */
        }
        reject(new Error(`Cloudinary upload failed (${xhr.status})${detail ? `: ${detail}` : ''}`))
      }
    }
    xhr.onerror = () => reject(new Error('Cloudinary upload failed (network error)'))
    xhr.send(form)
  })
}
