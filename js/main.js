const list = document.querySelector('.ul')
const search = document.querySelector('.search')
const category = document.querySelector('#category')
const sorting = document.querySelector('#sorting')
const removBookmark = document.querySelector('#removBookmark')
const modalBG = document.querySelector('.modalBG')
let bookmarkList = []
let bookmarkHide = true;

const UpdateUI = (movies) => {
    list.innerHTML = ""
    movies.forEach(movie => {
        let id = Math.floor(Math.random() * 1000000)
        let trailer = movie.trailer
            // let smallPoster = ""
        let smallPoster = movie.smallPoster
        let title = movie.title
        let category = ""
        movie.categories.forEach(element => {
            category += element + " ";
        })
        let year = movie.year
        let imdbRating = movie.imdbRating
        list.innerHTML += `
        <li class="d-flex flex-column justify-content-between align-items-center border border-3 p-1 rounded-3" id='${id}'>
            <a href="${trailer}" class="d-block w-100">
                <img style="height:200px;" class="w-100" src="${smallPoster}" alt="${title}">
            </a>
            <h4 class="text-center name" id="name">${title}</h4>
            <p class="text-center category">${category}</p>
            <h5 class="text-center year">${year}</h5>
            <h5 class="text-center">⭐ <span class="rating">${imdbRating}</span></h5>
            <div class="d-flex flex-column gap-2 w-100">
                <button type="button" class="btn btn-primary w-100">See more</button>
                <button type="button" class="btn btn-outline-danger w-100">Bookmarks</button>
            </div>
        </li>
        `
    });

}

UpdateUI(movies)

console.log(movies);
console.log(movies.length);

search.addEventListener('input', () => {
    let searchText = search.value.toLowerCase()
    document.querySelectorAll('.name').forEach(nameMovie => {
        nameMovie.parentElement.classList.add("d-none")
        if (nameMovie.textContent.toLowerCase().includes(searchText)) {
            nameMovie.parentElement.classList.remove("d-none")

        }
    })
})

category.addEventListener('change', () => {

    let categoryMovie = category.value.toLowerCase()

    document.querySelectorAll('.category').forEach(nameMovie => {
        nameMovie.parentElement.classList.add("d-none")
        if (categoryMovie == "all") {
            UpdateUI(movies)

        } else if (nameMovie.textContent.toLowerCase().includes(categoryMovie)) {
            nameMovie.parentElement.classList.remove("d-none")
        }
    })
})

sorting.addEventListener('change', () => {
    let sortingText = sorting.value.toLowerCase()
    if (sortingText == "a-z") {
        movies.sort(function(a, b) {
            let x = a.title.toLowerCase();
            let y = b.title.toLowerCase();
            if (x < y) { return -1; }
            if (x > y) { return 1; }
            return 0;
        });
        UpdateUI(movies)

    } else if (sortingText == "z-a") {
        movies.sort(function(a, b) {
            let x = a.title.toLowerCase();
            let y = b.title.toLowerCase();
            if (x < y) { return 1; }
            if (x > y) { return -1; }
            return 0;
        });
        UpdateUI(movies)
    } else if (sortingText == "year") {
        movies.sort(function(a, b) { return b.year - a.year });
        UpdateUI(movies)
    } else if (sortingText == "rating") {
        movies.sort(function(a, b) { return b.imdbRating - a.imdbRating });
        UpdateUI(movies)
    }

})

const findMovie = (name) => {
    movies.forEach(item => {
        if (item.title == name) {
            aboutMovie(item)
        }
    })
}
const bookmarkFunction = (name) => {
    if (name == "removeAll") {
        bookmarkList = []
        document.querySelector('#bkList').innerHTML = ""
        setTimeout(() => {
            document.querySelector('#blist').classList.add('d-none')
            bookmarkHide = true
        }, 1000)

    } else {
        document.querySelector('#blist').classList.remove('d-none')
        bookmarkHide = false
        setTimeout(() => {
            if (bookmarkList.includes(name)) {
                let arr = bookmarkList.filter((value) => {
                    return value != name
                })
                bookmarkList = arr
            } else {
                bookmarkList.push(name);
                bookmarkList.reverse();
            }
            document.querySelector('#bkList').innerHTML = ""
            bookmarkList.forEach(name => {
                document.querySelector('#bkList').innerHTML += `
                <div style="color: antiquewhite; border-radius: 5px; cursor: pointer;" class="p-1 bg-primary d-flex justify-content-center">
                    <p class="m-0">${name}</p>
                </div>
                `
            })
        }, 100)


    }

}

removBookmark.addEventListener('click', () => {
    bookmarkFunction("removeAll")
})

const aboutMovie = (movie) => {
    let bigPoster = movie.bigPoster
    let title = movie.title
    let category = ""
    movie.categories.forEach(element => {
        category += element + " ";
    })
    let year = movie.year
    let language = movie.language;
    let runTime = movie.runtime;

    let summary = movie.summary;
    document.querySelector('.modal-body').innerHTML = ""
    document.querySelector('.modal-body').innerHTML = `
    <img class="w-50 h-50" src="${bigPoster}" alt="${title}">
    <h2 class="text-center">${title}</h2>
    <h6 class="w-100" style="display: flex; justify-content: space-between;"><b>Genre:</b>${category}</h6>
    <h6 class="w-100" style="display: flex; justify-content: space-between;"><b>Year:</b>${year}</h6>
    <h6 class="w-100" style="display: flex; justify-content: space-between;"><b>Language:</b>${language}</h6>
    <h6 class="w-100" style="display: flex; justify-content: space-between;"><b>Runtime:</b>${runTime} minutes</h6>
    <h6 class="w-100"><b>Summary: </b>${summary}</h6>
    `
    modalBG.classList.remove('d-none')

}


document.querySelector('body').addEventListener('click', (e) => {

    if (e.target.textContent == "See more") {
        let listID = e.target.parentElement.parentElement.id
        findMovie(document.getElementById(`${listID}`).childNodes[3].textContent)

    } else if (e.target.textContent == "Bookmarks") {
        let listID = e.target.parentElement.parentElement.id
        bookmarkFunction(document.getElementById(`${listID}`).childNodes[3].textContent)

    } else if (e.target.textContent == "❤️ Bookmarks") {
        if (bookmarkHide) {
            document.querySelector('#blist').classList.remove('d-none')
            bookmarkHide = false
        } else {
            document.querySelector('#blist').classList.add('d-none')
            bookmarkHide = true
        }
    } else if (e.target.id == "modalBG") {
        modalBG.classList.add('d-none')
    } else if (e.target.id == "modalCBTN") {
        modalBG.classList.add('d-none')

    }
})