const scanPage = document.getElementById("scanPage");
const reportPage = document.getElementById("reportPage");

const imageInput = document.getElementById("imageInput");
const scanBtn = document.getElementById("scanBtn");

const result = document.getElementById("result");
const score = document.getElementById("score");

function showScan() {
    scanPage.classList.remove("hidden");
    reportPage.classList.add("hidden");
}

function showReport() {
    reportPage.classList.remove("hidden");
    scanPage.classList.add("hidden");
}

scanBtn.addEventListener("click", async () => {

    if (!imageInput.files.length) {
        alert("Please select an image.");
        return;
    }

    scanBtn.disabled = true;
    scanBtn.innerHTML = "Scanning...";

    const formData = new FormData();
    formData.append("image", imageInput.files[0]);

    try {

        const res = await fetch("/api/scan", {
            method: "POST",
            body: formData
        });

        const data = await res.json();

        result.classList.remove("hidden");

        score.innerHTML = `
        <strong>Status:</strong> ${data.status || "Ready"} <br>
        <strong>Trust Score:</strong> ${data.trustScore || 0}% <br>
        <strong>AI Probability:</strong> ${data.aiProbability || 0}%
        `;

    } catch (err) {

        alert("Scan failed.");

    }

    scanBtn.disabled = false;
    scanBtn.innerHTML = "Scan Image";

});
