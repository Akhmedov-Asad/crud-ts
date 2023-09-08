interface Item {
    id: number;
    name: string;
  }
  
  class CrudComponent {
    private items: Item[];
  
    constructor() {
      const storedItems = localStorage.getItem('crudItems');
      this.items = storedItems ? JSON.parse(storedItems) : [];
    }
  
    private saveItems(): void {
      localStorage.setItem('crudItems', JSON.stringify(this.items));
    }
  
    create(item: Item): void {
      this.items.push(item);
      this.saveItems();
    }
  
    read(id: number): Item | undefined {
      return this.items.find((item) => item.id === id);
    }
  
    update(id: number, updatedItem: Item): void {
      const item = this.read(id);
      if (item) {
        item.name = updatedItem.name;
        this.saveItems();
      }
    }
  
    delete(id: number): void {
      const index = this.items.findIndex((item) => item.id === id);
      if (index !== -1) {
        this.items.splice(index, 1);
        this.saveItems();
      }
    }
  
    getItems(): Item[] {
      return this.items;
    }
  }
  
  const crud = new CrudComponent();
  
  function addItem() {
    const idInput = document.getElementById('item-id') as HTMLInputElement;
    const nameInput = document.getElementById('item-name') as HTMLInputElement;
  
    const id = parseInt(idInput.value, 10);
    const name = nameInput.value;
  
    const item: Item = { id, name };
    crud.create(item);
  
    renderItems();
  }
  
  function editItem(id: number) {
    const item = crud.read(id);
    if (item) {
      const newName = prompt('Enter the new name:');
      if (newName) {
        const updatedItem: Item = { id, name: newName };
        crud.update(id, updatedItem);
        renderItems();
      }
    }
  }
  
  function deleteItem(id: number) {
    const confirmed = confirm('Are you sure you want to delete this item?');
    if (confirmed) {
      crud.delete(id);
      renderItems();
    }
  }
  
  function renderItems() {
    const itemsContainer = document.getElementById('items-container');
    itemsContainer.innerHTML = '';
  
    const items = crud.getItems();
    for (const item of items) {
      const itemElement = document.createElement('div');
      itemElement.textContent = `ID: ${item.id}, Name: ${item.name}`;
  
      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.addEventListener('click', () => editItem(item.id));
  
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => deleteItem(item.id));
  
      itemElement.appendChild(editButton);
      itemElement.appendChild(deleteButton);
  
      itemsContainer.appendChild(itemElement);
    }
  }
  
  renderItems();