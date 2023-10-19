function loadScript(url, type) {
  return new Promise((resolve, reject) => {
    if (loadedURL(type, url)) {
      return resolve();
    }

    const script = document.createElement(type);
    script.type = "text/javascript";
    script.src = url;
    const tag = document.getElementsByTagName("head")[0].appendChild(script);
    tag.onload = resolve;
    tag.onerror = reject;
  });
}

function loadCSS(url, type) {
  return new Promise((resolve, reject) => {
    if (loadedURL(type, url)) {
      return resolve();
    }

    const link = document.createElement(type);
    link.rel = "stylesheet";
    link.href = url;
    const tag = document.getElementsByTagName("head")[0].appendChild(link);
    tag.onload = resolve;
    tag.onerror = reject;
  });
}

const loadedURL = (type, url) => {
  return (
    [...document.getElementsByTagName(type)].filter(
      (element) => element.src === url || element.href === url
    ).length >= 1
  );
};

export function loadPaths(paths, type) {
  const pathCollection = [];
  paths.map((item) => {
    pathCollection.push(
      type === "script" ? loadScript(item, type) : loadCSS(item, type)
    );
  });
  return pathCollection;
}
