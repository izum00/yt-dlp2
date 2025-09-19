const express = require("express");
const ytdlp = require("yt-dlp-exec");

const app = express();
const PORT = 3000;

// GET /video?id=xxxxxx
app.get("/video", async (req, res) => {
  const videoId = req.query.id;

  if (!videoId) {
    return res.status(400).json({ error: "動画IDを指定してください。例: /video?id=dQw4w9WgXcQ" });
  }

  try {
    const url = `https://www.youtube.com/watch?v=${videoId}`;

    const output = await ytdlp(url, {
      dumpSingleJson: true,
      noWarnings: true,
      noCallHome: true,
      preferFreeFormats: true,
      addHeader: ['referer:youtube.com', 'user-agent:googlebot']
    });

    res.json(output); // そのままJSONを返す
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "情報の取得に失敗しました。" });
  }
});

app.listen(PORT, () => {
  console.log(`サーバー起動: http://localhost:${PORT}`);
});
