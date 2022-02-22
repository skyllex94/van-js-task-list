// Storage Controller
const StorageCtrl = (function(){
    
    // Publicly available Methods
    return {
        storeItem: function(item){
            let items;
            // Check if any items in the storage
            if(localStorage.getItem('items') === null){
                items = [];
                //Push new item
                items.push(item);
                console.log(items);
                // Set localStorage
                localStorage.setItem('items', JSON.stringify(items));
                
            } else {
                items = JSON.parse(localStorage.getItem('items'));
                // Push the new Item
                items.push(item);
                console.log(items);
                // Reset localStorage
                localStorage.setItem('items', JSON.stringify(items));
                const data = ItemCtrl.logData()
                data.items = (JSON.parse(localStorage.getItem('items')));
                console.log(JSON.parse(localStorage.getItem('items')));
            }
        },

        getItemsFromStorage: function(){
            let items;
            if(localStorage.getItem("items") === null){
                items = [];
                // return items;
            } else {
                let newItemList = JSON.parse(localStorage.getItem("items"));
                items = newItemList;
            }
            console.log(items);
            return items;
        }
    }
})();

// Item Controller
const ItemCtrl = (function(){
    // Item Constructor
    const Item = function(id, name, calories){
        this.id = id;
        this.name = name;
        this.calories = calories;
    }

    // Data Structure / State
    const data = {
        items: StorageCtrl.getItemsFromStorage(),
        currentItem: null,
        totalCalories: 0
    }

    return {
        getItems: function(){
            return data.items;
        },

        logData: function(){
            return data;
        },

        addItem: function(name, calories){
            let id;
            // Create ID
            if(data.items.length > 0){
                id = data.items[data.items.length - 1].id + 1;
            } else {
                id = 0;
            }
            // Calories to number
            calories = parseInt(calories);
            // Create a new Item
            newItem = new Item(id, name, calories);
            // Add to Items Array
            data.items.push(newItem);

            return newItem;
        },

        getTotalCalories: function(){
            let total = 0;
            data.items.forEach(function(currentItem){
                total += currentItem.calories;
            });
            // Set total calories in the data structure
            data.totalCalories = total;
            // Return total
            return data.totalCalories;
        },

        getItemById: function(id){
            let found = null;
            // Loop through the items
            data.items.forEach(function(currentItem){
                if(id === currentItem.id){
                   found = currentItem;
                }
            })
            return found;
        },

        setCurrentItem: function(item){
            data.currentItem = item;
        },

        getCurrentItem: function(){
            return data.currentItem;
        },

        updatedItem: function(itemName, itemCalories){
            itemCalories = parseInt(itemCalories);
            let found = null;
            // Loop through data items
            data.items.forEach(function(currentItem){
                if(currentItem.id === data.currentItem.id){
                    currentItem.name = itemName;
                    currentItem.calories = itemCalories;
                    found = currentItem;
                }
            })
            return found;
        },

        deleteItem: function(idToDelete){
            
            // Loop through all the indexes and match with the one to delete
            data.items.forEach(function(currentItem){
                
                if(currentItem.id === idToDelete){
                    data.items.splice(currentItem.id, 1);
                }
            })

            // const ids = data.items.map(function(item){
            //     return item.id
            // });
            
            // const index = ids.indexOf(idToDelete);
            // data.items.splice(index, 1);

        },

        clearData: function(){
            data.items = [];
            data.currentItem = '';
        }
    }

})();

