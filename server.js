// server.js

// Expressというライブラリを使って、簡単にWebサーバーを構築します。
const express = require('express');
const bodyParser = require('body-parser'); // フォームデータを解析するために必要です。
const cors = require('cors'); // フロントエンドとバックエンドの通信を許可するために必要です。

const app = express();
const port = process.env.PORT || 3000;

// ミドルウェアの設定
// 外部からのアクセスを許可
// server.js (変更箇所)

const allowedOrigins = [
    // あなたの公開サイトのURLのみを許可リストに追加
    'https://do-sound-wave.github.io', 
    // ローカル環境でのテスト用（開発を続けるなら必要）
    'http://localhost:3000' 
];

// CORS設定の強化
app.use(cors({
    origin: function (origin, callback) {
        // originが許可リストに含まれているか、またはoriginがない場合（ローカルリクエストなど）許可
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST'], // 許可するメソッド
    credentials: true // クッキーなどの送信を許可
}));

// フォームデータをJSON形式で解析できるように設定
// ... (その他のコードはそのまま)
// フォームデータをJSON形式で解析できるように設定
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ----------------------------------------------------
// 【重要】ログイン認証エンドポイント (あなたのフロントエンドがデータを送る場所)
// ----------------------------------------------------
app.post('/auth/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    // 【一時的な確認用】
    console.log(`受信したユーザー名: ${username}`);
    console.log(`受信したパスワード: ${password}`); // ← この行を追加

    // ... 認証処理 ...


    console.log(`受信したユーザー名: ${username}`);
    // **注意:** 現時点では、データベースやスプレッドシートとの照合は行いません。

    // 2. 認証処理の仮のロジック (成功/失敗のテスト用)
    // 例えば、「admin」と「password123」だけを成功と仮定します。
    if (username === 'admin' && password === 'password123') {
        console.log('--- 認証成功 (仮) ---');
        
        // 成功したら、フロントエンドに成功メッセージとリダイレクト先を返します
        // 実際にはここでセッションを生成します
        return res.status(200).json({ 
            success: true, 
            message: 'ログイン成功。分析画面へリダイレクトします。',
            redirectUrl: '/dashboard.html' // 分析画面のURLを仮に指定
        });
    } else {
        console.log('--- 認証失敗 (仮) ---');
        
        // 失敗したら、フロントエンドにエラーメッセージを返します
        return res.status(401).json({ 
            success: false, 
            message: 'IDまたはパスワードが違います。' 
        });
    }
});

// ----------------------------------------------------
// サーバーの起動
// ----------------------------------------------------
app.listen(port, () => {
    console.log(`認証サーバーがポート ${port} で起動しました。`);
});