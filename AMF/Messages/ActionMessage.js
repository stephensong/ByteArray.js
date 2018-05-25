class ActionMessage {
	constructor (version) {
		this._version = version || 3
		this._headers = []
		this._bodies = []
	}

	get version () {
		return this._version
	}
	get headers () {
		return this._headers
	}
	get body () {
		return this._bodies
	}

	get headerCount () {
		return this._headers.length
	}
	get bodyCount () {
		return this._bodies.length
	}

	getHeaderPos (pos) {
		return this._headers[pos]
	}
	getBodyPos (pos) {
		return this._bodies[pos]
	}

	addHeader (header) {
		this._headers.push(header)
	}
	addBody (body) {
		this._bodies.push(body)
	}

	set version (version) {
		this._version = version
	}
}

module.exports = ActionMessage