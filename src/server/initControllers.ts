import { globSync } from "glob";
import path from "path";

export async function initControllers() {
  try {
    console.log(`>> Modo Controllers: ${process.env.NODE_ENV} <<`.red);
    const isProd = process.env.NODE_ENV === "production";
    const extension = isProd ? "js" : "ts";
    const files = globSync(`**/*.controller.${extension}`, { ignore: ["node_modules/**", "dist"] });
    await loadControllers(files)
  } catch (err) {
    console.error("Error en glob:", err);

  }
}
async function loadControllers(files:string[]) {
  for (const controller of files) {
    const route = path.resolve(controller)
    await import(route);
  }
}