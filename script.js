let highestZIndex = 1; // Keeps track of which window should be on top

// --- Window Controls ---
function openWindow(id) {
  const win = document.getElementById(id);
  win.style.display = "block"; // Show the window
  bringToFront(win);
}

function closeWindow(id) {
  document.getElementById(id).style.display = "none"; // Hide the window
  // (Since we have no taskbar, minimize and close do the same thing: hide the window)
}

function maximizeWindow(id) {
  const win = document.getElementById(id);
  win.classList.toggle("maximized"); // Toggles fullscreen CSS class
  bringToFront(win);
}

function bringToFront(win) {
  highestZIndex += 1;
  win.style.zIndex = highestZIndex;
}

// --- Dragging Logic ---
const windows = document.querySelectorAll(".window");

windows.forEach((win) => {
  const header = win.querySelector(".window-header");
  let isDragging = false;
  let offsetX, offsetY;

  // Bring to front if you click anywhere on the window
  win.addEventListener("mousedown", () => bringToFront(win));

  // Start dragging from the header
  header.addEventListener("mousedown", (e) => {
    // Don't drag if clicking the control buttons
    if (e.target.tagName === "BUTTON") return;

    isDragging = true;
    offsetX = e.clientX - win.offsetLeft;
    offsetY = e.clientY - win.offsetTop;
  });

  // Move the window
  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    // Prevent dragging if maximized
    if (win.classList.contains("maximized")) return;

    win.style.left = `${e.clientX - offsetX}px`;
    win.style.top = `${e.clientY - offsetY}px`;
  });

  // Stop dragging
  document.addEventListener("mouseup", () => {
    isDragging = false;
  });
});
