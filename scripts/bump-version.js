// セマンティックバージョン（patch/minor/major）を対話的に選択し、
// `npm version` で package.json の更新とgitタグの作成を行うスクリプト。
// git push は行わない。

import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { createInterface } from "node:readline/promises";
import { stdin, stdout, exit } from "node:process";

const PACKAGE_JSON_PATH = new URL("../package.json", import.meta.url);

function getCurrentVersion() {
  const pkg = JSON.parse(readFileSync(PACKAGE_JSON_PATH, "utf8"));
  const match = /^(\d+)\.(\d+)\.(\d+)/.exec(pkg.version ?? "");
  if (!match) {
    throw new Error(
      `package.json の version が semver 形式ではありません: "${pkg.version}"`,
    );
  }
  const [, major, minor, patch] = match;
  return { major: Number(major), minor: Number(minor), patch: Number(patch) };
}

function buildCandidates({ major, minor, patch }) {
  return {
    patch: {
      type: "patch",
      version: `${major}.${minor}.${patch + 1}`,
      description: "後方互換性のあるバグ修正",
    },
    minor: {
      type: "minor",
      version: `${major}.${minor + 1}.0`,
      description: "後方互換性のある機能追加",
    },
    major: {
      type: "major",
      version: `${major + 1}.0.0`,
      description: "後方互換性を壊す変更",
    },
  };
}

function warnIfDirtyWorkingTree() {
  const status = execSync("git status --porcelain", { encoding: "utf8" });
  const uncommittedChanges = status
    .split("\n")
    .filter((line) => line.trim() !== "" && !line.startsWith("??"));

  if (uncommittedChanges.length > 0) {
    console.warn(
      "警告: コミットされていない変更がありますが、処理を続行します:",
    );
    console.warn(uncommittedChanges.join("\n"));
    console.warn(
      "（package.json 以外の変更はバージョンコミットに含まれません）\n",
    );
  }
}

async function promptForChoice(candidates, currentVersionText) {
  const rl = createInterface({ input: stdin, output: stdout });

  console.log(`現在のバージョン: ${currentVersionText}`);
  console.log("次のバージョンを選択してください:");
  console.log(
    `  1) patch  ${candidates.patch.version}  (${candidates.patch.description})`,
  );
  console.log(
    `  2) minor  ${candidates.minor.version}  (${candidates.minor.description})`,
  );
  console.log(
    `  3) major  ${candidates.major.version}  (${candidates.major.description})`,
  );

  try {
    for (;;) {
      const answer = (
        await rl.question("番号を選択してください (1/2/3, qで中止): ")
      ).trim();

      if (answer === "q" || answer === "Q") {
        console.log("中止しました。");
        exit(0);
      }
      if (answer === "1") return candidates.patch;
      if (answer === "2") return candidates.minor;
      if (answer === "3") return candidates.major;

      console.log("1・2・3・q のいずれかを入力してください。");
    }
  } finally {
    rl.close();
  }
}

function runNpmVersion(type) {
  console.log(`\nnpm version ${type} を実行します...\n`);
  // --force: 未コミットの変更があっても npm version 自体の中断を防ぐ
  // (package.json 以外の変更はバージョンコミットに含まれない)
  // %s は npm version が新しいバージョン番号に置き換える
  execSync(`npm version ${type} --force -m "upgrade: release %s"`, {
    stdio: "inherit",
  });
}

async function main() {
  warnIfDirtyWorkingTree();

  const current = getCurrentVersion();
  const currentVersionText = `${current.major}.${current.minor}.${current.patch}`;
  const candidates = buildCandidates(current);

  const choice = await promptForChoice(candidates, currentVersionText);

  runNpmVersion(choice.type);

  console.log(
    `\n✅ バージョンを ${choice.version} に更新し、gitタグ v${choice.version} を作成しました。`,
  );
  console.log(
    "※ タグはpushされていません。必要であれば `git push && git push --tags` を実行してください。",
  );
}

main().catch((error) => {
  console.error(error.message ?? error);
  exit(1);
});
