var CrudComponent = /** @class */ (function () {
    function CrudComponent() {
        var storedItems = localStorage.getItem('crudItems');
        this.items = storedItems ? JSON.parse(storedItems) : [];
    }
    CrudComponent.prototype.saveItems = function () {
        localStorage.setItem('crudItems', JSON.stringify(this.items));
    };
    CrudComponent.prototype.create = function (item) {
        this.items.push(item);
        this.saveItems();
    };
    CrudComponent.prototype.read = function (id) {
        return this.items.find(function (item) { return item.id === id; });
    };
    CrudComponent.prototype.update = function (id, updatedItem) {
        var item = this.read(id);
        if (item) {
            item.name = updatedItem.name;
            this.saveItems();
        }
    };
    CrudComponent.prototype.delete = function (id) {
        var index = this.items.findIndex(function (item) { return item.id === id; });
        if (index !== -1) {
            this.items.splice(index, 1);
            this.saveItems();
        }
    };
    CrudComponent.prototype.getItems = function () {
        return this.items;
    };
    return CrudComponent;
}());
var crud = new CrudComponent();
function addItem() {
    var idInput = document.getElementById('item-id');
    var nameInput = document.getElementById('item-name');
    var id = parseInt(idInput.value, 10);
    var name = nameInput.value;
    var item = { id: id, name: name };
    crud.create(item);
    renderItems();
}
function editItem(id) {
    var item = crud.read(id);
    if (item) {
        var newName = prompt('Enter the new name:');
        if (newName) {
            var updatedItem = { id: id, name: newName };
            crud.update(id, updatedItem);
            renderItems();
        }
    }
}
function deleteItem(id) {
    var confirmed = confirm('Are you sure you want to delete this item?');
    if (confirmed) {
        crud.delete(id);
        renderItems();
    }
}
function renderItems() {
    var itemsContainer = document.getElementById('items-container');
    itemsContainer.innerHTML = '';
    var items = crud.getItems();
    var _loop_1 = function (item) {
        var itemElement = document.createElement('div');
        itemElement.textContent = "ID: ".concat(item.id, ", Name: ").concat(item.name);
        var editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', function () { return editItem(item.id); });
        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function () { return deleteItem(item.id); });
        itemElement.appendChild(editButton);
        itemElement.appendChild(deleteButton);
        itemsContainer.appendChild(itemElement);
    };
    for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
        var item = items_1[_i];
        _loop_1(item);
    }
}
renderItems();
