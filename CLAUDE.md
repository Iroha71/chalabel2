# CLAUDE.md

このファイルは、このリポジトリで作業する Claude Code (claude.ai/code) に向けたガイダンスを提供します。

## アーキテクチャ

これは Vite + React 19 + TypeScript で構成されたミニマルな SPA で、現時点ではスターターテンプレートの段階です(`src/App.tsx` はまだデフォルトの Vite/React スキャフォールドに近い状態)。

- `src/main.tsx` — エントリーポイント。`App` を `#root` にマウントする。
- `src/App.tsx` — 現状唯一のコンポーネント。UI はすべてここに記述されている。
- `src/assets/` — コンポーネントから直接 import される静的画像。
- `public/` — そのまま配信される静的ファイル(例: `icons.svg`。`<use href="/icons.svg#...">` で参照される)。
- TypeScript プロジェクトは references によって分割されている: `tsconfig.json` → `tsconfig.app.json`(アプリソース用)と `tsconfig.node.json`(Vite 設定用)。

## 補足

- `scripts/bump-version.js` は作業ツリーが汚れていても処理を拒否しない(警告のみ)。`npm version` によって作成されるのは `package.json` のバージョン更新とそれに伴うコミット/タグのみで、それ以外の未コミットの変更はそのまま残る。
