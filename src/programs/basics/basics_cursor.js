/**
@author No1
@title  Cursor
@desc   Example with mouse cursor
[header]
*/

import { sdCircle, opSmoothUnion } from "/src/modules/sdf.js"
import { sub, vec2 } from "/src/modules/vec2.js"

const charMap = "#WX?*:÷×+=-· ".split('')

export function main(coord, context, cursor, buffers){

	const t = context.time
	const a  = Math.min(context.cols, context.rows)
	const st = {
		x : 2.0 * (coord.x - context.cols / 2) / a * context.aspect,
		y : 2.0 * (coord.y - context.rows / 2) / a
	}

	// A bit of a waste as cursor is not coord dependent;
	// it could be calculated in pre(), and stored in a global
	// (see commented code below).
	const pointer = {
		x : 2.0 * (cursor.x - context.cols / 2) / a * context.aspect,
		y : 2.0 * (cursor.y - context.rows / 2) / a
	}

	// Circles
	const d1 = sdCircle(st, 0.2)	           // origin, 0.2 is the radius
	const d2 = sdCircle(sub(st, pointer), 0.2) // cursor

	// Smooth operation
	const d = opSmoothUnion(d1, d2, 0.9)

	// Calc index of the char map
	const c = 1.0 - Math.exp(-5 * Math.abs(d))
	const index = Math.floor(c * charMap.length)

	return charMap[index]
}

import { drawInfo } from "/src/modules/drawbox.js"
export function post(context, metrics, cursor, buffers){
	drawInfo(context, metrics, cursor, buffers)
}

// Uncomment this to calculate the cursor position only once
// and pass it to the main function as a global or as object in buffers.data
/*
const p = vec2(0, 0)
export function pre(context, cursor, buffers){
	const a  = Math.min(context.cols, context.rows)
	p.x = 2.0 * (cursor.x - context.cols / 2) / a * context.aspect,
	p.y = 2.0 * (cursor.y - context.rows / 2) / a
}
*/


