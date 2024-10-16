import { honoClient } from 'backend/src/client'
import { env } from './envValues'

const backendUrl = new URL(env.VITE_BACKEND_BASE_URL).toString()

export const apiClient = honoClient(backendUrl)
