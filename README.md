# shinjiro-moriya.com

守屋慎二郎（Shinjiro Moriya）のプロフィールサイトです。

## ローカル起動

```sh
npm install
npm run dev
```

Wranglerが表示するローカルURLをブラウザで開きます。

## コンテンツ管理

プロフィール本文、プロジェクト、会社情報、タイムラインなどの表示内容は
`content.json` で管理します。`scripts/build.mjs` がJSONを読み込み、HTMLを生成します。

HTML構造は `scripts/build.mjs`、スタイルは `style.css` で管理しています。

## サイト
[https://shinjiro-moriya.com/](https://shinjiro-moriya.com/)

## Cloudflare Workers

`content.json`から静的ファイルを生成し、Cloudflare Workers Static Assetsへ公開します。

```sh
npm install
npm run deploy
```

Cloudflare Workers BuildsがGitHubリポジトリと連携されています。`main`ブランチへの
pushは本番へ自動デプロイされ、その他のブランチへのpushはプレビュー版を生成します。

公開先: [https://shinjiro-moriya.jiromo.workers.dev/](https://shinjiro-moriya.jiromo.workers.dev/)
