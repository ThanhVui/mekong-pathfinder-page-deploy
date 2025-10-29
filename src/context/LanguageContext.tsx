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
    'mobile.menu.contact': 'Liên hệ hỗ trợ',
    
    // Additional sections
    'section.community.survey': 'Kết quả khảo sát cộng đồng',
    'section.social.achievement': 'Thành tựu xã hội',
    'section.gallery': 'Bộ sưu tập',
    'section.about.title': 'Về Chúng Tôi',
    'section.about.team': 'Đội Ngũ Của Chúng Tôi',
    'section.about.vision': 'Tầm Nhìn Của Chúng Tôi',
    
    // App introduction
    'app.intro.title': 'Giới thiệu ứng dụng',
    'app.intro.name': 'Mekong Pathfinder',
    'app.intro.subtitle': 'Ứng dụng di động thông minh',
    'app.intro.description': 'Khám phá các tuyến đường tối ưu, theo dõi giao thông và thời tiết thời gian thực với ứng dụng Mekong Pathfinder. Được thiết kế đặc biệt cho khu vực Đồng bằng sông Cửu Long.',
    'app.intro.free': 'Miễn phí 100%',
    'app.intro.no.ads': 'Không quảng cáo',
    'app.intro.secure': 'Bảo mật cao',
    'app.intro.download': 'Download Ứng Dụng Mekong Pathfinder',
    'app.features.title': 'Tính năng nổi bật',
    'app.features.ai': 'Điều hướng thông minh với AI',
    'app.features.realtime': 'Tuyến đường an toàn thời gian thực',
    'app.features.community': 'Cộng đồng người dùng tương tác',
    'app.features.weather': 'Cảnh báo thời tiết và lũ lụt',
    'app.features.camera': 'Hệ thống camera giám sát',
    'app.features.sos': 'Yêu cầu cứu trợ khẩn cấp',
    'app.screenshots': 'Hình ảnh ứng dụng',
    'app.download.title': 'Tải xuống ứng dụng',
    'app.download.personal': 'Thông tin cá nhân',
    'app.download.desc': 'Vui lòng cung cấp thông tin để chúng tôi có thể hỗ trợ bạn tốt nhất và gửi thông báo về các phiên bản cập nhật mới.',
    'app.download.stats': 'Thống kê tải xuống',
    'app.download.downloads': 'Lượt tải',
    'app.download.rating': 'Đánh giá',
    'app.download.version': 'Phiên bản hiện tại:',
    'app.download.updated': 'Cập nhật lần cuối:',
    'app.download.size': 'Kích thước file:',
    'app.download.button': 'Tải xuống APK',
    'app.guide.title': 'Hướng dẫn sử dụng ứng dụng',
    'app.guide.install': 'Cài đặt và sử dụng',
    'app.guide.features': 'Tính năng chính',
    'app.guide.map': 'Bản đồ thông minh với giao thông thời gian thực',
    'app.guide.forecast': 'Dự báo thời tiết chính xác cho khu vực ĐBSCL',
    'app.guide.flood': 'Cảnh báo lũ lụt và thiên tai',
    'app.guide.share': 'Cộng đồng người dùng chia sẻ thông tin',
    'app.guide.search': 'Tìm kiếm địa điểm và lộ trình tối ưu',
    'app.guide.save': 'Lưu vị trí yêu thích và lịch sử di chuyển',
    'app.step.apk': 'Tải APK',
    'app.step.apk.desc': 'Tải file APK từ website',
    'app.step.install': 'Cài đặt',
    'app.step.install.desc': 'Cho phép cài đặt từ nguồn không xác định',
    'app.step.start': 'Khởi động',
    'app.step.start.desc': 'Mở ứng dụng và đăng nhập',
    'app.step.use': 'Sử dụng',
    'app.step.use.desc': 'Khám phá các tính năng của ứng dụng',
    
    // App features details
    'app.feature.friendly': 'Giao diện thân thiện',
    'app.feature.friendly.desc': 'Thiết kế đơn giản, dễ sử dụng cho mọi lứa tuổi',
    'app.feature.secure': 'Bảo mật cao',
    'app.feature.secure.desc': 'Dữ liệu được mã hóa và bảo vệ an toàn',
    'app.feature.realtime': 'Cập nhật thời gian thực',
    'app.feature.realtime.desc': 'Thông tin giao thông và thời tiết được cập nhật liên tục',
    'app.feature.quality': 'Đánh giá chất lượng',
    'app.feature.quality.desc': 'Hệ thống đánh giá và phản hồi từ cộng đồng',
    'app.guide.feature1': 'Bản đồ thông minh với giao thông thời gian thực',
    'app.guide.feature2': 'Dự báo thời tiết chính xác cho khu vực ĐBSCL',
    'app.guide.feature3': 'Cảnh báo lũ lụt và thiên tai',
    'app.guide.feature4': 'Cộng đồng người dùng chia sẻ thông tin',
    'app.guide.feature5': 'Tìm kiếm địa điểm và lộ trình tối ưu',
    'app.guide.feature6': 'Lưu vị trí yêu thích và lịch sử di chuyển',
    
    // Feedback
    'feedback.title': 'Góp ý & Phản hồi',
    'feedback.subtitle': 'Chia sẻ trải nghiệm của bạn',
    'feedback.description': 'Chúng tôi rất mong nhận được ý kiến đóng góp từ bạn để có thể cải thiện ứng dụng Mekong Pathfinder ngày một tốt hơn. Mọi góp ý đều được đánh giá cao!',
    'feedback.name': 'Họ và tên',
    'feedback.email': 'Email',
    'feedback.phone': 'Số điện thoại (tùy chọn)',
    'feedback.category': 'Loại góp ý',
    'feedback.content': 'Nội dung chi tiết',
    'feedback.submit': 'Gửi góp ý',
    'feedback.card.title': 'Gửi góp ý của bạn',
    'feedback.stats.total': 'Tổng số góp ý',
    'feedback.stats.rating': 'Đánh giá trung bình',
    'feedback.stats.positive': 'Phản hồi tích cực',
    'feedback.category.feature': 'Tính năng mới',
    'feedback.category.improvement': 'Cải thiện tính năng',
    'feedback.category.bug': 'Báo lỗi',
    'feedback.category.other': 'Khác',
    
    // Footer
    'footer.company.name': 'Mekong Pathfinder',
    'footer.company.slogan': 'Nền tảng điều hướng thông minh',
    'footer.company.desc': 'Ứng dụng di động thông minh dành riêng cho thành phố Cần Thơ, tích hợp AI, bản đồ số và dữ liệu camera giao thông để cảnh báo ngập lụt và kẹt xe thời gian thực.',
    'footer.newsletter.title': 'Nhận tin tức mới',
    'footer.newsletter.desc': 'Đăng ký để nhận thông tin cập nhật và tin tức mới nhất từ chúng tôi.',
    'footer.newsletter.button': 'Đăng ký',
    'footer.features.title': 'Tính năng',
    'footer.features.ai': 'Cảnh báo ngập lụt AI',
    'footer.features.traffic': 'Dự báo kẹt xe thời gian thực',
    'footer.features.rescue': 'Dịch vụ cứu hộ xe',
    'footer.features.camera': 'Bản đồ số tích hợp camera',
    'footer.quick.home': 'Trang chủ',
    'footer.quick.download': 'Tải ứng dụng',
    'footer.quick.guide': 'Hướng dẫn',
    'footer.quick.feedback': 'Góp ý',
    'footer.support.title': 'Hỗ trợ',
    'footer.support.center': 'Trung tâm trợ giúp',
    'footer.support.contact': 'Liên hệ hỗ trợ',
    'footer.support.bug': 'Báo cáo lỗi',
    'footer.support.feature': 'Đề xuất tính năng',
    'footer.legal.terms': 'Điều khoản sử dụng',
    'footer.legal.privacy': 'Chính sách bảo mật',
    'footer.legal.cookies': 'Cookie Policy',
    'footer.legal.license': 'Giấy phép',
    'footer.contact.hotline': 'Hotline',
    'footer.contact.location': 'TP. Cần Thơ, Đồng bằng sông Cửu Long',
    'footer.project.title': '🏆 Mekong Tech - Business Challenge 2025',
    'footer.project.team': 'Đội dự thi: Mekong Pathfinders (5 thành viên)',
    'footer.project.lead': 'Trưởng nhóm: Huỳnh Ngọc Như Quỳnh',
    'footer.project.course': 'Khóa: K18 - FPT University',
    'footer.project.topic': 'Chủ đề: Khởi nghiệp dựa trên công nghệ vì phát triển bền vững vùng Đồng bằng sông Cửu Long',
    'footer.tech.title': '🚀 Công nghệ tiên tiến',
    'footer.tech.tag.cv': 'AI & Computer Vision',
    'footer.tech.tag.gis': 'GIS & Bản đồ số',
    'footer.tech.tag.bigdata': 'Big Data Analytics',
    'footer.tech.tag.cloud': 'Cloud Computing',
    'footer.tech.tag.crowd': 'Crowdsourcing',
    'footer.tech.tag.iot': 'IoT Integration',
    'footer.bottom.copyright': '© 2025 Mekong Pathfinder. Dự án tham gia Mekong Tech - Business Challenge 2025.',
    'footer.bottom.theme': 'Được phát triển với',
    'footer.bottom.at': 'tại Việt Nam',
    'footer.bottom.teamline': 'Team: Mekong Pathfinders | Trưởng nhóm: Huỳnh Ngọc Như Quỳnh'
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
    'mobile.menu.contact': 'Contact Support',
    
    // Additional sections
    'section.community.survey': 'Community Survey Results',
    'section.social.achievement': 'Social Achievement',
    'section.gallery': 'Gallery',
    'section.about.title': 'About Us',
    'section.about.team': 'Our Team',
    'section.about.vision': 'Our Vision',
    
    // App introduction
    'app.intro.title': 'Application Introduction',
    'app.intro.name': 'Mekong Pathfinder',
    'app.intro.subtitle': 'Smart Mobile Application',
    'app.intro.description': 'Explore optimal routes, track real-time traffic and weather with Mekong Pathfinder app. Specially designed for the Mekong Delta region.',
    'app.intro.free': '100% Free',
    'app.intro.no.ads': 'No Ads',
    'app.intro.secure': 'Highly Secure',
    'app.intro.download': 'Download Mekong Pathfinder App',
    'app.features.title': 'Key Features',
    'app.features.ai': 'AI-powered Smart Navigation',
    'app.features.realtime': 'Real-time Safe Routes',
    'app.features.community': 'Interactive User Community',
    'app.features.weather': 'Weather and Flood Alerts',
    'app.features.camera': 'Monitoring Camera System',
    'app.features.sos': 'Emergency Rescue Request',
    'app.screenshots': 'Application Screenshots',
    'app.download.title': 'Download Application',
    'app.download.personal': 'Personal Information',
    'app.download.desc': 'Please provide your information so we can best support you and notify you about new update versions.',
    'app.download.stats': 'Download Statistics',
    'app.download.downloads': 'Downloads',
    'app.download.rating': 'Rating',
    'app.download.version': 'Current Version:',
    'app.download.updated': 'Last Updated:',
    'app.download.size': 'File Size:',
    'app.download.button': 'Download APK',
    'app.guide.title': 'Application User Guide',
    'app.guide.install': 'Installation & Usage',
    'app.guide.features': 'Key Features',
    'app.guide.map': 'Smart map with real-time traffic',
    'app.guide.forecast': 'Accurate weather forecast for Mekong Delta region',
    'app.guide.flood': 'Flood and disaster warnings',
    'app.guide.share': 'User community sharing information',
    'app.guide.search': 'Search locations and optimal routes',
    'app.guide.save': 'Save favorite locations and movement history',
    'app.step.apk': 'Download APK',
    'app.step.apk.desc': 'Download APK file from website',
    'app.step.install': 'Install',
    'app.step.install.desc': 'Allow installation from unknown sources',
    'app.step.start': 'Launch',
    'app.step.start.desc': 'Open the app and login',
    'app.step.use': 'Use',
    'app.step.use.desc': 'Explore app features',
    
    // App features details
    'app.feature.friendly': 'User-friendly Interface',
    'app.feature.friendly.desc': 'Simple design, easy to use for all ages',
    'app.feature.secure': 'High Security',
    'app.feature.secure.desc': 'Data is encrypted and safely protected',
    'app.feature.realtime': 'Real-time Updates',
    'app.feature.realtime.desc': 'Traffic and weather information is continuously updated',
    'app.feature.quality': 'Quality Rating',
    'app.feature.quality.desc': 'Rating and feedback system from the community',
    'app.guide.feature1': 'Smart map with real-time traffic',
    'app.guide.feature2': 'Accurate weather forecast for Mekong Delta region',
    'app.guide.feature3': 'Flood and disaster warnings',
    'app.guide.feature4': 'User community sharing information',
    'app.guide.feature5': 'Search locations and optimal routes',
    'app.guide.feature6': 'Save favorite locations and movement history',
    
    // Feedback
    'feedback.title': 'Feedback & Reviews',
    'feedback.subtitle': 'Share Your Experience',
    'feedback.description': 'We greatly appreciate your feedback to help improve the Mekong Pathfinder app. All feedback is highly valued!',
    'feedback.name': 'Full Name',
    'feedback.email': 'Email',
    'feedback.phone': 'Phone (Optional)',
    'feedback.category': 'Feedback Category',
    'feedback.content': 'Detailed Content',
    'feedback.submit': 'Submit Feedback',
    'feedback.card.title': 'Submit Your Feedback',
    'feedback.stats.total': 'Total Feedback',
    'feedback.stats.rating': 'Average Rating',
    'feedback.stats.positive': 'Positive Feedback',
    'feedback.category.feature': 'New Feature',
    'feedback.category.improvement': 'Feature Improvement',
    'feedback.category.bug': 'Bug Report',
    'feedback.category.other': 'Other',
    
    // Footer
    'footer.company.name': 'Mekong Pathfinder',
    'footer.company.slogan': 'Smart Navigation Platform',
    'footer.company.desc': 'A smart mobile application designed for Can Tho City, integrating AI, digital maps, and traffic camera data to provide real-time flood and traffic congestion alerts.',
    'footer.newsletter.title': 'Get the latest news',
    'footer.newsletter.desc': 'Subscribe to receive updates and the latest news from us.',
    'footer.newsletter.button': 'Subscribe',
    'footer.features.title': 'Features',
    'footer.features.ai': 'AI Flood Alerts',
    'footer.features.traffic': 'Real-time Traffic Forecast',
    'footer.features.rescue': 'Vehicle Rescue Service',
    'footer.features.camera': 'Digital Map with Cameras',
    'footer.quick.home': 'Home',
    'footer.quick.download': 'Download App',
    'footer.quick.guide': 'Guide',
    'footer.quick.feedback': 'Feedback',
    'footer.support.title': 'Support',
    'footer.support.center': 'Help Center',
    'footer.support.contact': 'Contact Support',
    'footer.support.bug': 'Report a Bug',
    'footer.support.feature': 'Feature Request',
    'footer.legal.terms': 'Terms of Use',
    'footer.legal.privacy': 'Privacy Policy',
    'footer.legal.cookies': 'Cookie Policy',
    'footer.legal.license': 'License',
    'footer.contact.hotline': 'Hotline',
    'footer.contact.location': 'Can Tho City, Mekong Delta',
    'footer.project.title': '🏆 Mekong Tech - Business Challenge 2025',
    'footer.project.team': 'Team: Mekong Pathfinders (5 members)',
    'footer.project.lead': 'Team Lead: Huynh Ngoc Nhu Quynh',
    'footer.project.course': 'Course: K18 - FPT University',
    'footer.project.topic': 'Theme: Tech-based entrepreneurship for sustainable development in the Mekong Delta',
    'footer.tech.title': '🚀 Advanced Technology',
    'footer.tech.tag.cv': 'AI & Computer Vision',
    'footer.tech.tag.gis': 'GIS & Digital Mapping',
    'footer.tech.tag.bigdata': 'Big Data Analytics',
    'footer.tech.tag.cloud': 'Cloud Computing',
    'footer.tech.tag.crowd': 'Crowdsourcing',
    'footer.tech.tag.iot': 'IoT Integration',
    'footer.bottom.copyright': '© 2025 Mekong Pathfinder. Participating in Mekong Tech - Business Challenge 2025.',
    'footer.bottom.theme': 'Built with',
    'footer.bottom.at': 'in Vietnam',
    'footer.bottom.teamline': 'Team: Mekong Pathfinders | Team Lead: Huynh Ngoc Nhu Quynh'
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
