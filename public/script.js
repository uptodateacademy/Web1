
//Website Header Navigation
const bar = document.getElementById("bar"),
    headerLinks = document.getElementById("a-links"),
    xHeader = document.getElementById("x-header");


bar.addEventListener("click", (event) => {
    if (headerLinks.classList.contains("hidden") && xHeader.classList.contains("hidden")) {
        headerLinks.classList.remove("hidden");
        xHeader.classList.remove("hidden");
    } else {
        headerLinks.classList.add("hidden");
        xHeader.classList.add("hidden");
    }
});

//Loads article on page load;
window.addEventListener("load", (event) => {
    getHomePost();
    getMostPopularNews();
    getSportsNews();
    getCelebrityNews();
});

//I just made a change to this API KEY
const apiKey = "a7fd589a7e0d44fda3b896c9789ec353";

//This functions gets the default home articles
async function getHomePost(count = 10) {
    const randomCountry = Math.floor(Math.random() * countryCodes.length);
    let result = countryCodes[randomCountry];
    const url = `https://newsapi.org/v2/top-headlines?country=${result}&apiKey=${apiKey}`;

    try {
        const fetchPost = await fetch(url);
        const postJson = await fetchPost.json();
        const postData = await postJson;

        let author,
            content,
            description,
            title,
            urlToImage

        const { articles } = postData;

        for (var i = 0; i < count; i++) {

            //Gets the author
            author = document.createElement("span");
            author.textContent = articles[i].author;

            //Gets the content
            content = document.createElement("p");
            content.textContent = articles[i].content;

            //Gets the description
            description = document.createElement("p");
            let strSlice = articles[i].description;
            strSlice = new String(strSlice);
            if (strSlice.length > 100) {
                strSlice = strSlice.slice(0, -50);
            } else {
                strSlice = strSlice.slice(0, -25);
            }
            description.textContent = strSlice + ".........";

            //Gets the title
            title = document.createElement("a");
            title.textContent = articles[i].title;
            title.setAttribute("target", "_blank");
            title.href = articles[i].url;

            //Gets the url to image
            urlToImage = document.createElement("img");
            urlToImage.src = articles[i].urlToImage;

            //callback function
            cbFunc(author, content, description, title, urlToImage);
        };

    } catch (err) {
        openPostLoader(image404);
    }


};

//Function to Get Most Popular News
async function getMostPopularNews() {

    const url = 'https://newsapi.org/v2/top-headlines?' + 'country=us&' + 'apiKey=' + apiKey;
    const mostPopular = document.querySelectorAll("#mostPopular");

    try {
        const fetchData = await fetch(url);
        const dataToJson = await fetchData.json();
        const getData = await dataToJson;

        const { articles } = getData;

        for (var i = 0; i < 5; i++) {


            const title = document.createElement("a");
            const img = document.createElement("img");
            const url = document.createElement("a");
            url.setAttribute("target", "_blank");

            let strTitle;

            if (articles[i].title.toString().length > 100) {
                strTitle = articles[i].title.toString().slice(0, -50);
            } else {
                strTitle = articles[i].title.toString().slice(0, -25);
            }

            title.textContent = strTitle + "....." || "Network Error";
            img.src = articles[i].urlToImage || "Network Error.png";
            url.href = articles[i].url;
            title.href = url;

            const post = mostPopular[i];
            const mostPopularTitle = post.querySelector("#mostPopularTitle");
            const mostPopularEngagement = mostPopularTitle.querySelector("#mostPopularEngagement");
            post.append(img);
            mostPopularTitle.append(title);
            post.insertBefore(img, mostPopularTitle);
            mostPopularTitle.insertBefore(title, mostPopularEngagement);
        };
    } catch (error) {
        if (error.message === "Failed to fetch") {
            const mostPopularContainer = document.getElementById("mostPopularContainer");
            mostPopularContainer.innerHTML = "No Internet Connection " + error;
        } else {
            return;
        };
    };

};


