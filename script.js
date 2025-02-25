document.addEventListener("DOMContentLoaded", function () {
    const numOptionsForm = document.getElementById("numOptionsForm");
    const optionsForm = document.getElementById("optionsForm");
    const optionsContainer = document.getElementById("optionsContainer");
    const numOptionsSelect = document.getElementById("numOptions");
    const box = document.getElementById("box");
    const spinButton = document.getElementById("spinButton");

    let options = [];

    // Step 1: Choose Number of Options
    numOptionsForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const numOptions = parseInt(numOptionsSelect.value, 10);
        generateInputFields(numOptions);
    });

    // Step 2: Generate Input Fields for Words
    function generateInputFields(num) {
        optionsContainer.innerHTML = ""; 
        options = new Array(num).fill("");

        for (let i = 0; i < num; i++) {
            const input = document.createElement("input");
            input.type = "text";
            input.placeholder = `Option ${i + 1}`;
            input.dataset.index = i;
            input.addEventListener("input", function (e) {
                options[e.target.dataset.index] = e.target.value;
            });
            optionsContainer.appendChild(input);
        }
        optionsForm.style.display = "block";
    }

    // Step 3: Update the Wheel with Custom Options
    optionsForm.addEventListener("submit", function (event) {
        event.preventDefault();
        updateWheel();
    });

    function updateWheel() {
        let num = options.length;
        let colors = ["red", "yellow", "blue", "green", "purple", "orange", "pink", "cyan"];
        let gradient = options
            .map((opt, index) => `${colors[index % colors.length]} ${(index / num) * 360}deg ${(index + 1) / num * 360}deg`)
            .join(", ");
        box.style.background = `conic-gradient(${gradient})`;

        // Remove old text elements if they exist
        document.querySelectorAll(".wheel-text").forEach(el => el.remove());

        // Add new text elements
        for (let i = 0; i < num; i++) {
            let textElement = document.createElement("div");
            textElement.classList.add("wheel-text");
            textElement.innerText = options[i];

            let angle = (360 / num) * i;
            let x = Math.cos((angle - 90) * (Math.PI / 180)) * 100;
            let y = Math.sin((angle - 90) * (Math.PI / 180)) * 100;

            textElement.style.transform = `translate(${x}px, ${y}px) rotate(${angle}deg)`;
            box.appendChild(textElement);
        }
    }

    // Step 4: Spin the Wheel
    function rotateFunction() {
        var min = 1024;
        var max = 9999;
        var deg = Math.floor(Math.random() * (max - min)) + min;
        box.style.transition = "transform 5s ease-out";
        box.style.transform = `rotate(${deg}deg)`;
    }

    spinButton.addEventListener("click", rotateFunction);
});
