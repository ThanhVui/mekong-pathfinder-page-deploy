import React, { useState, useEffect, useRef } from 'react';
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
import logoBanner from '../../assets/images/logo_header/logo_banner.png';
import banner from '../../assets/images/logo_header/banner.png';
// Import activities-fanpage images
import post01 from '../../assets/images/activities-fanpage/post-01.png';
import post02 from '../../assets/images/activities-fanpage/post-02.png';
import post03 from '../../assets/images/activities-fanpage/post-03.png';
import post04 from '../../assets/images/activities-fanpage/post-04.png';
import post05 from '../../assets/images/activities-fanpage/post-05.png';
import post06 from '../../assets/images/activities-fanpage/post-06.png';
import post07 from '../../assets/images/activities-fanpage/post-07.png';
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
  PlayCircleOutlined,
  LeftOutlined,
  RightOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import HomePageHeader from './header/header';
import HomePageFooter from './footer/footer';
import AnimatedSection from '../../components/AnimatedSection';
import NavigationButton from '../../components/NavigationButton';
// import { useResponsive } from '../../hooks/useResponsive';
import { getDownloadStats } from '../../utils/downloadTracker';
import { getFeedbackStats } from '../../utils/feedbackTracker';

const { Title, Paragraph, Text } = Typography;

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { theme } = useColorTheme();
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef<any>(null);
  // const { isMobile, isTablet } = useResponsive();
  const [downloadStats, setDownloadStats] = useState({ totalDownloads: 0, lastUpdated: '' });
  const [feedbackStats, setFeedbackStats] = useState({ 
    totalFeedbacks: 0, 
    averageRating: 0, 
    categoryStats: {},
    recentFeedbacks: [] as any[]
  });

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

  const carouselItems = [
    {
      title: t('home.hero.title1'),
      description: t('home.hero.desc1'),
      image: logoBanner,
      buttonText: t('home.hero.button1'),
      buttonAction: () => navigate('/apk-download')
    },
    {
      title: t('home.hero.title2'),
      description: t('home.hero.desc2'),
      image: banner,
      buttonText: t('home.hero.button2'),
      buttonAction: () => navigate('/feedback')
    },
    {
      title: t('home.hero.title3'),
      description: t('home.hero.desc3'),
      image: logoBanner,
      buttonText: t('home.hero.button3'),
      buttonAction: () => navigate('/feedback')
    }
  ];

  return (
    <>
      
      {/* Hero Section - Full Width */}
      <div style={{ position: 'relative', paddingTop: '10px', background: theme.background.page }}>
      <HomePageHeader />

            <Carousel 
              ref={carouselRef}
              autoplay 
              autoplaySpeed={2000} 
              lazyLoad="ondemand"
              beforeChange={(from, to) => setCurrentSlide(to)}
            >
            {carouselItems.map((item, index) => (
              <div key={index}>
                <div style={{ 
                  position: 'relative',
                  minHeight: 'clamp(400px, 60vh, 700px)',
                  maxWidth: '1400px',
                  margin: '0 auto',
                  borderRadius: '20px',
                  backgroundImage: `url(${item.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  display: 'flex',
                  alignItems: 'flex-end',
                  overflow: 'hidden',
                  width: '100%',
                }}>
                  {/* Overlay để làm tối ảnh nền */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.1) 100%)',
                    zIndex: 1
                  }} />
                  
                  {/* Content overlay - góc dưới trái */}
                  <div style={{
                    position: 'absolute',
                    bottom: '40px',
                    left: '40px',
                    zIndex: 2,
                    color: 'white',
                    textAlign: 'left',
                    maxWidth: '600px'
                  }}>
                    <Space direction="vertical" size={24} style={{ width: '100%' }}>
                      <Title level={1} style={{ 
                        margin: 0,
                        fontSize: 'clamp(28px, 4vw, 42px)',
                        color: 'white',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
                        fontWeight: '700',
                        textAlign: 'left'
                      }}>
                        {item.title}
                      </Title>
                      <Paragraph style={{ 
                        fontSize: 'clamp(16px, 2.5vw, 20px)', 
                        lineHeight: 1.6,
                        color: 'rgba(255,255,255,0.95)',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
                        margin: 0,
                        textAlign: 'left'
                      }}>
                        {item.description}
                      </Paragraph>
                      <Space wrap style={{ justifyContent: 'flex-start' }}>
                        <Button 
                          type="primary" 
                          size="large"
                          icon={<ArrowRightOutlined />}
                          onClick={item.buttonAction}
                          style={{
                            background: 'linear-gradient(135deg, #0344d6 0%, #377aef 100%)',
                            border: 'none',
                            borderRadius: '25px',
                            height: '50px',
                            padding: '0 30px',
                            fontSize: '16px',
                            fontWeight: '600',
                            boxShadow: '0 8px 25px rgba(3, 68, 214, 0.4)',
                            textShadow: 'none',
                            minWidth: '160px'
                          }}
                        >
                          {item.buttonText}
                        </Button>
                        <Button 
                          size="large"
                          icon={<PlayCircleOutlined />}
                          style={{
                            borderRadius: '25px',
                            height: '50px',
                            padding: '0 30px',
                            fontSize: '16px',
                            fontWeight: '600',
                            border: '2px solid #c5e2ff',
                            color: '#001f44',
                            background: 'rgba(197, 226, 255, 0.1)',
                            backdropFilter: 'blur(10px)',
                            minWidth: '160px'
                          }}
                        >
                          {t('home.hero.video')}
                        </Button>
                      </Space>
                    </Space>
                  </div>
                </div>
              </div>
            ))}
            </Carousel>
            
            {/* Navigation Arrows */}
            <NavigationButton
              direction="left"
              onClick={() => {
                const newSlide = currentSlide > 0 ? currentSlide - 1 : carouselItems.length - 1;
                setCurrentSlide(newSlide);
                carouselRef.current?.goTo(newSlide);
              }}
              style={{
                position: 'absolute',
                top: '60%',
                left: '2%',
                transform: 'translateY(-50%)',
                zIndex: 10
              }}
            />
            <NavigationButton
              direction="right"
              onClick={() => {
                const newSlide = currentSlide < carouselItems.length - 1 ? currentSlide + 1 : 0;
                setCurrentSlide(newSlide);
                carouselRef.current?.goTo(newSlide);
              }}
              style={{
                position: 'absolute',
                top: '60%',
                right: '2%',
                transform: 'translateY(-50%)',
                zIndex: 10
              }}
            />
        </div>

      {/* Main Content Container */}
      <div style={{ 
        width: '100%',
        minHeight: '100vh',
        background: theme.background.page,
        position: 'relative'
      }}>
        <div style={{ 
          padding: 'clamp(20px, 5vw, 40px) clamp(16px, 3vw, 60px)',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <Space direction="vertical" size={40} style={{ width: '100%' }}>

        {/* Community Interview Section */}
        <AnimatedSection animationType="fadeInUp" delay={100}>
          <Card 
            title="Community Survey Results"
            style={{
              background: '#fff',
              border: '1px solid rgba(131, 181, 252, 0.2)',
              borderRadius: '20px',
              boxShadow: '0 15px 35px rgba(0, 31, 68, 0.3)',
              backdropFilter: 'blur(10px)'
            }}
            headStyle={{
              background: 'transparent',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#000',
              fontSize: '28px',
              fontWeight: '700',
              textAlign: 'center'
            }}
          >
            <Row gutter={[16, 16]} justify="center">
              {[
                {
                  title: 'Kết quả khảo sát cộng đồng - Video 1',
                  description: 'Chia sẻ kết quả khảo sát từ cộng đồng người dùng Mekong Pathfinder',
                  videoUrl: 'https://player.cloudinary.com/embed/?cloud_name=dj7jvklwp&public_id=IMG_5664_qx1vn6&profile=cld-default',
                  duration: '2:30',
                  views: '1.2K',
                  date: '15/12/2024'
                },
                {
                  title: 'Kết quả khảo sát cộng đồng - Video 2',
                  description: 'Phân tích chi tiết về phản hồi và đánh giá từ người dùng',
                  videoUrl: 'https://player.cloudinary.com/embed/?cloud_name=dj7jvklwp&public_id=IMG_0321_ydirrb&profile=cld-default',
                  duration: '3:15',
                  views: '1.8K',
                  date: '22/12/2024'
                },
                {
                  title: 'Kết quả khảo sát cộng đồng - Video 3',
                  description: 'Tổng kết và đánh giá tổng thể từ cộng đồng người dùng',
                  videoUrl: 'https://player.cloudinary.com/embed/?cloud_name=dj7jvklwp&public_id=IMG_5673_rf5rm6&profile=cld-default',
                  duration: '4:20',
                  views: '2.1K',
                  date: '29/12/2024'
                }
              ].map((item, index) => (
                <Col xs={24} sm={12} md={8} key={index}>
                  <div
                    style={{
                      borderRadius: '16px',
                      overflow: 'hidden',
                      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                      transition: 'all 0.3s ease',
                      height: 'clamp(300px, 50vh, 350px)',
                      background: 'rgba(87, 128, 161, 0.1)',
                      border: '1px solid rgba(87, 128, 161, 0.3)',
                      display: 'flex',
                      flexDirection: 'column'
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
                    {/* Video Player */}
                    <div style={{ 
                      position: 'relative', 
                      height: 'clamp(150px, 25vh, 200px)',
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
                      padding: '16px',
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}>
            <div>
                        <h4 style={{ 
                          margin: '0 0 8px 0', 
                          fontSize: 'clamp(14px, 2.5vw, 16px)', 
                          fontWeight: '600',
                          color: '#000'
                        }}>
                          {item.title}
                        </h4>
                        <p style={{ 
                          margin: '0 0 12px 0', 
                          fontSize: 'clamp(14px, 2.5vw, 16px)',
                          color: '#000',
                          lineHeight: '1.4'
                        }}>
                          {item.description}
                        </p>
                      </div>
                      
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        fontSize: 'clamp(9px, 1.8vw, 11px)',
                        color: '#000'
                      }}>
                        <span>{item.duration}</span>
                        <span>{item.views} lượt xem</span>
                        <span>{item.date}</span>
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
              </Row>
          </Card>
        </AnimatedSection>

        {/* Social Achievement Section */}
        <AnimatedSection animationType="fadeInUp" delay={100}>
          <Card 
            title={
              <div style={{ textAlign: 'center' }}>
                <TrophyOutlined style={{ fontSize: '32px', color: '#ffd700', marginRight: '12px' }} />
                <span style={{ 
                  background: '#000',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: '32px',
                  fontWeight: '800',
                  textShadow: 'white'
                }}>
                  Social Achievement
                </span>
            </div>
            }
            style={{
              background: '#fff',
              border: '2px solid #83b5fc',
              borderRadius: '25px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 215, 0, 0.1)',
              backdropFilter: 'blur(15px)',
              position: 'relative',
              overflow: 'hidden'
            }}
            headStyle={{
              background: 'transparent',
              borderBottom: '2px solid #83b5fc',
              padding: '30px 20px',
              marginBottom: '0',
            }}
            bodyStyle={{
              padding: '40px 20px',
              background: 'rgba(0, 0, 0, 0.1)'
            }}
          >
            {/* Decorative elements */}
            <div style={{
              position: 'absolute',
              top: '-50px',
              right: '-50px',
              width: '100px',
              height: '100px',
              background: 'radial-gradient(circle, rgba(255, 215, 0, 0.1) 0%, transparent 70%)',
              borderRadius: '50%',
              zIndex: 0
            }} />
            <div style={{
              position: 'absolute',
              bottom: '-30px',
              left: '-30px',
              width: '60px',
              height: '60px',
              background: 'radial-gradient(circle, rgba(255, 215, 0, 0.1) 0%, transparent 70%)',
              borderRadius: '50%',
              zIndex: 0
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <Carousel 
                autoplay 
                autoplaySpeed={5000} 
                dots={{ 
                  className: 'custom-dots'
                }}
                arrows={true}
                prevArrow={<NavigationButton
                  direction="left"
                  onClick={() => {}}
                  style={{ 
                    width: '60px',
                    height: '60px',
                    background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
                    border: '3px solid rgba(255, 255, 255, 0.3)',
                    boxShadow: '0 8px 25px rgba(255, 215, 0, 0.5), 0 0 20px rgba(255, 215, 0, 0.3)',
                    color: '#000',
                    fontSize: '22px',
                    fontWeight: 'bold',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                />}
                nextArrow={<NavigationButton
                  direction="right"
                  onClick={() => {}}
                  style={{ 
                    width: '60px',
                    height: '60px',
                    background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
                    border: '3px solid rgba(255, 255, 255, 0.3)',
                    boxShadow: '0 8px 25px rgba(255, 215, 0, 0.5), 0 0 20px rgba(255, 215, 0, 0.3)',
                    color: '#000',
                    fontSize: '22px',
                    fontWeight: 'bold',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                />}
          >
            <div>
                  <Row gutter={[16, 16]} justify="center">
                    {[
                      { 
                        image: post01, 
                        title: 'Thành tựu Fanpage - Post 1',
                        description: 'Kết quả đạt được trên trang fanpage với sự tương tác cao từ cộng đồng',
                        stats: '2.5K lượt tương tác',
                        icon: <HeartOutlined />,
                        facebookUrl: 'https://www.facebook.com/share/p/1D8mHMC4c3/'
                      },
                      { 
                        image: post02, 
                        title: 'Thành tựu Fanpage - Post 2',
                        description: 'Minh chứng cho sự phát triển mạnh mẽ của cộng đồng Mekong Pathfinder',
                        stats: '1.8K lượt chia sẻ',
                        icon: <GlobalOutlined />,
                        facebookUrl: 'https://www.facebook.com/share/p/1G6HNSTikK/'
                      },
                      { 
                        image: post03, 
                        title: 'Thành tựu Fanpage - Post 3',
                        description: 'Phản hồi tích cực từ người dùng về các sản phẩm và dịch vụ',
                        stats: '3.2K lượt xem',
                        icon: <EyeOutlined />,
                        facebookUrl: 'https://www.facebook.com/share/1BcDW5Cb8v/'
                      },
                      { 
                        image: post04, 
                        title: 'Thành tựu Fanpage - Post 4',
                        description: 'Sự phát triển và mở rộng cộng đồng người dùng Mekong Pathfinder',
                        stats: '950 bình luận',
                        icon: <MessageOutlined />,
                        facebookUrl: 'https://www.facebook.com/share/p/1BH3VLG8ZQ/'
                      }
                    ].map((achievement, index) => (
                      <Col xs={24} sm={12} md={6} key={index}>
                    <div
                      style={{
                        position: 'relative',
                            borderRadius: '20px',
                        overflow: 'hidden',
                            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                            cursor: 'pointer',
                            height: 'clamp(350px, 60vh, 400px)',
                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(197, 226, 255, 0.6) 100%)',
                            border: '1px solid #83b5fc'
                      }}
                      onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-15px) scale(1.02)';
                            e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 215, 0, 0.2)';
                      }}
                      onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0) scale(1)';
                            e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
                        }}
                        onClick={() => {
                            window.open(achievement.facebookUrl, '_blank', 'noopener,noreferrer');
                        }}
                        >
                          {/* Achievement badge */}
                          <div style={{
                            position: 'absolute',
                            top: '15px',
                            right: '15px',
                            zIndex: 2,
                            background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
                            borderRadius: '50%',
                            width: '40px',
                            height: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 8px 25px rgba(3, 68, 214, 0.4)'
                          }}>
                            <TrophyOutlined style={{ color: '#000', fontSize: '18px' }} />
                          </div>

                          {/* Facebook link indicator */}
                          <div style={{
                            position: 'absolute',
                            top: '15px',
                            left: '15px',
                            zIndex: 2,
                            background: 'linear-gradient(135deg, #1877f2 0%, #42a5f5 100%)',
                            borderRadius: '50%',
                            width: '35px',
                            height: '35px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 8px 25px rgba(3, 68, 214, 0.4)',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.1)';
                            e.currentTarget.style.boxShadow = '0 6px 20px rgba(24, 119, 242, 0.6)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = '0 8px 25px rgba(3, 68, 214, 0.4)';
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(achievement.facebookUrl, '_blank', 'noopener,noreferrer');
                          }}
                          >
                            <span style={{ color: 'white', fontSize: '16px', fontWeight: 'bold' }}>f</span>
                          </div>

                          <div style={{ position: 'relative', height: '100%' }}>
                            <img
                              src={achievement.image}
                              alt={achievement.title}
                          style={{
                            width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                filter: 'brightness(0.9)'
                          }}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          }}
                        />
                            
                            {/* Content overlay */}
                        <div style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                              background: 'linear-gradient(transparent, rgba(0,0,0,0.9))',
                              padding: '20px',
                          color: 'white'
                        }}>
                              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                                {achievement.icon}
                                <span style={{ 
                                  marginLeft: '8px',
                                  fontSize: '12px',
                                  color: '#fff',
                                  fontWeight: '600'
                                }}>
                                  {achievement.stats}
                                </span>
                              </div>
                              
                              <Title level={4} style={{ 
                                color: 'white', 
                                margin: '0 0 8px 0',
                                fontSize: '16px',
                                fontWeight: '700',
                                lineHeight: 1.3
                              }}>
                                {achievement.title}
                          </Title>
                              
                              <Text style={{ 
                                color: 'rgba(255,255,255,0.9)', 
                                fontSize: '12px',
                                lineHeight: 1.4,
                                display: 'block'
                              }}>
                                {achievement.description}
                          </Text>
                        </div>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
            <div>
                  <Row gutter={[24, 24]} justify="center">
                    {[
                      { 
                        image: post05, 
                        title: 'Thành tựu Fanpage - Post 5',
                        description: 'Tổng kết những thành tựu nổi bật của cộng đồng Mekong Pathfinder',
                        stats: '5.2K tổng tương tác',
                        icon: <StarOutlined />,
                        facebookUrl: 'https://www.facebook.com/share/r/1RgUzWkQ4N/'
                      },
                      { 
                        image: post06, 
                        title: 'Cộng đồng phát triển',
                        description: 'Sự phát triển mạnh mẽ của cộng đồng người dùng',
                        stats: '1.2K thành viên mới',
                        icon: <UserOutlined />,
                        facebookUrl: 'https://www.facebook.com/share/p/1BZuTZZwVB/'
                      },
                      { 
                        image: post05, 
                        title: 'Tương tác tích cực',
                        description: 'Minh chứng cho sự tương tác tích cực từ cộng đồng',
                        stats: '850 lượt thích',
                        icon: <HeartOutlined />,
                        facebookUrl: 'https://www.facebook.com/share/r/1RgUzWkQ4N/'
                      },
                      { 
                        image: post07, 
                        title: 'Phát triển bền vững',
                        description: 'Xây dựng cộng đồng bền vững và phát triển lâu dài',
                        stats: '95% hài lòng',
                        icon: <CheckCircleOutlined />,
                        facebookUrl: 'https://www.facebook.com/share/p/1BZuTZZwVB/'
                      }
                    ].map((achievement, index) => (
                      <Col xs={24} sm={12} md={6} key={index}>
                    <div
                      style={{
                        position: 'relative',
                        borderRadius: '20px',
                        overflow: 'hidden',
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        cursor: 'pointer',
                        height: '400px',
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(197, 226, 255, 0.6) 100%)',
                        border: '1px solid #83b5fc'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-15px) scale(1.02)';
                            e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 215, 0, 0.2)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0) scale(1)';
                            e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
                        }}
                        onClick={() => {
                            window.open(achievement.facebookUrl, '_blank', 'noopener,noreferrer');
                        }}
                        >
                          {/* Achievement badge */}
                          <div style={{
                            position: 'absolute',
                            top: '15px',
                            right: '15px',
                            zIndex: 2,
                            background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
                            borderRadius: '50%',
                            width: '40px',
                            height: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 8px 25px rgba(3, 68, 214, 0.4)'
                          }}>
                            <TrophyOutlined style={{ color: '#000', fontSize: '18px' }} />
                          </div>

                          {/* Facebook link indicator */}
                          <div style={{
                            position: 'absolute',
                            top: '15px',
                            left: '15px',
                            zIndex: 2,
                            background: 'linear-gradient(135deg, #1877f2 0%, #42a5f5 100%)',
                            borderRadius: '50%',
                            width: '35px',
                            height: '35px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 8px 25px rgba(3, 68, 214, 0.4)',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.1)';
                            e.currentTarget.style.boxShadow = '0 6px 20px rgba(24, 119, 242, 0.6)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = '0 8px 25px rgba(3, 68, 214, 0.4)';
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(achievement.facebookUrl, '_blank', 'noopener,noreferrer');
                          }}
                          >
                            <span style={{ color: 'white', fontSize: '16px', fontWeight: 'bold' }}>f</span>
                          </div>

                          <div style={{ position: 'relative', height: '100%' }}>
                            <img
                              src={achievement.image}
                              alt={achievement.title}
                          style={{
                            width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                filter: 'brightness(0.9)'
                          }}
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                            
                            {/* Content overlay */}
                        <div style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                              background: 'linear-gradient(transparent, rgba(0,0,0,0.9))',
                              padding: '20px',
                          color: 'white'
                        }}>
                              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                                {achievement.icon}
                                <span style={{ 
                                  marginLeft: '8px',
                                  fontSize: '12px',
                                  color: '#fff',
                                  fontWeight: '600'
                                }}>
                                  {achievement.stats}
                                </span>
                              </div>
                              
                              <Title level={4} style={{ 
                                color: 'white', 
                                margin: '0 0 8px 0',
                                fontSize: '16px',
                                fontWeight: '700',
                                lineHeight: 1.3
                              }}>
                                {achievement.title}
                          </Title>
                              
                              <Text style={{ 
                                color: 'rgba(255,255,255,0.9)', 
                                fontSize: '12px',
                                lineHeight: 1.4,
                                display: 'block'
                              }}>
                                {achievement.description}
                          </Text>
                        </div>
                      </div>
                    </div>
                  </Col>
                ))}
                </Row>
              </div>
          </Carousel>
            </div>
        </Card>
        </AnimatedSection>

        {/* Awesome Stuffs Section */}
        <AnimatedSection animationType="fadeInUp" delay={100}>
        <Card 
          title="Some Of Our Awesome Stuffs"
          style={{ 
            background: '#fff',
            border: '1px solid #83b5fc',
            borderRadius: '20px',
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
            backdropFilter: 'blur(10px)'
          }}
          headStyle={{
            background: 'transparent',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#000',
            fontSize: '28px',
            fontWeight: '700',
            textAlign: 'center'
          }}
        >
          <Carousel 
            autoplay 
            autoplaySpeed={4000} 
            dots={{ className: 'custom-dots' }}
            arrows={true}
            prevArrow={<Button 
              type="text" 
              icon={<LeftOutlined />} 
                style={{ 
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'rgba(197, 226, 255, 0.9)',
                border: 'none',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#1890ff',
                fontSize: '16px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(197, 226, 255, 1)';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(197, 226, 255, 0.9)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            />}
            nextArrow={<Button 
              type="text" 
              icon={<RightOutlined />} 
              style={{ 
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'rgba(197, 226, 255, 0.9)',
                border: 'none',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#1890ff',
                fontSize: '16px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(197, 226, 255, 1)';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(197, 226, 255, 0.9)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            />}
          >
            {/* Item 1: */}
            <div>
              <Row gutter={[24, 24]} justify="center">
                {[
                  { 
                    image: 'https://res.cloudinary.com/dj7jvklwp/image/upload/v1760811194/20251008_182018_dzfasn.jpg', 
                    category: 'Marketing',
                    title: 'Discover, Explore the Product',
                    description: 'Khám phá và phát triển sản phẩm công nghệ tiên tiến'
                  },
                  { 
                    image: 'https://res.cloudinary.com/dj7jvklwp/image/upload/v1760811192/20251008_181936_c5xjuz.jpg', 
                    category: 'Technology',
                    title: 'SIEM Security Solutions',
                    description: 'Giải pháp bảo mật thông tin và giám sát an ninh mạng'
                  },
                  { 
                    image: 'https://res.cloudinary.com/dj7jvklwp/image/upload/v1760811189/20251008_180835_pwcawb.jpg', 
                    category: 'Mobile App',
                    title: 'Smart Mobile Applications',
                    description: 'Ứng dụng di động thông minh cho cuộc sống hiện đại'
                  }
                ].map((item, index) => (
                  <Col xs={24} sm={12} md={8} key={index}>
                    <div
                      style={{
                        position: 'relative',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                        transition: 'transform 0.3s ease',
                        cursor: 'default',
                        height: '300px'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-8px)';
                        e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.2)';
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
                            objectFit: 'cover'
                          }}
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                    <div style={{ 
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                          padding: '20px',
                          color: 'white'
                        }}>
                          <Text style={{ 
                            color: 'rgba(255,255,255,0.8)', 
                            fontSize: '12px',
                            fontWeight: '500',
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                          }}>
                            {item.category}
                          </Text>
                          <Title level={4} style={{ 
                            color: 'white', 
                            margin: '8px 0 0 0',
                            fontSize: '18px',
                            fontWeight: '600',
                            lineHeight: 1.3
                          }}>
                            {item.title}
                          </Title>
                          <Text style={{ 
                            color: 'rgba(255,255,255,0.9)', 
                            fontSize: '12px',
                            marginTop: '8px',
                            display: 'block'
                          }}>
                            {item.description}
                          </Text>
                        </div>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
            {/* Item 2: */}
            <div>
              <Row gutter={[24, 24]} justify="center">
                {[
                  { 
                    image: 'https://res.cloudinary.com/dj7jvklwp/image/upload/v1760811187/20251008_180831_ghmp8l.jpg', 
                    category: 'Innovation',
                    title: 'Cutting-Edge Solutions',
                    description: 'Giải pháp công nghệ tiên tiến cho doanh nghiệp'
                  },
                  { 
                    image: 'https://res.cloudinary.com/dj7jvklwp/image/upload/v1760811182/20251008_175534_vdjfss.jpg', 
                    category: 'Business',
                    title: 'Startup Support Program',
                    description: 'Chương trình hỗ trợ khởi nghiệp và phát triển doanh nghiệp'
                  },
                  { 
                    image: 'https://res.cloudinary.com/dj7jvklwp/image/upload/v1760811186/20251008_180817_uici8r.jpg', 
                    category: 'Research',
                    title: 'Advanced Research Projects',
                    description: 'Các dự án nghiên cứu khoa học và công nghệ cao'
                  }
                ].map((item, index) => (
                  <Col xs={24} sm={12} md={8} key={index}>
                    <div
                      style={{
                        position: 'relative',
                  borderRadius: '16px',
                        overflow: 'hidden',
                        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                        transition: 'transform 0.3s ease',
                        cursor: 'default',
                        height: '300px'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-8px)';
                        e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.2)';
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
                            objectFit: 'cover'
                          }}
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                        <div style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                          padding: '20px',
                          color: 'white'
                        }}>
                          <Text style={{ 
                            color: 'rgba(255,255,255,0.8)', 
                            fontSize: '12px',
                            fontWeight: '500',
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                          }}>
                            {item.category}
                          </Text>
                          <Title level={4} style={{ 
                            color: 'white', 
                            margin: '8px 0 0 0',
                            fontSize: '18px',
                            fontWeight: '600',
                            lineHeight: 1.3
                          }}>
                            {item.title}
                          </Title>
                          <Text style={{ 
                            color: 'rgba(255,255,255,0.9)', 
                            fontSize: '12px',
                            marginTop: '8px',
                            display: 'block'
                          }}>
                            {item.description}
                          </Text>
                        </div>
                      </div>
                    </div>
            </Col>
                ))}
              </Row>
            </div>
            {/* Item 3: */}
            <div>
              <Row gutter={[24, 24]} justify="center">
                {[
                  { 
                    image: 'https://res.cloudinary.com/dj7jvklwp/image/upload/v1760811180/20251008_175544_xgc4ik.jpg', 
                    category: 'Innovation',
                    title: 'Cutting-Edge Solutions',
                    description: 'Giải pháp công nghệ tiên tiến cho doanh nghiệp'
                  },
                  { 
                    image: 'https://res.cloudinary.com/dj7jvklwp/image/upload/v1760811185/20251008_180702_epomf6.jpg', 
                    category: 'Business',
                    title: 'Startup Support Program',
                    description: 'Chương trình hỗ trợ khởi nghiệp và phát triển doanh nghiệp'
                  },
                  { 
                    image: 'https://res.cloudinary.com/dj7jvklwp/image/upload/v1760811184/20251008_180652_d2gtug.jpg', 
                    category: 'Research',
                    title: 'Advanced Research Projects',
                    description: 'Các dự án nghiên cứu khoa học và công nghệ cao'
                  }
                ].map((item, index) => (
                  <Col xs={24} sm={12} md={8} key={index}>
                    <div
                style={{ 
                        position: 'relative',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                        transition: 'transform 0.3s ease',
                        cursor: 'default',
                        height: '300px'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-8px)';
                        e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.2)';
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
                            objectFit: 'cover'
                          }}
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                        <div style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                          padding: '20px',
                          color: 'white'
                        }}>
                          <Text style={{ 
                            color: 'rgba(255,255,255,0.8)', 
                            fontSize: '12px',
                            fontWeight: '500',
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                          }}>
                            {item.category}
                          </Text>
                          <Title level={4} style={{ 
                            color: 'white', 
                            margin: '8px 0 0 0',
                            fontSize: '18px',
                            fontWeight: '600',
                            lineHeight: 1.3
                          }}>
                            {item.title}
                          </Title>
                          <Text style={{ 
                            color: 'rgba(255,255,255,0.9)', 
                            fontSize: '12px',
                            marginTop: '8px',
                            display: 'block'
                          }}>
                            {item.description}
                          </Text>
                        </div>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
            {/* Item 4: */}
            <div>
              <Row gutter={[24, 24]} justify="center">
                {[
                  { 
                    image: 'https://res.cloudinary.com/dj7jvklwp/image/upload/v1760811177/20251008_175453_ba68pz.jpg', 
                    category: 'Innovation',
                    title: 'Cutting-Edge Solutions',
                    description: 'Giải pháp công nghệ tiên tiến cho doanh nghiệp'
                  },
                  { 
                    image: 'https://res.cloudinary.com/dj7jvklwp/image/upload/v1760811179/20251008_175539_idjceo.jpg', 
                    category: 'Business',
                    title: 'Startup Support Program',
                    description: 'Chương trình hỗ trợ khởi nghiệp và phát triển doanh nghiệp'
                  },
                  { 
                    image: 'https://res.cloudinary.com/dj7jvklwp/image/upload/v1760811175/20251008_173630_elc55o.jpg', 
                    category: 'Research',
                    title: 'Advanced Research Projects',
                    description: 'Các dự án nghiên cứu khoa học và công nghệ cao'
                  }
                ].map((item, index) => (
                  <Col xs={24} sm={12} md={8} key={index}>
                    <div
                      style={{
                        position: 'relative',
                  borderRadius: '16px',
                        overflow: 'hidden',
                        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                        transition: 'transform 0.3s ease',
                        cursor: 'default',
                        height: '300px'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-8px)';
                        e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.2)';
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
                            objectFit: 'cover'
                          }}
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                        <div style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                          padding: '20px',
                          color: 'white'
                        }}>
                          <Text style={{ 
                            color: 'rgba(255,255,255,0.8)', 
                            fontSize: '12px',
                            fontWeight: '500',
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                          }}>
                            {item.category}
                          </Text>
                          <Title level={4} style={{ 
                            color: 'white', 
                            margin: '8px 0 0 0',
                            fontSize: '18px',
                            fontWeight: '600',
                            lineHeight: 1.3
                          }}>
                            {item.title}
                          </Title>
                          <Text style={{ 
                            color: 'rgba(255,255,255,0.9)', 
                            fontSize: '12px',
                            marginTop: '8px',
                            display: 'block'
                          }}>
                            {item.description}
                          </Text>
                        </div>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
           </Carousel>
 
           {/* Gap between carousels */}
           <div style={{ height: '20px' }} />
 
           {/* Carousel-02 */}
           <Carousel
            autoplay 
            autoplaySpeed={4000} 
            dots={{ className: 'custom-dots' }}
            arrows={true}
            prevArrow={<Button 
              type="text" 
              icon={<LeftOutlined />} 
              style={{ 
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'rgba(197, 226, 255, 0.9)',
                border: 'none',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#1890ff',
                fontSize: '16px',
                  transition: 'all 0.3s ease'
                }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(197, 226, 255, 1)';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(197, 226, 255, 0.9)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            />}
            nextArrow={<Button 
              type="text" 
              icon={<RightOutlined />} 
              style={{ 
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'rgba(197, 226, 255, 0.9)',
                border: 'none',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#1890ff',
                fontSize: '16px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(197, 226, 255, 1)';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(197, 226, 255, 0.9)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            />}
          >
            {/* Item 1: */}
            <div>
              <Row gutter={[24, 24]} justify="center">
                {[
                  { 
                    image: 'https://res.cloudinary.com/dj7jvklwp/image/upload/v1760811171/20251008_173548_shheoz.jpg', 
                    category: 'Marketing',
                    title: 'Discover, Explore the Product',
                    description: 'Khám phá và phát triển sản phẩm công nghệ tiên tiến'
                  },
                  { 
                    image: post02, 
                    category: 'Technology',
                    title: 'SIEM Security Solutions',
                    description: 'Giải pháp bảo mật thông tin và giám sát an ninh mạng'
                  },
                  { 
                    image: post03, 
                    category: 'Mobile App',
                    title: 'Smart Mobile Applications',
                    description: 'Ứng dụng di động thông minh cho cuộc sống hiện đại'
                  }
                ].map((item, index) => (
                  <Col xs={24} sm={12} md={8} key={index}>
                    <div
                      style={{
                        position: 'relative',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                        transition: 'transform 0.3s ease',
                        cursor: 'default',
                        height: '300px'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-8px)';
                        e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.2)';
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
                            objectFit: 'cover'
                          }}
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                    <div style={{ 
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                          padding: '20px',
                          color: 'white'
                        }}>
                          <Text style={{ 
                            color: 'rgba(255,255,255,0.8)', 
                            fontSize: '12px',
                            fontWeight: '500',
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                          }}>
                            {item.category}
                          </Text>
                          <Title level={4} style={{ 
                            color: 'white', 
                            margin: '8px 0 0 0',
                            fontSize: '18px',
                            fontWeight: '600',
                            lineHeight: 1.3
                          }}>
                            {item.title}
                          </Title>
                          <Text style={{ 
                            color: 'rgba(255,255,255,0.9)', 
                            fontSize: '12px',
                            marginTop: '8px',
                            display: 'block'
                          }}>
                            {item.description}
                          </Text>
                        </div>
                      </div>
                    </div>
            </Col>
                ))}
              </Row>
            </div>
            {/* Item 2: */}
            <div>
              <Row gutter={[24, 24]} justify="center">
                {[
                  { 
                    image: post04, 
                    category: 'Innovation',
                    title: 'Cutting-Edge Solutions',
                    description: 'Giải pháp công nghệ tiên tiến cho doanh nghiệp'
                  },
                  { 
                    image: post05, 
                    category: 'Business',
                    title: 'Startup Support Program',
                    description: 'Chương trình hỗ trợ khởi nghiệp và phát triển doanh nghiệp'
                  },
                  { 
                    image: post06, 
                    category: 'Research',
                    title: 'Advanced Research Projects',
                    description: 'Các dự án nghiên cứu khoa học và công nghệ cao'
                  }
                ].map((item, index) => (
                  <Col xs={24} sm={12} md={8} key={index}>
                    <div
                style={{ 
                        position: 'relative',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                        transition: 'transform 0.3s ease',
                        cursor: 'default',
                        height: '300px'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-8px)';
                        e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.2)';
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
                            objectFit: 'cover'
                          }}
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                        <div style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                          padding: '20px',
                          color: 'white'
                        }}>
                          <Text style={{ 
                            color: 'rgba(255,255,255,0.8)', 
                            fontSize: '12px',
                            fontWeight: '500',
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                          }}>
                            {item.category}
                          </Text>
                          <Title level={4} style={{ 
                            color: 'white', 
                            margin: '8px 0 0 0',
                            fontSize: '18px',
                            fontWeight: '600',
                            lineHeight: 1.3
                          }}>
                            {item.title}
                          </Title>
                          <Text style={{ 
                            color: 'rgba(255,255,255,0.9)', 
                            fontSize: '12px',
                            marginTop: '8px',
                            display: 'block'
                          }}>
                            {item.description}
                          </Text>
                        </div>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
            {/* Item 3: */}
            <div>
              <Row gutter={[24, 24]} justify="center">
                {[
                  { 
                    image: post04, 
                    category: 'Innovation',
                    title: 'Cutting-Edge Solutions',
                    description: 'Giải pháp công nghệ tiên tiến cho doanh nghiệp'
                  },
                  { 
                    image: post05, 
                    category: 'Business',
                    title: 'Startup Support Program',
                    description: 'Chương trình hỗ trợ khởi nghiệp và phát triển doanh nghiệp'
                  },
                  { 
                    image: post06, 
                    category: 'Research',
                    title: 'Advanced Research Projects',
                    description: 'Các dự án nghiên cứu khoa học và công nghệ cao'
                  }
                ].map((item, index) => (
                  <Col xs={24} sm={12} md={8} key={index}>
                    <div
                      style={{
                        position: 'relative',
                  borderRadius: '16px',
                        overflow: 'hidden',
                        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                        transition: 'transform 0.3s ease',
                        cursor: 'default',
                        height: '300px'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-8px)';
                        e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.2)';
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
                            objectFit: 'cover'
                          }}
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                        <div style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                          padding: '20px',
                          color: 'white'
                        }}>
                          <Text style={{ 
                            color: 'rgba(255,255,255,0.8)', 
                            fontSize: '12px',
                            fontWeight: '500',
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                          }}>
                            {item.category}
                          </Text>
                          <Title level={4} style={{ 
                            color: 'white', 
                            margin: '8px 0 0 0',
                            fontSize: '18px',
                            fontWeight: '600',
                            lineHeight: 1.3
                          }}>
                            {item.title}
                          </Title>
                          <Text style={{ 
                            color: 'rgba(255,255,255,0.9)', 
                            fontSize: '12px',
                            marginTop: '8px',
                            display: 'block'
                          }}>
                            {item.description}
                          </Text>
                        </div>
                      </div>
                    </div>
            </Col>
                ))}
          </Row>
            </div>
            {/* Item 4: */}
            <div>
              <Row gutter={[24, 24]} justify="center">
                {[
                  { 
                    image: post04, 
                    category: 'Innovation',
                    title: 'Cutting-Edge Solutions',
                    description: 'Giải pháp công nghệ tiên tiến cho doanh nghiệp'
                  },
                  { 
                    image: post05, 
                    category: 'Business',
                    title: 'Startup Support Program',
                    description: 'Chương trình hỗ trợ khởi nghiệp và phát triển doanh nghiệp'
                  },
                  { 
                    image: post06, 
                    category: 'Research',
                    title: 'Advanced Research Projects',
                    description: 'Các dự án nghiên cứu khoa học và công nghệ cao'
                  }
                ].map((item, index) => (
                  <Col xs={24} sm={12} md={8} key={index}>
                    <div
                      style={{
                        position: 'relative',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                        transition: 'transform 0.3s ease',
                        cursor: 'default',
                        height: '300px'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-8px)';
                        e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.2)';
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
                            objectFit: 'cover'
                          }}
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                        <div style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                          padding: '20px',
                          color: 'white'
                        }}>
                          <Text style={{ 
                            color: 'rgba(255,255,255,0.8)', 
                            fontSize: '12px',
                            fontWeight: '500',
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                          }}>
                            {item.category}
                          </Text>
                          <Title level={4} style={{ 
                            color: 'white', 
                            margin: '8px 0 0 0',
                            fontSize: '18px',
                            fontWeight: '600',
                            lineHeight: 1.3
                          }}>
                            {item.title}
                          </Title>
                          <Text style={{ 
                            color: 'rgba(255,255,255,0.9)', 
                            fontSize: '12px',
                            marginTop: '8px',
                            display: 'block'
                          }}>
                            {item.description}
                          </Text>
                        </div>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          </Carousel>
        </Card>
        </AnimatedSection>

        {/* Features Section */}
        <AnimatedSection animationType="fadeInLeft" delay={100}>
        <Card 
          title={t('home.features.title')}
          style={{ 
            background: 'rgba(255, 255, 255, 0.8)',
            border: '1px solid #83b5fc',
            borderRadius: '24px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(15px)',
            width: '100%'
          }}
          headStyle={{ color: '#000', fontSize: '28px', fontWeight: '700' }}
        >
          <Row gutter={[12, 12]}>
            {features.map((feature, index) => (
              <Col xs={24} sm={12} md={6} key={index}>
                <Card 
                  size="small" 
                  style={{ 
                    height: '100%',
                    background: 'rgba(255, 255, 255, 0.6)',
                    border: '1px solid #83b5fc',
                    borderRadius: '16px',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Space direction="vertical" align="center" style={{ width: '100%', textAlign: 'center' }}>
                    <div>{feature.icon}</div>
                    <Title level={5} style={{ margin: 0, color: '#000' }}>{feature.title}</Title>
                    <Text style={{ fontSize: '12px', color: '#000' }}>
                      {feature.description}
                    </Text>
                  </Space>
                </Card>
              </Col>
            ))}
          </Row>
        </Card>
        </AnimatedSection>

        {/* How to Use */}
        <AnimatedSection animationType="fadeInRight" delay={100}>
        <Card 
          title={t('home.howto.title')}
          style={{ 
            background: 'rgba(255, 255, 255, 0.8)',
            border: '1px solid #83b5fc',
            borderRadius: '24px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(15px)',
            width: '100%'
          }}
          headStyle={{ color: '#000', fontSize: 'clamp(24px, 4vw, 28px)', fontWeight: '700' }}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={12}>
              <div style={{ color: '#000' }}>
              <Steps
                direction="vertical"
                current={-1}
                items={steps.map(step => ({
                    title: <span style={{ color: '#000' }}>{step.title}</span>,
                    description: <span style={{ color: '#000' }}>{step.description}</span>,
                  icon: step.icon
                }))}
              />
              </div>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Space direction="vertical" size={16} style={{ width: '100%' }}>
                <Title level={4} style={{ color: '#000', fontSize: 'clamp(16px, 3vw, 20px)' }}>{t('home.howto.start.title')}</Title>
                <Paragraph style={{ color: '#000', fontSize: 'clamp(14px, 2.5vw, 16px)' }}>
                  {t('home.howto.start.desc')}
                </Paragraph>
                <Alert
                  message={t('home.howto.note.title')}
                  description={t('home.howto.note.desc')}
                  type="info"
                  showIcon
                />
                <Button 
                  type="primary" 
                  size="large" 
                  icon={<DownloadOutlined />}
                  onClick={() => navigate('/apk-download')}
                  style={{ width: '100%' }}
                >
                  {t('home.howto.download')}
                </Button>
              </Space>
            </Col>
          </Row>
        </Card>
        </AnimatedSection>

        {/* Achievements */}
        <AnimatedSection animationType="scaleIn" delay={100}>
        <Card 
          title={t('home.achievements.title')}
          style={{ 
            background: 'rgba(255, 255, 255, 0.8)',
            border: '1px solid #83b5fc',
            borderRadius: '24px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(15px)',
            width: '100%'
          }}
          headStyle={{ color: '#000', fontSize: '28px', fontWeight: '700' }}
        >
          <Row gutter={[12, 12]}>
            {achievements.map((achievement, index) => (
              <Col xs={24} sm={12} md={6} key={index}>
                <Card 
                  size="small" 
                  style={{ 
                    textAlign: 'center',
                    background: 'rgba(255, 255, 255, 0.6)',
                    border: '1px solid #83b5fc',
                    borderRadius: '16px',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Space direction="vertical" size={8}>
                    <div style={{ fontSize: '32px' }}>{achievement.icon}</div>
                    <Title level={5} style={{ margin: 0, color: '#000' }}>{achievement.title}</Title>
                    <Text style={{ color: '#000' }}>{achievement.description}</Text>
                    {achievement.value !== undefined && (
                      <Statistic
                        value={achievement.value}
                        valueStyle={{ 
                          color: '#000', 
                          fontSize: 'clamp(18px, 4vw, 24px)',
                          fontWeight: 'bold'
                        }}
                      />
                    )}
                  </Space>
                </Card>
              </Col>
            ))}
          </Row>
        </Card>
        </AnimatedSection>

        {/* Testimonials */}
        <AnimatedSection animationType="fadeInUp" delay={100}>
        <Card 
          title={t('home.testimonials.title')}
          style={{ 
            background: 'rgba(255, 255, 255, 0.8)',
            border: '1px solid #83b5fc',
            borderRadius: '24px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(15px)',
            width: '100%'
          }}
          headStyle={{ color: '#000', fontSize: '28px', fontWeight: '700' }}
        >
          <Row gutter={[12, 12]}>
            {testimonials.map((testimonial: any, index: number) => (
              <Col xs={24} sm={24} md={8} key={index}>
                <Card 
                  size="small"
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.6)',
                    border: '1px solid #83b5fc',
                    borderRadius: '16px',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Space direction="vertical" size={12} style={{ width: '100%' }}>
                    <Space>
                      <Avatar 
                        size={40}
                        src={testimonial.avatar}
                        style={{ 
                          backgroundColor: '#1890ff',
                          color: '#000'
                        }}
                      >
                        {testimonial.name.charAt(0)}
                      </Avatar>
                      <Space direction="vertical" size={0}>
                        <Text strong style={{ color: '#000' }}>{testimonial.name}</Text>
                        <Text style={{ fontSize: '12px', color: '#000' }}>
                          {testimonial.role}
                        </Text>
                      </Space>
                    </Space>
                    <Rate disabled value={testimonial.rating} style={{ fontSize: '14px' }} />
                    <Paragraph style={{ margin: 0, fontSize: '14px', color: '#000' }}>
                      "{testimonial.content}"
                    </Paragraph>
                  </Space>
                </Card>
              </Col>
            ))}
          </Row>
        </Card>
        </AnimatedSection>

        {/* Contact & Support */}
        <AnimatedSection animationType="fadeInUp" delay={100}>
        <Card 
          title={t('home.contact.title')}
          style={{ 
            background: 'rgba(255, 255, 255, 0.8)',
            border: '1px solid #83b5fc',
            borderRadius: '24px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(15px)',
            width: '100%'
          }}
          headStyle={{ color: '#000', fontSize: '28px', fontWeight: '700' }}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={12}>
              <Space direction="vertical" size={16} style={{ width: '100%' }}>
                <Title level={4} style={{ color: '#000' }}>{t('home.contact.info.title')}</Title>
                <List
                  dataSource={[
                    { icon: <MailOutlined />, text: t('home.contact.info.email') },
                    { icon: <PhoneOutlined />, text: t('home.contact.info.phone') },
                    { icon: <ClockCircleOutlined />, text: t('home.contact.info.time') }
                  ]}
                  renderItem={item => (
                    <List.Item>
                      <Space>
                        <div style={{ color: '#000' }}>{item.icon}</div>
                        <Text style={{ color: '#000' }}>{item.text}</Text>
                      </Space>
                    </List.Item>
                  )}
                />
              </Space>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Space direction="vertical" size={16} style={{ width: '100%' }}>
                <Title level={4} style={{ color: '#000', fontSize: 'clamp(16px, 3vw, 20px)' }}>{t('home.contact.support.title')}</Title>
                <Space wrap>
                  <Button 
                    type="primary" 
                    icon={<MessageOutlined />}
                    onClick={() => navigate('/feedback')}
                    size="large"
                    style={{ 
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      border: 'none',
                      borderRadius: '8px',
                      height: 'clamp(36px, 5vh, 40px)'
                    }}
                  >
                    {t('home.contact.support.feedback')}
                  </Button>
                  <Button 
                    icon={<DownloadOutlined />}
                    onClick={() => navigate('/apk-download')}
                    size="large"
                    style={{ 
                      background: 'rgba(255, 255, 255, 0.8)',
                      border: '1px solid #83b5fc',
                      color: '#001f44',
                      borderRadius: '8px',
                      height: 'clamp(36px, 5vh, 40px)'
                    }}
                  >
                    {t('home.contact.support.download')}
                  </Button>
                </Space>
                <Alert
                  message={t('home.contact.help.title')}
                  description={t('home.contact.help.desc')}
                  type="success"
                  showIcon
                />
              </Space>
            </Col>
          </Row>
        </Card>
        </AnimatedSection>
          </Space>
        </div>
      </div>

      
      <HomePageFooter />
    </>
  );
};

export default HomePage;
