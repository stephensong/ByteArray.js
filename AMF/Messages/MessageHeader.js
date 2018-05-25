class MessageHeader {
	constructor (name, mustUnderstand, data) {
		this._name = name
		this._mustUnderstand = mustUnderstand
		this._data = data
	}

	get name () {
		return this._name
	}
	get mustUnderstand () {
		return this._mustUnderstand
	}
	get data () {
		return this._data
	}

	set name (name) {
		this._name = name
	}
	set mustUnderstand (mustUnderstand) {
		this._mustUnderstand = mustUnderstand
	}
	set data (data) {
		this._data = data
	}
}

module.exports = MessageHeader