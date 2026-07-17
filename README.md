# Joy Go Platform Build 011.6

## 本版重點

- 所有網站圖片改為放在 GitHub 根目錄，方便 iPad 上傳。
- 首頁主圖讀取 `hero.jpg`。
- 老師照片讀取 `teacher.jpg`。
- 最新消息照片讀取 `news1.jpg`、`news2.jpg`、`news3.jpg`。
- 相簿照片讀取 `gallery1.jpg`～`gallery4.jpg`。
- 保留 `data.js`，可集中修改「朱老師教學經歷與實戰成果」及相簿文字。
- 網站版本更新為 Build 011.6。

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
