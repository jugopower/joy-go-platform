# Joy Go Platform Build 010.1

## 修正內容
- 浮動電話與 LINE 改成單一「聯絡」按鈕
- 點擊「聯絡」後才展開電話與 LINE，避免長時間遮住內容
- 接近報名表與 Footer 時，聯絡按鈕會完全隱藏
- 相簿標籤不再重複顯示
- 學員見證取消多餘的左右引號
- 所有導覽跳轉加入 Header 安全距離，標題不再被遮住
- 版本更新為 Build 010.1

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
https://joy-go-platform.onrender.com/?v=10.1
