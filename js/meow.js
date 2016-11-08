// From my first version


// clear the screen for testing
document.body.innerHTML = '';
var cat_names = ["Kenny","Reddy","Blacky","Pippo","Tiger","Whitey"];
var cats = [0,1,2,3,4,5];
var clickNumbers = [0,0,0,0,0,0];
var selectedPic;

var cont = document.createElement('div');
cont.setAttribute("class", "container");
document.body.appendChild(cont);
var first_row = document.createElement('div');
first_row.setAttribute("class", "row");
cont.appendChild(first_row);
var col_12 = document.createElement('div');
col_12.setAttribute("class", "col-md-12");
first_row.appendChild(col_12);

// Let's loop over the Names in our array
for (var i = 0; i < cat_names.length; i++) {

    var cat = cat_names[i];

    // We're creating a DOM element for the number
    var elem = document.createElement('div');
    elem.textContent = cat;
    elem.addEventListener('click', (function(nameCopy) {
        return function() {
            showSelCat(nameCopy);
        };
    })(i));

    col_12.appendChild(elem);
};


var showSelCat = function(num) {
    selectedPic=num;
    img.setAttribute("src", "images/"+num+".jpg");
    name_cat.innerHTML = cat_names[num];
    clickNumber.innerHTML = clickNumbers[num];
}


var cont2 = document.createElement('div');
cont2.setAttribute("class", "container");
document.body.appendChild(cont2);
var sec_row = document.createElement('div');
sec_row.setAttribute("class", "row");
cont2.appendChild(sec_row);
var col2_12 = document.createElement('div');
col2_12.setAttribute("class", "col-md-12");
sec_row.appendChild(col2_12);
var img = document.createElement('img');
img.setAttribute("class", "cat-images-big");
col2_12.appendChild(img);

var name_cat = document.createElement('p');
col2_12.appendChild(name_cat);
var clickNumber = document.createElement('p');
clickNumber.setAttribute("id", "click-label");
col2_12.appendChild(clickNumber);



$('.cat-images-big').click(function(e) {
    clickNumbers[selectedPic]+=1;
    var clickToShow = clickNumbers[selectedPic];
    $('#click-label').text(clickToShow);
});

