function renderHeader(logoPath, simple) {
  const template = Handlebars.compile("{{> header}}");
  const html = template({ logoPath, simple });
  document.body.insertAdjacentHTML("afterbegin", html);
}

function renderFooter() {
  const template = Handlebars.compile("{{> footer}}");
  const footer = document.getElementById("anita-footer");
  if (footer) {
    const html = template();
    footer.innerHTML = html;
  } else {
    console.warn("Footer element #anita-footer not found in DOM");
  }
}

function renderPageBackground(pageName) {
  const template = Handlebars.compile("{{> page-background}}");
  const pageBackground = document.querySelector(
    "div.anita-page-background-wrap"
  );
  const data = dataConfig.pages[pageName];
  if (!data?.items) {
    console.warn(`No items found for page ${pageName}`);
  }
  if (pageBackground && data.pageBackgroundSrc) {
    const html = template({ pageBackgroundSrc: data.pageBackgroundSrc });
    pageBackground.innerHTML = html;
  }
}

async function loadPartials(partials) {
  const partialPromises = partials.map(async (partial) => {
    try {
      const response = await fetch(
        `/carousels-an-sliders/partials/${partial}.hbs`
      );
      if (!response.ok) throw new Error(`Failed to load ${partial}.hbs`);
      const template = await response.text();
      Handlebars.registerPartial(partial, template);
    } catch (error) {
      console.error(error);
    }
  });

  await Promise.all(partialPromises);
}

function glCarouselInit(pageName) {
  const main = document.querySelector("main.anita-main");

  const data = dataConfig.pages[pageName];
  if (!data?.items) {
    console.warn(`No items found for page ${pageName}`);
  }

  if (data.albumTitle) {
    const container = document.createElement("div");
    container.className =
      "anita-gl-container-wrap anita-gl-carousel-gallery-wrap anita-scrollEW";

    const templateTitle = Handlebars.compile("{{> album-fixed-title}}");
    const htmlTitle = templateTitle({
      backPath: data.albumTitle.backPath,
      back: data.albumTitle.back,
      title: data.albumTitle.title,
      subtitle1: data.albumTitle.subtitle1,
      subtitle2: data.albumTitle.subtitle2,
    });

    const carouselTemplate = Handlebars.compile("{{> gl-carousel}}");
    const carouselHtml = carouselTemplate({
      items: data.items,
      galleryType: "carousel",
    });

    const navigationTemplate = Handlebars.compile("{{> navigation}}");
    const navigationHtml = navigationTemplate({
      subtitleLeft: data?.navigation?.subtitleLeft,
      titleLeft: data?.navigation?.titleLeft,
      hrefLeft: data?.navigation?.hrefLeft,
      srcLeft: data?.navigation?.srcLeft,
      subtitleRight: data?.navigation?.subtitleRight,
      titleRight: data?.navigation?.titleRight,
      hrefRight: data?.navigation?.hrefRight,
      srcRight: data?.navigation?.srcRight,
    });

    container.insertAdjacentHTML("beforeend", htmlTitle);
    container.insertAdjacentHTML("beforeend", carouselHtml);
    container.insertAdjacentHTML("beforeend", navigationHtml);
    main.appendChild(container);
  } else {
    const carouselTemplate = Handlebars.compile(
      "{{> gl-carousel-with-titles}}"
    );
    const carouselHtml = carouselTemplate({
      items: data.items,
      galleryType: "carousel",
    });
    main.insertAdjacentHTML("beforeend", carouselHtml);
  }
}

