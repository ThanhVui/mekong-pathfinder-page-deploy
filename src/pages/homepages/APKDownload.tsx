import React, { useState, useRef, useEffect } from 'react';
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
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imagePreviewVisible, setImagePreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [downloadStats, setDownloadStats] = useState({ totalDownloads: 0, lastUpdated: '' });
  const downloadFormRef = useRef<HTMLDivElement>(null);

  // Load download stats khi component mount
  useEffect(() => {
    const stats = getDownloadStats();
    setDownloadStats({
      totalDownloads: stats.totalDownloads,
      lastUpdated: stats.lastUpdated
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
      <div style={{ 
        padding: '100px 0 0 0', 
        width: '100%', 
        margin: '0',
        background: 'rgb(52, 52, 139)',
        minHeight: '100vh'
      }}>
        <Space direction="vertical" size={24} style={{ width: '100%', padding: '0 24px' }}>
        {/* Header Section */}
        <HomePageHeader />

        <AnimatedSection animationType="fadeInUp" delay={100}>
          <Card style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '20px',
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
            backdropFilter: 'blur(10px)'
          }}>
          <Row gutter={[24, 24]} align="middle">
            <Col xs={24} md={12}>
              <Space direction="vertical" size={16}>
                <Title level={1} style={{ margin: 0, color: '#fff' }}>
                  <AndroidOutlined style={{ color: '#52c41a', marginRight: 12 }} />
                  Mekong Pathfinder
                </Title>
                <Title level={3} style={{ margin: 0, color: 'rgba(255, 255, 255, 0.8)' }}>
                  Ứng dụng di động thông minh
                </Title>
                <Paragraph style={{ fontSize: '16px', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.9)' }}>
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
            <Col xs={24} md={12}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '200px',
                  height: '200px',
                  backgroundColor: '#f0f0f0',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto',
                  border: '2px dashed #d9d9d9'
                }}>
                  <AndroidOutlined style={{ fontSize: '80px', color: '#52c41a' }} />
                </div>
                <Text style={{ marginTop: 16, display: 'block', color: 'rgba(255, 255, 255, 0.8)' }}>
                  Icon ứng dụng Mekong Pathfinder
                </Text>
                <Button
                  type="primary"
                  size="large"
                  icon={<DownloadOutlined />}
                  onClick={scrollToDownloadForm}
                  style={{
                    marginTop: 20,
                    background: 'linear-gradient(135deg, #52c41a 0%, #73d13d 100%)',
                    border: 'none',
                    borderRadius: '25px',
                    height: '50px',
                    padding: '0 30px',
                    fontSize: '16px',
                    fontWeight: '600',
                    boxShadow: '0 4px 15px rgba(82, 196, 26, 0.4)'
                  }}
                >
                  Download APK
                </Button>
              </div>
            </Col>
          </Row>
          </Card>
        </AnimatedSection>

        {/* Application Introduction Section */}
        <AnimatedSection animationType="fadeInUp" delay={200}>
          <Card 
            title="Giới thiệu ứng dụng"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '20px',
              boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
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
            >
              <div>
                <Row gutter={[24, 24]}>
                  <Col xs={24} md={12}>
                    <div style={{ textAlign: 'center' }}>
                      <img
                        src={navigateRoute}
                        alt="Navigate Route"
                        style={{
                          width: '100%',
                          maxWidth: '300px',
                          height: 'auto',
                          borderRadius: '12px',
                          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)'
                        }}
                      />
                    </div>
                  </Col>
                  <Col xs={24} md={12}>
                    <Space direction="vertical" size={16} style={{ width: '100%' }}>
                      <Title level={3} style={{ color: '#fff', margin: 0 }}>
                        Điều hướng thông minh
                      </Title>
                      <Paragraph style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '16px', lineHeight: 1.6 }}>
                        Tìm kiếm và lựa chọn tuyến đường tối ưu nhất dựa trên tình hình giao thông thời gian thực. 
                        Ứng dụng sẽ gợi ý các lộ trình an toàn và tiết kiệm thời gian nhất.
                      </Paragraph>
                      <List
                        dataSource={[
                          'Tính toán lộ trình tối ưu',
                          'Cập nhật giao thông thời gian thực',
                          'Cảnh báo tắc đường và sự cố',
                          'Gợi ý tuyến đường thay thế'
                        ]}
                        renderItem={item => (
                          <List.Item style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                            <CheckCircleOutlined style={{ color: '#52c41a', marginRight: 8 }} />
                            {item}
                          </List.Item>
                        )}
                      />
                    </Space>
                  </Col>
                </Row>
              </div>
              
              <div>
                <Row gutter={[24, 24]}>
                  <Col xs={24} md={12}>
                    <div style={{ textAlign: 'center' }}>
                      <img
                        src={safeRoute}
                        alt="Safe Route"
                        style={{
                          width: '100%',
                          maxWidth: '300px',
                          height: 'auto',
                          borderRadius: '12px',
                          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)'
                        }}
                      />
                    </div>
                  </Col>
                  <Col xs={24} md={12}>
                    <Space direction="vertical" size={16} style={{ width: '100%' }}>
                      <Title level={3} style={{ color: '#fff', margin: 0 }}>
                        Tuyến đường an toàn
                      </Title>
                      <Paragraph style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '16px', lineHeight: 1.6 }}>
                        Hệ thống đánh giá và phân loại mức độ an toàn của các tuyến đường, 
                        giúp người dùng lựa chọn lộ trình phù hợp với nhu cầu và tình hình thực tế.
                      </Paragraph>
                      <List
                        dataSource={[
                          'Đánh giá mức độ an toàn tuyến đường',
                          'Cảnh báo khu vực nguy hiểm',
                          'Thông tin về tình hình lũ lụt',
                          'Gợi ý tuyến đường thay thế an toàn'
                        ]}
                        renderItem={item => (
                          <List.Item style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                            <SafetyOutlined style={{ color: '#faad14', marginRight: 8 }} />
                            {item}
                          </List.Item>
                        )}
                      />
                    </Space>
                  </Col>
                </Row>
              </div>

              <div>
                <Row gutter={[24, 24]}>
                  <Col xs={24} md={12}>
                    <div style={{ textAlign: 'center' }}>
                      <img
                        src={community01}
                        alt="Community"
                        style={{
                          width: '100%',
                          maxWidth: '300px',
                          height: 'auto',
                          borderRadius: '12px',
                          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)'
                        }}
                      />
                    </div>
                  </Col>
                  <Col xs={24} md={12}>
                    <Space direction="vertical" size={16} style={{ width: '100%' }}>
                      <Title level={3} style={{ color: '#fff', margin: 0 }}>
                        Cộng đồng người dùng
                      </Title>
                      <Paragraph style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '16px', lineHeight: 1.6 }}>
                        Kết nối với cộng đồng người dùng trong khu vực, chia sẻ thông tin về giao thông, 
                        thời tiết và các sự kiện quan trọng để hỗ trợ lẫn nhau.
                      </Paragraph>
                      <List
                        dataSource={[
                          'Chia sẻ thông tin giao thông',
                          'Cập nhật tình hình thời tiết',
                          'Thảo luận và tương tác cộng đồng',
                          'Báo cáo sự cố và cảnh báo'
                        ]}
                        renderItem={item => (
                          <List.Item style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                            <StarOutlined style={{ color: '#722ed1', marginRight: 8 }} />
                            {item}
                          </List.Item>
                        )}
                      />
                    </Space>
                  </Col>
                </Row>
              </div>
            </Carousel>
          </Card>
        </AnimatedSection>

        {/* Features Section */}
        <AnimatedSection animationType="fadeInUp" delay={400}>
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
              color: '#fff',
              fontSize: '24px',
              fontWeight: '700'
            }}
          >
            <Row gutter={[16, 16]}>
              {appFeatures.map((feature, index) => (
                <Col xs={24} sm={12} md={6} key={index}>
                  <Card 
                    size="small" 
                    style={{
                      height: '200px',
                      display: 'flex',
                      flexDirection: 'column',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
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
                      <Title level={5} style={{ margin: '0 0 8px 0', color: '#fff', fontSize: '16px' }}>{feature.title}</Title>
                      <Text style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.8)', lineHeight: '1.4', margin: 0 }}>
                        {feature.description}
                      </Text>
                    </Space>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        </AnimatedSection>

        {/* App Screenshots Gallery */}
        <AnimatedSection animationType="fadeInUp" delay={600}>
          <Card 
            title="Hình ảnh ứng dụng"
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
              fontSize: '24px',
              fontWeight: '700'
            }}
          >
            <Carousel 
              autoplay={false}
              dots={{ className: 'custom-dots' }}
              arrows={true}
              slidesToShow={6}
              slidesToScroll={1}
              infinite={true}
              responsive={[
                {
                  breakpoint: 1200,
                  settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                  }
                },
                {
                  breakpoint: 992,
                  settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                  }
                },
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                  }
                },
                {
                  breakpoint: 576,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                  }
                }
              ]}
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
              {[
                { src: applicationInterface, alt: 'Giao diện ứng dụng', title: 'Giao diện chính' },
                { src: viewMap, alt: 'Xem bản đồ', title: 'Bản đồ thông minh' },
                { src: communityPost, alt: 'Cộng đồng', title: 'Cộng đồng người dùng' },
                { src: sosRequest, alt: 'SOS Request', title: 'Yêu cầu cứu trợ' },
                { src: viewAllCamera, alt: 'Camera', title: 'Hệ thống camera' },
                { src: yourTimeline, alt: 'Timeline', title: 'Dòng thời gian' },
                { src: repairShop, alt: 'Repair Shop', title: 'Tìm cửa hàng sửa chữa' },
                { src: community02, alt: 'Community 2', title: 'Cộng đồng tương tác' },
                { src: navigateRoute, alt: 'Navigate Route', title: 'Điều hướng tuyến đường' },
                { src: safeRoute, alt: 'Safe Route', title: 'Tuyến đường an toàn' },
                { src: community01, alt: 'Community 1', title: 'Cộng đồng người dùng' }
              ].map((image, index) => (
                <div key={index}>
                  <div
                    style={{
                      position: 'relative',
                      cursor: 'pointer',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                      transition: 'all 0.3s ease',
                      height: '100%',
                      width: '100%',
                      margin: '0 8px',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                    onClick={() => {
                      setPreviewImage(image.src);
                      setImagePreviewVisible(true);
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.25)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
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
                          objectFit: 'cover',
                          objectPosition: 'center'
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
                      background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                      padding: '12px',
                      color: 'white',
                      minHeight: '50px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Text style={{ 
                        fontSize: '14px', 
                        fontWeight: '600',
                        color: 'white',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
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
          </Card>
        </AnimatedSection>

        {/* Installation Guide */}
        <Card title="Hướng dẫn cài đặt">
          <Steps
            direction="horizontal"
            current={-1}
            items={installationSteps.map(step => ({
              title: step.title,
              description: step.description
            }))}
            style={{ marginBottom: 24 }}
          />
          
          <Alert
            message="Lưu ý quan trọng"
            description="Để cài đặt ứng dụng, bạn cần cho phép cài đặt từ 'Nguồn không xác định' trong cài đặt bảo mật của thiết bị Android."
            type="warning"
            showIcon
            style={{ marginBottom: 16 }}
          />
          
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Card size="small" title="Yêu cầu hệ thống">
                <List
                  size="small"
                  dataSource={[
                    'Android 6.0 trở lên',
                    'RAM: Tối thiểu 2GB',
                    'Dung lượng: 50MB',
                    'Kết nối Internet'
                  ]}
                  renderItem={item => (
                    <List.Item>
                      <CheckCircleOutlined style={{ color: '#52c41a', marginRight: 8 }} />
                      {item}
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card size="small" title="Hỗ trợ">
                <List
                  size="small"
                  dataSource={[
                    'Email: support@mekongpathfinder.com',
                    'Hotline: 1900-xxxx',
                    'Thời gian: 8:00 - 17:00',
                    'Thứ 2 - Thứ 6'
                  ]}
                  renderItem={item => (
                    <List.Item>
                      <InfoCircleOutlined style={{ color: '#1890ff', marginRight: 8 }} />
                      {item}
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>
        </Card>

        {/* Download Form */}
        <div ref={downloadFormRef}>
          <AnimatedSection animationType="fadeInUp" delay={800}>
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
                color: '#fff',
                fontSize: '24px',
                fontWeight: '700'
              }}
            >
          <Row gutter={[24, 24]}>
            <Col xs={24} md={12}>
              <Space direction="vertical" size={16} style={{ width: '100%' }}>
                <Title level={4} style={{ color: '#fff' }}>Thông tin cá nhân</Title>
                <Paragraph style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
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
            
            <Col xs={24} md={12}>
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
                  color: '#fff',
                  fontSize: '18px',
                  fontWeight: '600'
                }}
              >
                <Space direction="vertical" size={16} style={{ width: '100%' }}>
                  <Row gutter={[16, 16]}>
                    <Col span={12}>
                      <div style={{ textAlign: 'center' }}>
                        <Title level={2} style={{ margin: 0, color: '#52c41a' }}>{downloadStats.totalDownloads}</Title>
                        <Text style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Lượt tải</Text>
                      </div>
                    </Col>
                    <Col span={12}>
                      <div style={{ textAlign: 'center' }}>
                        <Title level={2} style={{ margin: 0, color: '#1890ff' }}>4.8</Title>
                        <Text style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Đánh giá</Text>
                      </div>
                    </Col>
                  </Row>
                  
                  <Divider style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }} />
                  
                  <div>
                    <Text strong style={{ color: '#fff' }}>Phiên bản hiện tại:</Text>
                    <Tag color="blue" style={{ marginLeft: 8 }}>v1.0.0</Tag>
                  </div>
                  
                  <div>
                    <Text strong style={{ color: '#fff' }}>Cập nhật lần cuối:</Text>
                    <Text style={{ marginLeft: 8, color: 'rgba(255, 255, 255, 0.8)' }}>15/12/2024</Text>
                  </div>
                  
                  <div>
                    <Text strong style={{ color: '#fff' }}>Kích thước file:</Text>
                    <Text style={{ marginLeft: 8, color: 'rgba(255, 255, 255, 0.8)' }}>45.2 MB</Text>
                  </div>
                </Space>
              </Card>
            </Col>
          </Row>
            </Card>
          </AnimatedSection>
        </div>

        {/* User Guide Section */}
        <Card title="Hướng dẫn sử dụng ứng dụng">
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

      </Space>


      {/* Image Preview Modal */}
      <Modal
        title="Xem hình ảnh"
        open={imagePreviewVisible}
        onCancel={() => setImagePreviewVisible(false)}
        footer={null}
        width="20vw"
        style={{ top: 20 }}
      >
        <div style={{ textAlign: 'center' }}>
          <img
            src={previewImage}
            alt="Preview"
            style={{
              maxWidth: '100%',
              maxHeight: '70vh',
              objectFit: 'contain',
              borderRadius: '8px'
            }}
          />
        </div>
      </Modal>
      </div>
      <HomePageFooter />
    </>
  );
};

export default APKDownload;
