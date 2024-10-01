import { ERenderer } from "./preload";

declare global {
    interface Window {
        electron: ERenderer & {close_window: Function}
    }
}