
module.exports = {
    respond404: (req, res) =>
    {
        res.status(404);
        res.send("<h2>404エラー：このページは存在しません</h2>");
    },

    respond500: (error, req, res, next) =>
    {
        res.status(500);
        res.send("<h2>500エラー：サーバトラブルのためお手数をおかけしますが再度お試しください</h2>");
    }
}

