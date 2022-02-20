// Storage Controller

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
        items: [
            // {
            //     id: 0, name: 'Steak Dinner', calories: 1000
            // },
            // {
            //     id: 1, name: 'Eggs', calories: 500
            // },
            // {
            //     id: 2, name: 'Omellette', calories: 550
            // }
        ],
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
        totalCalories: '.total-calories'
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
        }

    }
})();

// App Controller
const App = (function(ItemCtrl, UICtrl){
    //Load Event Listeners
    const loadEventListeners = function(){
        // Fetch the UI Selectors
        const uiSelectors = UICtrl.getUISelectors();
        // Add Item Event
        document.querySelector(uiSelectors.addBtn).addEventListener('click', itemAddSubmit);
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

            // Clear Fields
            UICtrl.clearInput();
        }

        e.preventDefault();
    }

    // Public Methods 
    return {
        init: function(){
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

})(ItemCtrl, UICtrl);


// Initialize App
App.init();