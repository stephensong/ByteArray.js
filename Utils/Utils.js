util = {}
util.ClassAlias = function () {
	this._aliasToClass = []
	this._classToAlias = []
	this._definitionCache = []
	this._global = []
}
util.ClassAlias.prototype.getClassNameByAlias = function (aliasName) {
	if (aliasName != null) {
		return this._aliasToClass[aliasName]
	} else {
		throw new Error(`util.ClassAlias::getClassNameByAlias - Error: ${aliasName} is empty`)
	}
}
util.ClassAlias.prototype.getAliasByClassName = function (className) {
	if (className != null) {
		return this._classToAlias[className]
	} else {
		throw new Error(`util.ClassAlias::getAliasByClassName - Error: ${className} is empty`)
	}
}
util.ClassAlias.prototype.registerClassAlias = function (aliasName, classObject) {
	if (aliasName != null || classObject != 0) {
		let className = this.getQualifiedClassName(classObject)
		this._aliasToClass[aliasName] = className
		this._classToAlias[className] = aliasName
	} else {
		throw new Error(`util.ClassAlias::registerClassAlias - Error: ${aliasName} is empty or ${classObject} is 0`)
	}
}
util.ClassAlias.prototype.getQualifiedClassName = function (name) {
	if (name != null) {
		let type = typeof name == "function" ? name : name.constructor
		return typeof name["$class"] == "object" ? (name["$class"]["fullClassName"]).replace(/\.([^\.]+$)/, "::$1") : String(name)
	} else {
		throw new Error(`util.ClassAlias::getQualifiedClassName - Error: ${name} is empty`)
	}
}
util.ClassAlias.prototype.getQualifiedSuperclassName = function (name) {
	if (name != null) {
		if (typeof name === "function") {
			return this.getQualifiedClassName(name.prototype)
		}
		if (typeof name !== "object") {
			return "Object"
		}
		return this.getQualifiedClassName(getPrototypeOf(value))
	} else {
		throw new Error(`util.ClassAlias::getQualifiedSuperclassName - Error: ${name} is empty`)
	}
}
util.ClassAlias.prototype.describeType = function (value) {
	if (value != null) {
		let type = typeof value == "function" ? value : value.constructor
		let len = 0
		let methods = { length: function () { return len } }
		if (type && type.prototype) {
			for (let p in type.prototype) {
				if (p.match(/^[a-zA-Z_]/) && !this.isGetterOrSetter(type.prototype, p) && typeof type.prototype[p] == "function") {
					methods[len++] = p
				}
			}
		}
		return {
			attribute: function (attr) { if (attr == "name") return this.getQualifiedClassName(value) },
			method: { "@name": methods }
		}
	} else {
		throw new Error(`util.ClassAlias::describeType - Error: ${value} is empty`)
	}
}
util.ClassAlias.prototype.getDefinitionByName = function (name) {
	if (name != null) {
		let definition = this._definitionCache[name]
		if (definition) {
			return definition
		}
		let paths = name.split(".")
		let length = paths.length
		definition = this._global
		for (let i = 0; i < length; i++) {
			let path = paths[i]
			definition = definition[path]
			if (!definition) {
				return null
			}
		}
		this._definitionCache[name] = definition
		return definition
	} else {
		throw new Error(`utils.ClassAlias::getDefinitionByName - Error: ${name} is empty`)
	}
}
util.ClassAlias.prototype.isGetterOrSetter = function (object, propertyName) {
	if (typeof Object.prototype.__lookupGetter__ != "function") {
		return false
	}
	return object.__lookupGetter__(propertyName) || object.__lookupSetter__(propertyName)
}