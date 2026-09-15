const title = document.getElementById("startTitle");
const nameEntry = document.getElementById("nameEntry");
const buttonMessage = document.getElementById("OpenConsoleMessage");

let textName = "null";

setInterval(() => {
    if (!filterSpaces(nameEntry.value)) {
        title.textContent = "Welcome...";
    }

    textAdjust();
});

nameEntry.addEventListener("keydown", (event) => {
    if (event.ctrlKey && event.key === "Enter") {
        event.preventDefault();
        nameEntry.value += "\n";
        console.log(nameEntry.value);
    } 
    else if (event.key === "Enter") {
        event.preventDefault();
        textName = nameEntry.value;
        title.textContent = `Welcome ${textName}`;
        setName();
        nameEntry.blur();
    }
});

// Métodos
function filterSpaces(text) {
    return text.trim().length > 0;
}

function getTextLength(text) {
    return text.length;
}

function textAdjust() {
    if (nameEntry) {
        nameEntry.addEventListener("input", () => {
            nameEntry.style.width = "150px";
            nameEntry.style.whiteSpace = "nowrap";

            const cWidth = nameEntry.scrollWidth;

            nameEntry.style.width = `${cWidth}px`;

            if (cWidth >= 300) {
                nameEntry.style.width = "300px";
                nameEntry.style.whiteSpace = "pre-wrap";
                nameEntry.style.overflowX = "auto";
            } else {
                nameEntry.style.width = `${Math.max(150, cWidth)}px`;
                nameEntry.style.overflowY = "hidden";
            }
        });
    }
}

// frontend to server
window.addEventListener("error", (event) => {
    fetch("/api/client-error", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: event.message,
            filename: event.filename,
            line: event.lineno,
            column: event.colno,
            stack: event.error?.stack
        })
    });
});

function setName() {
    fetch("/api/user-infos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: textName
        })
    });
}
