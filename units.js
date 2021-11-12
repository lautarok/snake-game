import Config from '/config.js'

export const Column = (value) => (Config.canvas.height / Config.canvas.columns) * value
export const Row = (value) => (Config.canvas.width / Config.canvas.rows) * value