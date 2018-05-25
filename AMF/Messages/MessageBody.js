class MessageBody {
	constructor (targetURI, responseURI, data) {
		this._targetURI = targetURI
		this._responseURI = responseURI
		this._data = data
	}

	get targetURI () {
		return this._targetURI
	}
	get responseURI () {
		return this._responseURI
	}
	get data () {
		return this._data
	}
	get replyMethod () {
		return this._targetURI.substring((this._targetURI.lastIndexOf("/") + 1), this._targetURI.length)
	}

	set targetURI (targetURI) {
		if (targetURI == "") {
			targetURI = ""
		}
		this._targetURI = targetURI
	}
	set responseURI (responseURI) {
		if (responseURI == "") {
			responseURI = ""
		}
		this._responseURI = responseURI
	}
	set data (data) {
		this._data = data
	}
	set replyMethod (methodName) {
		if (this._targetURI.endsWith("/onStatus") || this._targetURI.endsWith("/onResult")) {
			this._targetURI = this._targetURI.substring(0, this._targetURI.lastIndexOf("/"))
		}
		this._targetURI = this._targetURI + methodName
	}
}

module.exports = MessageBody