//Function to The Get Sports News
async function getSportsNews() {
    const url = `https://newsapi.org/v2/top-headlines?q=sport&apiKey=${apiKey}`;
    const sportsNews = document.querySelectorAll("#sportsNews");

    try {
        const fetchData = await fetch(url);
        const dataToJson = await fetchData.json();
        const getData = await dataToJson;

        const { articles } = getData;

        for (var i = 0; i < 5; i++) {

            const title = document.createElement("a");
            const img = document.createElement("img");
            const url = document.createElement("a");
            url.setAttribute("target", "_blank");

            let strTitle;
            if (articles[i].title.toString().length > 50) {
                strTitle = articles[i].title.toString().slice(0, -40);
            } else {
                strTitle = articles[i].title;
            };

            title.textContent = strTitle + "....." || "Network Error";
            img.src = articles[i].urlToImage || "Network Error.png";
            url.href = articles[i].url;
            title.href = url;

            const post = sportsNews[i];
            const innerSportsNews = post.querySelector("#innerSportsNews");
            const sportsEngagement = innerSportsNews.querySelector("#sportsEngagement");
            post.append(img);
            innerSportsNews.append(title);
            post.insertBefore(img, innerSportsNews);
            innerSportsNews.insertBefore(title, sportsEngagement);
        };
    } catch (error) {
        if (error.message === "Failed to fetch") {
            const sportsNewsContainer = document.getElementById("sportsNewsContainer");
            sportsNewsContainer.innerHTML = "No Internet Connection: " + error.message
        } else {
            return;
        };

    };
};

//Function to Get The Celebrity News
async function getCelebrityNews() {
    const url = `https://newsapi.org/v2/top-headlines?q=celeb&apiKey=${apiKey}`;
    const celebrityPost = document.querySelectorAll("#celebrityPost");
    try {
        const fetchData = await fetch(url);
        const dataToJson = await fetchData.json();
        const getData = await dataToJson;

        const { articles } = getData;

        for (var i = 0; i < 10; i++) {

            const title = document.createElement("a");
            const img = document.createElement("img");
            const url = document.createElement("a");
            url.setAttribute("target", "_blank");

            let strTitle;
            if (articles[i].title.toString().length > 50) {
                strTitle = articles[i].title.toString().slice(0, -20);
            } else {
                strTitle = articles[i].title;
            };

            title.textContent = strTitle + "....." || "Network Error";
            img.src = articles[i].urlToImage || "Network Error.png";
            url.href = articles[i].url;
            title.href = url;

            const post = celebrityPost[i];
            const innerCelebrityPost = post.querySelector("#innerCelebrityPost");
            const celebrityEngagement = innerCelebrityPost.querySelector("#celebrityEngagement");
            post.append(img);
            innerCelebrityPost.append(title);
            post.insertBefore(img, innerCelebrityPost);
            innerCelebrityPost.insertBefore(title, celebrityEngagement);
        };

    } catch (error) {
        if (error.message === "Failed to fetch") {
            const celebrityContainer = document.getElementById("celebrityContainer");
            celebrityContainer.innerHTML = "No Internet Connection: " + error.message;
        } else {
            return;
        };
    };
};

//Get all country codes
const AllcountryCodes = ["ae", "ar", "at", "au", "be", "bg", "br", "ca", "ch", "cn", "co", "cu", "cz", "de", "eg", "fr", "gb", "gr", "hk", "hu", "id", "ie", "il", "in", "it", "jp", "lt", "lv", "ma", "mx", "my", "ng", "nl", "no", "nz", "ph", "pl", "pt", "ro", "rs", "ru", "sa", "se", "sg", "si", "sk", "th", "tr", "tw", "ua", "us", "ve", "za"];

const countryCodes = ["in", "us"];

let image404 = document.createElement("img");
image404.src = "img/404.jpg";
let loaderImage = document.createElement("img");
loaderImage.src = "img/loading.gif";




