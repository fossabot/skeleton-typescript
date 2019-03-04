/**
 * https://dl2.services - DL2 IT Services
 * Owlsome solutions. Owltstanding results.
 */

const packages = require("../package.json");
const { emptyDir, ensureDir, writeJson } = require("fs-extra");
const { inc } = require("semver");
const { resolve } = require("path");

const outputDir = resolve(__dirname, "../build");
const sourceDir = resolve(__dirname, "..");

const next = process.env.NEXT
  ? inc(packages.version, process.env.NEXT.toLowerCase())
  : packages.version;

ensureDir(`${outputDir}/src`)
  .then(() => {
    return emptyDir(outputDir);
  })
  .then(() => {
    const { authors, dependencies, description, engines, license, name } = packages;

    const j = {
      authors,
      dependencies,
      description,
      engines,
      license,
      name,
      version: next,
    };

    return writeJson(`${outputDir}/package.json`, j, { spaces: 2 });
  })
  .then(() => {
    const j = Object.assign(packages, { version: next });

    return writeJson(`${sourceDir}/package.json`, j, { spaces: 2 });
  });
