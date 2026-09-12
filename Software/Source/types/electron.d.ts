export {}

declare global {
    interface Window {
        electronAPI: {
            openMessageWindow: () => void
        }
    }
}