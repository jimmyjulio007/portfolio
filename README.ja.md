# ⚡ JIMMY JULIO | 次世代ポートフォリオ 2026

![Next.js](https://img.shields.io/badge/Next.js_15-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-black?style=for-the-badge&logo=three.js&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)

> **"知性の設計"**
> ゼロレイテンシーの3Dインタラクション、流体アニメーション、完全に国際化されたアーキテクチャを備えた、高性能なサイバーパンクテーマのポートフォリオ。

---

## ✨ 特徴

### 🎨 **サイバーパンクの美学**
- **ネオンノワールテーマ**: ディープボイドブラック (#000000)、エレクトリックシアン (#00f0ff)、アシッドライム (#ccff00)。
- **シネマティックリビール**: スタッガーアニメーション付きの「スライスカラム」ローディングシーケンス。
- **インタラクティブ3D**: 没入型ヒーロー要素のためのReact Three Fiber統合。
- **マグネティックUI**: カスタムマグネティックカーソルとボタンのインタラクション。

### 🌍 **国際化 (i18n)**
- **6言語対応**: 英語、フランス語、日本語、中国語、ドイツ語、アラビア語。
- **自動検出**: ミドルウェアベースのロケール検出。
- **RTLサポート**: アラビア語の完全な右書きレイアウトサポート。

### 🛡️ **プライバシーとコンプライアンス**
- **クッキー同意**: GDPR準拠、アニメーション付きの永続的なクッキーバナー。
- **プライバシーポリシー**: 包括的で多言語対応のプライバシープロトコルページ。
- **セキュリティ**: コンテンツセキュリティポリシー (CSP) とセキュアヘッダー。

### 📧 **コンタクトシステム**
- **Nodemailer統合**: カスタムHTMLテンプレートを使用したサーバーサイドメール送信。
- **Zodバリデーション**: 堅牢な多言語フォームバリデーション。
- **サイバーパンクメールテンプレート**: ダークテーマのブランドメール通知。

---

## 🚀 始め方

### 前提条件
- **Node.js**: v18.17.0 以上
- **pnpm**: v8.0.0 以上 (推奨)

### 📦 インストール

```bash
# 1. リポジトリをクローン
git clone https://github.com/jimmyjulio007/portfolio.git

# 2. ディレクトリに移動
cd portfolio

# 3. 依存関係をインストール
pnpm install

# 4. 環境変数を設定
cp .env.example .env.local

# 5. 開発サーバーを起動
pnpm dev
```

[http://localhost:3000](http://localhost:3000) を開いてアプリケーションを表示します。

---

## ⚙️ 環境変数

以下のキーを含む `.env.local` ファイルを作成します：

```env
# アプリURL
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# メール設定 (Gmail SMTP)
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=your-email@gmail.com
MAIL_PASS=your-app-specific-password
```

---

## 📂 プロジェクト構造

```
src/
├── app/                 # Next.js App Router
│   ├── [locale]/        # 国際化ルート
│   │   ├── layout.tsx   # プロバイダー付きルートレイアウト
│   │   ├── page.tsx     # ホームページ
│   │   └── privacy/     # プライバシーポリシーページ
│   └── api/             # APIルート (コンタクトフォーム)
├── features/            # 機能ベースのコンポーネント
│   ├── CookieConsent    # GDPRクッキーバナー
│   ├── CinematicLoader  # 初期ローディングシーケンス
│   └── PageLoader       # ページ遷移エフェクト
├── widgets/             # 複雑なUIウィジェット
│   ├── HeroSection      # パーティクル付き3Dヒーロー
│   ├── Navigation       # レスポンシブヘッダー
│   └── ContactSection   # バリデーション付きコンタクトフォーム
├── shared/              # 共有ユーティリティ & UI
│   ├── ui/              # 再利用可能なアトム (ボタン, 入力)
│   ├── lib/             # ヘルパー (メール, バリデーション)
│   └── config/          # 定数 & 設定
└── messages/            # i18n翻訳JSON
    ├── en.json
    ├── fr.json
    └── ...
```

---

## 🛠️ スクリプト

- `pnpm dev`: 開発サーバーを起動
- `pnpm build`: 本番用にビルド
- `pnpm start`: 本番サーバーを起動
- `pnpm lint`: ESLintを実行

---

**© 2026 Jimmy Julio. All Rights Reserved.**
*システムステータス: オンライン // V3.0* 🚀
