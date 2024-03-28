// /**
// [header]
// @author ertdfgcvb
// @title  Time: milliseconds
// @desc   Use of context.time
// */

// // Globals have module scope
// const pattern = 'ABCxyz01═|+:. '

// // This is the main loop.
// // Character coordinates are passed in coord {x, y, index}.
// // The function must return a single character or, alternatively, an object:
// // {char, color, background, weight}.
// export function main(coord, context, cursor, buffer) {
// 	const t = context.time * 0.0001
// 	const x = coord.x
// 	const y = coord.y
// 	const o = Math.sin(y * Math.sin(t) * 0.2 + x * 0.04 + t) * 20
// 	const i = Math.round(Math.abs(x + y + o)) % pattern.length
// 	return {
// 		char   : pattern[i],
// 		fontWeight : '100', // or 'light', 'bold', '400'
// 	}
// }

// import { drawInfo } from '/src/modules/drawbox.js'

// // This function is called after the main loop and is useful
// // to manipulate the buffer; in this case with a window overlay.
// export function post(context, cursor, buffer) {
// 	// An extra object can be passed to drawInfo to alter the default style
// 	drawInfo(context, cursor, buffer, {
// 		color : 'white', backgroundColor : 'royalblue', shadowStyle : 'gray'
// 	})
// }

/**
@author ertdfgcvb
@title  Plasma
@desc   Oldschool plasma demo
Plasma primer: https://www.bidouille.org/prog/plasma
*/

import { vec2, dot, add, sub, length } from '/src/modules/vec2.js'
import { map } from '/src/modules/num.js'
import { css } from '/src/modules/color.js'

export const settings = { fps : 60 }

const {sin, cos, floor, PI} = Math
const density = '$?01@*$#&+-><:. '

const PI23 = PI * 2 / 3
const PI43 = PI * 4 / 3

export function main(coord, context, cursor, buffer) {
	const t1 = context.time * 0.0002
	const t2 = context.time * 0.0005
    const m = Math.min(context.cols, context.rows)
    const a = context.metrics.aspect

	let st = {
		x : 2.0 * (coord.x - context.cols / 2) / m * a,
		y : 2.0 * (coord.y - context.rows / 2) / m
	}
	const center = vec2(sin(-t1), cos(-t1))
	const v1 = sin(dot(coord, vec2(sin(t1), cos(t1))) * 0.08)
	const v2 = cos(length(sub(st, center)) * 5.0)
	const v3 = v1 + v2
	const idx = floor(map(v3, -2, 2, 0, 1) * density.length)

	// Colors are quantized for performance:
	// lower value = harder gradient, better performance
	const quant = 2
	const mult  = 255 / (quant - 1)
	const r = floor(map(sin(v3 * PI   + t1), -1, 1, 0, quant)) * mult
	const g = floor(map(sin(v3 * PI23 + t2), -1, 1, 0, quant)) * mult
	const b = floor(map(sin(v3 * PI43 - t1), -1, 1, 0, quant)) * mult

	return {
		char : density[idx],
		color : css(0,0,0,0.2),
		backgroundColor : css(0, 0, 0, 0) // r, g, b are floats
	}
}
