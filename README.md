# shinjiro-moriya.com

守屋慎二郎（Shinjiro Moriya）のプロフィールサイトです。

## ローカル起動

```sh
php -S 127.0.0.1:8080
```

ブラウザで `http://127.0.0.1:8080/` を開きます。

## コンテンツ管理

プロフィール本文、プロジェクト、会社情報、タイムラインなどの表示内容は
`content.json` で管理します。`index.php` がJSONを読み込み、HTMLを生成します。

HTML構造は `views/home.php` で管理しています。共通のセクション描画は
`views/_components.php`、head・ナビゲーション・footはそれぞれの `_` 付きpartialに
まとめています。スタイルは `style.css` で一括管理しています。

## サイト
[https://shinjiro-moriya.com/](https://shinjiro-moriya.com/)
