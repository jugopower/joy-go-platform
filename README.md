# Joy Go Platform Build 011.9

## 本版重點

- 所有網站圖片改為放在 GitHub 根目錄，方便 iPad 上傳。
- 首頁主圖讀取 `hero.jpg`。
- 老師照片讀取 `teacher.jpg`。
- 最新消息照片讀取 `news1.jpg`、`news2.jpg`、`news3.jpg`。
- 相簿照片讀取 `gallery1.jpg`～`gallery4.jpg`。
- 保留 `data.js`，可集中修改「朱老師教學經歷與實戰成果」及相簿文字。
- 網站版本更新為 Build 011.9。

## 上傳方式

把以下檔案直接上傳到 GitHub 專案最外層，覆蓋同名檔案：

- `index.html`
- `styles.css`
- `script.js`
- `data.js`
- `README.md`
- `render.yaml`
- `hero.jpg`

原本已存在的 `teacher.jpg`、`news1.jpg`、`news2.jpg`、`news3.jpg` 可保留。

日後新增相簿，只要在根目錄上傳：

- `gallery1.jpg`
- `gallery2.jpg`
- `gallery3.jpg`
- `gallery4.jpg`

## 修改教學經歷與實戰成果

打開 `data.js`，修改 `teacherRecords` 內的文字，再 Commit changes 即可。

## Build 011.9 修正
- 修復 iPad 相片預覽視窗無法關閉、頁面無法恢復滑動的問題。
- 新增固定在右上角的「× 關閉」按鈕。
- 點黑色背景或照片本身也可關閉。
- 支援鍵盤 Esc 關閉，並在離開頁面時自動恢復捲動。

## Build 011.9 修正
- 移除相簿照片整張深色遮罩，恢復原圖清晰度與亮度。
- 僅保留照片底部漸層，確保標題文字仍清楚。
- 縮小 iPad 上的聯絡與返回頂端浮動按鈕。
- 為最新消息、活動、回饋、FAQ 與報名區保留右側安全空間，降低遮住文字的機會。

## Build 011.9 修正
- 強制移除最新消息三張照片的全圖深色漸層。
- 強制移除相簿照片的濾鏡、透明度與混色效果。
- 相簿僅保留底部 22% 的淡漸層，讓標題清楚但不影響照片。
- CSS、JavaScript 與 data.js 加入版本參數，避免 Safari 繼續讀取舊快取。
