// Utility để track downloads và lưu vào localStorage
// Vì chúng ta không có backend server, sẽ sử dụng localStorage

interface DownloadRecord {
  id: number;
  name: string;
  email: string;
  downloadTime: string;
}

interface DownloadData {
  downloads: DownloadRecord[];
  totalDownloads: number;
  lastUpdated: string;
}

const STORAGE_KEY = 'mekong_pathfinder_downloads';

// Lưu thông tin download
export const saveDownload = (name: string, email: string): { success: boolean; totalDownloads: number } => {
  try {
    // Lấy dữ liệu hiện tại từ localStorage
    let data: DownloadData = { downloads: [], totalDownloads: 0, lastUpdated: "" };
    
    const existingData = localStorage.getItem(STORAGE_KEY);
    if (existingData) {
      data = JSON.parse(existingData);
    }
    
    // Tạo record mới
    const newDownload: DownloadRecord = {
      id: Date.now(),
      name: name,
      email: email,
      downloadTime: new Date().toISOString()
    };
    
    // Thêm vào danh sách
    data.downloads.push(newDownload);
    data.totalDownloads = data.downloads.length;
    data.lastUpdated = new Date().toISOString();
    
    // Lưu vào localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    
    return { success: true, totalDownloads: data.totalDownloads };
  } catch (error) {
    console.error('Error saving download:', error);
    return { success: false, totalDownloads: 0 };
  }
};

// Lấy thống kê downloads
export const getDownloadStats = (): DownloadData => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
    return { downloads: [], totalDownloads: 0, lastUpdated: "" };
  } catch (error) {
    console.error('Error getting download stats:', error);
    return { downloads: [], totalDownloads: 0, lastUpdated: "" };
  }
};

// Lấy danh sách downloads gần đây
export const getRecentDownloads = (limit: number = 10): DownloadRecord[] => {
  try {
    const data = getDownloadStats();
    return data.downloads
      .sort((a, b) => new Date(b.downloadTime).getTime() - new Date(a.downloadTime).getTime())
      .slice(0, limit);
  } catch (error) {
    console.error('Error getting recent downloads:', error);
    return [];
  }
};

// Export dữ liệu ra file JSON (để admin có thể tải về)
export const exportDownloadData = (): string => {
  try {
    const data = getDownloadStats();
    return JSON.stringify(data, null, 2);
  } catch (error) {
    console.error('Error exporting download data:', error);
    return '{}';
  }
};
