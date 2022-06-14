chrome.runtime.onMessage.addListener((request) => {
  console.log(request);
  if (request.transparent_background) {
    request.subtitleBackgroundColor = "transparent";
  }

  let body = document.querySelector("body");
  let subtitle = document.querySelector(".shaka-text-container > span");
  console.log(subtitle);
  body.style.setProperty("--VIDEO-SUBTITLE-FONT-SIZE", `${request.fontSize}px`);

  var style = document.createElement("style");
  style.type = "text/css";
  if (style.styleSheet) {
    style.styleSheet.cssText = `\
      .shaka-text-container > span { \
          color: ${request.subtitleColor} !important; \
          background: ${request.subtitleBackgroundColor} !important;\
        } `;
  } else {
    style.appendChild(
      document.createTextNode(`\
      .shaka-text-container > span { \
          color: ${request.subtitleColor} !important; \
          background: ${request.subtitleBackgroundColor} !important;\

        } `)
    );
  }
  document.getElementsByTagName("head")[0].appendChild(style);
});
