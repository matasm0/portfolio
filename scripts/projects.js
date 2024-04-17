const filters = document.getElementsByClassName("filter");
const toggledOn = new Set();
toggledOn.add("All");
const allFilters = {};

for (const filter of filters)
    allFilters[filter.value] = filter;

function toggleFilter(val) {
    if (val == "All") {
        if (!toggledOn.has("All")) {
            for (const filter of Object.keys(allFilters)) {
                allFilters[filter].classList.remove("active");
            }
            toggledOn.clear();
            toggledOn.add("All");
            allFilters["All"].classList.add("active");
        }
    }
    else {
        if (allFilters[val].classList.contains("active")) {
            toggledOn.delete(val);
            allFilters[val].classList.remove("active");
            if (toggledOn.size == 0) {
                toggledOn.add("All");
                allFilters["All"].classList.add("active");
            }
        }
        else {
            if (toggledOn.has("All")) {
                toggledOn.delete("All");
                allFilters["All"].classList.remove("active");
            }
            toggledOn.add(val);
            allFilters[val].classList.add("active");
        }
    }
    updateView();
}

function updateView() {
    const cards = document.getElementsByClassName("project-card");
    let numCards = 0;
    
    if (toggledOn.has("All")) {
        for (const card of cards) {
            card.classList.add("show");
            numCards += 1;
        }

    }

    else {
        for (const card of cards) {
            let hasAll = true;
            for (const val of [...toggledOn.values()]) {
                if (!card.classList.contains(val)) {
                    hasAll = false;
                    break;
                }
            }
            if (hasAll) {
                numCards += 1;
                card.classList.add("show");
            }
            else {
                card.classList.remove("show");
            }
        }
    }

    if (numCards == 0) {
        document.getElementsByClassName("project-list")[0].classList.add("empty");
    }
    else
        document.getElementsByClassName("project-list")[0].classList.remove("empty");
}

for (const filter of filters) {   
    filter.addEventListener("click", e => {
        toggleFilter(e.target.value);
    });
}

updateView();