# Joy Go Platform Build 011.5

本版保留 Build 011.4 的外觀與互動功能，新增較容易維護的資料架構。

## 本版更新

- 新增 `data.js`：集中管理「朱老師教學經歷與實戰成果」及相簿資料。
- 新增 `images/` 分類資料夾。
- 首頁主圖移至 `images/hero/hero.jpg`。
- 相簿圖片改放在 `images/gallery/`。
- 網站版本更新為 Build 011.5。

## 修改教學經歷與實戰成果

打開 `data.js`，修改 `teacherExperience` 內的：

- `badge`：短標籤，例如「30+ 年」
- `title`：標題
- `description`：說明文字

增加一筆時，複製一組 `{ ... }` 並修改內容即可。

## 上傳相簿照片

1. 將照片命名為 `gallery1.jpg`、`gallery2.jpg` 等。
2. 上傳到 `images/gallery/`。
3. 在 `data.js` 的 `gallery` 區修改圖片路徑與標題。

範例：

```js
{ image: "images/gallery/gallery5.jpg", title: "學生比賽實戰" }
```

## GitHub 上傳

請把本資料夾內所有檔案與資料夾上傳到 GitHub 專案根目錄，覆蓋同名檔案。Render 會自動重新部署。
