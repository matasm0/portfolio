const body = document.getElementsByTagName("body")[0];
const modal = document.createElement("div");
modal.id = "modal";
modal.addEventListener("click", e => {
    closeModal();
});

// Thank you to https://stackoverflow.com/a/4770179
// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {37: 1, 38: 1, 39: 1, 40: 1, 32: 1, 33: 1, 34: 1, 35: 1, 36: 1};

function preventDefault(e) {
    e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
    window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
        get: function () { supportsPassive = true; } 
    }));
} catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {
    window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
    window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
    window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
    window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
    window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.removeEventListener(wheelEvent, preventDefault, wheelOpt); 
    window.removeEventListener('touchmove', preventDefault, wheelOpt);
    window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}


function openModal(img) {
    disableScroll();
    body.appendChild(modal);
    const tempImg = document.createElement("img");
    tempImg.src = img.src;
    tempImg.addEventListener("click", e => e.stopPropagation());
    modal.appendChild(tempImg);
}

function closeModal() {
    enableScroll();
    body.removeChild(modal);
    modal.innerHTML = "";
}

const imgs = document.getElementsByTagName("img");
for (const img of imgs) {
    img.addEventListener("click", e => {
        openModal(e.target);
    });
}