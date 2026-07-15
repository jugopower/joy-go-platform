# Joy Go Platform Build 008.2

## 互動功能修正版
- 修正三條線選單點擊沒有反應
- 修正初學、級位・段位、高段・AI 課程篩選沒有反應
- 根本原因：舊 JavaScript 尋找已被 Build 008 移除的 Hero 元素，發生錯誤後整支程式停止
- 所有 JavaScript 元素查找改為安全檢查，不會再因單一元素不存在而全站失效
- 修正三張課程卡片的分類資料
- 新增課程篩選狀態文字與顯示數量
- 同時保護報名表、相簿放大、分享、LINE、回到頁首等功能
- 保留 Safari／iPad 內容強制顯示修正
- 版本更新為 Build 008.2

## 上傳與部署
解壓縮後，將以下 6 個檔案全部上傳並覆蓋 GitHub：
- index.html
- styles.css
- script.js
- README.md
- render.yaml
- .nojekyll

按 Commit changes 後，到 Render：
Manual Deploy → Deploy latest commit

部署完成後請開啟：
https://joy-go-platform.onrender.com/?v=8.2
