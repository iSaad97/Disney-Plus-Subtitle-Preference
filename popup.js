function hexToRGB(hex, alpha) {
  var r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
  } else {
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }
}

let local_fontSize = localStorage.getItem("fontSize");
let local_subtitleColor = localStorage.getItem("subtitleColor");
let local_subtitleBackgroundColor = localStorage.getItem(
  "subtitleBackgroundColor"
);
let local_transparent_background = localStorage.getItem(
  "transparent_background"
);

if (local_fontSize) {
  document.querySelector("#fontSize").value = local_fontSize;
}
if (local_subtitleColor) {
  document.querySelector("#subtitle_color").value = local_subtitleColor;
}
if (local_subtitleBackgroundColor) {
  document.getElementById("subtitle_background_color").value =
    local_subtitleBackgroundColor;
}
if (local_transparent_background) {
  console.log(local_transparent_background);
  console.log(typeof local_transparent_background);
  document.getElementById("transparent_background").checked =
    local_transparent_background == "false" ? false : true;
}

document.querySelector("#submit-btn").addEventListener("click", () => {
  // read the colour that the user has selected
  const fontSize = document.querySelector("#fontSize").value;
  const subtitleColor = document.querySelector("#subtitle_color").value;
  const subtitleBackgroundColorHex = document.getElementById(
    "subtitle_background_color"
  ).value;
  const subtitleBackgroundColor = hexToRGB(subtitleBackgroundColorHex, 0.8);
  const transparent_background = document.getElementById(
    "transparent_background"
  ).checked;

  localStorage.setItem("fontSize", fontSize);
  localStorage.setItem("subtitleColor", subtitleColor);
  localStorage.setItem("subtitleBackgroundColor", subtitleBackgroundColorHex);
  localStorage.setItem("transparent_background", transparent_background);

  // get all the google tabs and send a message to their tabs

  chrome.tabs.query({ url: "https://*.disneyplus.com/*" }, (tabs) => {
    console.log(tabs);
    tabs.forEach((tab) =>
      chrome.tabs.sendMessage(tab.id, {
        fontSize,
        subtitleColor,
        subtitleBackgroundColor,
        transparent_background,
      })
    );
  });
});
