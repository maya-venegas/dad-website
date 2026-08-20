/*
 * Client-side JS code.
 *
 * Authored by: Maya Venegas
 * Email: venegama@oregonstate.edu
 */

// Posts Array Set-up
var postsArray = [];

var section = document.getElementById("posts");
postsArray = Array.from(section.children);


// ******* Show, hide, and clear modal on user clicks *******

var sellButton = document.getElementById("sell-something-button");
sellButton.addEventListener("click", showModal);

// Shows modal and modal background
function showModal() {
    var modal = document.getElementById("sell-something-modal");
    modal.classList.remove("hidden");

    var modalBackdrop = document.getElementById("modal-backdrop");
    modalBackdrop.classList.remove("hidden");
    console.log("== SHOW modal ran");
}

var modalCloseButton = document.getElementById("modal-close");
modalCloseButton.addEventListener("click", hideModal);

var modalCancelButton = document.getElementById("modal-cancel");
modalCancelButton.addEventListener("click", hideModal);

// Hides modal and deletes input content when closed
function hideModal() {
    var modal = document.getElementById("sell-something-modal");
    modal.classList.add("hidden");

    var modalBackdrop = document.getElementById("modal-backdrop");
    modalBackdrop.classList.add("hidden");
        
    clearModalInputFields();
    console.log("== HIDE modal ran");
}

// Deletes input content from all input fields
function clearModalInputFields() {
    var postText = document.getElementById("post-text-input");
    postText.value = "";

    var postPhoto = document.getElementById("post-photo-input");
    postPhoto.value = "";

    var postPrice = document.getElementById("post-price-input");
    postPrice.value = "";

    var postCity = document.getElementById("post-city-input");
    postCity.value = "";

    // Different for condition
    var postConditionNew = document.getElementById("post-condition-new");
    postConditionNew.checked = true;
}

// ******* Add user ability to create new posts on the client *******

var modalAcceptButton = document.getElementById("modal-accept");
modalAcceptButton.addEventListener("click", addNewPost);

function addNewPost () {
// Verify input
if (userInputValid()){
    createNewPostStucture();
    addCityToDropdown();
    hideModal();
    console.log("== Post added to page 🙂‍↕️");
}
else {
console.log("== Post failed the vibe check 😞");
console.log("== Alerting user");
alert("Form incomplete: Please complete all fields before submitting :)");
}
}

function userInputValid () {
    var postText = document.getElementById("post-text-input").value;
    var postPhoto = document.getElementById("post-photo-input").value;
    var postPrice = document.getElementById("post-price-input").value;
    var postCity = document.getElementById("post-city-input").value;

    if(postText && postPhoto && postPrice && postCity){
        console.log("== Input looks mad valid 🫡");
        return true;
    } 
    console.log("== Input looks sus asf 🤨");
    return false;
}

function createNewPostStucture () {
var postTextInput = document.getElementById("post-text-input").value;
var postPhotoInput = document.getElementById("post-photo-input").value;
var postPriceInput = document.getElementById("post-price-input").value;
var postCityInput = document.getElementById("post-city-input").value;
var postConditionInput = document.querySelector('input[name="post-condition"]:checked').value;

// Create object + add object
var post = document.createElement("div");
// Add all classes and data
post.classList.add("post");
post.setAttribute("data-price", postPriceInput);
post.setAttribute("data-city", postCityInput);
post.setAttribute("data-condition", postConditionInput);
// Put it all together where it goes & add at the end of section
var posts = document.getElementById("posts");
posts.appendChild(post);

    var postContents = document.createElement("div");
    // Add all classes and data
    postContents.classList.add("post-contents");
    // Put it where it goes
    post.appendChild(postContents);

        var postImageContainer = document.createElement("div");
        // Add all classes and data
        postImageContainer.classList.add("post-image-container");
        // Put it where it goes
        postContents.appendChild(postImageContainer);

            var postImage = document.createElement("img");
            // Add all classes and data
            postImage.setAttribute("src", postPhotoInput);
            postImage.setAttribute("alt", postTextInput);
            // Put it where it goes
            postImageContainer.appendChild(postImage);

        var postInfoContainer = document.createElement("div");
        // Add all classes and data
        postInfoContainer.classList.add("post-info-container");
        // Put it where it goes
        postContents.appendChild(postInfoContainer);

            var postTitle = document.createElement("a");
            // Add all classes and data
            postTitle.setAttribute("href", "#");
            postTitle.classList.add("post-title");
            postTitle.textContent = postTextInput;
            // Put it where it goes
            postInfoContainer.appendChild(postTitle);
            
            var postPrice = document.createElement("span");
            // Add all classes and data
            postPrice.classList.add("post-price");
            postPrice.textContent = "$" + postPriceInput;
            // Put it where it goes
            postInfoContainer.appendChild(postPrice);

            var postCity = document.createElement("span");
            // Add all classes and data
            postCity.classList.add("post-city");
            var cityCapitalized = postCityInput.charAt(0).toUpperCase() + postCityInput.slice(1).toLowerCase();
            postCity.textContent = "(" + cityCapitalized + ")";
            // Put it where it goes
            postInfoContainer.appendChild(postCity);
    
    postsArray.push(post);
    console.log("== New post who dis 🙂‍↕️");
}

// ******* Support filtering posts on the client *******

var filterUpdateButton = document.getElementById("filter-update-button");
filterUpdateButton.addEventListener("click", filter);

