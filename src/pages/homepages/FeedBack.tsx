import React, { useState, useEffect } from 'react';
import {
  Card,
  Button,
  Form,
  Input,
  Typography,
  Space,
  Row,
  Col,
  Rate,
  Select,
  message,
  List,
  Avatar,
  Tag,
  Divider,
  Statistic,
  Progress,
  Alert
} from 'antd';
import { useColorTheme } from '../../context/ColorThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import {
  MessageOutlined,
  StarOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  BugOutlined,
  BulbOutlined,
  HeartOutlined,
  LikeOutlined,
  CommentOutlined,
  CalendarOutlined,
  DislikeOutlined
} from '@ant-design/icons';
import HomePageHeader from './header/header';
import HomePageFooter from './footer/footer';
// import { useResponsive } from '../../hooks/useResponsive';
import { saveFeedback, getFeedbackStats, updateFeedbackLikes, FeedbackData } from '../../utils/feedbackTracker';

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

interface FeedbackFormData {
  name: string;
  email: string;
  phone?: string;
  category: string;
  rating: number;
  title: string;
  content: string;
  isAnonymous: boolean;
}

interface FeedbackItem {
  id: number;
  name: string;
  category: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  likes: number;
  isAnonymous: boolean;
  avatar?: string;
}

const FeedBack: React.FC = () => {
  const { theme } = useColorTheme();
  const { t } = useLanguage();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);
  // const { isMobile, isTablet } = useResponsive();
  const [feedbacks, setFeedbacks] = useState<FeedbackData[]>([]);
  const [stats, setStats] = useState(getFeedbackStats());

  // Load feedbacks on component mount
  useEffect(() => {
    loadFeedbacks();
  }, []);

  const loadFeedbacks = () => {
    const feedbackStats = getFeedbackStats();
    setFeedbacks(feedbackStats.recentFeedbacks);
    setStats(feedbackStats);
  };

  const handleSubmit = async (values: FeedbackFormData) => {
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Save feedback using feedbackTracker
      saveFeedback({
        name: values.isAnonymous ? 'Người dùng ẩn danh' : values.name,
        email: values.email,
        phone: values.phone,
        category: values.category,
        rating: values.rating,
        title: values.title,
        content: values.content,
        isAnonymous: values.isAnonymous,
        avatar: values.isAnonymous ? 'https://api.dicebear.com/7.x/miniavs/svg?seed=Anonymous' : `https://api.dicebear.com/7.x/miniavs/svg?seed=${values.name}`
      });

      // Reload feedbacks
      loadFeedbacks();
      form.resetFields();
      setRating(0);
      message.success('Cảm ơn bạn đã góp ý! Chúng tôi sẽ xem xét và phản hồi sớm nhất.');

    } catch (error) {
      message.error('Có lỗi xảy ra. Vui lòng thử lại!');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = (id: string) => {
    updateFeedbackLikes(id, 1);
    loadFeedbacks();
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'bug': return <BugOutlined style={{ color: '#ff4d4f' }} />;
      case 'feature': return <BulbOutlined style={{ color: '#52c41a' }} />;
      case 'improvement': return <LikeOutlined style={{ color: '#1890ff' }} />;
      default: return <CommentOutlined style={{ color: '#722ed1' }} />;
    }
  };

  const getCategoryText = (category: string) => {
    switch (category) {
      case 'bug': return 'Báo lỗi';
      case 'feature': return 'Tính năng';
      case 'improvement': return 'Cải thiện';
      default: return 'Khác';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'bug': return 'red';
      case 'feature': return 'green';
      case 'improvement': return 'blue';
      default: return 'purple';
    }
  };

  // Use stats from feedbackTracker
  const totalFeedbacks = stats.totalFeedbacks;
  const averageRating = stats.averageRating;
  const categoryStats = stats.categoryStats;

  return (
    <>
      <Text
        style={{
          color: "#000",
          margin: "0px 0px",
          fontSize: "clamp(20px, 3vw, 34px)",
          fontWeight: "700",
          textAlign: "center",
          display: "block",
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
        {t('feedback.title')}
      </Text>

      <div style={{
        padding: '100px 0 0 0',
        width: '100%',
        margin: '0',
        background: theme.background.page,
        minHeight: '100vh'
      }}>
        <Space direction="vertical" size={24} style={{ width: '100%', padding: '0 24px' }}>
          <Card style={{
            background: 'rgba(255, 255, 255, 0.8)',
            border: '1px solid #83b5fc',
            borderRadius: '20px',
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
            backdropFilter: 'blur(10px)'
          }}>
            <Row gutter={[16, 16]} align="middle">
              <Col xs={24} sm={24} md={16}>
                <Space direction="vertical" size={16}>
                  <Title
                    level={1}
                    style={{ margin: 0, color: '#000', fontSize: 'clamp(24px, 4vw, 32px)', transition: 'all 0.3s ease' }}
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
                    <MessageOutlined style={{ color: '#1890ff', marginRight: 12, fontSize: 'clamp(20px, 3vw, 24px)' }} />
                    {t('feedback.title')}
                  </Title>
                  <Title level={3} style={{ margin: 0, color: '#000' }}>
                    {t('feedback.subtitle')}
                  </Title>
                  <Paragraph style={{ fontSize: 'clamp(16px, 2.5vw, 18px)', lineHeight: 1.6, color: '#001f44' }}>
                    {t('feedback.description')}
                  </Paragraph>
                  <Space wrap>
                    <Tag color="blue" icon={<HeartOutlined />}>
                      Tất cả góp ý đều được ghi nhận
                    </Tag>
                    <Tag color="green" icon={<StarOutlined />}>
                      Phản hồi nhanh chóng
                    </Tag>
                    <Tag color="purple" icon={<UserOutlined />}>
                      Bảo mật thông tin
                    </Tag>
                  </Space>
                </Space>
              </Col>
              <Col xs={24} sm={24} md={8}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    width: 'clamp(120px, 15vw, 150px)',
                    height: 'clamp(120px, 15vw, 150px)',
                    backgroundColor: '#f0f0f0',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto',
                    border: '3px solid #1890ff'
                  }}>
                    <MessageOutlined style={{ fontSize: 'clamp(50px, 6vw, 60px)', color: '#1890ff' }} />
                  </div>
                </div>
              </Col>
            </Row>
          </Card>

          {/* Statistics */}
          <Row gutter={[12, 12]}>
            <Col xs={24} sm={12} md={8}>
              <Card style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid #83b5fc',
                borderRadius: '16px',
                backdropFilter: 'blur(10px)'
              }}>
                <Statistic
                  title={<span style={{ color: '#001f44', fontSize: 'clamp(14px, 2vw, 16px)' }}>{t('feedback.stats.total')}</span>}
                  value={totalFeedbacks}
                  prefix={<CommentOutlined />}
                  valueStyle={{ color: '#1890ff', fontSize: 'clamp(18px, 3vw, 24px)' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid #83b5fc',
                borderRadius: '16px',
                backdropFilter: 'blur(10px)'
              }}>
                <Statistic
                  title={<span style={{ color: '#001f44', fontSize: 'clamp(14px, 2vw, 16px)' }}>{t('feedback.stats.rating')}</span>}
                  value={averageRating.toFixed(1)}
                  prefix={<StarOutlined />}
                  valueStyle={{ color: '#faad14', fontSize: 'clamp(18px, 3vw, 24px)' }}
                  suffix="/ 5"
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid #83b5fc',
                borderRadius: '16px',
                backdropFilter: 'blur(10px)'
              }}>
                <Statistic
                  title={<span style={{ color: '#001f44', fontSize: 'clamp(14px, 2vw, 16px)' }}>{t('feedback.stats.positive')}</span>}
                  value={Math.round((feedbacks.filter(f => f.rating >= 4).length / totalFeedbacks) * 100)}
                  prefix={<LikeOutlined />}
                  valueStyle={{ color: '#52c41a', fontSize: 'clamp(18px, 3vw, 24px)' }}
                  suffix="%"
                />
              </Card>
            </Col>
          </Row>

          {/* Feedback Form */}
          <Card
            title={t('feedback.card.title')}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid #83b5fc',
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
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              requiredMark={false}
            >
              <Row gutter={[12, 12]}>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    name="name"
                    label={t('feedback.name')}
                    rules={[
                      { required: true, message: 'Vui lòng nhập họ và tên!' },
                      { min: 2, message: 'Họ và tên phải có ít nhất 2 ký tự!' }
                    ]}
                  >
                    <Input
                      prefix={<UserOutlined />}
                      placeholder="Nhập họ và tên của bạn"
                      size={'large'}
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    name="email"
                    label={t('feedback.email')}
                    rules={[
                      { required: true, message: 'Vui lòng nhập email!' },
                      { type: 'email', message: 'Email không hợp lệ!' }
                    ]}
                  >
                    <Input
                      prefix={<MailOutlined />}
                      placeholder="Nhập địa chỉ email"
                      size={'large'}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[12, 12]}>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    name="phone"
                    label={t('feedback.phone')}
                  >
                    <Input
                      prefix={<PhoneOutlined />}
                      placeholder="Nhập số điện thoại"
                      size={'large'}
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    name="category"
                    label={t('feedback.category')}
                    rules={[{ required: true, message: 'Vui lòng chọn loại góp ý!' }]}
                  >
                    <Select placeholder="Chọn loại góp ý" size={'large'}>
                      <Option value="feature">
                        <Space>
                          <BulbOutlined style={{ color: '#52c41a' }} />
                          {t('feedback.category.feature')}
                        </Space>
                      </Option>
                      <Option value="improvement">
                        <Space>
                          <LikeOutlined style={{ color: '#1890ff' }} />
                          {t('feedback.category.improvement')}
                        </Space>
                      </Option>
                      <Option value="bug">
                        <Space>
                          <BugOutlined style={{ color: '#ff4d4f' }} />
                          {t('feedback.category.bug')}
                        </Space>
                      </Option>
                      <Option value="other">
                        <Space>
                          <CommentOutlined style={{ color: '#722ed1' }} />
                          {t('feedback.category.other')}
                        </Space>
                      </Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                name="rating"
                label="Đánh giá tổng thể"
                rules={[{ required: true, message: 'Vui lòng đánh giá ứng dụng!' }]}
              >
                <Rate
                  allowHalf
                  value={rating}
                  onChange={setRating}
                  style={{ fontSize: 'clamp(18px, 3vw, 24px)' }}
                />
              </Form.Item>

              <Form.Item
                name="title"
                label="Tiêu đề góp ý"
                rules={[
                  { required: true, message: 'Vui lòng nhập tiêu đề!' },
                  { min: 5, message: 'Tiêu đề phải có ít nhất 5 ký tự!' }
                ]}
              >
                <Input
                  placeholder="Nhập tiêu đề góp ý của bạn"
                  size={'large'}
                />
              </Form.Item>

              <Form.Item
                name="content"
                label="Nội dung chi tiết"
                rules={[
                  { required: true, message: 'Vui lòng nhập nội dung góp ý!' },
                  { min: 10, message: 'Nội dung phải có ít nhất 10 ký tự!' }
                ]}
              >
                <TextArea
                  rows={6}
                  placeholder="Mô tả chi tiết về góp ý của bạn..."
                  showCount
                  maxLength={1000}
                />
              </Form.Item>

              <Form.Item
                name="isAnonymous"
                valuePropName="checked"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input type="checkbox" />
                  <Text type="secondary">Gửi góp ý ẩn danh</Text>
                </div>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  size={'large'}
                  icon={<MessageOutlined />}
                  style={{ width: '100%' }}
                >
                  {t('feedback.submit')}
                </Button>
              </Form.Item>
            </Form>
          </Card>

          {/* Recent Feedbacks */}
          <Card
            title="Góp ý gần đây"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid #83b5fc',
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
            <List
              dataSource={feedbacks}
              renderItem={(feedback) => (
                <List.Item
                  style={{
                    background: 'rgba(255, 255, 255, 0.6)',
                    borderRadius: '12px',
                    marginBottom: '12px',
                    padding: '16px',
                    border: '1px solid #83b5fc'
                  }}
                  actions={[
                    <Button
                      key="like"
                      type="text"
                      icon={<LikeOutlined />}
                      onClick={() => handleLike(feedback.id)}
                      style={{ color: '#1890ff' }}
                    >
                      {feedback.likes}
                    </Button>
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        src={feedback.avatar}
                        icon={<UserOutlined />}
                        size="large"
                      />
                    }
                    title={
                      <Space wrap>
                        <Text strong style={{ color: '#fff', fontSize: '16px' }}>{feedback.name}</Text>
                        <Tag color={getCategoryColor(feedback.category)} icon={getCategoryIcon(feedback.category)}>
                          {getCategoryText(feedback.category)}
                        </Tag>
                        <Rate disabled value={feedback.rating} style={{ fontSize: '12px' }} />
                      </Space>
                    }
                    description={
                      <Space direction="vertical" size={8} style={{ width: '100%' }}>
                        <Text strong style={{ fontSize: '16px', color: '#fff' }}>{feedback.title}</Text>
                        <Paragraph style={{ margin: 0, color: 'rgba(255, 255, 255, 0.9)' }}>{feedback.content}</Paragraph>
                        <Space>
                          <Text style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)' }}>
                            <CalendarOutlined /> {new Date(feedback.timestamp).toLocaleDateString('vi-VN')}
                          </Text>
                          {feedback.isAnonymous && (
                            <Tag color="orange">Ẩn danh</Tag>
                          )}
                        </Space>
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>

          {/* Category Statistics */}
          <Card
            title="Thống kê theo loại góp ý"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid #83b5fc',
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
            <Row gutter={[12, 12]} justify="center">
              {Object.entries(categoryStats).length > 0 ? (
                Object.entries(categoryStats).map(([category, count]) => (
                  <Col xs={24} sm={8} md={8} key={category}>
                    <Card
                      size="small"
                      style={{
                        background: 'rgba(255, 255, 255, 0.6)',
                        border: '1px solid #83b5fc',
                        borderRadius: '12px',
                        backdropFilter: 'blur(10px)',
                        height: '160px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Space direction="vertical" align="center" style={{ width: '100%', textAlign: 'center' }}>
                        <div style={{ fontSize: '24px' }}>{getCategoryIcon(category)}</div>
                        <Title level={4} style={{ margin: 0, color: '#fff' }}>{count}</Title>
                        <Text style={{ color: 'rgba(255, 255, 255, 0.8)' }}>{getCategoryText(category)}</Text>
                        <Progress
                          percent={Math.round((count / Math.max(totalFeedbacks, 1)) * 100)}
                          size="small"
                          strokeColor={getCategoryColor(category) === 'red' ? '#ff4d4f' :
                            getCategoryColor(category) === 'green' ? '#52c41a' :
                              getCategoryColor(category) === 'blue' ? '#1890ff' : '#722ed1'}
                        />
                      </Space>
                    </Card>
                  </Col>
                ))
              ) : (
                <Col xs={24}>
                  <div style={{
                    textAlign: 'center',
                    padding: '40px',
                    color: 'rgba(255, 255, 255, 0.6)'
                  }}>
                    <MessageOutlined style={{ fontSize: '48px', marginBottom: '16px' }} />
                    <div>Chưa có góp ý nào</div>
                  </div>
                </Col>
              )}
            </Row>
          </Card>
        </Space>
      </div>
    </>
  );
};

export default FeedBack;