function carouselInit(pageName) {
  const main = document.querySelector("main.anita-main");
  const data = dataConfig.pages[pageName];
  if (!data?.items) {
    console.warn(`No items found for page ${pageName}`);
  }

  if (data.albumTitle) {
    const container = document.createElement("div");
    container.className = "anita-carousel-gallery-wrap anita-scrollEW";

    const templateTitle = Handlebars.compile("{{> album-fixed-title}}");
    const htmlTitle = templateTitle({
      backPath: data.albumTitle.backPath,
      back: data.albumTitle.back,
      title: data.albumTitle.title,
      subtitle1: data.albumTitle.subtitle1,
      subtitle2: data.albumTitle.subtitle2,
    });

    const carouselTemplate = Handlebars.compile("{{> carousel}}");
    const carouselHtml = carouselTemplate({
      items: data.items,
    });

    const navigationTemplate = Handlebars.compile("{{> navigation}}");
    const navigationHtml = navigationTemplate({
      subtitleLeft: data?.navigation?.subtitleLeft,
      titleLeft: data?.navigation?.titleLeft,
      hrefLeft: data?.navigation?.hrefLeft,
      srcLeft: data?.navigation?.srcLeft,
      subtitleRight: data?.navigation?.subtitleRight,
      titleRight: data?.navigation?.titleRight,
      hrefRight: data?.navigation?.hrefRight,
      srcRight: data?.navigation?.srcRight,
    });

    container.insertAdjacentHTML("beforeend", htmlTitle);
    container.insertAdjacentHTML("beforeend", carouselHtml);
    container.insertAdjacentHTML("beforeend", navigationHtml);
    main.appendChild(container);
  } else {
    const carouselTemplate = Handlebars.compile("{{> carousel-with-titles}}");
    const carouselHtml = carouselTemplate({
      items: data.items,
    });
    main.insertAdjacentHTML("beforeend", carouselHtml);
  }
}

function galleryInit(pageName, templateName) {
  const main = document.querySelector("main.anita-main");
  const data = dataConfig.pages[pageName];
  if (!data?.items) {
    console.warn(`No items found for page ${pageName}`);
  }

  const container = document.createElement("div");
  container.className = "anita-container";

  const templateTitle = Handlebars.compile(`{{> album-title}}`);
  const htmlTitle = templateTitle({
    backPath: data.albumTitle.backPath,
    back: data.albumTitle.back,
    title: data.albumTitle.title,
    subtitle1: data.albumTitle.subtitle1,
    subtitle2: data.albumTitle.subtitle2,
    description: data.albumTitle.description,
  });

  const galleryTemplate = Handlebars.compile(`{{> ${templateName}}}`);
  const galleryHtml = galleryTemplate({
    items: data.items,
    col: data.col,
  });

  const nextAlbumTemplate = Handlebars.compile("{{> next-album}}");
  const htmlNextAlbum = nextAlbumTemplate({
    subtitle: data.nextAlbum.subtitle,
    title: data.nextAlbum.title,
    src: data.nextAlbum.src,
  });

  container.insertAdjacentHTML("beforeend", htmlTitle);
  container.insertAdjacentHTML("beforeend", galleryHtml);
  container.insertAdjacentHTML("beforeend", htmlNextAlbum);
  main.appendChild(container);
}

function rollCarouselInit(pageName) {
  const main = document.querySelector("main.anita-main");
  const data = dataConfig.pages[pageName];
  if (!data?.items) {
    console.warn(`No items found for page ${pageName}`);
  }

  const carouselTemplate = Handlebars.compile("{{> roll-carousel}}");
  const carouselHtml = carouselTemplate({
    items: data.items,
  });
  main.insertAdjacentHTML("beforeend", carouselHtml);
}

