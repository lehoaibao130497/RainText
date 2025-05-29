# 3D Rain Effect - Văn bản & Hình ảnh rơi tương tác

Một demo trang web 3D tương tác sử dụng Three.js, hiển thị các cụm từ hoặc hình ảnh rơi tự do trong không gian vô tận với khả năng tương tác đầy đủ, hỗ trợ đọc dữ liệu từ file CSV và nhạc nền ambient.

## 🌟 Tính năng chính

### 🎨 Hiển thị đối tượng 3D
- **Chế độ Văn bản**: Hiển thị các cụm từ với font Arial đậm, gradient màu sắc và hiệu ứng phát sáng
- **Chế độ Hình ảnh**: Hiển thị các hình học đơn giản (tròn, vuông, tam giác, sao) với hiệu ứng tương tự
- **Chế độ Kết hợp**: Trộn lẫn cả văn bản và hình ảnh
- **Chất lượng cao**: Sử dụng Canvas 512x512 để đảm bảo độ sắc nét

### 🌧️ Hiệu ứng rơi
- Rơi thẳng đứng mượt mà (chỉ thay đổi trục Y)
- Tốc độ rơi có thể điều chỉnh (0.5x - 3.0x)
- Không gian vô tận - đối tượng respawn khi rơi quá thấp
- **Billboarding**: Mặt trước luôn hướng về camera

### 🌌 Môi trường 3D
- Background không gian với 15,000 vì sao lấp lánh
- Nebula background tạo cảm giác sâu thẳm
- Hệ thống ánh sáng đa tầng (ambient, directional, point light)

### 🎮 Tương tác camera
- **Kéo chuột**: Xoay camera 360 độ
- **Cuộn chuột**: Phóng to/thu nhỏ (5-100 units)
- **Touch support**: Kéo để xoay, chụm để zoom trên mobile
- **Damping**: Chuyển động mượt mà với OrbitControls

### 👆 Tương tác đối tượng
- **Click/Tap**: Chọn và dừng đối tượng
- **Scale**: Kéo chuột/touch để thu phóng (0.5x - 3x)
- **Visual feedback**: Hiệu ứng glow khi được chọn
- **Auto-resume**: Tiếp tục rơi khi bỏ chọn

### ⚙️ Điều khiển & Tùy chỉnh
- Chuyển đổi chế độ hiển thị (văn bản/hình ảnh/kết hợp)
- Điều chỉnh số lượng đối tượng (20-200)
- Thay đổi tốc độ rơi real-time
- Thêm/xóa đối tượng động
- Hiển thị FPS và thông tin trạng thái

### 🎵 Hệ thống âm thanh
- **Nhạc nền ambient**: Tạo bằng Web Audio API
- **Điều khiển âm lượng**: Slider 0-100%
- **Toggle on/off**: Bật/tắt nhạc dễ dàng
- **Không cần file**: Tạo nhạc real-time

### 📁 Hệ thống file
- **CSV cho văn bản**: `text/words.csv` với category và màu sắc
- **CSV cho hình ảnh**: `images/images.csv` với metadata
- **Thư mục images**: Chứa file SVG/PNG/JPG
- **Auto-reload**: Tải lại dữ liệu không cần refresh trang

## 🚀 Cách sử dụng

### Yêu cầu hệ thống
- **Trình duyệt**: Chrome, Firefox, Safari, Edge (hỗ trợ WebGL)
- **Thiết bị**: Desktop hoặc mobile với GPU tích hợp
- **Kết nối internet**: Để tải Three.js từ CDN

### Chạy demo
1. Mở file `index.html` trong trình duyệt
2. Chờ loading hoàn tất
3. Sử dụng các điều khiển trong panel bên trái

### Điều khiển cơ bản

#### 🖱️ Desktop
- **Kéo chuột**: Xoay camera quanh scene
- **Cuộn chuột**: Zoom in/out
- **Click đối tượng**: Chọn và dừng rơi
- **Kéo sau khi chọn**: Thu phóng đối tượng

#### 📱 Mobile
- **Kéo một ngón**: Xoay camera
- **Chụm hai ngón**: Zoom in/out
- **Tap đối tượng**: Chọn và dừng rơi
- **Kéo sau khi chọn**: Thu phóng đối tượng

