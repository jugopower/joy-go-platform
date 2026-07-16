# Joy Go Platform Build 010.2

## 緊急修正
- 修正 iPad 上右下「聯絡」按鈕看得到但無法點擊
- 移除 `pointer-events: none` 停用狀態
- 接近報名表時改為自動往上移，不再停用按鈕
- 加入 iPad Safari 專用 pointer 事件處理
- 點一次展開電話／LINE，再點一次收合
- 點選其他位置會自動收合
- 版本更新為 Build 010.2

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

部署後測試：
https://joy-go-platform.onrender.com/?v=10.2
