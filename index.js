const express = require("express");
const YTDlpWrap = require("yt-dlp-wrap").default;

const ytDlp = new YTDlpWrap(); // バイナリを自動取得
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/video", async (req, res) => {
  const videoId = req.query.id;
  if (!videoId) {
    return res.status(400).json({ error: "動画IDを指定してください。" });
  }
  const url = `https://www.youtube.com/watch?v=${videoId}`;

  try {
    const info = await ytDlp.getVideoInfo(url);
    res.json(info);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "情報の取得に失敗しました。" });
  }
});

app.listen(PORT, () => {
  console.log(`サーバー起動: http://localhost:${PORT}`);
});
