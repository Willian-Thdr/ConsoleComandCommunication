import "../Style/index.css";

const title = document.getElementById("startTitle");
const nameEntry = document.getElementById("nameEntry") as HTMLTextAreaElement;

setInterval(() => {
    if (!filterSpaces(nameEntry.value)) {
        title.textContent = "Welcome..."
    } else {
        title.textContent = `Welcome ${nameEntry.value}`;
    }

    textAdjust();
});

nameEntry.addEventListener("keydown", (event: KeyboardEvent) => {
    if (event.ctrlKey && event.key === "Enter") {
        event.preventDefault();
        nameEntry.value += "\n";
        console.log(nameEntry.value);
    } 
    else if (event.key === "Enter") {
        event.preventDefault();
        nameEntry.blur();
    }
});


// Métodos
function filterSpaces(text: string) : boolean {
    return text.trim().length > 0;
};

function getTextLength(text: string) : number {
    return text.length;
};

function textAdjust() {
    if (nameEntry) {
        nameEntry.addEventListener("input", () => {
            nameEntry.style.width = "150px";
            nameEntry.style.whiteSpace = "nowrap";

            const cWidth = nameEntry.scrollWidth;

            nameEntry.style.width = `${cWidth}px`

            if (cWidth >= 300) {
                nameEntry.style.width = `${300}px`;
                nameEntry.style.whiteSpace = "pre-wrap";
                nameEntry.style.overflowX = "auto"
            } else {
                nameEntry.style.width = `${Math.max(150, cWidth)}px`;
                nameEntry.style.overflowY = "hidden";
            }
        });
    };
};