### Panel điều khiển

#### Chế độ hiển thị
- **📝 Văn bản**: Chỉ hiển thị text
- **🖼️ Hình ảnh**: Chỉ hiển thị shapes
- **🎭 Kết hợp**: Trộn lẫn cả hai

#### Tùy chỉnh
- **Số lượng đối tượng**: 20-200 (mặc định: 50)
- **Tốc độ rơi**: 0.5x-3.0x (mặc định: 1.0x)
- **Thêm đối tượng**: Thêm tối đa 20 đối tượng mới
- **Xóa tất cả**: Reset toàn bộ scene

## 🛠️ Cấu trúc kỹ thuật

### Công nghệ sử dụng
- **Three.js r155**: Thư viện 3D chính
- **OrbitControls**: Điều khiển camera
- **HTML5 Canvas**: Tạo texture cho đối tượng
- **WebGL**: Rendering 3D hardware-accelerated

### Tối ưu hóa hiệu suất
- **Raycasting hiệu quả**: Chỉ kiểm tra đối tượng visible
- **Memory management**: Dispose geometry/material khi xóa
- **Adaptive pixel ratio**: Tối đa 2x cho mobile
- **FPS monitoring**: Theo dõi hiệu suất real-time

### Responsive design
- **Viewport responsive**: Tự động điều chỉnh theo màn hình
- **Touch-friendly**: Tối ưu cho thiết bị cảm ứng
- **Mobile UI**: Layout điều chỉnh cho màn hình nhỏ

## 📁 Cấu trúc file

### Cấu trúc thư mục
```
Rain_Text/
├── index.html              # File chính
├── simple-test.html         # Demo đơn giản
├── test-webgl.html         # Test WebGL
├── README.md               # Hướng dẫn
├── text/
│   └── words.csv           # Danh sách từ khóa
├── images/
│   ├── images.csv          # Metadata hình ảnh
│   ├── heart.svg           # Hình trái tim
│   ├── star.svg            # Hình ngôi sao
│   ├── diamond.svg         # Hình kim cương
│   ├── flower.svg          # Hình hoa
│   └── butterfly.svg       # Hình bướm
└── audio/
    └── ambient-music.js    # Generator nhạc nền
```

### Format file CSV

#### text/words.csv
```csv
text,category,color_hue
Hello,greeting,0
World,noun,60
Three.js,technology,120
Xin chào,vietnamese,300
```

#### images/images.csv
```csv
filename,name,category,color_hue
heart.svg,Heart,love,330
star.svg,Star,space,60
diamond.svg,Diamond,gem,200
```

## 🎨 Customization

### Thêm từ khóa mới
Chỉnh sửa file `text/words.csv`:
```csv
text,category,color_hue
Your Text,custom,180
Another Word,custom,240
```

### Thay đổi màu sắc
Điều chỉnh hàm `createTextTexture()` và `createImageTexture()` để thay đổi:
- Gradient colors
- Glow effects
- Emissive intensity

### Tùy chỉnh hình dạng
Thêm case mới trong `createImageTexture()` để tạo shapes tùy chỉnh.

## 🐛 Troubleshooting

### Lỗi thường gặp

**"WebGL không được hỗ trợ"**
- Cập nhật trình duyệt lên phiên bản mới nhất
- Kiểm tra driver GPU
- Thử trình duyệt khác

**Hiệu suất chậm**
- Giảm số lượng đối tượng
- Giảm pixel ratio trong code
- Đóng các tab khác

**Không tương tác được**
- Kiểm tra JavaScript console
- Đảm bảo Three.js CDN load thành công
- Thử refresh trang

## 📝 License

Dự án này được phát triển cho mục đích giáo dục và demo. Bạn có thể tự do sử dụng và chỉnh sửa.

## 🤝 Đóng góp

Mọi đóng góp và cải thiện đều được hoan nghênh! Hãy tạo issue hoặc pull request.

---

**Phát triển bởi**: AI Assistant  
**Phiên bản**: 1.0  
**Cập nhật cuối**: 2024
