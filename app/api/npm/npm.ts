const NPM_API = `https://api.npmjs.org/downloads/point/last-month`

export async function getNpmPackage(packageName: string) {
  return fetch(`${NPM_API}/${packageName}`, {
    cache: 'no-store',
  })
}
