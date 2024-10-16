import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { App } from './App.tsx'
import { Head } from './components/shared/Head.tsx'
import { PROJECT_NAME } from './constants/project.ts'
import { setThemeWithoutRender } from './hooks/useTheme.ts'
import './styles/index.css'

const rootDom = document.getElementById('root')
if (rootDom === null) throw new Error('root element not found')

setThemeWithoutRender()

createRoot(rootDom).render(
  <StrictMode>
    <HelmetProvider>
      <Head title={PROJECT_NAME} />
      <App />
    </HelmetProvider>
  </StrictMode>,
)