// UI Controller
const UICtrl = (function(){

    const UISelectors = {
        itemList: '#item-list',
        addBtn: '.add-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        totalCalories: '.total-calories',
        updateBtn: '.update-btn',
        deleteBtn: '.delete-btn',
        backBtn: '.back-btn',
        listItems: '#item-list li',
        clearBtn: '.clear-btn'
    }


    // Public Methods
    return {
        populateItemList: function(items){
            let html = '';

            items.forEach(function(currentItem){
                html += `
                <li class="collection-item" id="item-${currentItem.id}">
                    <strong>${currentItem.name}: </strong><em>${currentItem.calories} Calories</em>
                    <a href="#" class="secondary-content">
                    <i class="edit-item fa fa-pencil"></i>
                    </a>
                </li>
                `;
            });
            // Inserting the items into the UI 
            document.querySelector(UISelectors.itemList).innerHTML = html;
        },

        updateItemUI: function(item){
            document.querySelector(UISelectors.itemList).style.display = 'block';
            
            // Create HTML li Element
            const li = document.createElement('li');
            li.className = 'collection-item';
            li.id = `item-${item.id}`;
            // Add HTML
            li.innerHTML = `
                <strong>${item.name}: </strong><em>${item.calories} Calories</em>
                <a href="#" class="secondary-content">
                <i class="edit-item fa fa-pencil"></i>
                </a>
            `;
            // Insert Item to UI
            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);

        },

        deleteItemUI: function(itemToDelete){
            // Error Proof for empty Array of data
            const data = ItemCtrl.logData();
            if(data.items.length !== 0){
                const itemId = `#item-${itemToDelete}`;
                const itemToRemove = document.querySelector(itemId);
                itemToRemove.remove();
            } else {
                this.hideList();
            }
            
        },

        getUISelectors: function(){
            return UISelectors;
        },

        getItemInput: function(){
            return {
                name: document.querySelector(UISelectors.itemNameInput).value,
                calories: document.querySelector(UISelectors.itemCaloriesInput).value
            }
        },

        clearInput: function(){
            document.querySelector(UISelectors.itemNameInput).value = '';
            document.querySelector(UISelectors.itemCaloriesInput).value = '';
        },

        hideList: function(){
            document.querySelector(UISelectors.itemList).style.display = 'none';
        },

        showTotalCalories: function(totalCalories){
            document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
        },

        clearEditState: function(){
            // Clear all the fields and update the buttons
            UICtrl.clearInput();
            document.querySelector(UISelectors.updateBtn).style.display = 'none';
            document.querySelector(UISelectors.deleteBtn).style.display = 'none';
            document.querySelector(UISelectors.backBtn).style.display = 'none';
            document.querySelector(UISelectors.addBtn).style.display = 'inline';

        },

        editStateUI: function(){
            document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
            document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
            // Update UI Buttons for editting
            document.querySelector(UISelectors.updateBtn).style.display = 'inline';
            document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
            document.querySelector(UISelectors.backBtn).style.display = 'inline';
            document.querySelector(UISelectors.addBtn).style.display = 'none';
        },

        updateListItem: function(itemToUpdate){
            let listItems = document.querySelectorAll(UISelectors.listItems);
            // Turn Node List into an array 
            listItems = Array.from(listItems);
            listItems.forEach(function(listItem){
                const itemId = listItem.getAttribute('id');
                if(itemId === `item-${itemToUpdate.id}`){
                    document.querySelector(`#${itemId}`).innerHTML = `
                    <strong>${itemToUpdate.name}: </strong><em>${itemToUpdate.calories} Calories</em>
                    <a href="#" class="secondary-content">
                    <i class="edit-item fa fa-pencil"></i>
                    </a> `;
                }
            })
        },

        clearAllUI: function(){
            document.querySelector(UISelectors.itemList).innerHTML = '';
        }

    }
})();

