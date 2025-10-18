import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'vi' | 'en';

interface UserLanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const UserLanguageContext = createContext<UserLanguageContextType | undefined>(undefined);

interface UserLanguageProviderProps {
  children: ReactNode;
}

// Translation data for User
const userTranslations = {
  vi: {
    // Common
    'common.notifications': 'Thông báo',
    'common.all': 'Tất cả',
    'common.unread': 'Chưa đọc',
    'common.flood': 'Lũ lụt',
    'common.weather': 'Thời tiết',
    'common.traffic': 'Giao thông',
    'common.emergency': 'Khẩn cấp',
    'common.close': 'Đóng',
    'common.markAllRead': 'Đánh dấu tất cả đã đọc',
    'common.deleteAll': 'Xóa tất cả',
    'common.markAsRead': 'Đánh dấu đã đọc',
    'common.markAsUnread': 'Đánh dấu chưa đọc',
    'common.delete': 'Xóa',
    'common.noNotifications': 'Không có thông báo nào',
    'common.loading': 'Đang tải...',
    
    // Time
    'time.justNow': 'Vừa xong',
    'time.minutesAgo': '{count} phút trước',
    'time.hoursAgo': '{count} giờ trước',
    'time.daysAgo': '{count} ngày trước',
    'time.expires': 'Hết hạn: {time}',
    
    // Severity
    'severity.low': 'THẤP',
    'severity.medium': 'TRUNG BÌNH',
    'severity.high': 'CAO',
    'severity.critical': 'NGUY HIỂM',
    
    // Homepage
    'home.explore': 'Khám phá Mekong Pathfinder',
    'home.weather': 'Theo dõi thời tiết chính xác',
    'home.community': 'Cộng đồng người dùng',
    'home.learnMore': 'Tìm hiểu thêm',
    'home.watchDemo': 'Xem demo',
    'home.join': 'Tham gia',
    'home.download': 'Tải ứng dụng',
    'home.feedback': 'Góp ý',
    'home.guide': 'Hướng dẫn',
    'home.quickActions': 'Hành động nhanh',
    'home.features': 'Tính năng nổi bật',
    'home.howToUse': 'Hướng dẫn sử dụng',
    'home.achievements': 'Thành tựu',
    'home.testimonials': 'Người dùng nói gì',
    'home.contact': 'Liên hệ & Hỗ trợ',
    
    // Features
    'features.smartMap': 'Bản đồ thông minh',
    'features.weather': 'Thời tiết chính xác',
    'features.safety': 'An toàn tuyệt đối',
    'features.community': 'Cộng đồng',
    
    // Steps
    'steps.download': 'Tải ứng dụng',
    'steps.register': 'Đăng ký tài khoản',
    'features.explore': 'Khám phá tính năng',
    'steps.share': 'Chia sẻ trải nghiệm',
    
    // Profile
    'profile.myProfile': 'Hồ sơ cá nhân',
    'profile.settings': 'Cài đặt',
    'profile.logout': 'Đăng xuất',
    'profile.userName': 'Nguyễn Văn A',
    'profile.userRole': 'Người dùng',
    'profile.profileInfo': 'Thông tin hồ sơ',
    'profile.editProfile': 'Chỉnh sửa hồ sơ',
    'profile.cancel': 'Hủy',
    'profile.saveChanges': 'Lưu thay đổi',
    'profile.firstName': 'Tên',
    'profile.lastName': 'Họ',
    'profile.email': 'Email',
    'profile.phone': 'Số điện thoại',
    'profile.address': 'Địa chỉ',
    'profile.occupation': 'Nghề nghiệp',
    'profile.experience': 'Kinh nghiệm',
    'profile.firstNameRequired': 'Vui lòng nhập tên!',
    'profile.lastNameRequired': 'Vui lòng nhập họ!',
    'profile.emailRequired': 'Vui lòng nhập email!',
    'profile.emailInvalid': 'Vui lòng nhập email hợp lệ!',
    'profile.userStats': 'Thống kê người dùng',
    'profile.daysActive': 'Ngày hoạt động',
    'profile.reportsSubmitted': 'Báo cáo đã gửi',
    'profile.achievements': 'Thành tựu',
    'profile.recentActivity': 'Hoạt động gần đây',
    'profile.activity1': 'Gửi báo cáo lũ lụt',
    'profile.activity2': 'Cập nhật thông tin cá nhân',
    'profile.activity3': 'Tham gia cộng đồng',
    
    // Language
    'language.vietnamese': 'Tiếng Việt',
    'language.english': 'English',
  },
  en: {
    // Common
    'common.notifications': 'Notifications',
    'common.all': 'All',
    'common.unread': 'Unread',
    'common.flood': 'Flood',
    'common.weather': 'Weather',
    'common.traffic': 'Traffic',
    'common.emergency': 'Emergency',
    'common.close': 'Close',
    'common.markAllRead': 'Mark all as read',
    'common.deleteAll': 'Delete all',
    'common.markAsRead': 'Mark as read',
    'common.markAsUnread': 'Mark as unread',
    'common.delete': 'Delete',
    'common.noNotifications': 'No notifications',
    'common.loading': 'Loading...',
    
    // Time
    'time.justNow': 'Just now',
    'time.minutesAgo': '{count} minutes ago',
    'time.hoursAgo': '{count} hours ago',
    'time.daysAgo': '{count} days ago',
    'time.expires': 'Expires: {time}',
    
    // Severity
    'severity.low': 'LOW',
    'severity.medium': 'MEDIUM',
    'severity.high': 'HIGH',
    'severity.critical': 'CRITICAL',
    
    // Homepage
    'home.explore': 'Explore Mekong Pathfinder',
    'home.weather': 'Accurate weather tracking',
    'home.community': 'User community',
    'home.learnMore': 'Learn more',
    'home.watchDemo': 'Watch demo',
    'home.join': 'Join',
    'home.download': 'Download app',
    'home.feedback': 'Feedback',
    'home.guide': 'Guide',
    'home.quickActions': 'Quick actions',
    'home.features': 'Key features',
    'home.howToUse': 'How to use',
    'home.achievements': 'Achievements',
    'home.testimonials': 'What users say',
    'home.contact': 'Contact & Support',
    
    // Features
    'features.smartMap': 'Smart map',
    'features.weather': 'Accurate weather',
    'features.safety': 'Absolute safety',
    'features.community': 'Community',
    
    // Steps
    'steps.download': 'Download app',
    'steps.register': 'Register account',
    'features.explore': 'Explore features',
    'steps.share': 'Share experience',
    
    // Profile
    'profile.myProfile': 'My Profile',
    'profile.settings': 'Settings',
    'profile.logout': 'Logout',
    'profile.userName': 'John Doe',
    'profile.userRole': 'User',
    'profile.profileInfo': 'Profile Information',
    'profile.editProfile': 'Edit Profile',
    'profile.cancel': 'Cancel',
    'profile.saveChanges': 'Save Changes',
    'profile.firstName': 'First Name',
    'profile.lastName': 'Last Name',
    'profile.email': 'Email',
    'profile.phone': 'Phone',
    'profile.address': 'Address',
    'profile.occupation': 'Occupation',
    'profile.experience': 'Experience',
    'profile.firstNameRequired': 'Please input first name!',
    'profile.lastNameRequired': 'Please input last name!',
    'profile.emailRequired': 'Please input email!',
    'profile.emailInvalid': 'Please input valid email!',
    'profile.userStats': 'User Statistics',
    'profile.daysActive': 'Days Active',
    'profile.reportsSubmitted': 'Reports Submitted',
    'profile.achievements': 'Achievements',
    'profile.recentActivity': 'Recent Activity',
    'profile.activity1': 'Submitted flood report',
    'profile.activity2': 'Updated personal information',
    'profile.activity3': 'Joined community',
    
    // Language
    'language.vietnamese': 'Tiếng Việt',
    'language.english': 'English',
  }
};

export const UserLanguageProvider: React.FC<UserLanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('vi');

  // Load user language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('userLanguage') as Language;
    if (savedLanguage && (savedLanguage === 'vi' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save user language to localStorage when changed
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('userLanguage', lang);
  };

  // Translation function
  const t = (key: string, params?: Record<string, string | number>): string => {
    const translation = userTranslations[language][key as keyof typeof userTranslations[typeof language]];
    
    if (!translation) {
      console.warn(`User translation missing for key: ${key}`);
      return key;
    }

    // Replace parameters in translation
    if (params) {
      return Object.entries(params).reduce((str, [paramKey, paramValue]) => {
        return str.replace(`{${paramKey}}`, String(paramValue));
      }, translation);
    }

    return translation;
  };

  const value: UserLanguageContextType = {
    language,
    setLanguage: handleSetLanguage,
    t,
  };

  return (
    <UserLanguageContext.Provider value={value}>
      {children}
    </UserLanguageContext.Provider>
  );
};

export const useUserLanguage = () => {
  const context = useContext(UserLanguageContext);
  if (context === undefined) {
    throw new Error('useUserLanguage must be used within a UserLanguageProvider');
  }
  return context;
};
