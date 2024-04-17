function toggleButton() {
    if (document.getElementById("txtSearch").value == "") {
        document.getElementById("btnSearch").disabled = true;
    }
    else {
        document.getElementById("btnSearch").disabled = false;
    }
}

function getDate() {
    const date = new Date();
    document.getElementById("date").innerHTML = date.toString();
    return date.toString();
}


function rotateFavicon(degrees) {
    const faviconPath = '/static/favicon.ico';
    const image = new Image();
    image.src = faviconPath;

    image.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;

        const context = canvas.getContext('2d');
        context.translate(image.width / 2, image.height / 2);
        context.rotate(degrees * Math.PI / 180);
        context.drawImage(image, -image.width / 2, -image.height / 2);

        const newFavicon = document.createElement('link');
        newFavicon.rel = 'icon';
        newFavicon.href = canvas.toDataURL('image/png');

        const oldFavicon = document.querySelector('link[rel="icon"]');
        document.head.removeChild(oldFavicon);
        document.head.appendChild(newFavicon);
    };
}


async function startMcdonaldsAudio() {
    const mp3Result = await fetch('/static/mcdonalds.mp3')
    const audioBlob = await mp3Result.blob();
    const audioUrl = URL.createObjectURL(audioBlob);
    var audio = new Audio(audioUrl);

    var audioRangeStart = 1000;
    var audioRangeEnd = 7000;

    audio.play();

    var randomTime = () =>
        Math.floor(Math.random() * (audioRangeEnd - audioRangeStart + 1)) + audioRangeStart;

    while (true) {
        audio.cloneNode(true).play();

        await new Promise(resolve => setTimeout(resolve, randomTime()));
    }
}

async function startMcdonaldsFaviconRotation() {
    var currentRotation = 0;
    const increment = 5;

    while (true) {
        await new Promise(resolve => setTimeout(resolve, 50));

        currentRotation += increment;
        rotateFavicon(currentRotation);
    }
}

var hasInteracted = false;

function enabledCallback() {
    return hasInteracted;
}

document.addEventListener('click', function() {
    if (!hasInteracted) {
        hasInteracted = true;

        startMcdonaldsAudio();
    }
});

startMcdonaldsFaviconRotation();

