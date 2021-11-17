import Config from './config.js'
import { Context, Canvas } from './canvas.js'
import { DrawSnake } from './draw/snake.js'
import { DrawGameOver } from './draw/gameOver.js'
import { Column, Row } from './units.js'

let engineInterval = null

let snake1 = {
	x: Config.players < 2 ? 25 : 24,
	y: 25,
	direction: null,
	food: [
		{
			x: Config.players < 2 ? 25 : 24,
			y: 26
		}
	],
	player: 1,
	dead: false
}

let snake2 = {
	x: 26,
	y: 25,
	direction: null,
	food: [
		{
			x: 26,
			y: 26
		}
	],
	player: 2,
	dead: false
}

let activeKeys = {
	player1: {
		up: false,
		down: false,
		left: false,
		right: false
	},
	player2: {
		up: false,
		down: false,
		left: false,
		right: false
	}
}

let generatedFood = {
	x: null,
	y: null
}

const control = (key) => {
	switch(key) {
		case Config.controls.up :
			activeKeys.player1.up = true
			activeKeys.player1.down = false
			activeKeys.player1.left = false
			activeKeys.player1.right = false
			break
		case Config.controls.down :
			activeKeys.player1.down = true
			activeKeys.player1.up = false
			activeKeys.player1.left = false
			activeKeys.player1.right = false
			break
		case Config.controls.left :
			activeKeys.player1.left = true
			activeKeys.player1.down = false
			activeKeys.player1.up = false
			activeKeys.player1.right = false
			break
		case Config.controls.right :
			activeKeys.player1.right = true
			activeKeys.player1.down = false
			activeKeys.player1.left = false
			activeKeys.player1.up = false
			break
	}

	if(Config.players > 1) {
		switch(key) {
			case Config.controls.up2 :
				activeKeys.player2.up = true
				activeKeys.player2.down = false
				activeKeys.player2.left = false
				activeKeys.player2.right = false
				break
			case Config.controls.down2 :
				activeKeys.player2.down = true
				activeKeys.player2.up = false
				activeKeys.player2.left = false
				activeKeys.player2.right = false
				break
			case Config.controls.left2 :
				activeKeys.player2.left = true
				activeKeys.player2.down = false
				activeKeys.player2.up = false
				activeKeys.player2.right = false
				break
			case Config.controls.right2 :
				activeKeys.player2.right = true
				activeKeys.player2.down = false
				activeKeys.player2.left = false
				activeKeys.player2.up = false
				break
		}
	}
}

document.onkeydown = (event) => control(event.key)

const setSnakeDirection = () => {
	if(activeKeys.player1.up && snake1.direction !== 'down') {
		snake1.direction = 'up'
	} else if(activeKeys.player1.down && snake1.direction !== 'up') {
		snake1.direction = 'down'
	} else if(activeKeys.player1.left && snake1.direction !== 'right') {
		snake1.direction = 'left'
	} else if(activeKeys.player1.right && snake1.direction !== 'left') {
		snake1.direction = 'right'
	}

	if(Config.players > 1) {
		if(activeKeys.player2.up && snake2.direction !== 'down') {
			snake2.direction = 'up'
		} else if(activeKeys.player2.down && snake2.direction !== 'up') {
			snake2.direction = 'down'
		} else if(activeKeys.player2.left && snake2.direction !== 'right') {
			snake2.direction = 'left'
		} else if(activeKeys.player2.right && snake2.direction !== 'left') {
			snake2.direction = 'right'
		}
	}
}

