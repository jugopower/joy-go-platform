# Joy Go Platform Build 007.1

## 本次修正
- 修正點擊三條線後選單與頁面內容重疊
- 移除重複的選單 JavaScript，僅保留一套控制程式
- 選單改為不透明的固定下拉面板
- 選單提高至頁面最上層，不會被卡片或文字穿透
- 新增半透明背景遮罩
- 點選連結、遮罩或按 Esc 都會關閉選單
- 選單開啟時停止背景捲動
- iPad 與手機版隱藏浮動按鈕，避免遮住內容
- 版本更新為 Build 007.1

## 更新方式
解壓縮後，上傳並覆蓋：
- index.html
- styles.css
- script.js
- README.md
- render.yaml
- .nojekyll

按 Commit changes 後，到 Render：
Manual Deploy → Deploy latest commit
