import React, { useState, useEffect } from 'react';
import {
  Card,
  Button,
  Typography,
  Space,
  Row,
  Col,
  Steps,
  List,
  Tag,
  Divider,
  Carousel,
  Statistic,
  Timeline,
  Alert,
  Rate,
  Avatar
} from 'antd';
import { useColorTheme } from '../../context/ColorThemeContext';
import { useLanguage } from '../../context/LanguageContext';
// Import activities-fanpage images
import post01 from '../../assets/images/activities-fanpage/post-01.png';
import post02 from '../../assets/images/activities-fanpage/post-02.png';
import post03 from '../../assets/images/activities-fanpage/post-03.png';
import post04 from '../../assets/images/activities-fanpage/post-04.png';
import post05 from '../../assets/images/activities-fanpage/post-05.png';
import post06 from '../../assets/images/activities-fanpage/post-08.png';
import post07 from '../../assets/images/activities-fanpage/post-07.png';
// Import About Us images
import mapCanTho from '../../assets/images/map-location/map-cantho.png';
import ourTeamImage from '../../assets/images/map-location/can-tho-in-vietnam4.png';
import aboutTeamImage from '../../assets/images/about-us/nhom-5-nguoi-ninh-kieu.png';
import ourVisionUSImage from '../../assets/images/our-vision/our-vision-us-01.png';
import ourVisionVNImage from '../../assets/images/our-vision/our-vision-vn.png';


