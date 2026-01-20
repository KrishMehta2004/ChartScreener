document.addEventListener("DOMContentLoaded", () => {
    const fileWrappers = document.querySelectorAll(".file-card-wrapper");

    fileWrappers.forEach((wrapper) => {
        requestAnimationFrame(() => {
            wrapper.classList.add("animate-in");
        });
    });
});