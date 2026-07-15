# Joy Go Platform Build 007.2

## 核心修正
- 行動版選單改為完全獨立的右側抽屜，不再共用桌機導覽列
- iPad 直式、iPad 分割畫面及 iPhone 均使用同一套抽屜
- 點三條線後，選單由右側滑出
- 新增深色背景遮罩
- 點選連結、關閉按鈕、背景或 Esc 都能關閉
- 選單開啟時鎖定背景捲動
- 行動版完全隱藏舊導覽列，杜絕文字重疊
- iPad 橫式寬度大於 920px 時維持完整橫向導覽
- 版本更新為 Build 007.2

## 上傳與部署
解壓縮後，把以下 6 個檔案全部上傳並覆蓋 GitHub 舊檔：
- index.html
- styles.css
- script.js
- README.md
- render.yaml
- .nojekyll

按 Commit changes 後，到 Render 執行：
Manual Deploy → Deploy latest commit

請確認 Render Events 顯示的是新的 Commit 編號和現在的部署時間，不能仍是舊的 905ffa1。
