export const SERVER_PORT = import.meta.env.VITE_SERVER_PORT || 5000
export const SERVER_HOST = import.meta.env.VITE_SERVER_HOST || 'http://127.0.0.1'
console.log('SERVER_HOST:', SERVER_HOST)
console.log('SERVER_PORT:', SERVER_PORT)

export const POCKETBASE_URL =
  import.meta.env.VITE_POCKETBASE_URL || 'http://localhost:8090'
