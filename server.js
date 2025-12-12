// server.js

// Expressというライブラリを使って、簡単にWebサーバーを構築します。
const express = require('express');
const bodyParser = require('body-parser'); // フォームデータを解析するために必要です。
const cors = require('cors'); // フロントエンドとバックエンドの通信を許可するために必要です。

const app = express();
const port = process.env.PORT || 3000;

// ミドルウェアの設定
// 外部からのアクセスを許可
app.use(cors());
// フォームデータをJSON形式で解析できるように設定
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ----------------------------------------------------
// 【重要】ログイン認証エンドポイント (あなたのフロントエンドがデータを送る場所)
// ----------------------------------------------------
app.post('/auth/login', (req, res) => {
    // 1. フロントエンドから送られてきたIDとパスワードを取得
    const username = req.body.username;
    const password = req.body.password;

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