function sliderInit(pageName) {
  const main = document.querySelector("main.anita-main");
  const data = dataConfig.pages[pageName];
  if (!data?.items) {
    console.warn(`No items found for page ${pageName}`);
  }

  if (data.albumTitle) {
    const container = document.createElement("div");
    container.className =
      "anita-gl-container-wrap anita-gl-slider-gallery-wrap anita-scrollEW";

    const templateTitle = Handlebars.compile("{{> album-fixed-title}}");
    const htmlTitle = templateTitle({
      backPath: data.albumTitle.backPath,
      back: data.albumTitle.back,
      title: data.albumTitle.title,
      subtitle1: data.albumTitle.subtitle1,
      subtitle2: data.albumTitle.subtitle2,
    });

    const sliderTemplate = Handlebars.compile("{{> gl-carousel}}");
    const sliderHtml = sliderTemplate({
      items: data.items,
      type: data.listingType,
      galleryType: "slider",
    });

    const navigationTemplate = Handlebars.compile("{{> navigation}}");
    const navigationHtml = navigationTemplate({
      subtitleLeft: data?.navigation?.subtitleLeft,
      titleLeft: data?.navigation?.titleLeft,
      hrefLeft: data?.navigation?.hrefLeft,
      srcLeft: data?.navigation?.srcLeft,
      subtitleRight: data?.navigation?.subtitleRight,
      titleRight: data?.navigation?.titleRight,
      hrefRight: data?.navigation?.hrefRight,
      srcRight: data?.navigation?.srcRight,
    });
    container.insertAdjacentHTML("beforeend", htmlTitle);
    container.insertAdjacentHTML("beforeend", sliderHtml);
    container.insertAdjacentHTML("beforeend", navigationHtml);
    main.appendChild(container);
  } else {
    const sliderTemplate = Handlebars.compile("{{> gl-carousel-with-titles}}");
    const sliderHtml = sliderTemplate({
      items: data.items,
      galleryType: "slider",
    });
    main.insertAdjacentHTML("beforeend", sliderHtml);
  }
}

async function initContent() {
  const path = window.location.pathname;
  const fileName = path.substring(path.lastIndexOf("/") + 1);
  const pageName = fileName.replace(".html", "");

  await loadPartials([
    "header",
    "footer",
    "page-background",
    "gl-carousel-with-titles",
    "gl-carousel",
    "roll-carousel",
    "carousel",
    "carousel-with-titles",
    "album-title",
    "album-fixed-title",
    "navigation",
    "next-album",
    "masonry",
    "adjusted",
    "bricks",
    "grid",
    "justified",
  ]);

  /* --- Add Title --- */
  document.title = dataConfig.pages[pageName]?.pageTitle || "Default Title";

  /* --- Add FavIcon --- */
  const faviconPath =
    dataConfig.pages[pageName]?.favIconPath || "img/favicon.png";
  const favicon =
    document.querySelector('link[rel="icon"]') ||
    document.createElement("link");
  if (!favicon.parentNode) {
    favicon.rel = "icon";
    document.head.appendChild(favicon);
  }
  favicon.href = faviconPath;

  /* --- Add Header --- */
  const logoPath = dataConfig.pages[pageName]?.logoPath || "img/logo.png";
  const isSimpleMenu = dataConfig.simpleMenu;
  renderHeader(logoPath, isSimpleMenu);

  /* --- Add Background --- */
  renderPageBackground(pageName);

  /* --- Add Content --- */
  switch (dataConfig.pages[pageName]?.listingType) {
    case "glCarousel":
      glCarouselInit(pageName);
      break;
    case "rollCarousel":
      rollCarouselInit(pageName);
      break;
    case "carousel":
      carouselInit(pageName);
      break;
    case "masonry":
      galleryInit(pageName, "masonry");
      break;
    case "adjusted":
      galleryInit(pageName, "adjusted");
      break;
    case "bricks":
      galleryInit(pageName, "bricks");
      break;
    case "grid":
      galleryInit(pageName, "grid");
      break;
    case "justified":
      galleryInit(pageName, "justified");
      break;
    case "parallax":
      sliderInit(pageName);
      break;
    case "sliced":
      sliderInit(pageName);
      break;
    case "fade":
      sliderInit(pageName);
      break;
    case "pixel":
      sliderInit(pageName);
      break;
    default:
      break;
  }

  /* --- Add Footer --- */
  renderFooter();

  const script = document.createElement("script");
  script.src = "js/core.js";
  script.async = true;
  document.body.appendChild(script);
}
/* --- Activate Preloader --- */
jQuery("body").append(
  '<div class="anita-preloader-wrap"><div class="anita-preloader-spotlight anita-spotlight"></div></div>'
);
jQuery("body").addClass("is-loading");

initContent().catch((error) => console.error("InitContent failed:", error));