// Import poster images (we'll create these from video frames)
import {
  DownloadOutlined,
  MessageOutlined,
  MobileOutlined,
  SafetyOutlined,
  CheckCircleOutlined,
  InfoCircleOutlined,
  StarOutlined,
  HeartOutlined,
  EyeOutlined,
  BulbOutlined,
  BugOutlined,
  UserOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  TeamOutlined,
  RocketOutlined,
  TrophyOutlined,
  GlobalOutlined,
  PhoneOutlined,
  MailOutlined,
  ArrowRightOutlined,
  LeftOutlined,
  RightOutlined,
  BarChartOutlined,
  LikeOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import HomePageHeader from './header/header';
import HomePageFooter from './footer/footer';
import AnimatedSection from '../../components/AnimatedSection';
import NavigationButton from '../../components/NavigationButton';
import APKDownload from './APKDownload';
import FeedBack from './FeedBack';
// import { useResponsive } from '../../hooks/useResponsive';
import { getDownloadStats } from '../../utils/downloadTracker';
import { getFeedbackStats } from '../../utils/feedbackTracker';

const { Title, Paragraph, Text } = Typography;

// Dynamically import all images from gallery folder
// Webpack's require.context is used here to gather all gallery images at build time
const importAll = (r: any): string[] => r.keys().map(r) as string[];
const galleryImages = importAll((require as any).context('../../assets/images/gallery', false, /\.(png|jpe?g|webp|avif)$/));

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { theme } = useColorTheme();
  // const { isMobile, isTablet } = useResponsive();
  const [downloadStats, setDownloadStats] = useState({ totalDownloads: 0, lastUpdated: '' });
  const [feedbackStats, setFeedbackStats] = useState({
    totalFeedbacks: 0,
    averageRating: 0,
    categoryStats: {},
    recentFeedbacks: [] as any[]
  });
  const [currentSurveySlide, setCurrentSurveySlide] = useState(0);
  const [isSurveyTransitioning, setIsSurveyTransitioning] = useState(false);
  const [currentAchievementSlide, setCurrentAchievementSlide] = useState(0);
  const [isAchievementTransitioning, setIsAchievementTransitioning] = useState(false);
  const [achievementItemsToShow, setAchievementItemsToShow] = useState(7);
  const [currentGalleryPage, setCurrentGalleryPage] = useState(1);
  const [teamSlideIndex, setTeamSlideIndex] = useState(0);
  const [visionSlideIndex, setVisionSlideIndex] = useState(0);
  const aboutPauseRef = React.useRef(false);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w <= 768) {
        setAchievementItemsToShow(1);
      } else if (w <= 1024) {
        setAchievementItemsToShow(3);
      } else {
        setAchievementItemsToShow(7);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleAboutHover = (isHover: boolean) => {
    aboutPauseRef.current = isHover;
  };

  const teamImages = [aboutTeamImage, ourTeamImage];
  const visionImages = [ourVisionUSImage, ourVisionVNImage];

  // Auto-rotate images in About section image frames
  useEffect(() => {
    const teamTimer = setInterval(() => {
      if (!aboutPauseRef.current) {
        setTeamSlideIndex((prev) => (prev + 1) % teamImages.length);
      }
    }, 4000);
    const visionTimer = setInterval(() => {
      if (!aboutPauseRef.current) {
        setVisionSlideIndex((prev) => (prev + 1) % visionImages.length);
      }
    }, 4000);
    return () => {
      clearInterval(teamTimer);
      clearInterval(visionTimer);
    };
  }, []);

  // Handle survey slide transition with animation
  const handleSurveySlideChange = (newSlide: number) => {
    setIsSurveyTransitioning(true);
    setTimeout(() => {
      setCurrentSurveySlide(newSlide);
      setTimeout(() => {
        setIsSurveyTransitioning(false);
      }, 50);
    }, 150);
  };

  // Handle achievement slide transition with animation (no delay)
  const handleAchievementSlideChange = (newSlide: number) => {
    setIsAchievementTransitioning(false);
    setCurrentAchievementSlide(newSlide);
  };

  // Load stats on component mount
  useEffect(() => {
    const loadStats = () => {
      try {
        const downloads = getDownloadStats();
        const feedbacks = getFeedbackStats();
        setDownloadStats(downloads);
        setFeedbackStats({
          totalFeedbacks: feedbacks.totalFeedbacks,
          averageRating: feedbacks.averageRating,
          categoryStats: feedbacks.categoryStats,
          recentFeedbacks: feedbacks.recentFeedbacks
        });
      } catch (error) {
        console.error('Error loading stats:', error);
      }
    };

    loadStats();
  }, []);

  const features = [
    {
      icon: <EnvironmentOutlined style={{ color: '#52c41a', fontSize: '32px' }} />,
      title: t('home.features.map.title'),
      description: t('home.features.map.desc')
    },
    {
      icon: <ClockCircleOutlined style={{ color: '#1890ff', fontSize: '32px' }} />,
      title: t('home.features.weather.title'),
      description: t('home.features.weather.desc')
    },
    {
      icon: <SafetyOutlined style={{ color: '#faad14', fontSize: '32px' }} />,
      title: t('home.features.safety.title'),
      description: t('home.features.safety.desc')
    },
    {
      icon: <TeamOutlined style={{ color: '#722ed1', fontSize: '32px' }} />,
      title: t('home.features.community.title'),
      description: t('home.features.community.desc')
    }
  ];

  const steps = [
    {
      title: t('home.howto.step1'),
      description: t('home.howto.step1.desc'),
      icon: <DownloadOutlined />
    },
    {
      title: t('home.howto.step2'),
      description: t('home.howto.step2.desc'),
      icon: <UserOutlined />
    },
    {
      title: t('home.howto.step3'),
      description: t('home.howto.step3.desc'),
      icon: <RocketOutlined />
    },
    {
      title: t('home.howto.step4'),
      description: t('home.howto.step4.desc'),
      icon: <MessageOutlined />
    }
  ];

  // Get testimonials from feedback data
  const feedbacks = feedbackStats.recentFeedbacks;
  const topFeedbacks = feedbacks
    .filter((f: any) => f.rating === 5)
    .slice(0, 3);

  const testimonials = topFeedbacks.length === 0 ? [
    {
      name: t('home.testimonials.user1.name'),
      role: t('home.testimonials.user1.role'),
      content: t('home.testimonials.user1.content'),
      rating: 5,
      avatar: null
    },
    {
      name: t('home.testimonials.user2.name'),
      role: t('home.testimonials.user2.role'),
      content: t('home.testimonials.user2.content'),
      rating: 5,
      avatar: null
    },
    {
      name: t('home.testimonials.user3.name'),
      role: t('home.testimonials.user3.role'),
      content: t('home.testimonials.user3.content'),
      rating: 4,
      avatar: null
    }
  ] : topFeedbacks.map((feedback: any) => ({
    name: feedback.name,
    role: feedback.isAnonymous ? 'Người dùng ẩn danh' : 'Người dùng',
    content: feedback.content,
    rating: feedback.rating,
    avatar: feedback.avatar
  }));

  // Get achievements from real data
  const achievements = [
    {
      icon: <TrophyOutlined style={{ color: '#faad14' }} />,
      title: 'Tổng lượt tải',
      description: `${downloadStats.totalDownloads} lượt tải xuống`,
      value: downloadStats.totalDownloads
    },
    {
      icon: <StarOutlined style={{ color: '#52c41a' }} />,
      title: 'Đánh giá trung bình',
      description: `${feedbackStats.averageRating.toFixed(1)}/5 sao`,
      value: feedbackStats.averageRating
    },
    {
      icon: <MessageOutlined style={{ color: '#1890ff' }} />,
      title: 'Góp ý nhận được',
      description: `${feedbackStats.totalFeedbacks} góp ý từ người dùng`,
      value: feedbackStats.totalFeedbacks
    },
    {
      icon: <HeartOutlined style={{ color: '#ff4d4f' }} />,
      title: 'Phản hồi tích cực',
      description: `${Math.round((feedbackStats.recentFeedbacks.filter((f: any) => f.rating >= 4).length / Math.max(feedbackStats.totalFeedbacks, 1)) * 100)}% hài lòng`,
      value: Math.round((feedbackStats.recentFeedbacks.filter((f: any) => f.rating >= 4).length / Math.max(feedbackStats.totalFeedbacks, 1)) * 100)
    }
  ];


  return (
    <>
      {/* Mobile-specific styles for About Us text justification */}
      <style>
        {`
          @media (max-width: 768px) {
            .about-vision-text {
              text-align: justify !important;
              text-justify: inter-word;
            }
          }
        `}
      </style>

      {/* Header with Hero Background */}
      <HomePageHeader />

      {/* Main Content Container */}
      <div style={{
        width: '100%',
        minHeight: '100vh',
        background: theme.background.page,
        position: 'relative'
      }}>
        <div style={{
          padding: 'clamp(20px, 5vw, 40px) clamp(16px, 3vw, 60px)',
          margin: '0 auto'
        }}>
          <Space direction="vertical" size={40} style={{ width: '100%' }}>

            {/* About Us Section */}
            <div id="about-section" style={{ width: '100%' }}>
              <AnimatedSection animationType="fadeInUp" delay={100}>
                <Title
                  level={1}
                  style={{
                    textAlign: 'center',
                    marginBottom: '20px',
                    fontSize: 'clamp(24px, 4vw, 32px)',
                    fontWeight: '700',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#0344d6';
                    e.currentTarget.style.textShadow = '0 4px 8px rgba(3, 68, 214, 0.3)';
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#001f44';
                    e.currentTarget.style.textShadow = 'none';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  {t('section.about.title')}
                </Title>
                <Row gutter={[24, 24]} style={{ minHeight: '520px' }}>
                  {/* Left Panel - Map Can Tho Image */}
                  <Col xs={24} md={8}>
                    <div
                      style={{
                        height: '100%',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        position: 'relative',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                        e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 31, 68, 0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
                        e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
                      }}
                    >
                      <img
                        src={mapCanTho}
                        alt="Map Can Tho"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease'
                        }}
                      />
                    </div>
                  </Col>

                  {/* Right Panel - Two stacked sections */}
                  <Col xs={24} md={16}>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                      gap: '24px'
                    }}>

                      {/* Row 1: Our Team (Left) + OIP Image (Right) */}
                      <Row gutter={[24, 24]} style={{ flex: '1' }}>
                        {/* Left - Our Team Text */}
                        <Col xs={24} md={12} >
                          <div
                            style={{
                              background: 'white',
                              borderRadius: '16px',
                              padding: '40px',
                              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                              height: '100%',
                              maxHeight: '100%',
                              display: 'flex',
                              flexDirection: 'column',
                              transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                              e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 31, 68, 0.2)';
                              e.currentTarget.style.background = 'linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = 'translateY(0) scale(1)';
                              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
                              e.currentTarget.style.background = 'white';
                            }}
                          >
                            <Title
                              level={2}
                              style={{
                                textAlign: 'right',
                                marginBottom: '20px',
                                fontSize: 'clamp(20px, 3vw, 24px)',
                                fontWeight: '700',
                                transition: 'all 0.3s ease',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.color = '#0344d6';
                                e.currentTarget.style.textShadow = '0 2px 4px rgba(3, 68, 214, 0.3)';
                                e.currentTarget.style.transform = 'translateX(5px)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.color = '#001f44';
                                e.currentTarget.style.textShadow = 'none';
                                e.currentTarget.style.transform = 'translateX(0)';
                              }}
                            >
                              {t('section.about.team')}
                            </Title>
                            <Paragraph
                              style={{
                                fontSize: 'clamp(14px, 2vw, 16px)',
                                lineHeight: '1.6',
                                color: '#333',
                                textAlign: 'justify',
                                transition: 'all 0.3s ease',
                                flex: 1,
                                overflowY: 'auto'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.color = '#0344d6';
                                e.currentTarget.style.textShadow = '0 1px 3px rgba(3, 68, 214, 0.2)';
                                e.currentTarget.style.transform = 'translateX(5px)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.color = '#333';
                                e.currentTarget.style.textShadow = 'none';
                                e.currentTarget.style.transform = 'translateX(0)';
                              }}
                            >
                              {language === 'vi'
                                ? 'Chúng tôi là Mekong Pathfinders, một đội ngũ trẻ đầy nhiệt huyết từ Cần Thơ, cam kết sử dụng công nghệ để tạo ra tác động xã hội và phát triển bền vững ở Đồng bằng sông Cửu Long. Sứ mệnh của chúng tôi là tạo ra những giải pháp thông minh, thực tế để giải quyết những thách thức thực tế mà cộng đồng địa phương phải đối mặt, kết hợp AI, dữ liệu và sự hợp tác của con người để xây dựng một khu vực an toàn hơn, kết nối hơn và kiên cường hơn.'
                                : 'We are Mekong Pathfinders, a passionate team of young innovators from Can Tho committed to using technology for social impact and sustainable development in the Mekong Delta. Our mission is to create smart, practical solutions that address real challenges faced by local communities, combining AI, data, and human collaboration to build a safer, more connected, and resilient region.'
                              }
                            </Paragraph>
                          </div>
                        </Col>

                        {/* Right - OIP Image */}
                        <Col xs={24} md={12}>
                          <div
                            style={{
                              height: 'clamp(260px, 30vw, 400px)',
                              borderRadius: '16px',
                              overflow: 'hidden',
                              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                              position: 'relative',
                              transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
                              e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 31, 68, 0.25)';
                              handleAboutHover(true);
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = 'translateY(0) scale(1)';
                              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
                              handleAboutHover(false);
                            }}
                          >
                            <img
                              src={teamImages[teamSlideIndex]}
                              alt="Global Responsibility"
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'fill',
                                transition: 'transform 0.3s ease'
                              }}
                            />
                          </div>
                        </Col>
                      </Row>

                      {/* Row 2: Can Tho Vietnam Image (Left) + Our Vision (Right) */}
                      <Row gutter={[24, 24]} style={{ flex: '1' }}>
                        {/* Left - Can Tho Vietnam Image */}
                        <Col xs={24} md={12}>
                          <div
                            style={{
                              height: 'clamp(260px, 30vw, 360px)',
                              borderRadius: '16px',
                              overflow: 'hidden',
                              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                              position: 'relative',
                              transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
                              e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 31, 68, 0.25)';
                              handleAboutHover(true);
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = 'translateY(0) scale(1)';
                              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
                              handleAboutHover(false);
                            }}
                          >
                            <img
                              src={visionImages[visionSlideIndex]}
                              alt="Can Tho Vietnam"
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'fill',
                                transition: 'transform 0.3s ease'
                              }}
                            />
                          </div>
                        </Col>

                        {/* Right - Our Vision Text */}
                        <Col xs={24} md={12}>
                          <div
                            style={{
                              background: 'white',
                              borderRadius: '16px',
                              padding: '40px',
                              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                              height: '100%',
                              maxHeight: '100%',
                              display: 'flex',
                              flexDirection: 'column',
                              transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                              e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 31, 68, 0.2)';
                              e.currentTarget.style.background = 'linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = 'translateY(0) scale(1)';
                              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
                              e.currentTarget.style.background = 'white';
                            }}
                          >
                            <Title
                              level={2}
                              style={{
                                textAlign: 'left',
                                marginBottom: '20px',
                                fontSize: 'clamp(20px, 3vw, 24px)',
                                fontWeight: '700',
                                transition: 'all 0.3s ease',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.color = '#0344d6';
                                e.currentTarget.style.textShadow = '0 2px 4px rgba(3, 68, 214, 0.3)';
                                e.currentTarget.style.transform = 'translateX(5px)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.color = '#001f44';
                                e.currentTarget.style.textShadow = 'none';
                                e.currentTarget.style.transform = 'translateX(0)';
                              }}
                            >
                              {t('section.about.vision')}
                            </Title>
                            <Paragraph
                              className="about-vision-text"
                              style={{
                                fontSize: 'clamp(14px, 2vw, 16px)',
                                lineHeight: '1.6',
                                color: '#333',
                                textAlign: 'justify',
                                transition: 'all 0.3s ease',
                                flex: 1,
                                overflowY: 'auto'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.color = '#0344d6';
                                e.currentTarget.style.textShadow = '0 1px 3px rgba(3, 68, 214, 0.2)';
                                e.currentTarget.style.transform = 'translateX(5px)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.color = '#333';
                                e.currentTarget.style.textShadow = 'none';
                                e.currentTarget.style.transform = 'translateX(0)';
                              }}
                            >
                              {language === 'vi'
                                ? 'Chúng tôi hình dung một Đồng bằng sông Cửu Long thông minh và bền vững hơn, nơi công nghệ trao quyền cho mọi người sống tốt hơn, di chuyển an toàn hơn và cùng nhau phát triển. Thông qua đổi mới liên tục và hợp tác địa phương, chúng tôi hướng tới việc thu hẹp khoảng cách giữa chuyển đổi số và phúc lợi cộng đồng, góp phần vào sự phát triển bền vững lâu dài của Việt Nam.'
                                : 'We envision a smarter and more sustainable Mekong Delta, where technology empowers people to live better, move safer, and thrive together. Through continuous innovation and local partnerships, we aim to bridge the gap between digital transformation and community well-being, contributing to Vietnam\'s long-term sustainable growth.'
                              }
                            </Paragraph>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              </AnimatedSection>
            </div>

            {/* Community Interview Section */}
            <AnimatedSection animationType="fadeInUp" delay={100}>
              <Title
                level={1}
                style={{
                  textAlign: 'center',
                  marginBottom: '20px',
                  fontSize: 'clamp(24px, 4vw, 32px)',
                  fontWeight: '700',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#0344d6';
                  e.currentTarget.style.textShadow = '0 4px 8px rgba(3, 68, 214, 0.3)';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#001f44';
                  e.currentTarget.style.textShadow = 'none';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                {t('section.community.survey')}
              </Title>

              {/* Survey Data */}
              {(() => {
                const surveyData = [
                  {
                    title: 'Kết quả khảo sát cộng đồng - Video 1',
                    description: 'Chia sẻ kết quả khảo sát từ cộng đồng người dùng Mekong Pathfinder',
                    videoUrl: 'https://player.cloudinary.com/embed/?cloud_name=dj7jvklwp&public_id=IMG_5664_qx1vn6&profile=cld-default'
                  },
                  {
                    title: 'Kết quả khảo sát cộng đồng - Video 2',
                    description: 'Phân tích chi tiết về phản hồi và đánh giá từ người dùng',
                    videoUrl: 'https://player.cloudinary.com/embed/?cloud_name=dj7jvklwp&public_id=IMG_0321_ydirrb&profile=cld-default'
                  },
                  {
                    title: 'Kết quả khảo sát cộng đồng - Video 3',
                    description: 'Tổng kết và đánh giá tổng thể từ cộng đồng người dùng',
                    videoUrl: 'https://player.cloudinary.com/embed/?cloud_name=dj7jvklwp&public_id=Untitled_video_-_Made_with_Clipchamp_1_e1jstd&profile=cld-default'
                  },
                  {
                    title: 'Kết quả khảo sát cộng đồng - Video 4',
                    description: 'Tổng kết và đánh giá tổng thể từ cộng đồng người dùng',
                    videoUrl: 'https://player.cloudinary.com/embed/?cloud_name=dj7jvklwp&public_id=Video_TauHu_-_Made_with_Clipchamp_2_qcqnww&profile=cld-default'
                  },
                  {
                    title: 'Kết quả khảo sát cộng đồng - Video 5',
                    description: 'Phân tích sâu về xu hướng và nhu cầu của cộng đồng',
                    videoUrl: 'https://player.cloudinary.com/embed/?cloud_name=dj7jvklwp&public_id=Untitled_video_-_Made_with_Clipchamp_2_um38h4&profile=cld-default'
                  },
                  {
                    title: 'Kết quả khảo sát cộng đồng - Video 6',
                    description: 'Đánh giá hiệu quả và tác động của các sáng kiến cộng đồng',
                    videoUrl: 'https://player.cloudinary.com/embed/?cloud_name=dj7jvklwp&public_id=IMG_5673_rf5rm6&profile=cld-default'
                  },
                  {
                    title: 'Kết quả khảo sát cộng đồng - Video 7',
                    description: 'Đánh giá hiệu quả và tác động của các sáng kiến cộng đồng',
                    videoUrl: 'https://player.cloudinary.com/embed/?cloud_name=dj7jvklwp&public_id=Untitled_video_-_Made_with_Clipchamp_obrkdi&profile=cld-default'
                  },
                  {
                    title: 'Kết quả khảo sát cộng đồng - Video 8',
                    description: 'Đánh giá hiệu quả và tác động của các sáng kiến cộng đồng',
                    videoUrl: 'https://player.cloudinary.com/embed/?cloud_name=dj7jvklwp&public_id=IMG_5661_zxytqh&profile=cld-default'
                  }
                ];

                const itemsPerSlide = 4;
                const totalSlides = Math.ceil(surveyData.length / itemsPerSlide);
                const currentItems = surveyData.slice(
                  currentSurveySlide * itemsPerSlide,
                  (currentSurveySlide + 1) * itemsPerSlide
                );

                return (
                  <div
                    style={{ position: 'relative' }}
                    onTouchStart={(e) => {
                      const touch = e.touches[0];
                      const startX = touch.clientX;

                      const handleTouchMove = (moveEvent: TouchEvent) => {
                        const currentTouch = moveEvent.touches[0];
                        const diffX = startX - currentTouch.clientX;

                        if (Math.abs(diffX) > 50) {
                          if (diffX > 0) {
                            // Swipe left - go to next slide (circular)
                            if (currentSurveySlide === totalSlides - 1) {
                              handleSurveySlideChange(0); // Go to first slide
                            } else {
                              handleSurveySlideChange(currentSurveySlide + 1);
                            }
                          } else if (diffX < 0) {
                            // Swipe right - go to previous slide (circular)
                            if (currentSurveySlide === 0) {
                              handleSurveySlideChange(totalSlides - 1); // Go to last slide
                            } else {
                              handleSurveySlideChange(currentSurveySlide - 1);
                            }
                          }
                          document.removeEventListener('touchmove', handleTouchMove);
                          document.removeEventListener('touchend', handleTouchEnd);
                        }
                      };

                      const handleTouchEnd = () => {
                        document.removeEventListener('touchmove', handleTouchMove);
                        document.removeEventListener('touchend', handleTouchEnd);
                      };

                      document.addEventListener('touchmove', handleTouchMove);
                      document.addEventListener('touchend', handleTouchEnd);
                    }}
                  >
                    {/* Arrow Navigation - Only show if more than 4 items */}
                    {surveyData.length > 4 && (
                      <>
                        {/* Left Arrow */}
                        <Button
                          type="text"
                          icon={<LeftOutlined />}
                          onClick={() => {
                            if (currentSurveySlide === 0) {
                              handleSurveySlideChange(totalSlides - 1); // Go to last slide
                            } else {
                              handleSurveySlideChange(currentSurveySlide - 1);
                            }
                          }}
                          style={{
                            position: 'absolute',
                            left: '0px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            zIndex: 10,
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: 'rgba(255, 255, 255, 0.9)',
                            border: '1px solid rgba(0, 0, 0, 0.1)',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.3s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 1)';
                            e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                            e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.2)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
                            e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                          }}
                        />

                        {/* Right Arrow */}
                        <Button
                          type="text"
                          icon={<RightOutlined />}
                          onClick={() => {
                            if (currentSurveySlide === totalSlides - 1) {
                              handleSurveySlideChange(0); // Go to first slide
                            } else {
                              handleSurveySlideChange(currentSurveySlide + 1);
                            }
                          }}
                          style={{
                            position: 'absolute',
                            right: '0px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            zIndex: 10,
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: 'rgba(255, 255, 255, 0.9)',
                            border: '1px solid rgba(0, 0, 0, 0.1)',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.3s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 1)';
                            e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                            e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.2)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
                            e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                          }}
                        />
                      </>
                    )}


                    <Row
                      gutter={[20, 20]}
                      justify="center"
                      style={{
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        opacity: isSurveyTransitioning ? 0.3 : 1,
                        transform: isSurveyTransitioning ? 'translateX(20px)' : 'translateX(0)',
                        filter: isSurveyTransitioning ? 'blur(2px)' : 'blur(0)'
                      }}
                    >
                      {currentItems.map((item, index) => (
                        <Col xs={24} sm={12} md={6} key={index} style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                        }}>
                          <div
                            style={{
                              borderRadius: '12px',
                              overflow: 'hidden',
                              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.12)',
                              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                              height: '280px',
                              background: 'rgba(87, 128, 161, 0.1)',
                              border: '1px solid rgba(87, 128, 161, 0.3)',
                              display: 'flex',
                              flexDirection: 'column',
                              animationDelay: `${index * 0.1}s`,
                              transform: isSurveyTransitioning ? 'translateY(10px) scale(0.98)' : 'translateY(0) scale(1)',
                              opacity: isSurveyTransitioning ? 0.7 : 1,
                              width: '100%'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = 'translateY(-6px)';
                              e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.18)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = 'translateY(0)';
                              e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.12)';
                            }}
                          >
                            {/* Video Player */}
                            <div style={{
                              position: 'relative',
                              height: '180px',
                              background: '#000'
                            }}>
                              {item.videoUrl.includes('player.cloudinary.com') ? (
                                <iframe
                                  src={`${item.videoUrl}&player[controls]=true&player[autoplay]=false`}
                                  allow="autoplay; fullscreen; encrypted-media"
                                  style={{
                                    border: 'none',
                                    width: '100%',
                                    height: '100%'
                                  }}
                                  title={item.title}
                                />
                              ) : (
                                <video
                                  controls
                                  preload="metadata"
                                  style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover'
                                  }}
                                >
                                  <source src={item.videoUrl} type="video/mp4" />
                                  Your browser does not support the video tag.
                                </video>
                              )}
                            </div>

                            {/* Video Info */}
                            <div style={{
                              padding: '12px',
                              flex: 1,
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'space-between'
                            }}>
                              <div>
                                <h4 style={{
                                  margin: '0 0 6px 0',
                                  fontSize: '16px',
                                  fontWeight: '600',
                                  color: '#000',
                                  lineHeight: '1.3',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  display: '-webkit-box',
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: 'vertical'
                                }}>
                                  {item.title}
                                </h4>
                                <p style={{
                                  margin: '0 0 8px 0',
                                  fontSize: '14px',
                                  color: '#666',
                                  lineHeight: '1.3',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  display: '-webkit-box',
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: 'vertical'
                                }}>
                                  {item.description}
                                </p>
                              </div>
                              
                            </div>
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </div>
                );
              })()}
            </AnimatedSection>

            {/* Social Achievement Section */}
            <AnimatedSection animationType="fadeInUp" delay={100}>
              <Title
                level={1}
                style={{
                  textAlign: 'center',
                  marginBottom: '20px',
                  fontSize: 'clamp(24px, 4vw, 32px)',
                  fontWeight: '700',
                  color: '#000',
                  letterSpacing: '2px',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#0344d6';
                  e.currentTarget.style.textShadow = '0 4px 8px rgba(3, 68, 214, 0.3)';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#001f44';
                  e.currentTarget.style.textShadow = 'none';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                {t('section.social.achievement')}
              </Title>

              {/* Achievement Carousel */}
              {(() => {
                const achievementData = [
                  {
                    image: post01,
                    title: 'Conservation',
                    facebookUrl: 'https://www.facebook.com/share/p/1D8mHMC4c3/'
                  },
                  {
                    image: post02,
                    title: 'Community',
                    facebookUrl: 'https://www.facebook.com/share/p/1G6HNSTikK/'
                  },
                  {
                    image: post03,
                    title: 'Innovation',
                    facebookUrl: 'https://www.facebook.com/share/1BcDW5Cb8v/'
                  },
                  {
                    image: post04,
                    title: 'Sustainability',
                    facebookUrl: 'https://www.facebook.com/share/p/1BH3VLG8ZQ/'
                  },
                  {
                    image: post05,
                    title: 'Digital',
                    facebookUrl: 'https://www.facebook.com/share/r/1RgUzWkQ4N/'
                  },
                  {
                    image: post06,
                    title: 'Social',
                    facebookUrl: 'https://www.facebook.com/share/p/1BZuTZZwVB/'
                  },
                  {
                    image: post07,
                    title: 'Future',
                    facebookUrl: 'https://www.facebook.com/share/p/1BZuTZZwVB/'
                  }
                ];

                const totalSlides = achievementData.length;
                const itemsToShow = achievementItemsToShow;
                const getCurrentItems = () => {
                  const items: typeof achievementData = [] as any;
                  for (let i = 0; i < itemsToShow; i++) {
                    const index = (currentAchievementSlide + i) % totalSlides;
                    items.push(achievementData[index]);
                  }
                  return items;
                };

                const currentItems = getCurrentItems();

                // Predefined sizes per layout for visual balance
                const sizesByCount: Record<number, Array<{ w: number; h: number }>> = {
                  1: [{ w: 280, h: 420 }],
                  3: [
                    { w: 200, h: 300 },
                    { w: 260, h: 380 },
                    { w: 200, h: 300 },
                  ],
                  7: [
                    { w: 100, h: 220 },
                    { w: 160, h: 280 },
                    { w: 200, h: 320 },
                    { w: 300, h: 460 },
                    { w: 200, h: 320 },
                    { w: 160, h: 280 },
                    { w: 100, h: 220 },
                  ],
                };

                const sizes = sizesByCount[itemsToShow] || sizesByCount[7];

                return (
                  <div
                    style={{ position: 'relative' }}
                    onTouchStart={(e) => {
                      const touch = e.touches[0];
                      const startX = touch.clientX;

                      const handleTouchMove = (moveEvent: TouchEvent) => {
                        const currentTouch = moveEvent.touches[0];
                        const diffX = startX - currentTouch.clientX;

                        if (Math.abs(diffX) > 50) {
                          if (diffX > 0) {
                            handleAchievementSlideChange((currentAchievementSlide + 1) % totalSlides);
                          } else if (diffX < 0) {
                            handleAchievementSlideChange((currentAchievementSlide - 1 + totalSlides) % totalSlides);
                          }
                          document.removeEventListener('touchmove', handleTouchMove);
                          document.removeEventListener('touchend', handleTouchEnd);
                        }
                      };

                      const handleTouchEnd = () => {
                        document.removeEventListener('touchmove', handleTouchMove);
                        document.removeEventListener('touchend', handleTouchEnd);
                      };

                      document.addEventListener('touchmove', handleTouchMove);
                      document.addEventListener('touchend', handleTouchEnd);
                    }}
                  >
                    {/* Left Arrow */}
                    <Button
                      type="text"
                      icon={<LeftOutlined />}
                      onClick={() => handleAchievementSlideChange((currentAchievementSlide - 1 + totalSlides) % totalSlides)}
                      style={{
                        position: 'absolute',
                        left: '0px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 10,
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.95)',
                        border: '2px solid rgba(0, 31, 68, 0.2)',
                        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'none',
                        color: '#001f44'
                      }}
                    />

                    {/* Right Arrow */}
                    <Button
                      type="text"
                      icon={<RightOutlined />}
                      onClick={() => handleAchievementSlideChange((currentAchievementSlide + 1) % totalSlides)}
                      style={{
                        position: 'absolute',
                        right: '0px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 10,
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.95)',
                        border: '2px solid rgba(0, 31, 68, 0.2)',
                        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'none',
                        color: '#001f44'
                      }}
                    />

                    {/* Carousel Content */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: '14px',
                      transition: 'none'
                    }}>
                      {currentItems.map((item, idx) => {
                        const size = sizes[idx] || sizes[sizes.length - 1];
                        return (
                          <div
                            key={idx}
                            style={{
                              width: `${size.w}px`,
                              height: `${size.h}px`,
                              borderRadius: '20px',
                              overflow: 'hidden',
                              position: 'relative',
                              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.18)'
                            }}
                            onClick={() => window.open(item.facebookUrl, '_blank')}
                          >
                            <img
                              src={item.image}
                              alt={item.title}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}
            </AnimatedSection>

            {/* Gallery Section */}
            <AnimatedSection animationType="fadeInUp" delay={100}>
              <Title
                level={1}
                style={{
                  textAlign: 'center',
                  marginBottom: '40px',
                  fontSize: 'clamp(24px, 4vw, 32px)',
                  fontWeight: '700',
                  color: '#000',
                  letterSpacing: '2px',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#0344d6';
                  e.currentTarget.style.textShadow = '0 4px 8px rgba(3, 68, 214, 0.3)';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#001f44';
                  e.currentTarget.style.textShadow = 'none';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                {t('section.gallery')}
              </Title>

              {/* Gallery Data */}
              {(() => {
                const galleryData = galleryImages.map((img) => ({ image: img, title: '' }));

                const itemsPerPage = 8;
                const totalPages = Math.ceil(galleryData.length / itemsPerPage);
                const startIndex = (currentGalleryPage - 1) * itemsPerPage;
                const endIndex = startIndex + itemsPerPage;
                const currentItems = galleryData.slice(startIndex, endIndex);

                return (
                  <div>
                    {/* Gallery Items */}
                    <Row gutter={[20, 20]} justify="center">
                      {currentItems.map((item, index) => (
                        <Col xs={24} sm={12} md={6} key={index}>
                          <div
                            style={{
                              position: 'relative',
                              borderRadius: '16px',
                              overflow: 'hidden',
                              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                              transition: 'all 0.3s ease',
                              height: '220px',
                              background: 'rgba(87, 128, 161, 0.1)',
                              border: '1px solid rgba(87, 128, 161, 0.3)',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = 'translateY(-8px)';
                              e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.2)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = 'translateY(0)';
                              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
                            }}
                          >
                            <div style={{ position: 'relative', height: '100%' }}>
                              <img
                                src={item.image}
                                alt={item.title}
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'cover',
                                }}
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                }}
                              />
                            </div>
                          </div>
                        </Col>
                      ))}
                    </Row>

                    {/* Pagination */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: '40px',
                      gap: '8px'
                    }}>
                      {/* Previous Button */}
                      <Button
                        type="text"
                        icon={<LeftOutlined />}
                        onClick={() => setCurrentGalleryPage(Math.max(1, currentGalleryPage - 1))}
                        disabled={currentGalleryPage === 1}
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          background: currentGalleryPage === 1 ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 31, 68, 0.1)',
                          border: '1px solid rgba(0, 31, 68, 0.2)',
                          color: currentGalleryPage === 1 ? 'rgba(0, 0, 0, 0.3)' : '#001f44',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          if (currentGalleryPage > 1) {
                            e.currentTarget.style.background = 'rgba(0, 31, 68, 0.2)';
                            e.currentTarget.style.transform = 'scale(1.1)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (currentGalleryPage > 1) {
                            e.currentTarget.style.background = 'rgba(0, 31, 68, 0.1)';
                            e.currentTarget.style.transform = 'scale(1)';
                          }
                        }}
                      />

                      {/* Page Numbers */}
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Button
                          key={page}
                          type={page === currentGalleryPage ? 'primary' : 'text'}
                          onClick={() => setCurrentGalleryPage(page)}
                          style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: page === currentGalleryPage ? '#001f44' : 'rgba(0, 31, 68, 0.1)',
                            border: page === currentGalleryPage ? '1px solid #001f44' : '1px solid rgba(0, 31, 68, 0.2)',
                            color: page === currentGalleryPage ? 'white' : '#001f44',
                            fontWeight: '600',
                            transition: 'all 0.3s ease'
                          }}
                          onMouseEnter={(e) => {
                            if (page !== currentGalleryPage) {
                              e.currentTarget.style.background = 'rgba(0, 31, 68, 0.2)';
                              e.currentTarget.style.transform = 'scale(1.1)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (page !== currentGalleryPage) {
                              e.currentTarget.style.background = 'rgba(0, 31, 68, 0.1)';
                              e.currentTarget.style.transform = 'scale(1)';
                            }
                          }}
                        >
                          {page}
                        </Button>
                      ))}

                      {/* Next Button */}
                      <Button
                        type="text"
                        icon={<RightOutlined />}
                        onClick={() => setCurrentGalleryPage(Math.min(totalPages, currentGalleryPage + 1))}
                        disabled={currentGalleryPage === totalPages}
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          background: currentGalleryPage === totalPages ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 31, 68, 0.1)',
                          border: '1px solid rgba(0, 31, 68, 0.2)',
                          color: currentGalleryPage === totalPages ? 'rgba(0, 0, 0, 0.3)' : '#001f44',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          if (currentGalleryPage < totalPages) {
                            e.currentTarget.style.background = 'rgba(0, 31, 68, 0.2)';
                            e.currentTarget.style.transform = 'scale(1.1)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (currentGalleryPage < totalPages) {
                            e.currentTarget.style.background = 'rgba(0, 31, 68, 0.1)';
                            e.currentTarget.style.transform = 'scale(1)';
                          }
                        }}
                      />
                    </div>

                    {/* Page Info */}
                    <div style={{
                      textAlign: 'center',
                      marginTop: '20px',
                      fontSize: '14px',
                      color: '#666',
                      fontWeight: '500'
                    }}>
                      Page {currentGalleryPage} of {totalPages} • {galleryData.length} items total
                    </div>
                  </div>
                );
              })()}
            </AnimatedSection>

            {/* Download Section */}
            <div id="download-section">
              <APKDownload />
            </div>

            {/* Feedback Section */}
            <div id="feedback-section">
              <FeedBack />
            </div>

          </Space>
        </div>
      </div>


      <HomePageFooter />
    </>
  );
};

export default HomePage;