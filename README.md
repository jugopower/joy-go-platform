# Joy Go Platform Build 008.1

## Safari／iPad 穩定修正版
- 修正首頁只有深綠背景、文字與按鈕消失
- 移除 Hero 與主要內容對 reveal 動畫的依賴
- 即使 JavaScript 或 IntersectionObserver 失效，內容仍會正常顯示
- 修正 Hero 圖層可能蓋住文字的問題
- 強制 Hero 文字、按鈕、信任標籤保持可見
- iPad Safari 改用更穩定的響應式版面
- 保留 Build 007.3 側邊抽屜選單
- 保留 Build 008 正式招生內容
- 網站版本更新為 Build 008.1

## 更新方式
解壓縮後，將以下 6 個檔案全部上傳並覆蓋 GitHub：
- index.html
- styles.css
- script.js
- README.md
- render.yaml
- .nojekyll

按 Commit changes 後，到 Render：
Manual Deploy → Deploy latest commit

部署完成後，請使用：
https://joy-go-platform.onrender.com/?v=8.1
避免 Safari 顯示舊快取。
