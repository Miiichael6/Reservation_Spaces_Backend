import path from "path";
import { Container } from "inversify";
import { globSync } from "glob";
export let container = new Container();

export async function initContainers() {
    console.log(`>> Modo Containers: ${process.env.NODE_ENV} <<`.blue);
    const isProd = process.env.NODE_ENV === "production";
    const extension = isProd ? "js" : "ts";
    const files = globSync(`**/*.module.${extension}`,
        { ignore: ["node_modules/**", "dist"] }
    );
    await loadPriorityFiles(files);
    await loadContainers(files)
}
async function loadContainers(files: any) {
    for (const file of files) {
        const containerFile = path.resolve(file)
        const { container: containerModule } = await import(containerFile)
        container.load(containerModule);
    }
}
async function loadPriorityFiles(files: string[]) {
    const priorityFile = files.find((file: string) => file.includes("postgres.module"));
    if (priorityFile) {
        const priorityModulePath = path.resolve(priorityFile);
        const { container: priorityModule } = await import(priorityModulePath);
        container.load(priorityModule);
    }
}