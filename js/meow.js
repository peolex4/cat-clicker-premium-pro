
/* ======= Model ======= */

var model = {

    currentCat: null,

    cats: [
        {
            clickCount : 0,
            name : 'Kenny',
            imgSrc : 'images/0.jpg',
            imgAttribution : 'https://www.flickr.com/photos/bigtallguy/434164568'
        },
        {
            clickCount : 0,
            name : 'Reddy',
            imgSrc : 'images/1.jpg',
            imgAttribution : 'https://www.flickr.com/photos/xshamx/4154543904'
        },
        {
            clickCount : 0,
            name : 'Blacky',
            imgSrc : 'images/2.jpg',
            imgAttribution : 'https://www.flickr.com/photos/kpjas/22252709'
        },
        {
            clickCount : 0,
            name : 'Pippo',
            imgSrc : 'images/3.jpg',
            imgAttribution : 'https://www.flickr.com/photos/malfet/1413379559'
        },
        {
            clickCount : 0,
            name : 'Tiger',
            imgSrc : 'images/4.jpg',
            imgAttribution : 'https://www.flickr.com/photos/onesharp/9648464288'
        },
        {
            clickCount : 0,
            name : 'Whitey',
            imgSrc : 'images/5.jpg',
            imgAttribution : 'https://www.flickr.com/photos/onesharp/9648464288'
        }
    ]
};


/* ======= Octopus ======= */

var octopus = {

    init: function() {
        // set our current cat to the first one in the list
        model.currentCat = model.cats[0];

        // tell our views to initialize
        catListView.init();
        catView.init();

        //INIZIO FASE PRO
        adminView.init();

        this.adminPanel = $("#admin-view");
        this.hideAdminView();
    },

    getCurrentCat: function() {
        return model.currentCat;
    },

    getCats: function() {
        return model.cats;
    },

    // set the currently-selected cat to the object passed in
    setCurrentCat: function(cat) {
        model.currentCat = cat;
    },

    // increments the counter for the currently-selected cat
    incrementCounter: function() {
        model.currentCat.clickCount++;
        catView.render();
    },
    adminClicked: function(){
        if(this.admin_view_visible){
            this.hideAdminView();
        }
        else{
            this.showAdminView();
        }
    },
    showAdminView: function(){
        console.log("show admin panel");
        this.admin_view_visible = true;
        this.adminPanel.show();
    },
    hideAdminView: function(){
        console.log("hide admin panel");
        this.admin_view_visible = false;
        this.adminPanel.hide();
    },
    cancelClicked: function(){
        adminView.newName.value="";
        adminView.newPath.value="";
        adminView.newClickNum.value="";
        this.hideAdminView();
    },
    getCurrentCatIndex: function(cat){
        var index;
        for(var i=0;i<model.cats.length;i++){
            if(cat==model.cats[i])
                index = i;
        }
        return index;
    },
        saveClicked: function(){
        console.log("save click");
        //var currentCat = this.getCurrentCat();
        var catIndex = this.getCurrentCatIndex(this.getCurrentCat());
        console.log(catIndex);
        model.cats[catIndex].name = adminView.newName.value;
        model.cats[catIndex].clickCount = adminView.newClickNum.value;
        //model.cats[catIndex].imgAttribution = adminView.newPath.value;
        catListView.render();
        catView.render();
    }
};


/* ======= View ======= */

var catView = {

    init: function() {
        // store pointers to our DOM elements for easy access later
        this.catElem = document.getElementById('cat');
        this.catNameElem = document.getElementById('cat-name');
        this.catImageElem = document.getElementById('cat-img');
        this.countElem = document.getElementById('cat-count');

        // on click, increment the current cat's counter
        this.catImageElem.addEventListener('click', function(){
            octopus.incrementCounter();
        });

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        // update the DOM elements with values from the current cat
        var currentCat = octopus.getCurrentCat();
        this.countElem.textContent = currentCat.clickCount;
        this.catNameElem.textContent = currentCat.name;
        this.catImageElem.src = currentCat.imgSrc;
    }
};

var catListView = {

    init: function() {
        // store the DOM element for easy access later
        this.catListElem = document.getElementById('cat-list');

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        var cat, elem, i;
        // get the cats we'll be rendering from the octopus
        var cats = octopus.getCats();

        // empty the cat list
        this.catListElem.innerHTML = '';

        // loop over the cats
        for (i = 0; i < cats.length; i++) {
            // this is the cat we're currently looping over
            cat = cats[i];

            // make a new cat list item and set its text
            elem = document.createElement('li');
            elem.textContent = cat.name;

            // on click, setCurrentCat and render the catView
            // (this uses our closure-in-a-loop trick to connect the value
            //  of the cat variable to the click event function)
            elem.addEventListener('click', (function(catCopy) {
                return function() {
                    octopus.setCurrentCat(catCopy);
                    catView.render();
                };
            })(cat));

            // finally, add the element to the list
            this.catListElem.appendChild(elem);
        }
    }
};


var adminView = {

    init: function(){
        // PRO PRO PRO
        //var adminButton = $('admin_button');
        this.adminButton = document.getElementById('admin_button');
        this.saveButton = document.getElementById('save_button');
        this.cancelButton = document.getElementById('canc_button');
        this.newName = document.getElementById('img_name');
        this.newPath = document.getElementById('img_path');
        this.newClickNum = document.getElementById('img_clickNum');

        // on click ADMIN
        this.adminButton.addEventListener('click', function(){
            console.log("click admin button ");
            octopus.adminClicked();
        });
        //on click SAVE
        this.saveButton.addEventListener('click', function(){
            console.log("click SAVE button ");
            octopus.saveClicked();
        });
        //on click CANCEL
        this.cancelButton.addEventListener('click', function(){
            console.log("click CANCEL button ");
            octopus.cancelClicked();
        });
    }
}

// make it go!
octopus.init();