// App Controller
const App = (function(ItemCtrl, StorageCtrl, UICtrl){
    //Load Event Listeners
    const loadEventListeners = function(){
        // Fetch the UI Selectors
        const uiSelectors = UICtrl.getUISelectors();
        // Fetch Local Storaga Data
        StorageCtrl.getItemsFromStorage();
        // Add Item Event
        document.querySelector(uiSelectors.addBtn).addEventListener('click', itemAddSubmit);
        // Disable Submit on Enter
        document.addEventListener('keypress', function(e){
            if(e.keycode === '13' || e.which === '13'){
                e.preventDefault();
                return false;
            }
        });
    
        // Edit icon-update event when existing
        document.querySelector(uiSelectors.itemList).addEventListener('click', itemEditClick);

        // Update-Submit when you want to update a value when the Edit-state is already brought up
        document.querySelector(uiSelectors.updateBtn).addEventListener('click', itemUpdateSubmit);

        // Back Button
        document.querySelector(uiSelectors.backBtn).addEventListener('click', backClick);
    
        // Delete Button Event 
        document.querySelector(uiSelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);

        // Clear Button Event 
        document.querySelector(uiSelectors.clearBtn).addEventListener('click', clearItemsSubmit);
    }

    // Add Items on pressing Submit 
    const itemAddSubmit = function(e){
        // Get form input from UI Controller
        const input = UICtrl.getItemInput();
        // Check for name and calories input
        if(input.name !== '' && input.calories !== ''){
            // Add Item
            const newItem = ItemCtrl.addItem(input.name, input.calories);
            // Update Item to the UI
            UICtrl.updateItemUI(newItem);
            // Get Total Calories
            const totalCalories = ItemCtrl.getTotalCalories();
            // Add total calories to UI
            UICtrl.showTotalCalories(totalCalories);
            console.log(newItem);
            // Persisting to Local Storage
            StorageCtrl.storeItem(newItem);

            // Clear Fields
            UICtrl.clearInput();
        }

        e.preventDefault();
    }

    // Update Item on Click (pencil icon)
    const itemEditClick = function(e){

        const UISelectors = UICtrl.getUISelectors();

        if(e.target.classList.contains('edit-item')){
            // Make sure the inputs get cleared before switching states
            UICtrl.clearInput();
            // Take the id of the li element
            const listId = e.target.parentNode.parentNode.id;
            // Break the id taken into an array 
            const listArr = listId.split('-');
            // Make sure it's a number value taken after the split
            const id = parseInt(listArr[1]);
            // Get Item 
            const itemToEdit = ItemCtrl.getItemById(id);
            // Take in the output and disctribute to the other Controllers
            ItemCtrl.setCurrentItem(itemToEdit);
            UICtrl.editStateUI();

            // listArr.forEach(function(currentArrItem){
            //     if (typeof(currentArrItem) == 'number'){
            //         const sumOfItems = [];
            //         sumOfItems += currentArrItem;
            //         console.log(sumOfItems);
            //         return sumOfItems;
                    
            //     }
            // })

        } else {
            UICtrl.clearEditState();
        }
        e.preventDefault();
    }

    const itemUpdateSubmit = function(e){
        const input = UICtrl.getItemInput();
        // Update Item
        const updatedItem = ItemCtrl.updatedItem(input.name, input.calories);
        // Update UI
        UICtrl.updateListItem(updatedItem);
        // Get Total Calories
        const totalCalories = ItemCtrl.getTotalCalories();
        // Add total calories to UI
        UICtrl.showTotalCalories(totalCalories);
        // Clear Input Fields
        UICtrl.clearInput();

        e.preventDefault();
    }

    const itemDeleteSubmit = function(e){
        const currentItem = ItemCtrl.getCurrentItem();
        // Delete from data structure
        ItemCtrl.deleteItem(currentItem.id);

        // Delete from UI
        UICtrl.deleteItemUI(currentItem.id);
        // Get Total Calories
        const totalCalories = ItemCtrl.getTotalCalories();
        // Add total calories to UI
        UICtrl.showTotalCalories(totalCalories);
        // Clear Update State
        UICtrl.clearEditState();
        UICtrl.clearInput();

        e.preventDefault();
    }

    const backClick = function(e){
        UICtrl.clearEditState();
        UICtrl.clearInput();
    }

    const clearItemsSubmit = function(e){
        // Clear data from both controllers
        ItemCtrl.clearData();
        UICtrl.clearAllUI();
        // Get Total Calories
        const totalCalories = ItemCtrl.getTotalCalories();
        // Add total calories to UI
        UICtrl.showTotalCalories(totalCalories);
        // Hide Ul Element
        UICtrl.hideList();


        e.preventDefault();
    }

    // Public Methods 
    return {
        init: function(){
            UICtrl.clearEditState();
            // Fetch Items from Data Structure
            const items = ItemCtrl.getItems();
            // Hide ul if Empty
            if(items.length = 0){
                UICtrl.hideList();
            } else {
                // Populate list with items
                UICtrl.populateItemList(items);
                const totalCalories = ItemCtrl.getTotalCalories();
                UICtrl.showTotalCalories(totalCalories);
            }
            
            // Load Event Listeners
            loadEventListeners();
        }
    }

})(ItemCtrl, StorageCtrl, UICtrl);

// Initialize App
App.init();