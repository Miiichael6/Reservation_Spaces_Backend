import { globSync } from "fs";
import path from "path";

export async function loadEntities() {
  console.log(`Modo Entities: ${process.env.NODE_ENV}`);
  const isProd = process.env.NODE_ENV === "production";
  const extension = isProd ? "js" : "ts";
  const files = globSync(`**/*.entity.${extension}`, {
    // ignore: ["node_modules/**", "dist"],
  });
  const values = await storeEntities(files)
  return values
}

async function storeEntities(files: string[]) {
  let entities = []
  for (const file of files) {
    const entityFile = path.resolve(file);
    const entity = Object.values(await import(entityFile))[0];
    entities.push(entity);
  }
  return entities;
}
