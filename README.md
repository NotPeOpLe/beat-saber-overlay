# Beat Saber Overlay for Gosumemory

A web-based overlay for Osu!

![preview](https://i.imgur.com/mZlnpAm.png)

## 使用方法

1. 下載 [gosumemory](https://github.com/l3lackShark/gosumemory/releases/) 並解壓縮

2. 下載 [overlay](https://github.com/NotPeOpLe/beat-saber-overlay/releases/download/v1/BeatSaberOverlay.zip)

3. 將 overlay 解壓縮到 gosumemory\static 裡面

4. 開啟 gosumemory.exe

5. 在OBS建立一個瀏覽器來源

6. URL設定成 `http://127.0.0.1:24050/BeatSaberOverlay/` (是HTTP，不是HTTPS!)

## 選項

如果你需要加入其他參數，URL需這樣輸入:

```
http://127.0.0.1:24050/BeatSaberOverlay/?modifiers=top
```

### `modifiers`

多個選項可以用逗號分隔。

- `top`
	* 將 Overlay 移到頂部並垂直反轉佈局
- `rtl`
	* 將 Overlay 移至右側並使用從右至左的文字
- `scale`
	* 將 Overlay 縮放 1.5 倍，用於 1080p
- `test`
	* 將背景變黑，以供測試