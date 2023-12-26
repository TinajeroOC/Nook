export function getHostUrl() {
  let url =
    process.env.NEXT_PUBLIC_SITE_URL ?? process?.env?.NEXT_PUBLIC_VERCEL_URL ?? 'localhost:3000/'

  url = url.replace(/(http:\/\/|https:\/\/)/g, '')

  return url
}
