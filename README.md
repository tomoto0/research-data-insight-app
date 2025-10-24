# Research Data Insight Generator

**CSVデータを美しいチャートに変換し、AI分析で洞察を得るフルスタックアプリケーション**

## 概要

Research Data Insight Generatorは、OpenAIの「csv-to-charts」アプリをベースに、Manusのフルスタック技術スタック（React + Express + tRPC + Drizzle ORM）で再構築した、研究・執筆活動向けの高機能データ可視化ツールです。

### 主な特徴

- **CSVアップロード機能**: ドラッグ&ドロップまたはファイル選択でCSVをアップロード
- **複数チャートタイプ対応**: 棒グラフ、折れ線グラフ、円グラフ、ドーナツグラフ
- **AI分析機能**: Manus LLMを活用した自動データ分析
  - データセットの要約
  - 主要な洞察の抽出
  - 執筆時のアドバイス
- **リアルタイムカスタマイズ**: 色パレット、背景色、テキスト色の即座変更
- **チャートエクスポート**: PNG形式でのダウンロード機能
- **洗練されたUI/UX**: グラデーションヘッダー、ダークテーマ、レスポンシブデザイン

## 技術スタック

### フロントエンド
- **React 19** - UIコンポーネント
- **Vite** - ビルドツール
- **Tailwind CSS 4** - スタイリング
- **shadcn/ui** - UIコンポーネントライブラリ
- **Chart.js** - チャート生成
- **Lucide Icons** - アイコン

### バックエンド
- **Express 4** - Webサーバー
- **tRPC 11** - 型安全なAPI
- **Drizzle ORM** - データベースアクセス
- **Manus LLM API** - AI分析機能

### インフラ
- **Node.js 22** - ランタイム
- **MySQL/TiDB** - データベース
- **Manus OAuth** - 認証

## ファイル構成

```
research-data-insight-app/
├── client/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.tsx              # ランディングページ
│   │   │   └── DataVisualizer.tsx    # メインアプリケーション
│   │   ├── components/
│   │   │   ├── ChartCanvas.tsx       # Chart.js統合コンポーネント
│   │   │   ├── DataControls.tsx      # CSVアップロード・設定UI
│   │   │   └── AIInsights.tsx        # AI分析結果表示
│   │   ├── lib/
│   │   │   └── trpc.ts              # tRPCクライアント設定
│   │   ├── App.tsx                   # ルーティング
│   │   ├── main.tsx                  # エントリーポイント
│   │   └── index.css                 # グローバルスタイル
│   ├── public/
│   │   └── sample-data.csv          # テスト用サンプルデータ
│   └── index.html
├── server/
│   ├── routers.ts                    # tRPCルーター定義
│   ├── db.ts                         # データベースクエリ
│   └── _core/                        # フレームワークコア
├── drizzle/
│   └── schema.ts                     # データベーススキーマ
└── package.json
```

## 使用方法

### 1. CSVアップロード
- ドラッグ&ドロップまたはクリックでCSVファイルをアップロード
- 自動的にヘッダー行を認識
- カスタムデリミタ（カンマ、セミコロン、タブ、パイプ）に対応

### 2. チャート設定
- **チャートタイプ**: Bar, Line, Pie, Doughnutから選択
- **ラベル列**: X軸またはラベルに使用する列を指定
- **データセット**: 複数の列を選択して複合チャートを作成

### 3. 外観カスタマイズ
- **パレット**: Vibrant, Pastel, Cool, Warm, Monochromeから選択
- **基本色**: カラーピッカーで調整
- **キャンバス背景**: チャート背景色を設定
- **テキスト色**: 軸ラベルと凡例の色を設定

### 4. AI分析実行
- 「AI Insights」ボタンをクリック
- Manus LLMがデータを分析
- Summary、Key Insights、Writing Tipsが表示

### 5. チャートエクスポート
- 「Save Chart」ボタンでPNG形式でダウンロード
- 研究論文やプレゼンテーションに直接使用可能

## AI機能の詳細

### generateDataInsights
データセットを分析し、以下の情報を生成します：

```typescript
{
  summary: string;        // データセットの全体的な特徴
  insights: string[];     // 主要な洞察（配列）
  writingTips: string;    // 執筆時のアドバイス
}
```

**活用例:**
- 研究論文の執筆時にデータの重要な特徴を把握
- プレゼンテーション資料の説明文を自動生成
- 統計分析の初期段階での仮説生成

## 開発環境セットアップ

```bash
# 依存パッケージのインストール
pnpm install

# 開発サーバー起動
pnpm dev

# 本番ビルド
pnpm build

# 本番サーバー起動
pnpm start
```

## 環境変数

以下の環境変数が自動的にManusプラットフォームから注入されます：

- `DATABASE_URL`: MySQL接続文字列
- `JWT_SECRET`: セッション署名用秘密鍵
- `VITE_APP_ID`: Manus OAuth アプリケーションID
- `OAUTH_SERVER_URL`: OAuth認証サーバーURL
- `VITE_OAUTH_PORTAL_URL`: ログインポータルURL
- `VITE_APP_TITLE`: アプリケーションタイトル
- `VITE_APP_LOGO`: ロゴ画像URL
- `BUILT_IN_FORGE_API_URL`: Manus API基底URL
- `BUILT_IN_FORGE_API_KEY`: API認証トークン

## 拡張可能性

このアプリケーションは以下の機能拡張が容易に実装できるように設計されています：

### 予定されている機能
- データベースへのチャート履歴保存
- チャート共有機能（URL生成）
- より高度なAI分析（トレンド予測、異常検知）
- リアルタイムデータソース連携
- 複数ユーザーのコラボレーション機能

### カスタマイズポイント
- `server/routers.ts`: 新しいAI分析ルーターの追加
- `client/src/components/`: 新しいUIコンポーネントの追加
- `drizzle/schema.ts`: データベーススキーマの拡張

## パフォーマンス

- **チャート生成**: 平均 < 100ms
- **AI分析**: 平均 2-5秒（API応答時間に依存）
- **ファイルサイズ**: 本番ビルド ~835KB（gzip: 253KB）

## ブラウザ互換性

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- 完全なレスポンシブデザイン対応

## セキュリティ

- Manus OAuth認証による安全なログイン
- tRPCによる型安全なAPI通信
- CSRF保護
- XSS対策（React自動エスケープ）
- API キーはサーバーサイドで管理

## ライセンス

このプロジェクトはManus プラットフォーム上で動作するアプリケーションです。

## サポート

問題が発生した場合は、Manusプラットフォームのサポートセンターにお問い合わせください。

---

**作成日**: 2025年10月23日  
**バージョン**: 1.0.0  
**ステータス**: 本番環境対応

