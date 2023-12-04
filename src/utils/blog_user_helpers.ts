export async function getCurrentUser() {
    try {
        const response = await fetch('/api/get_user')
        const data = await response.json()
        return data

    } catch (error) {
        console.log(error)
    }
}