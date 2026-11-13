import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { marked } from "marked";
import music from "../data/music.json";

const root = join(process.cwd(), "src/content/articles");
function walk(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory()
      ? walk(join(dir, entry.name))
      : entry.name.endsWith(".md")
        ? [join(dir, entry.name)]
        : [],
  );
}
export const documents = walk(root).map((file) => {
  const slug = file.slice(root.length + 1).replace(/\.md$/, "");
  const source = readFileSync(file, "utf8").replace(
    /<font[^>]*>.*?<\/font>/g,
    "",
  );
  const title = source.match(/^# (.+)$/m)?.[1].trim() || slug;
  const category = slug.startsWith("product/")
    ? "产品理念"
    : slug.startsWith("project/")
      ? "项目管理"
      : slug.startsWith("code/")
        ? "编程"
        : "个人简介";
  const markdown = source
    .replace(/^# .+$/m, "")
    .replace(
      /\]\((?:(?:\.\.\/)+|\.\/)?images\//g,
      `](${slug.startsWith("product/") ? "/media/product/" : "/media/images/"}`,
    );
  return { slug, title, category, html: marked.parse(markdown) as string };
});
export const resources = music.map((article) => ({
  slug: `resources/${article.id}`,
  title: article.title,
  category: "公用素材",
  html: marked.parse(
    `${article.description}\n\n${article.hook}\n\n${article.sections.map((section) => `## ${section.title}\n\n${section.text}`).join("\n\n")}\n\n> ${article.mantra}\n\n## 适用边界\n\n${article.boundary}\n\n## 音符示例\n\n${article.examples.map((example) => `### ${example.label}\n\n${example.spellings.join(" · ")}\n\n${example.caption}`).join("\n\n")}\n\n## 想一想\n\n${article.quiz.question}\n\n${article.quiz.answers.map((answer, i) => `${i + 1}. ${answer}`).join("\n")}\n\n<details><summary>查看答案</summary>\n\n${article.quiz.explanation}\n\n</details>\n\n[下载本文 JSON](/data/v1/music-theory/${article.id}.zh.json)`,
  ) as string,
}));
export const allDocuments = [...documents, ...resources];
