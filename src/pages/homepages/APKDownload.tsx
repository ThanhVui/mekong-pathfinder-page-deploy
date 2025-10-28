import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  Card, 
  Button, 
  Form, 
  Input, 
  Typography, 
  Space, 
  Row, 
  Col, 
  Divider, 
  Steps,
  Alert,
  message,
  Modal,
  Tag,
  List,
  Avatar,
  Image,
  Carousel
} from 'antd';
import { useColorTheme } from '../../context/ColorThemeContext';
import { 
  DownloadOutlined, 
  MobileOutlined, 
  SafetyOutlined, 
  CheckCircleOutlined,
  InfoCircleOutlined,
  UserOutlined,
  MailOutlined,
  AndroidOutlined,
  ClockCircleOutlined,
  StarOutlined,
  LeftOutlined,
  RightOutlined
} from '@ant-design/icons';
import HomePageHeader from './header/header';
import HomePageFooter from './footer/footer';
import AnimatedSection from '../../components/AnimatedSection';
import { saveDownload, getDownloadStats } from '../../utils/downloadTracker';
import { getFeedbackStats } from '../../utils/feedbackTracker';
// import { useResponsive } from '../../hooks/useResponsive';

// Import application images
import navigateRoute from '../../assets/images/application/navigate-route.png';
import safeRoute from '../../assets/images/application/safe-route.png';
import community01 from '../../assets/images/application/community-01.jpg';
import community02 from '../../assets/images/application/community-02.png';
import repairShop from '../../assets/images/application/repair-shop.png';
import communityPost from '../../assets/images/application/community-post.png';
import viewMap from '../../assets/images/application/view-map.jpg';
import sosRequest from '../../assets/images/application/sos-request.png';
import viewAllCamera from '../../assets/images/application/view-all-camera.png';
import yourTimeline from '../../assets/images/application/your-timeline.png';
import applicationInterface from '../../assets/images/application/application-interface.png';

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

interface DownloadFormData {
  name: string;
  email: string;
}