// The user can specify any combination of multiple filters, and
// only posts that match all of the specified filters are displayed.
function filter () {
console.log("== Me when I'm filtering frfr");
// Reset DOM
refreshPosts();

// Get all filter values
var text = document.getElementById("filter-text").value;
var minPrice = document.getElementById("filter-min-price").value;
var maxPrice = document.getElementById("filter-max-price").value;
var city = document.getElementById("filter-city").value;

var condition = [];
condition = document.querySelectorAll('input[name="filter-condition"]:checked');

// End early if no filters selected
var currentCity = city.toLowerCase();
if(!text && !minPrice && !maxPrice && (currentCity === "any" || !currentCity) && (condition.length === 0)){
console.log("== No filters selected, returning early");
return;
}

//Each if loops and checks all items
if(text && (text.trim() !== "")){
    filterText(text);
}
if(minPrice){
    filterMinPrice(minPrice);
}
if(maxPrice){
    filterMaxPrice(maxPrice);
}
if((currentCity !== "any") && currentCity){
    filterCity(city);
}
if(condition.length > 0){
    filterCondition(condition);
}
}

// Re-set page to all created and new posts
function refreshPosts () {
// Clear all posts
var posts = document.getElementById("posts");
while (posts.firstChild) {
    posts.removeChild(posts.firstChild);
    }
// Each post in postArray is added to the page in order
for(var i = 0; i < postsArray.length; i++){
    posts.appendChild(postsArray[i]);}
}

//If the user enters text in the "text" filter, only posts that 
// contain that text as a substring (case-insensitive) are displayed.
function filterText (text) {
var posts = document.getElementById("posts");
var filterText = text.toLowerCase();
for(var i = 0; i < postsArray.length; i++){
    var title = postsArray[i].querySelector(".post-title").textContent.toLowerCase();
    if(!title.includes(filterText)){
        if(posts.contains(postsArray[i])){
            posts.removeChild(postsArray[i]);
        }
    }
}
console.log("== filterText ran");
}

// If the user enters a price in the minimum price filter, only posts 
// whose price is greater than or equal to the specified price are 
// displayed.
function filterMinPrice(minPrice) {
var posts = document.getElementById("posts");
for(var i = 0; i < postsArray.length; i++){
    var price = parseInt(postsArray[i].dataset.price);
    var minPriceInt = parseInt(minPrice);
    if(price < minPriceInt){
        if(posts.contains(postsArray[i])){
            posts.removeChild(postsArray[i]);
        }
    }
}
console.log("== filterMinPrice ran");
}

// If the user enters a price in the maximum price filter, only posts 
// whose price is less than or equal to the specified price are
// displayed. 
function filterMaxPrice(maxPrice){
var posts = document.getElementById("posts");
for(var i = 0; i < postsArray.length; i++){
    var price = parseInt(postsArray[i].dataset.price);
    var maxPriceInt = parseInt(maxPrice);
    if(price > maxPriceInt){
        if(posts.contains(postsArray[i])){
            posts.removeChild(postsArray[i]);
        }
    }
}
console.log("== filterMaxPrice ran");
}

// If the user selects a city in the filters, only posts with a matching 
// city (case-insensitive) are displayed.
function filterCity(city){
var posts = document.getElementById("posts");
for(var i = 0; i < postsArray.length; i++){
    var currentCity = postsArray[i].dataset.city.toLowerCase();
    var filterCity = city.toLowerCase();
    if(currentCity !== filterCity){
        if(posts.contains(postsArray[i])){
            posts.removeChild(postsArray[i]);
        }
    }
}
console.log("== filterCity ran");
}

// If the user selects any of the "condition" options in the filters, 
// only posts that match the selected conditions are displayed.
function filterCondition(condition){
var posts = document.getElementById("posts");
for(var i = 0; i < postsArray.length; i++){
    var matches = false;
    var currentCondition = postsArray[i].dataset.condition.toLowerCase();
    for(var j = 0; j < condition.length; j++){ 
        var filterCondition = condition[j].value.toLowerCase();
        if(currentCondition === filterCondition){
            matches = true;
            break;
        }
    }
    if(!matches){
        if(posts.contains(postsArray[i])){
            posts.removeChild(postsArray[i]);
        }
    }
}
console.log("== filterCondition ran");
}


// ******* Extra credit: adding new cities *******\
var cityArray = [];

var cityFilterElement = document.getElementById("filter-city");
var cityOptions = cityFilterElement.querySelectorAll("option");
for(var i = 0; i < cityOptions.length; i++){
    cityArray.push(cityOptions[i].value.toLowerCase());
}

// Called after createNewPostStructure() before hideModal()
function addCityToDropdown () {
// Check first that it's not a duplicate
var postCityInput = document.getElementById("post-city-input").value.toLowerCase();
for(var i = 0; i < cityArray.length; i++){
    if(cityArray[i] === postCityInput){
        return;
    }
}

// Create option
var newFilterOption = document.createElement("option");
// Capitalize first letter
var cityCapitalized = postCityInput.charAt(0).toUpperCase() + postCityInput.slice(1);
// Add user input to new option from user's post creation
newFilterOption.textContent = cityCapitalized;
newFilterOption.value = postCityInput;

// Add to cityArray
cityArray.push(postCityInput);

// Add option to the filter element on web page
var cityFilterElement = document.getElementById("filter-city");
cityFilterElement.appendChild(newFilterOption);
console.log("== Added city to the list!");
}