import React, { useState } from 'react';
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
// Import videos
import video1 from '../../assets/videos/survey-results/IMG_0339.MOV';
import video2 from '../../assets/videos/survey-results/IMG_5667.MOV';
// Import poster images (we'll create these from video frames)
import poster1 from '../../assets/images/carousel/khoi-doanh-nghiep.png';
import poster2 from '../../assets/images/carousel/SIEM-web.png';
import poster3 from '../../assets/images/carousel/smartphone.png';
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

const { Title, Paragraph, Text } = Typography;

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

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

  const testimonials = [
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
  ];

  const achievements = [
    {
      icon: <TrophyOutlined style={{ color: '#faad14' }} />,
      title: t('home.achievements.award.title'),
      description: t('home.achievements.award.desc')
    },
    {
      icon: <StarOutlined style={{ color: '#52c41a' }} />,
      title: t('home.achievements.rating.title'),
      description: t('home.achievements.rating.desc')
    },
    {
      icon: <GlobalOutlined style={{ color: '#1890ff' }} />,
      title: t('home.achievements.users.title'),
      description: t('home.achievements.users.desc')
    },
    {
      icon: <HeartOutlined style={{ color: '#ff4d4f' }} />,
      title: t('home.achievements.support.title'),
      description: t('home.achievements.support.desc')
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
      <div style={{ position: 'relative', paddingTop: '30px', background: 'rgb(52, 52, 139)'}}>
      <HomePageHeader />

            <Carousel 
              autoplay 
              autoplaySpeed={5000} 
              lazyLoad="ondemand"
              beforeChange={(from, to) => setCurrentSlide(to)}
            >
            {carouselItems.map((item, index) => (
              <div key={index}>
                  <div style={{ 
                    position: 'relative',
                    minHeight: window.innerWidth > 768 ? '500px' : '400px',
                    backgroundImage: `url(${item.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    display: 'flex',
                    alignItems: 'center',
                    overflow: 'hidden',
                    width: '100%'
                  }}>
                    {/* Overlay để làm tối ảnh nền */}
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 100%)',
                      zIndex: 1
                    }} />
                    
                    {/* Content overlay - căn giữa hoàn toàn */}
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      zIndex: 2,
                      width: '100%',
                      padding: '20px',
                      color: 'white',
                      textAlign: 'center'
                    }}>
                      <Space direction="vertical" size={24} style={{ width: '100%' }}>
                        <Title level={1} style={{ 
                          margin: 0,
                          fontSize: window.innerWidth > 768 ? '42px' : '28px',
                          color: 'white',
                          textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
                          fontWeight: '700',
                          textAlign: 'center'
                        }}>
                        {item.title}
                      </Title>
                        <Paragraph style={{ 
                          fontSize: window.innerWidth > 768 ? '20px' : '16px', 
                          lineHeight: 1.6,
                          color: 'rgba(255,255,255,0.95)',
                          textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
                          margin: 0,
                          textAlign: 'center'
                        }}>
                        {item.description}
                      </Paragraph>
                        <Space wrap style={{ justifyContent: 'center' }}>
                        <Button 
                          type="primary" 
                            size={window.innerWidth > 768 ? 'large' : 'middle'}
                          icon={<ArrowRightOutlined />}
                          onClick={item.buttonAction}
                            style={{
                              background: 'linear-gradient(135deg, #1890ff 0%, #40a9ff 100%)',
                              border: 'none',
                              borderRadius: '25px',
                              height: '50px',
                              padding: '0 30px',
                              fontSize: '16px',
                              fontWeight: '600',
                              boxShadow: '0 4px 15px rgba(24, 144, 255, 0.4)',
                              textShadow: 'none'
                            }}
                        >
                          {item.buttonText}
                        </Button>
                        <Button 
                            size={window.innerWidth > 768 ? 'large' : 'middle'}
                          icon={<PlayCircleOutlined />}
                            style={{
                              borderRadius: '25px',
                              height: '50px',
                              padding: '0 30px',
                              fontSize: '16px',
                              fontWeight: '600',
                              border: '2px solid white',
                              color: 'white',
                              background: 'rgba(255, 255, 255, 0.2)',
                              backdropFilter: 'blur(10px)'
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
            <Button
              type="text"
              icon={<LeftOutlined />}
              onClick={() => setCurrentSlide(currentSlide > 0 ? currentSlide - 1 : carouselItems.length - 1)}
              style={{
                position: 'absolute',
                left: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.9)',
                border: 'none',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                fontSize: '18px',
                color: '#1890ff',
                zIndex: 10,
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 1)';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
              }}
            />
            <Button
              type="text"
              icon={<RightOutlined />}
              onClick={() => setCurrentSlide(currentSlide < carouselItems.length - 1 ? currentSlide + 1 : 0)}
              style={{
                position: 'absolute',
                right: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.9)',
                border: 'none',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                fontSize: '18px',
                color: '#1890ff',
                zIndex: 10,
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 1)';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
              }}
            />
        </div>

      {/* Main Content Container */}
      <div style={{ 
        width: '100%',
        minHeight: '100vh',
        background: 'rgb(52, 52, 139)',
        position: 'relative'
      }}>
        <div style={{ 
          padding: window.innerWidth > 768 ? '40px 60px' : '20px 24px',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <Space direction="vertical" size={40} style={{ width: '100%' }}>

        {/* Awesome Stuffs Section */}
        <AnimatedSection animationType="fadeInUp" delay={200}>
        <Card 
          title="Some Of Our Awesome Stuffs"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '20px',
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
            backdropFilter: 'blur(10px)'
          }}
          headStyle={{
            background: 'transparent',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#fff',
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
                background: 'rgba(255, 255, 255, 0.9)',
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
                e.currentTarget.style.background = 'rgba(255, 255, 255, 1)';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
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
                background: 'rgba(255, 255, 255, 0.9)',
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
                e.currentTarget.style.background = 'rgba(255, 255, 255, 1)';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            />}
          >
            <div>
              <Row gutter={[24, 24]} justify="center">
                {[
                  { 
                    image: post01, 
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

        {/* Community Interview Section */}
        <AnimatedSection animationType="fadeInUp" delay={300}>
          <Card 
            title="Community Survey Results"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '20px',
              boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
              backdropFilter: 'blur(10px)'
            }}
            headStyle={{
              background: 'transparent',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#fff',
              fontSize: '28px',
              fontWeight: '700',
              textAlign: 'center'
            }}
          >
            <Row gutter={[24, 24]} justify="center">
              {[
                {
                  title: 'Kết quả khảo sát cộng đồng - Video 1',
                  description: 'Chia sẻ kết quả khảo sát từ cộng đồng người dùng Mekong Pathfinder',
                  videoUrl: video1,
                  poster: poster1,
                  duration: '2:30',
                  views: '1.2K',
                  date: '15/12/2024'
                },
                {
                  title: 'Kết quả khảo sát cộng đồng - Video 2',
                  description: 'Phân tích chi tiết về phản hồi và đánh giá từ người dùng',
                  videoUrl: video2,
                  poster: poster2,
                  duration: '3:15',
                  views: '1.8K',
                  date: '22/12/2024'
                },
                {
                  title: 'Tổng hợp phản hồi cộng đồng',
                  description: 'Tổng kết và đánh giá tổng thể từ cộng đồng người dùng',
                  videoUrl: video1,
                  poster: poster3,
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
                      height: '350px',
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
                      height: '200px',
                      background: '#000'
                    }}>
                      <video
                        controls
                        preload="metadata"
                        poster={item.poster}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      >
                        <source src={item.videoUrl} type="video/mp4" />
                        <source src={item.videoUrl} type="video/quicktime" />
                        Your browser does not support the video tag.
                      </video>
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
                          fontSize: '16px', 
                          fontWeight: '600',
                          color: '#ffffff'
                        }}>
                          {item.title}
                        </h4>
                        <p style={{ 
                          margin: '0 0 12px 0', 
                          fontSize: '12px', 
                          color: 'rgba(255, 255, 255, 0.8)',
                          lineHeight: '1.4'
                        }}>
                          {item.description}
                        </p>
                      </div>
                      
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        fontSize: '11px',
                        color: 'rgba(255, 255, 255, 0.7)'
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
        <AnimatedSection animationType="fadeInUp" delay={400}>
          <Card 
            title={
              <div style={{ textAlign: 'center' }}>
                <TrophyOutlined style={{ fontSize: '32px', color: '#ffd700', marginRight: '12px' }} />
                <span style={{ 
                  background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: '32px',
                  fontWeight: '800',
                  textShadow: '0 2px 4px rgba(255, 215, 0, 0.3)'
                }}>
                  Social Achievement
                </span>
            </div>
            }
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
              border: '2px solid rgba(255, 215, 0, 0.2)',
              borderRadius: '25px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 215, 0, 0.1)',
              backdropFilter: 'blur(15px)',
              position: 'relative',
              overflow: 'hidden'
            }}
            headStyle={{
              background: 'transparent',
              borderBottom: '2px solid rgba(255, 215, 0, 0.3)',
              padding: '30px 20px',
              marginBottom: '0'
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
                prevArrow={<Button 
                  type="text" 
                  icon={<LeftOutlined />} 
                  style={{ 
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
                    border: '3px solid rgba(255, 255, 255, 0.3)',
                    boxShadow: '0 8px 25px rgba(255, 215, 0, 0.5), 0 0 20px rgba(255, 215, 0, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#000',
                    fontSize: '22px',
                    fontWeight: 'bold',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    zIndex: 10,
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.15) translateX(-8px)';
                    e.currentTarget.style.boxShadow = '0 12px 35px rgba(255, 215, 0, 0.7), 0 0 30px rgba(255, 215, 0, 0.5)';
                    e.currentTarget.style.border = '3px solid rgba(255, 255, 255, 0.6)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1) translateX(0)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 215, 0, 0.5), 0 0 20px rgba(255, 215, 0, 0.3)';
                    e.currentTarget.style.border = '3px solid rgba(255, 255, 255, 0.3)';
                  }}
                />}
                nextArrow={<Button 
                  type="text" 
                  icon={<RightOutlined />} 
                  style={{ 
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
                    border: '3px solid rgba(255, 255, 255, 0.3)',
                    boxShadow: '0 8px 25px rgba(255, 215, 0, 0.5), 0 0 20px rgba(255, 215, 0, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#000',
                    fontSize: '22px',
                    fontWeight: 'bold',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    zIndex: 10,
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.15) translateX(8px)';
                    e.currentTarget.style.boxShadow = '0 12px 35px rgba(255, 215, 0, 0.7), 0 0 30px rgba(255, 215, 0, 0.5)';
                    e.currentTarget.style.border = '3px solid rgba(255, 255, 255, 0.6)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1) translateX(0)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 215, 0, 0.5), 0 0 20px rgba(255, 215, 0, 0.3)';
                    e.currentTarget.style.border = '3px solid rgba(255, 255, 255, 0.3)';
                  }}
                />}
          >
            <div>
                  <Row gutter={[24, 24]} justify="center">
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
                            height: '400px',
                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                            border: '1px solid rgba(255, 215, 0, 0.2)'
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
                            boxShadow: '0 4px 15px rgba(255, 215, 0, 0.4)'
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
                            boxShadow: '0 4px 15px rgba(24, 119, 242, 0.4)',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.1)';
                            e.currentTarget.style.boxShadow = '0 6px 20px rgba(24, 119, 242, 0.6)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = '0 4px 15px rgba(24, 119, 242, 0.4)';
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
                                height: '240px',
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
                                  color: '#ffd700',
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
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                        border: '1px solid rgba(255, 215, 0, 0.2)'
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
                            boxShadow: '0 4px 15px rgba(255, 215, 0, 0.4)'
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
                            boxShadow: '0 4px 15px rgba(24, 119, 242, 0.4)',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.1)';
                            e.currentTarget.style.boxShadow = '0 6px 20px rgba(24, 119, 242, 0.6)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = '0 4px 15px rgba(24, 119, 242, 0.4)';
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
                                height: '240px',
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
                                  color: '#ffd700',
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

        {/* Quick Actions */}
        <AnimatedSection animationType="fadeInUp" delay={600}>
        <Card 
          title={t('home.quick.title')}
          style={{ 
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '24px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(15px)',
            width: '100%'
          }}
          headStyle={{ color: '#fff', fontSize: '28px', fontWeight: '700' }}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={8}>
              <Card 
                hoverable 
                style={{ 
                  textAlign: 'center', 
                  height: '100%',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => navigate('/apk-download')}
              >
                <Space direction="vertical" size={16}>
                  <DownloadOutlined style={{ fontSize: '48px', color: '#52c41a' }} />
                  <Title level={4} style={{ margin: 0, color: '#fff' }}>{t('home.quick.download')}</Title>
                  <Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>{t('home.quick.download.desc')}</Text>
                </Space>
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card 
                hoverable 
                style={{ 
                  textAlign: 'center', 
                  height: '100%',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => navigate('/feedback')}
              >
                <Space direction="vertical" size={16}>
                  <MessageOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
                  <Title level={4} style={{ margin: 0, color: '#fff' }}>{t('home.quick.feedback')}</Title>
                  <Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>{t('home.quick.feedback.desc')}</Text>
                </Space>
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card 
                hoverable 
                style={{ 
                  textAlign: 'center', 
                  height: '100%',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => navigate('/guide')}
              >
                <Space direction="vertical" size={16}>
                  <InfoCircleOutlined style={{ fontSize: '48px', color: '#faad14' }} />
                  <Title level={4} style={{ margin: 0, color: '#fff' }}>{t('home.quick.guide')}</Title>
                  <Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>{t('home.quick.guide.desc')}</Text>
                </Space>
              </Card>
            </Col>
          </Row>
        </Card>
        </AnimatedSection>

        {/* Features Section */}
        <AnimatedSection animationType="fadeInLeft" delay={800}>
        <Card 
          title={t('home.features.title')}
          style={{ 
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '24px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(15px)',
            width: '100%'
          }}
          headStyle={{ color: '#fff', fontSize: '28px', fontWeight: '700' }}
        >
          <Row gutter={[16, 16]}>
            {features.map((feature, index) => (
              <Col xs={24} sm={12} md={6} key={index}>
                <Card 
                  size="small" 
                  hoverable 
                  style={{ 
                    height: '100%',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '16px',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Space direction="vertical" align="center" style={{ width: '100%', textAlign: 'center' }}>
                    <div>{feature.icon}</div>
                    <Title level={5} style={{ margin: 0, color: '#fff' }}>{feature.title}</Title>
                    <Text style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)' }}>
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
        <AnimatedSection animationType="fadeInRight" delay={1000}>
        <Card 
          title={t('home.howto.title')}
          style={{ 
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '24px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(15px)',
            width: '100%'
          }}
          headStyle={{ color: '#fff', fontSize: '28px', fontWeight: '700' }}
        >
          <Row gutter={[24, 24]}>
            <Col xs={24} md={12}>
              <Steps
                direction="vertical"
                current={-1}
                items={steps.map(step => ({
                  title: step.title,
                  description: step.description,
                  icon: step.icon
                }))}
              />
            </Col>
            <Col xs={24} md={12}>
              <Space direction="vertical" size={16} style={{ width: '100%' }}>
                <Title level={4}>{t('home.howto.start.title')}</Title>
                <Paragraph>
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
        <AnimatedSection animationType="scaleIn" delay={1200}>
        <Card 
          title={t('home.achievements.title')}
          style={{ 
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '24px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(15px)',
            width: '100%'
          }}
          headStyle={{ color: '#fff', fontSize: '28px', fontWeight: '700' }}
        >
          <Row gutter={[16, 16]}>
            {achievements.map((achievement, index) => (
              <Col xs={24} sm={12} md={6} key={index}>
                <Card 
                  size="small" 
                  style={{ 
                    textAlign: 'center',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '16px',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Space direction="vertical" size={8}>
                    <div style={{ fontSize: '32px' }}>{achievement.icon}</div>
                    <Title level={5} style={{ margin: 0, color: '#fff' }}>{achievement.title}</Title>
                    <Text style={{ color: 'rgba(255, 255, 255, 0.7)' }}>{achievement.description}</Text>
                  </Space>
                </Card>
              </Col>
            ))}
          </Row>
        </Card>
        </AnimatedSection>

        {/* Testimonials */}
        <AnimatedSection animationType="fadeInUp" delay={1400}>
        <Card 
          title={t('home.testimonials.title')}
          style={{ 
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '24px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(15px)',
            width: '100%'
          }}
          headStyle={{ color: '#fff', fontSize: '28px', fontWeight: '700' }}
        >
          <Row gutter={[16, 16]}>
            {testimonials.map((testimonial, index) => (
              <Col xs={24} md={8} key={index}>
                <Card 
                  size="small"
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '16px',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Space direction="vertical" size={12} style={{ width: '100%' }}>
                    <Space>
                      <Avatar 
                        size={40}
                        style={{ 
                          backgroundColor: '#1890ff',
                          color: '#fff'
                        }}
                      >
                        {testimonial.name.charAt(0)}
                      </Avatar>
                      <Space direction="vertical" size={0}>
                        <Text strong style={{ color: '#fff' }}>{testimonial.name}</Text>
                        <Text style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)' }}>
                          {testimonial.role}
                        </Text>
                      </Space>
                    </Space>
                    <Rate disabled value={testimonial.rating} style={{ fontSize: '14px' }} />
                    <Paragraph style={{ margin: 0, fontSize: '14px', color: 'rgba(255, 255, 255, 0.8)' }}>
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
        <AnimatedSection animationType="fadeInUp" delay={1600}>
        <Card 
          title={t('home.contact.title')}
          style={{ 
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '24px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(15px)',
            width: '100%'
          }}
          headStyle={{ color: '#fff', fontSize: '28px', fontWeight: '700' }}
        >
          <Row gutter={[24, 24]}>
            <Col xs={24} md={12}>
              <Space direction="vertical" size={16} style={{ width: '100%' }}>
                <Title level={4} style={{ color: '#fff' }}>{t('home.contact.info.title')}</Title>
                <List
                  dataSource={[
                    { icon: <MailOutlined />, text: t('home.contact.info.email') },
                    { icon: <PhoneOutlined />, text: t('home.contact.info.phone') },
                    { icon: <ClockCircleOutlined />, text: t('home.contact.info.time') }
                  ]}
                  renderItem={item => (
                    <List.Item>
                      <Space>
                        <div style={{ color: '#1890ff' }}>{item.icon}</div>
                        <Text style={{ color: 'rgba(255, 255, 255, 0.8)' }}>{item.text}</Text>
                      </Space>
                    </List.Item>
                  )}
                />
              </Space>
            </Col>
            <Col xs={24} md={12}>
              <Space direction="vertical" size={16} style={{ width: '100%' }}>
                <Title level={4} style={{ color: '#fff' }}>{t('home.contact.support.title')}</Title>
                <Space wrap>
                  <Button 
                    type="primary" 
                    icon={<MessageOutlined />}
                    onClick={() => navigate('/feedback')}
                    style={{ 
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      border: 'none',
                      borderRadius: '8px',
                      height: '40px'
                    }}
                  >
                    {t('home.contact.support.feedback')}
                  </Button>
                  <Button 
                    icon={<DownloadOutlined />}
                    onClick={() => navigate('/apk-download')}
                    style={{ 
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: '#fff',
                      borderRadius: '8px',
                      height: '40px'
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
