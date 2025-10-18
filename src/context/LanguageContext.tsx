import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'vi' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

// Translation data
const translations = {
  vi: {
    // Navigation
    'nav.home': 'Trang chủ',
    'nav.download': 'Download',
    'nav.guide': 'Hướng dẫn sử dụng',
    'nav.feedback': 'Feedback',
    'nav.contact': 'Liên hệ',
    
    // Homepage content
    'home.hero.title1': 'Khám phá Mekong Pathfinder',
    'home.hero.title2': 'Theo dõi thời tiết chính xác',
    'home.hero.title3': 'Cộng đồng người dùng',
    'home.hero.desc1': 'Ứng dụng di động thông minh cho khu vực Đồng bằng sông Cửu Long',
    'home.hero.desc2': 'Dự báo thời tiết và cảnh báo lũ lụt thời gian thực',
    'home.hero.desc3': 'Kết nối và chia sẻ thông tin với cộng đồng',
    'home.hero.button1': 'Tìm hiểu thêm',
    'home.hero.button2': 'Xem demo',
    'home.hero.button3': 'Tham gia',
    'home.hero.video': 'Xem video',
    
    // Quick Actions
    'home.quick.title': 'Hành động nhanh',
    'home.quick.download': 'Tải ứng dụng',
    'home.quick.download.desc': 'Tải APK và cài đặt ứng dụng',
    'home.quick.feedback': 'Góp ý',
    'home.quick.feedback.desc': 'Chia sẻ ý kiến và phản hồi',
    'home.quick.guide': 'Hướng dẫn',
    'home.quick.guide.desc': 'Tìm hiểu cách sử dụng',
    
    // Features
    'home.features.title': 'Tính năng nổi bật',
    'home.features.map.title': 'Bản đồ thông minh',
    'home.features.map.desc': 'Tích hợp bản đồ chi tiết với thông tin giao thông thời gian thực',
    'home.features.weather.title': 'Thời tiết chính xác',
    'home.features.weather.desc': 'Dự báo thời tiết chính xác cho khu vực Đồng bằng sông Cửu Long',
    'home.features.safety.title': 'An toàn tuyệt đối',
    'home.features.safety.desc': 'Cảnh báo sớm về lũ lụt và các hiện tượng thời tiết nguy hiểm',
    'home.features.community.title': 'Cộng đồng',
    'home.features.community.desc': 'Kết nối với cộng đồng người dùng và chia sẻ thông tin hữu ích',
    
    // How to use
    'home.howto.title': 'Hướng dẫn sử dụng',
    'home.howto.step1': 'Tải ứng dụng',
    'home.howto.step1.desc': 'Tải APK từ website hoặc Google Play Store',
    'home.howto.step2': 'Đăng ký tài khoản',
    'home.howto.step2.desc': 'Tạo tài khoản để sử dụng đầy đủ tính năng',
    'home.howto.step3': 'Khám phá tính năng',
    'home.howto.step3.desc': 'Sử dụng các tính năng bản đồ, thời tiết và cộng đồng',
    'home.howto.step4': 'Chia sẻ trải nghiệm',
    'home.howto.step4.desc': 'Góp ý và chia sẻ với cộng đồng người dùng',
    'home.howto.start.title': 'Bắt đầu ngay hôm nay',
    'home.howto.start.desc': 'Chỉ với vài bước đơn giản, bạn có thể bắt đầu sử dụng ứng dụng Mekong Pathfinder và khám phá các tính năng tuyệt vời.',
    'home.howto.note.title': 'Lưu ý quan trọng',
    'home.howto.note.desc': 'Ứng dụng yêu cầu Android 6.0 trở lên và kết nối Internet để hoạt động tốt nhất.',
    'home.howto.download': 'Tải ứng dụng ngay',
    
    // Achievements
    'home.achievements.title': 'Thành tựu',
    'home.achievements.award.title': 'Giải thưởng',
    'home.achievements.award.desc': 'Ứng dụng tốt nhất 2024',
    'home.achievements.rating.title': 'Đánh giá',
    'home.achievements.rating.desc': '4.8/5 sao từ người dùng',
    'home.achievements.users.title': 'Người dùng',
    'home.achievements.users.desc': 'Hơn 10,000 người tin dùng',
    'home.achievements.support.title': 'Hỗ trợ',
    'home.achievements.support.desc': '24/7 hỗ trợ người dùng',
    
    // Testimonials
    'home.testimonials.title': 'Người dùng nói gì',
    'home.testimonials.user1.name': 'Nguyễn Văn A',
    'home.testimonials.user1.role': 'Nông dân',
    'home.testimonials.user1.content': 'Ứng dụng giúp tôi theo dõi thời tiết và lũ lụt rất hiệu quả. Cảm ơn team phát triển!',
    'home.testimonials.user2.name': 'Trần Thị B',
    'home.testimonials.user2.role': 'Sinh viên',
    'home.testimonials.user2.content': 'Giao diện đẹp, dễ sử dụng. Tính năng bản đồ rất chính xác và hữu ích.',
    'home.testimonials.user3.name': 'Lê Văn C',
    'home.testimonials.user3.role': 'Tài xế',
    'home.testimonials.user3.content': 'Thông tin giao thông thời gian thực giúp tôi tránh được nhiều đoạn đường tắc.',
    
    // Contact
    'home.contact.title': 'Liên hệ & Hỗ trợ',
    'home.contact.info.title': 'Thông tin liên hệ',
    'home.contact.info.email': 'Email: support@mekongpathfinder.com',
    'home.contact.info.phone': 'Hotline: 1900-xxxx',
    'home.contact.info.time': 'Thời gian: 8:00 - 17:00 (T2-T6)',
    'home.contact.support.title': 'Hỗ trợ nhanh',
    'home.contact.support.feedback': 'Gửi góp ý',
    'home.contact.support.download': 'Tải ứng dụng',
    'home.contact.help.title': 'Cần hỗ trợ?',
    'home.contact.help.desc': 'Chúng tôi luôn sẵn sàng hỗ trợ bạn. Hãy liên hệ qua email hoặc gửi góp ý trực tiếp.',
    
    // Mobile menu
    'mobile.menu.title': 'Menu',
    'mobile.menu.contact': 'Liên hệ hỗ trợ'
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.download': 'Download',
    'nav.guide': 'User Guide',
    'nav.feedback': 'Feedback',
    'nav.contact': 'Contact',
    
    // Homepage content
    'home.hero.title1': 'Discover Mekong Pathfinder',
    'home.hero.title2': 'Accurate Weather Tracking',
    'home.hero.title3': 'User Community',
    'home.hero.desc1': 'Smart mobile application for the Mekong Delta region',
    'home.hero.desc2': 'Real-time weather forecast and flood warnings',
    'home.hero.desc3': 'Connect and share information with the community',
    'home.hero.button1': 'Learn More',
    'home.hero.button2': 'View Demo',
    'home.hero.button3': 'Join',
    'home.hero.video': 'Watch Video',
    
    // Quick Actions
    'home.quick.title': 'Quick Actions',
    'home.quick.download': 'Download App',
    'home.quick.download.desc': 'Download APK and install the application',
    'home.quick.feedback': 'Feedback',
    'home.quick.feedback.desc': 'Share your opinions and feedback',
    'home.quick.guide': 'Guide',
    'home.quick.guide.desc': 'Learn how to use',
    
    // Features
    'home.features.title': 'Key Features',
    'home.features.map.title': 'Smart Map',
    'home.features.map.desc': 'Integrated detailed map with real-time traffic information',
    'home.features.weather.title': 'Accurate Weather',
    'home.features.weather.desc': 'Accurate weather forecast for the Mekong Delta region',
    'home.features.safety.title': 'Absolute Safety',
    'home.features.safety.desc': 'Early warning about floods and dangerous weather phenomena',
    'home.features.community.title': 'Community',
    'home.features.community.desc': 'Connect with user community and share useful information',
    
    // How to use
    'home.howto.title': 'How to Use',
    'home.howto.step1': 'Download App',
    'home.howto.step1.desc': 'Download APK from website or Google Play Store',
    'home.howto.step2': 'Register Account',
    'home.howto.step2.desc': 'Create an account to use full features',
    'home.howto.step3': 'Explore Features',
    'home.howto.step3.desc': 'Use map, weather and community features',
    'home.howto.step4': 'Share Experience',
    'home.howto.step4.desc': 'Give feedback and share with user community',
    'home.howto.start.title': 'Start Today',
    'home.howto.start.desc': 'With just a few simple steps, you can start using the Mekong Pathfinder app and explore amazing features.',
    'home.howto.note.title': 'Important Note',
    'home.howto.note.desc': 'The app requires Android 6.0 or higher and internet connection for optimal performance.',
    'home.howto.download': 'Download Now',
    
    // Achievements
    'home.achievements.title': 'Achievements',
    'home.achievements.award.title': 'Award',
    'home.achievements.award.desc': 'Best App 2024',
    'home.achievements.rating.title': 'Rating',
    'home.achievements.rating.desc': '4.8/5 stars from users',
    'home.achievements.users.title': 'Users',
    'home.achievements.users.desc': 'Over 10,000 trusted users',
    'home.achievements.support.title': 'Support',
    'home.achievements.support.desc': '24/7 user support',
    
    // Testimonials
    'home.testimonials.title': 'What Users Say',
    'home.testimonials.user1.name': 'Nguyen Van A',
    'home.testimonials.user1.role': 'Farmer',
    'home.testimonials.user1.content': 'The app helps me track weather and floods very effectively. Thanks to the development team!',
    'home.testimonials.user2.name': 'Tran Thi B',
    'home.testimonials.user2.role': 'Student',
    'home.testimonials.user2.content': 'Beautiful interface, easy to use. The map feature is very accurate and useful.',
    'home.testimonials.user3.name': 'Le Van C',
    'home.testimonials.user3.role': 'Driver',
    'home.testimonials.user3.content': 'Real-time traffic information helps me avoid many congested roads.',
    
    // Contact
    'home.contact.title': 'Contact & Support',
    'home.contact.info.title': 'Contact Information',
    'home.contact.info.email': 'Email: support@mekongpathfinder.com',
    'home.contact.info.phone': 'Hotline: 1900-xxxx',
    'home.contact.info.time': 'Hours: 8:00 - 17:00 (Mon-Fri)',
    'home.contact.support.title': 'Quick Support',
    'home.contact.support.feedback': 'Send Feedback',
    'home.contact.support.download': 'Download App',
    'home.contact.help.title': 'Need Help?',
    'home.contact.help.desc': 'We are always ready to support you. Contact us via email or send feedback directly.',
    
    // Mobile menu
    'mobile.menu.title': 'Menu',
    'mobile.menu.contact': 'Contact Support'
  }
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('vi');

  const t = (key: string, params?: Record<string, string | number>): string => {
    let translation = translations[language][key as keyof typeof translations[typeof language]] || key;
    
    if (params) {
      Object.entries(params).forEach(([paramKey, value]) => {
        translation = translation.replace(`{${paramKey}}`, String(value));
      });
    }

    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
