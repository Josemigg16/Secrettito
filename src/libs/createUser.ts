export function createUser(
  body:
    | {
        name?: string | null | undefined
        email?: string | null | undefined
        image?: string | null | undefined
      }
    | undefined
) {
  try {
    const user = fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify(body),
    }).then(async (res) => {
      const data = await res.json()
      return data
    })
    return user
  } catch (error) {
    console.log("error")
  }
}
