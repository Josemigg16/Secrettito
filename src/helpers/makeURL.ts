export default function makeURL (url: string | undefined) {
  return `${window.location.origin}/${url}`
}
