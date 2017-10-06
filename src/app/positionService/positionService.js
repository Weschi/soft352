angular.module('homiefinder.positionService', [])
.service('positionService', function() {


	//Deselects any object in a collection whose top level value of "selected" is true
	this.deselect = function(collection) {
		_.each(_.filter(collection, function(item){return !!item.selected;}), function(selectedItem){
			selectedItem.selected = false;
		});

		return collection;
	}

	this.toggle = function(collection, line) {
		var preserveSelect = line.selected;
		this.deselect(collection);
		line.selected = !preserveSelect;
	}

	this.parentToggle = function(collection, line, deselectCollection) {
		this.toggle(collection, line);
		this.deselect(deselectCollection);
	}

	return this;
});