//This function appends the fetched data from the default getHomefunc
function cbFunc(author, content, description, title, urlToImage) {
    const docs = document.createElement("div");
    const docsImg = document.createElement("div");
    const docsText = document.createElement("div");
    docsImg.append(urlToImage);
    docsText.append(title, description);
    docs.classList.add("each-post");
    docs.append(docsImg, docsText);
    const innerPostBody = document.getElementById("innerPostBody");
    innerPostBody.append(docs);
    const outerPostBody = document.getElementById("outerPostBody");
    outerPostBody.appendChild(innerPostBody);
};

//Insert all the country array into the datalist or into the search news input country datalist;
AllcountryCodes.forEach((country) => {
    let option = document.createElement("option");
    option.value = country.toString().toUpperCase();
    let datalist = document.getElementById("dataCountry");
    datalist.append(option);
});


const postBtn = document.getElementById("postBtn"),
    postCountry = document.getElementById("postCountry"),
    postSearch = document.getElementById("postSearch");

//This function gets the post on search
async function getPostOnSearch() {
    if (postSearch.value === "" || postCountry.value === "") {
        alert("Please insert a keyword or a country");
        return;
    } else {
        let keyword = postSearch.value.toString().toLowerCase(),
            country = postCountry.value.toString().toLowerCase(),
            url = `https://newsapi.org/v2/top-headlines?q=${keyword}&country=${country}&apiKey=${apiKey}`;

        try {
            const fetchPost = await fetch(url);
            const parseJson = await fetchPost.json();
            const fetchResult = await parseJson;
            console.log(fetchResult)

            let author,
                content,
                description,
                title,
                urlToImage;

            const { articles } = fetchResult;
            if (articles.length > 0) {
                const innerPostBody = document.getElementById("innerPostBody");
                innerPostBody.innerHTML = ""

                for (var i = 0; i < articles.length; i++) {
                    //Gets the description
                    let strSlice;
                    description = document.createElement("p");
                    if (articles[i].description === "") {
                        strSlice = "Post Description is not available at the moment........";
                    } else {
                        strSlice = articles[i].description;
                        strSlice = new String(strSlice);
                        if (strSlice.length > 100) {
                            strSlice = strSlice.slice(0, -50);
                        } else {
                            strSlice = strSlice.slice(0, -25);
                        };
                        description.textContent = strSlice + ".........";
                    };

                    //Gets the title
                    title = document.createElement("a");
                    title.textContent = articles[i].title;
                    title.href = articles[i].url;

                    //Gets the url to image
                    urlToImage = document.createElement("img");
                    if (articles[i].urlToImage === null) {
                        urlToImage.src = "";
                    } else {
                        urlToImage.src = articles[i].urlToImage;
                    }
                    cbFunc(author, content, description, title, urlToImage);
                };
            } else {
                const innerPostBody = document.getElementById("innerPostBody");
                innerPostBody.innerHTML = "No available result in your search term. Try searching another keyword."
            }

        } catch (err) {
            openPostLoader(image404)
        };
    };
};

postBtn.addEventListener("click", getPostOnSearch)

//Opens Post Loader
function openPostLoader(loader) {
    let div = document.createElement("div");
    div.classList.add("show-loader");
    div.append(loader);
    const outerPostBody = document.getElementById("outerPostBody");
    outerPostBody.innerHTML = "";
    outerPostBody.append(div)
};

//Closes Post Loader
function closePostLoader(loader) {
    let div = document.querySelector(".show-loader");
    const outerPostBody = document.getElementById("outerPostBody");
    outerPostBody.remove(div)
}

//This below code Automatically change the background image but I did not use it but it still works;

// let imgArray = ["img/bg1.webp", "img/bg2.webp", "img/bg3.webp", "img/bg4.webp", "img/bg5.webp"];
// let imgCount = 0;
// const bgImage = document.getElementById("bgImage");

// function changeBgImage() {
//     imgCount++;
//     if (imgCount >= imgArray.length) {
//         imgCount = 0;
//     }

//     bgImage.src = imgArray[imgCount];
//     console.log(bgImage)
// }

// setInterval(changeBgImage, 10000)


//Get Top Headlines about Trump: https://newsapi.org/v2/top-headlines?q=trump&apiKey=a7fd589a7e0d44fda3b896c9789ec353