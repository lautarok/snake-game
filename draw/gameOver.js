import { Context, Canvas } from '../canvas.js'
import { Column, Row } from '../units.js'
import Config from '../config.js'

export const DrawGameOver = () => {
	Context.beginPath()
	Context.clearRect(0, 0, Canvas.width, Canvas.height)
	Context.fillStyle = '#FFF'

	// G
	Context.rect(Column(1), Row(1), Column(1), Row(6))
	Context.rect(Column(1), Row(1), Column(4), Row(1))
	Context.rect(Column(1), Row(7), Column(5), Row(1))
	Context.rect(Column(5), Row(4), Column(1), Row(3))
	Context.rect(Column(4), Row(4), Column(1), Row(1))

	// A
	Context.rect(Column(7), Row(1), Column(1), Row(7))
	Context.rect(Column(8), Row(1), Column(2), Row(1))
	Context.rect(Column(10), Row(2), Column(1), Row(1))
	Context.rect(Column(11), Row(3), Column(1), Row(5))
	Context.rect(Column(8), Row(5), Column(3), Row(1))

	// M
	Context.rect(Column(13), Row(2), Column(1), Row(6))
	Context.rect(Column(14), Row(1), Column(2), Row(1))
	Context.rect(Column(16), Row(2), Column(1), Row(2))
	Context.rect(Column(17), Row(1), Column(2), Row(1))
	Context.rect(Column(19), Row(2), Column(1), Row(6))

	// E
	Context.rect(Column(21), Row(1), Column(1), Row(7))
	Context.rect(Column(22), Row(1), Column(3), Row(1))
	Context.rect(Column(22), Row(4), Column(2), Row(1))
	Context.rect(Column(22), Row(7), Column(3), Row(1))

	// O
	Context.rect(Column(1), Row(12), Column(1), Row(5))
	Context.rect(Column(2), Row(11), Column(3), Row(1))
	Context.rect(Column(5), Row(12), Column(1), Row(5))
	Context.rect(Column(2), Row(17), Column(3), Row(1))

	// V
	Context.rect(Column(7), Row(11), Column(1), Row(5))
	Context.rect(Column(8), Row(16), Column(1), Row(1))
	Context.rect(Column(9), Row(17), Column(2), Row(1))
	Context.rect(Column(11), Row(11), Column(1), Row(6))

	// E
	Context.rect(Column(13), Row(11), Column(1), Row(7))
	Context.rect(Column(14), Row(11), Column(3), Row(1))
	Context.rect(Column(14), Row(14), Column(2), Row(1))
	Context.rect(Column(14), Row(17), Column(3), Row(1))

	// R
	Context.rect(Column(18), Row(11), Column(1), Row(7))
	Context.rect(Column(19), Row(11), Column(2), Row(1))
	Context.rect(Column(21), Row(11), Column(1), Row(3))
	Context.rect(Column(19), Row(14), Column(2), Row(1))
	Context.rect(Column(21), Row(15), Column(1), Row(3))

	Context.fill()
}