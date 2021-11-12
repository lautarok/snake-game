export const Canvas = document.getElementsByTagName('canvas')[0]

export const Context = Canvas ? Canvas.getContext('2d') : null