const APKDownload: React.FC = () => {
  const { theme } = useColorTheme();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [selectedMainImage, setSelectedMainImage] = useState<string>(applicationInterface);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [downloadStats, setDownloadStats] = useState({ totalDownloads: 0, lastUpdated: '' });
  const [feedbackStats, setFeedbackStats] = useState({ averageRating: 0 });
  const downloadFormRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<any>(null);
  // const { isMobile, isTablet } = useResponsive();

  // Load download stats khi component mount
  useEffect(() => {
    const stats = getDownloadStats();
    const feedbacks = getFeedbackStats();
    setDownloadStats({
      totalDownloads: stats.totalDownloads,
      lastUpdated: stats.lastUpdated
    });
    setFeedbackStats({
      averageRating: feedbacks.averageRating
    });
  }, []);

  const scrollToDownloadForm = () => {
    if (downloadFormRef.current) {
      downloadFormRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleSlideChange = (current: number) => {
    setCurrentSlide(current);
    const images = [
      applicationInterface,
      viewMap,
      communityPost,
      sosRequest,
      viewAllCamera,
      yourTimeline,
      repairShop,
      community02
    ];
    // Cập nhật ngay lập tức không có delay
    setSelectedMainImage(images[current]);
  };

  const handleImageClick = (index: number) => {
    // Di chuyển carousel đến ảnh được click
    if (carouselRef.current) {
      carouselRef.current.goTo(index);
    }
    setCurrentSlide(index);
    const images = [
      applicationInterface,
      viewMap,
      communityPost,
      sosRequest,
      viewAllCamera,
      yourTimeline,
      repairShop,
      community02
    ];
    setSelectedMainImage(images[index]);
  };


  const handleDownload = async (values: DownloadFormData) => {
    setLoading(true);
    
    try {
      // Lưu thông tin download vào localStorage
      const saveResult = saveDownload(values.name, values.email);
      
      if (saveResult.success) {
        // Cập nhật thống kê hiển thị
        setDownloadStats(prev => ({
          ...prev,
          totalDownloads: saveResult.totalDownloads,
          lastUpdated: new Date().toISOString()
        }));
        message.success(`Thông tin đã được ghi nhận! Tổng lượt tải: ${saveResult.totalDownloads}`);
      } else {
        message.warning('Đã lưu thông tin nhưng có lỗi xảy ra với thống kê.');
      }
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Trigger APK download immediately using direct download link
      const link = document.createElement('a');
      link.href = 'https://drive.google.com/uc?export=download&id=1weaBUn1T8M0km0Uf5FPAzVB-Q3eXdR-v';
      link.download = 'MekongPathfinder-app-release.apk';
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Show success message after a short delay
      setTimeout(() => {
        message.success('Tải xuống APK hoàn tất! Cảm ơn bạn đã sử dụng ứng dụng Mekong Pathfinder.');
      }, 1000);
      
    } catch (error) {
      message.error('Có lỗi xảy ra. Vui lòng thử lại!');
    } finally {
      setLoading(false);
    }
  };

  const appFeatures = [
    {
      icon: <MobileOutlined style={{ color: '#1890ff' }} />,
      title: 'Giao diện thân thiện',
      description: 'Thiết kế đơn giản, dễ sử dụng cho mọi lứa tuổi'
    },
    {
      icon: <SafetyOutlined style={{ color: '#52c41a' }} />,
      title: 'Bảo mật cao',
      description: 'Dữ liệu được mã hóa và bảo vệ an toàn'
    },
    {
      icon: <ClockCircleOutlined style={{ color: '#faad14' }} />,
      title: 'Cập nhật thời gian thực',
      description: 'Thông tin giao thông và thời tiết được cập nhật liên tục'
    },
    {
      icon: <StarOutlined style={{ color: '#722ed1' }} />,
      title: 'Đánh giá chất lượng',
      description: 'Hệ thống đánh giá và phản hồi từ cộng đồng'
    }
  ];

  const installationSteps = [
    {
      title: 'Tải APK',
      description: 'Tải file APK từ website'
    },
    {
      title: 'Cài đặt',
      description: 'Cho phép cài đặt từ nguồn không xác định'
    },
    {
      title: 'Khởi động',
      description: 'Mở ứng dụng và đăng nhập'
    },
    {
      title: 'Sử dụng',
      description: 'Khám phá các tính năng của ứng dụng'
    }
  ];

  return (
    <>
      <style>
      {`
        .ant-carousel .slick-slide {
          display: block !important;
        }
        .ant-carousel .slick-slide > div {
          height: 100%;
        }
        .ant-carousel .slick-list {
          height: auto !important;
        }
        .ant-carousel .slick-track {
          display: flex !important;
          align-items: center !important;
        }
        .ant-carousel .slick-slide img {
          display: block !important;
          margin: 0 auto !important;
        }
        .ant-carousel .slick-slide.slick-center {
          transform: scale(1.15) !important;
          opacity: 1 !important;
          z-index: 10 !important;
          position: relative !important;
          transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
        }
        .ant-carousel .slick-slide:not(.slick-center) {
          transform: scale(0.85) !important;
          opacity: 0.8 !important;
          z-index: 1 !important;
          transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
        }
        .ant-carousel .slick-slide.slick-center .carousel-item {
          height: 300px !important;
          width: 160px !important;
        }
        .ant-carousel .slick-slide:not(.slick-center) .carousel-item {
          height: 280px !important;
          width: 150px !important;
        }
        .ant-carousel .slick-track {
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }
        .main-image-container img {
          transition: none !important;
        }
        .carousel-item:active {
          transform: scale(0.95) !important;
          transition: transform 0.1s ease !important;
        }
        .ant-steps-item-title {
          color: #000 !important;
        }
        .ant-steps-item-description {
          color: #000 !important;
        }
      `}
    </style>

    <Text style={{ 
        color: '#000', 
        margin: '0px 0px',
        fontSize: 'clamp(20px, 3vw, 34px)',
        fontWeight: '700',
        textAlign: 'center',
        display: 'block'
      }}>
        Giới thiệu ứng dụng
    </Text>
      <div style={{ 
        padding: '100px 0 0 0', 
        width: '100%', 
        margin: '0',
        background: theme.background.page,
        minHeight: '100vh'
      }}>
        <Space direction="vertical" size={24} style={{ width: '100%', padding: '0 24px' }}>
        <AnimatedSection animationType="fadeInUp" delay={100}>
          <Card style={{
            background: 'rgba(255, 255, 255, 0.8)',
            border: '1px solid #83b5fc',
            borderRadius: '20px',
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
            backdropFilter: 'blur(10px)'
          }}
          bodyStyle={{
            padding: '10px'
          }}>
          <Row gutter={[8, 8]} align="middle">
            <Col xs={24} sm={24} md={12}>
              <Space direction="vertical" size={8}>
                <Title level={2} style={{ margin: 0, color: '#000', fontSize: '24px' }}>
                  <AndroidOutlined style={{ color: '#52c41a', marginRight: 8 }} />
                  Mekong Pathfinder
                </Title>
                <Title level={4} style={{ margin: 0, color: '#000', fontSize: '16px' }}>
                  Ứng dụng di động thông minh
                </Title>
                <Paragraph style={{ fontSize: '14px', lineHeight: 1.5, color: '#000', margin: '0 0 8px 0' }}>
                  Khám phá các tuyến đường tối ưu, theo dõi giao thông và thời tiết thời gian thực 
                  với ứng dụng Mekong Pathfinder. Được thiết kế đặc biệt cho khu vực Đồng bằng sông Cửu Long.
                </Paragraph>
                <Space wrap>
                  <Tag color="green" icon={<CheckCircleOutlined />}>
                    Miễn phí 100%
                  </Tag>
                  <Tag color="blue" icon={<InfoCircleOutlined />}>
                    Không quảng cáo
                  </Tag>
                  <Tag color="purple" icon={<SafetyOutlined />}>
                    Bảo mật cao
                  </Tag>
                </Space>
              </Space>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: 'clamp(60px, 8vw, 80px)',
                  height: 'clamp(60px, 8vw, 80px)',
                  backgroundColor: '#f0f0f0',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto',
                  border: '2px dashed #d9d9d9'
                }}>
                  <AndroidOutlined style={{ fontSize: 'clamp(25px, 3vw, 35px)', color: '#52c41a' }} />
                </div>
                <Text style={{ marginTop: 4, display: 'block', color: '#001f44', fontSize: '11px' }}>
                  Icon ứng dụng Mekong Pathfinder
                </Text>
                <Button
                  type="primary"
                  size={'small'}
                  icon={<DownloadOutlined />}
                  onClick={scrollToDownloadForm}
                  style={{
                    marginTop: 4,
                    background: 'linear-gradient(135deg, #52c41a 0%, #73d13d 100%)',
                    border: 'none',
                    borderRadius: '14px',
                    height: '28px',
                    padding: '0 12px',
                    fontSize: '11px',
                    fontWeight: '600',
                    boxShadow: '0 3px 12px rgba(3, 68, 214, 0.3)'
                  }}
                >
                  Download APK
                </Button>
              </div>
            </Col>
          </Row>
          </Card>
        </AnimatedSection>

        {/* Combined Application Introduction & Screenshots Section */}
        <AnimatedSection animationType="fadeInUp" delay={200}>
          <Card 
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(197, 226, 255, 0.6) 100%)',
              border: '1px solid #83b5fc',
              borderRadius: '20px',
              boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(10px)',
              minHeight: '400px'
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
            <Row gutter={[24, 24]} align="stretch">
              {/* Left Column - Main Image (5/10) */}
              <Col xs={24} md={10}>
                <div style={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minHeight: '100px',
                  padding: '20px'
                }}>
                  <div className="main-image-container" style={{ 
                    textAlign: 'center',
                    padding: '20px'
                  }}>
                    <img
                      src={selectedMainImage}
                      alt="Selected Application Image"
                    style={{
                      width: '100%',
                        maxWidth: 'clamp(250px, 30vw, 350px)',
                      height: '80%',
                        borderRadius: '20px',
                        boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                        e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.2)';
                      }}
                      onClick={() => {
                        // Chỉ cập nhật ảnh chính, không hiển thị popup
                        }}
                      />
                    </div>
              </div>
                  </Col>

              {/* Right Column - Content & Screenshots (5/10) */}
              <Col xs={24} md={14}>
                <Space direction="vertical" size={24} style={{ width: '100%' }}>
                  {/* Main Content */}
              <div>
                    <Title level={2} style={{ 
                      color: '#000', 
                      margin: '0 0 16px 0',
                      fontSize: 'clamp(20px, 3vw, 24px)',
                      fontWeight: '700'
                    }}>
                      Mekong Pathfinder
                      </Title>
                    <Paragraph style={{ 
                      color: '#000', 
                      fontSize: '16px', 
                      lineHeight: 1.6,
                      marginBottom: '20px'
                    }}>
                      Ứng dụng thông minh giúp người dùng điều hướng an toàn và hiệu quả 
                      trong khu vực Đồng bằng sông Cửu Long với các tính năng tiên tiến.
                      </Paragraph>
                    
                    {/* Features List */}
                    <Row gutter={[16, 8]}>
                      <Col xs={24} sm={12}>
                        <List
                          dataSource={[
                            'Điều hướng thông minh với AI',
                            'Tuyến đường an toàn thời gian thực',
                            'Cộng đồng người dùng tương tác'
                          ]}
                          renderItem={item => (
                            <List.Item style={{ 
                              color: '#000',
                              padding: '8px 0',
                              borderBottom: 'none',
                              justifyContent: 'flex-start'
                            }}>
                              <CheckCircleOutlined style={{ 
                                color: '#52c41a', 
                                marginRight: 12,
                                fontSize: '16px'
                              }} />
                              <span style={{ fontSize: '15px', fontWeight: '500' }}>{item}</span>
                            </List.Item>
                          )}
                        />
                      </Col>
                      <Col xs={24} sm={12}>
                        <List
                          dataSource={[
                            'Cảnh báo thời tiết và lũ lụt',
                            'Hệ thống camera giám sát',
                            'Yêu cầu cứu trợ khẩn cấp'
                          ]}
                          renderItem={item => (
                            <List.Item style={{ 
                              color: '#000',
                              padding: '8px 0',
                              borderBottom: 'none',
                              justifyContent: 'flex-start'
                            }}>
                              <CheckCircleOutlined style={{ 
                                color: '#52c41a', 
                                marginRight: 12,
                                fontSize: '16px'
                              }} />
                              <span style={{ fontSize: '15px', fontWeight: '500' }}>{item}</span>
                            </List.Item>
                          )}
                        />
                      </Col>
                    </Row>
              </div>

                  {/* Screenshots Gallery */}
                  <div>
                    <Title level={4} style={{ 
                      color: '#000',
                      margin: '0 0 16px 0',
                      fontSize: '18px',
                      fontWeight: '600',
                      textAlign: 'center'
                    }}>
                      Hình ảnh ứng dụng
                    </Title>
            <Carousel 
              ref={carouselRef}
              autoplay={false}
              dots={false}
              arrows={true}
              slidesToShow={5}
              slidesToScroll={1}
              infinite={true}
              centerMode={true}
              centerPadding="80px"
              afterChange={handleSlideChange}
              responsive={[
                {
                  breakpoint: 1200,
                  settings: {
                    slidesToShow: 3,
                    centerMode: true,
                    centerPadding: "60px"
                  }
                },
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 1,
                    centerMode: true,
                    centerPadding: "40px"
                  }
                }
              ]}
              prevArrow={<Button 
                type="text" 
                icon={<LeftOutlined />} 
                style={{ 
                          width: '35px',
                          height: '35px',
                  borderRadius: '50%',
                  background: 'rgba(197, 226, 255, 0.9)',
                  border: 'none',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#1890ff',
                          fontSize: '14px',
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
                          width: '35px',
                          height: '35px',
                  borderRadius: '50%',
                  background: 'rgba(197, 226, 255, 0.9)',
                  border: 'none',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#1890ff',
                          fontSize: '14px',
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
              {[
                { src: applicationInterface, alt: 'Giao diện ứng dụng', title: 'Giao diện chính' },
                { src: viewMap, alt: 'Xem bản đồ', title: 'Bản đồ thông minh' },
                { src: communityPost, alt: 'Cộng đồng', title: 'Cộng đồng người dùng' },
                { src: sosRequest, alt: 'SOS Request', title: 'Yêu cầu cứu trợ' },
                { src: viewAllCamera, alt: 'Camera', title: 'Hệ thống camera' },
                { src: yourTimeline, alt: 'Timeline', title: 'Dòng thời gian' },
                { src: repairShop, alt: 'Repair Shop', title: 'Tìm cửa hàng sửa chữa' },
                        { src: community02, alt: 'Community 2', title: 'Cộng đồng tương tác' }
              ].map((image, index) => (
                <div key={index}>
                  <div
                    className="carousel-item"
                    style={{
                      position: 'relative',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      height: '400px',
                      width: '150px',
                      margin: '0 -20%',
                      display: 'flex',
                      flexDirection: 'column',
                      maxHeight: '400px'
                    }}
                    onClick={() => handleImageClick(index)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    }}
                  >
                    <div style={{
                      flex: 1,
                      position: 'relative',
                      overflow: 'hidden'
                    }}>
                      <img
                        src={image.src}
                        alt={image.alt}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          objectPosition: 'center',
                          backgroundColor: '#f0f0f0'
                        }}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                    <div style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'linear-gradient(transparent, rgba(0,0,0,0.9))',
                      padding: '8px',
                      color: 'white',
                      minHeight: '35px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Text style={{ 
                        fontSize: '10px', 
                        fontWeight: '700',
                        color: 'white',
                        textShadow: '1px 1px 3px rgba(0,0,0,0.8)',
                        textAlign: 'center',
                        lineHeight: '1.2',
                        margin: 0
                      }}>
                        {image.title}
                      </Text>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
                  </div>
                </Space>
              </Col>
            </Row>
            {/* Features Section */}
        <AnimatedSection animationType="fadeInUp" delay={400} style={{ marginTop: '40px' }}>
          <Card 
            title="Tính năng nổi bật"
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
              color: '#000',
              fontSize: '24px',
              fontWeight: '700'
            }}
          >
            <Row gutter={[12, 12]}>
              {appFeatures.map((feature, index) => (
                <Col xs={24} sm={12} md={6} key={index}>
                  <Card 
                    size="small" 
                    style={{
                      height: 'clamp(180px, 25vh, 200px)',
                      display: 'flex',
                      flexDirection: 'column',
                      background: 'rgba(255, 255, 255, 0.6)',
                      border: '1px solid #83b5fc',
                      borderRadius: '16px',
                      backdropFilter: 'blur(10px)',
                      transition: 'all 0.3s ease'
                    }}
                    bodyStyle={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      padding: '20px',
                      background: 'transparent'
                    }}
                  >
                    <Space direction="vertical" align="center" style={{ width: '100%', textAlign: 'center', height: '100%', justifyContent: 'center' }}>
                      <div style={{ fontSize: '32px', marginBottom: '12px' }}>{feature.icon}</div>
                      <Title level={5} style={{ margin: '0 0 8px 0', color: '#000', fontSize: '16px' }}>{feature.title}</Title>
                      <Text style={{ fontSize: '12px', color: '#000', lineHeight: '1.4', margin: 0 }}>
                        {feature.description}
                      </Text>
                    </Space>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        </AnimatedSection>
        {/* Download Form */}
        <div ref={downloadFormRef}>
          <AnimatedSection animationType="fadeInUp" delay={800} style={{ marginTop: '40px' }}>
            <Card 
              title="Tải xuống ứng dụng"
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
                color: '#000',
                fontSize: 'clamp(20px, 3vw, 24px)',
                fontWeight: '700'
              }}
            >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={12}>
              <Space direction="vertical" size={16} style={{ width: '100%' }}>
                <Title level={4} style={{ color: '#000' }}>Thông tin cá nhân</Title>
                <Paragraph style={{ color: '#000' }}>
                  Vui lòng cung cấp thông tin để chúng tôi có thể hỗ trợ bạn tốt nhất và 
                  gửi thông báo về các phiên bản cập nhật mới.
                </Paragraph>
                
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={handleDownload}
                  requiredMark={false}
                >
                  <Form.Item
                    name="name"
                    label="Họ và tên"
                    rules={[
                      { required: true, message: 'Vui lòng nhập họ và tên!' },
                      { min: 2, message: 'Họ và tên phải có ít nhất 2 ký tự!' }
                    ]}
                  >
                    <Input
                      prefix={<UserOutlined />}
                      placeholder="Nhập họ và tên của bạn"
                      size="large"
                    />
                  </Form.Item>

                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      { required: true, message: 'Vui lòng nhập email!' },
                      { type: 'email', message: 'Email không hợp lệ!' }
                    ]}
                  >
                    <Input
                      prefix={<MailOutlined />}
                      placeholder="Nhập địa chỉ email của bạn"
                      size="large"
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={loading}
                      size="large"
                      icon={<DownloadOutlined />}
                      style={{ width: '100%' }}
                    >
                      Tải xuống APK
                    </Button>
                  </Form.Item>
                </Form>
              </Space>
            </Col>
            
            <Col xs={24} sm={24} md={12}>
              <Card 
                title="Thống kê tải xuống" 
                size="small"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                  backdropFilter: 'blur(10px)'
                }}
                headStyle={{
                  background: 'transparent',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#000',
                  fontSize: 'clamp(16px, 2.5vw, 18px)',
                  fontWeight: '600'
                }}
              >
                <Space direction="vertical" size={16} style={{ width: '100%' }}>
                  <Row gutter={[8, 8]}>
                    <Col xs={12} sm={12} md={12}>
                      <div style={{ textAlign: 'center' }}>
                        <Title level={2} style={{ margin: 0, color: '#52c41a' }}>{downloadStats.totalDownloads}</Title>
                        <Text style={{ color: '#001f44', fontSize: 'clamp(14px, 2vw, 16px)' }}>Lượt tải</Text>
                      </div>
                    </Col>
                    <Col xs={12} sm={12} md={12}>
                      <div style={{ textAlign: 'center' }}>
                        <Title level={2} style={{ margin: 0, color: '#1890ff' }}>
                          {feedbackStats.averageRating.toFixed(1)}
                        </Title>
                        <Text style={{ color: '#001f44', fontSize: 'clamp(14px, 2vw, 16px)' }}>Đánh giá</Text>
                      </div>
                    </Col>
                  </Row>
                  
                  <Divider style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }} />
                  
                  <div>
                    <Text strong style={{ color: '#000' }}>Phiên bản hiện tại:</Text>
                    <Tag color="blue" style={{ marginLeft: 8 }}>v1.0.0</Tag>
                  </div>
                  
                  <div>
                    <Text strong style={{ color: '#000' }}>Cập nhật lần cuối:</Text>
                    <Text style={{ marginLeft: 8, color: '#000' }}>15/12/2024</Text>
                  </div>
                  
                  <div>
                    <Text strong style={{ color: '#000' }}>Kích thước file:</Text>
                    <Text style={{ marginLeft: 8, color: '#000' }}>45.2 MB</Text>
                  </div>
                </Space>
              </Card>
            </Col>
          </Row>
            </Card>
          </AnimatedSection>

        {/* User Guide Section */}
        <Card title="Hướng dẫn sử dụng ứng dụng" style={{ marginTop: '40px' }}>
          <Row gutter={[24, 24]}>
            <Col xs={24} md={12}>
              <Space direction="vertical" size={16} style={{ width: '100%' }}>
                <Title level={4}>Cài đặt và sử dụng</Title>
                <Steps
                  direction="vertical"
                  current={-1}
                  items={installationSteps.map(step => ({
                    title: step.title,
                    description: step.description
                  }))}
                />
              </Space>
            </Col>
            <Col xs={24} md={12}>
              <Space direction="vertical" size={16} style={{ width: '100%' }}>
                <Title level={4}>Tính năng chính</Title>
                <List
                  dataSource={[
                    'Bản đồ thông minh với giao thông thời gian thực',
                    'Dự báo thời tiết chính xác cho khu vực ĐBSCL',
                    'Cảnh báo lũ lụt và thiên tai',
                    'Cộng đồng người dùng chia sẻ thông tin',
                    'Tìm kiếm địa điểm và lộ trình tối ưu',
                    'Lưu vị trí yêu thích và lịch sử di chuyển'
                  ]}
                  renderItem={item => (
                    <List.Item>
                      <CheckCircleOutlined style={{ color: '#52c41a', marginRight: 8 }} />
                      {item}
                    </List.Item>
                  )}
                />
              </Space>
            </Col>
          </Row>
        </Card>
        </div>
          </Card>
        </AnimatedSection>
      </Space>
        </div>

    </>
  );
};

export default APKDownload;