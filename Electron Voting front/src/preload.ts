// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { ipcRenderer, contextBridge } from "electron";

const renderer = {
    save_data: (data: {key: any; value: any}) => {
        ipcRenderer.send('save-data', data)
    },
    get_data: async (key: string) => {
        return await ipcRenderer.invoke('get-data', key)
    },
    delete_data: (key: string) => {
        return ipcRenderer.send('delete-data', key)
    },
    open_result_win: () => {
        return ipcRenderer.send('create-result-window')
    }
}

contextBridge.exposeInMainWorld('electron', renderer)

export type ERenderer = typeof renderer