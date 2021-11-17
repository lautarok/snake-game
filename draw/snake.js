import { Context } from '../canvas.js'
import { Column, Row } from '../units.js'

export const DrawSnake = (snake) => {
	Context.beginPath()
	Context.fillStyle = snake.player === 1 ? '#77F' : '#F77'
	Context.rect(Column(snake.x), Row(snake.y), Column(1), Row(1))
	Context.fill()

	Context.beginPath()
	Context.fillStyle = snake.player === 1 ? '#22F' : '#F22'

	for(let i = 0; i < snake.food.length; i++) {
		let food = snake.food[i]
		Context.beginPath()
		Context.rect(Column(food.x), Row(food.y), Column(1), Row(1))
		Context.fill()
	}
}