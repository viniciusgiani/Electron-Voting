// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { ipcRenderer, contextBridge } from "electron";

const result_renderer = {
    get_data: async (key: string) => {
        return await ipcRenderer.invoke('get-data', key)
    },
    close_window: () => {
        ipcRenderer.send('close-results-win')
    }
}

contextBridge.exposeInMainWorld('electron', result_renderer)