const setSnakePosition = () => {
	if(snake1.direction === 'up' && snake1.y - 1 < 0 || snake1.direction === 'down' && snake1.y + 1 >= Config.canvas.rows || snake1.direction === 'left' && snake1.x - 1 < 0 || snake1.direction === 'right' && snake1.x + 1 >= Config.canvas.columns) {
		snake1.dead = true
	}

	if(snake1.direction && !snake1.dead) {
		for(let i = snake1.food.length - 1; i >= 0; i--) {
			const follow = i > 0 ? snake1.food[i - 1] : snake1
			snake1.food[i].x = follow.x
			snake1.food[i].y = follow.y
		}
	}

	if(snake1.direction === 'up' && !snake1.dead) {
		snake1.y--
	} else if(snake1.direction === 'down' && !snake1.dead) {
		snake1.y++
	} else if(snake1.direction === 'left' && !snake1.dead) {
		snake1.x--
	} else if(snake1.direction === 'right' && !snake1.dead) {
		snake1.x++
	}

	if(Config.players > 1) {
		if(snake2.direction === 'up' && snake2.y - 1 < 0 || snake2.direction === 'down' && snake2.y + 1 >= Config.canvas.rows || snake2.direction === 'left' && snake2.x - 1 < 0 || snake2.direction === 'right' && snake2.x + 1 >= Config.canvas.columns) {
			snake2.dead = true
		}

		if(snake2.direction && !snake2.dead) {
			for(let i = snake2.food.length - 1; i >= 0; i--) {
				const follow = i > 0 ? snake2.food[i - 1] : snake2
				snake2.food[i].x = follow.x
				snake2.food[i].y = follow.y
			}
		}

		if(snake2.direction === 'up' && !snake2.dead) {
			snake2.y--
		} else if(snake2.direction === 'down' && !snake2.dead) {
			snake2.y++
		} else if(snake2.direction === 'left' && !snake2.dead) {
			snake2.x--
		} else if(snake2.direction === 'right' && !snake2.dead) {
			snake2.x++
		}
	}
}

const generateFood = () => {
	if(!generatedFood.x && !generateFood.y) {
		const x = parseInt(Math.random() * Config.canvas.columns),
			y = parseInt(Math.random() * Config.canvas.rows)

		generatedFood.x = x <= 0 ? 1 : x >= Config.canvas.columns - 1 ? Config.canvas.columns - 2 : x
		generatedFood.y = y <= 0 ? 1 : y >= Config.canvas.rows - 1 ? Config.canvas.rows - 2 : y

		Context.beginPath()
		Context.fillStyle = '#AFA'
		Context.rect(Column(x), Row(y), Column(1), Row(1))
		Context.fill()
	} else {
		Context.beginPath()
		Context.fillStyle = '#AFA'
		Context.rect(Column(generatedFood.x), Row(generatedFood.y), Column(1), Row(1))
		Context.fill()
	}
}

const checkCollisions = () => {
	if(snake1.x === generatedFood.x && snake1.y === generatedFood.y) {
		snake1.food.push({
			x: snake1.x + (snake1.direction === 'right' ? (-1) : snake1.direction === 'left' ? 1 : 0),
			y: snake1.y + (snake1.direction === 'down' ? (-1) : snake1.direction === 'up' ? 1 : 0)
		})
		generatedFood = {
			x: null,
			y: null
		}
	}

	for(let food of snake1.food) {
		if(food.x === snake1.x && food.y === snake1.y) {
			snake1.dead = true
			break
		}
	}

	if(Config.players > 1) {
		if(snake2.x === generatedFood.x && snake2.y === generatedFood.y) {
			snake2.food.push({
				x: snake2.x + (snake2.direction === 'right' ? (-1) : snake2.direction === 'left' ? 1 : 0),
				y: snake2.y + (snake2.direction === 'down' ? (-1) : snake2.direction === 'up' ? 1 : 0)
			})
			generatedFood = {
				x: null,
				y: null
			}
		}

		for(let food of snake2.food) {
			if(food.x === snake2.x && food.y === snake2.y) {
				snake2.dead = true
				break
			}
		}
	}
}

const engine = () => {
	if(!snake1.dead && !snake2.dead) {
		Context.beginPath()
		Context.clearRect(0, 0, Config.canvas.width, Config.canvas.height)
		if(snake1.direction && snake2.direction || Config.players < 2 && snake1.direction) {
			generateFood()
		}
		checkCollisions()
		setSnakeDirection()
		setSnakePosition()
		DrawSnake(snake1)
		if(Config.players > 1) {
			DrawSnake(snake2)
		}
	} else {
		if(engineInterval) {
			clearInterval(engineInterval)
			DrawGameOver()
		} else {
			console.error('Cannot clear engine interval')
		}
	}
}

const init = () => {
	if(Context) {
		console.log('Starting engine...')
		Canvas.width = Config.canvas.width
		Canvas.height = Config.canvas.height
		engineInterval = setInterval(() => engine(), Config.engineClock)
		console.log('Engine started')
	} else {
		console.error('Fail to get canvas')
	}
}

init()