let day = 0;

export async function incrementDay() {
    day++;
    updateCounter();
}

function updateCounter() {
    const counterEl = document.getElementById("counter");
    if (!counterEl) return;
    counterEl.innerText = `${day} day${day !== 1 ? 's' : ''}`;
}

setInterval(updateCounter, 1000);
