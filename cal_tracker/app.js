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
            {
                id: 0, name: 'Steak Dinner', calories: 1000
            },
            {
                id: 1, name: 'Eggs', calories: 500
            },
            {
                id: 2, name: 'Omellette', calories: 550
            }
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
        }
    }

})();

// UI Controller
const UICtrl = (function(){

    const UISelectors = {
        itemList = '#item-list'
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
        }
    }
})();

// App Controller
const App = (function(ItemCtrl, UICtrl){

    // Public Methods 
    return {
        init: function(){
            // Fetch Items from Data Structure
            const items = ItemCtrl.getItems();
            // Populate list with items
            UICtrl.populateItemList(items);

        }
    }

})(ItemCtrl, UICtrl);


// Initialize App
App.init();