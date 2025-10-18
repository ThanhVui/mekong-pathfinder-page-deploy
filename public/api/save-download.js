// API endpoint để lưu thông tin download
// File này sẽ được gọi từ frontend để lưu dữ liệu

const fs = require('fs');
const path = require('path');

// Đường dẫn đến file JSON
const dataPath = path.join(__dirname, '../data/downloads.json');

// Hàm lưu thông tin download
function saveDownload(name, email) {
  try {
    // Đọc dữ liệu hiện tại
    let data = { downloads: [], totalDownloads: 0, lastUpdated: "" };
    
    if (fs.existsSync(dataPath)) {
      const fileContent = fs.readFileSync(dataPath, 'utf8');
      data = JSON.parse(fileContent);
    }
    
    // Tạo record mới
    const newDownload = {
      id: Date.now(),
      name: name,
      email: email,
      downloadTime: new Date().toISOString(),
      ip: 'unknown' // Có thể thêm IP tracking nếu cần
    };
    
    // Thêm vào danh sách
    data.downloads.push(newDownload);
    data.totalDownloads = data.downloads.length;
    data.lastUpdated = new Date().toISOString();
    
    // Lưu file
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    
    return { success: true, totalDownloads: data.totalDownloads };
  } catch (error) {
    console.error('Error saving download:', error);
    return { success: false, error: error.message };
  }
}

// Export function để sử dụng
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { saveDownload };
}
