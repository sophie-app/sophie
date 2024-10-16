import { env } from './envValues'
import { honoClient } from 'backend/src/client'

const backendUrl = new URL(env.VITE_BACKEND_BASE_URL).toString()

export const apiClient = honoClient(backendUrl)
