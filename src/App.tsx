import { useState } from 'react'
import Button from './components/Button'
import './App.css'
import BannerPreview from './components/BannerPreview'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="bg-purple-200">
        <BannerPreview />
      <header className="App-header">
        <p>Hello Vite + React!</p>
        <p>
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p className="flex gap-3">
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button text="Learn React" />
          </a>
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          ><Button text="Vite Docs" />

          </a>
        </p>
      </header>
    </div>
  )
}

export default App
