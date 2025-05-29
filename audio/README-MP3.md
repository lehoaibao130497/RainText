# Hướng dẫn thêm file MP3

## Cách thêm nhạc MP3:

1. **Thêm file MP3** vào thư mục `audio/`:
   ```
   audio/
   ├── ambient1.mp3
   ├── ambient2.mp3
   └── ambient3.mp3
   ```

2. **Cập nhật file `playlist.csv`**:
   ```csv
   filename,name,artist,duration,category
   ambient1.mp3,Peaceful Space,Your Artist,180,ambient
   ambient2.mp3,Cosmic Dreams,Your Artist,240,ambient
   ambient3.mp3,Starlight Journey,Your Artist,200,ambient
   ```

## Định dạng hỗ trợ:
- **MP3**: Khuyến nghị (tương thích tốt nhất)
- **WAV**: Chất lượng cao nhưng file lớn
- **OGG**: Tương thích tốt với web
- **M4A**: Hỗ trợ trên hầu hết trình duyệt

## Lưu ý:
- File MP3 nên có bitrate 128-320 kbps
- Thời lượng khuyến nghị: 2-5 phút
- Tên file không nên có dấu cách hoặc ký tự đặc biệt
- Đảm bảo file có thể phát được trên trình duyệt

## Test:
1. Thêm file MP3 vào thư mục `audio/`
2. Cập nhật `playlist.csv`
3. Reload trang hoặc bấm "🔄 Tải lại dữ liệu"
4. Chọn "🎵 MP3 Files" trong dropdown
5. Bấm "🎵 Bật/Tắt nhạc" để test
