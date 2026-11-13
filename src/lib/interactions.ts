const $ = <T extends Element = HTMLElement>(selector: string) =>
  document.querySelector<T>(selector)!;
const menu = $(".menu-toggle");
menu.addEventListener("click", () => {
  const open = menu.getAttribute("aria-expanded") !== "true";
  menu.setAttribute("aria-expanded", String(open));
  $("#navigation").classList.toggle("is-open", open);
});
document.querySelectorAll("#navigation a").forEach((link) =>
  link.addEventListener("click", () => {
    menu.setAttribute("aria-expanded", "false");
    $("#navigation").classList.remove("is-open");
  }),
);

let locale = "zh";
$("#locale-toggle").addEventListener("click", () => {
  locale = locale === "zh" ? "en" : "zh";
  document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
  document.querySelectorAll<HTMLElement>("[data-zh][data-en]").forEach((el) => {
    el.textContent = el.dataset[locale]!.replace(/\\n/g, "\n");
  });
  $("#locale-toggle").innerHTML =
    `${locale === "zh" ? "EN" : "中文"} <span>↗</span>`;
  $("#locale-toggle").setAttribute(
    "aria-label",
    locale === "zh" ? "Switch homepage to English" : "切换首页为中文",
  );
  $<HTMLInputElement>("#site-search").placeholder =
    locale === "zh"
      ? "搜索文章、作品、想法…"
      : "Search articles, projects, ideas…";
});

document.querySelectorAll<HTMLDialogElement>("dialog").forEach((dialog) => {
  dialog
    .querySelector(".dialog-close")!
    .addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener("close", () => {
    document.body.style.overflow = "";
  });
});
const qr = $<HTMLDialogElement>("#qr-dialog");
document.querySelectorAll<HTMLElement>("[data-qr]").forEach((button) =>
  button.addEventListener("click", () => {
    qr.classList.toggle("is-wide", button.dataset.wide === "true");
    $("#qr-title").textContent = button.dataset.title!;
    $<HTMLImageElement>("#qr-image").src = button.dataset.qr!;
    $<HTMLImageElement>("#qr-image").alt = `${button.dataset.title} 二维码`;
    $<HTMLAnchorElement>("#qr-download").href = button.dataset.qr!;
    $<HTMLAnchorElement>("#qr-original").href = button.dataset.qr!;
    document.body.style.overflow = "hidden";
    qr.showModal();
  }),
);

const searchDialog = $<HTMLDialogElement>("#search-dialog");
const input = $<HTMLInputElement>("#site-search");
let pagefind: any;
const openSearch = () => {
  document.body.style.overflow = "hidden";
  searchDialog.showModal();
  input.focus();
};
$(".search-trigger").addEventListener("click", openSearch);
document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    if (!searchDialog.open) openSearch();
  }
});
let timer: ReturnType<typeof setTimeout>;
let searchRevision = 0;
input.addEventListener("input", () => {
  clearTimeout(timer);
  const revision = ++searchRevision;
  timer = setTimeout(async () => {
    const query = input.value.trim();
    const results = $(".search-results");
    const status = $(".search-status");
    results.replaceChildren();
    if (!query) {
      status.textContent =
        locale === "zh"
          ? "输入关键词，发现产品、管理、编程与乐理内容。"
          : "Search product, project, code and music theory content.";
      return;
    }
    try {
      if (!pagefind) {
        const path = "/pagefind/pagefind.js";
        pagefind = await import(/* @vite-ignore */ path);
      }
      const search = await pagefind.search(query);
      const items = await Promise.all(
        search.results.slice(0, 12).map((result: any) => result.data()),
      );
      if (revision !== searchRevision) return;
      status.textContent =
        locale === "zh"
          ? `找到 ${search.results.length} 条结果`
          : `${search.results.length} results`;
      for (const item of items) {
        const link = document.createElement("a");
        link.className = "search-result";
        link.href = item.url;
        const title = document.createElement("h3");
        title.textContent = item.meta.title;
        const excerpt = document.createElement("p");
        // Pagefind excerpts are generated only from the site's trusted content.
        excerpt.innerHTML = item.excerpt;
        link.append(title, excerpt);
        results.append(link);
      }
      if (!items.length)
        status.textContent +=
          locale === "zh" ? "，试试其他关键词。" : ". Try another keyword.";
    } catch {
      status.textContent =
        locale === "zh"
          ? "搜索索引尚未就绪。请使用构建后的预览，或从首页栏目浏览。"
          : "Search index is not ready. Browse the homepage sections instead.";
    }
  }, 180);
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08 },
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
document.documentElement.classList.add("js-ready");
