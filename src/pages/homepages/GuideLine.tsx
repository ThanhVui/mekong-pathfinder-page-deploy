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
  Collapse,
  Alert,
  Timeline,
  Image,
  Modal,
  Progress
} from 'antd';
import { 
  BookOutlined, 
  PlayCircleOutlined, 
  DownloadOutlined, 
  MobileOutlined, 
  EnvironmentOutlined,
  ClockCircleOutlined,
  SafetyOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  InfoCircleOutlined,
  WarningOutlined,
  QuestionCircleOutlined,
  ArrowRightOutlined,
  ArrowLeftOutlined,
  HomeOutlined,
  BulbOutlined,
  SettingOutlined,
  UserOutlined,
  HeartOutlined,
  StarOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import HomePageHeader from './header/header';
import HomePageFooter from './footer/footer';

const { Title, Paragraph, Text } = Typography;
const { Panel } = Collapse;

const GuideLine: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [videoModalVisible, setVideoModalVisible] = useState(false);

  const mainSteps = [
    {
      title: 'Cài đặt ứng dụng',
      description: 'Tải và cài đặt Mekong Pathfinder',
      icon: <DownloadOutlined />,
      content: {
        title: 'Cài đặt ứng dụng Mekong Pathfinder',
        steps: [
          'Tải file APK từ website chính thức',
          'Cho phép cài đặt từ "Nguồn không xác định"',
          'Mở file APK và làm theo hướng dẫn',
          'Chờ quá trình cài đặt hoàn tất',
          'Mở ứng dụng và bắt đầu sử dụng'
        ],
        tips: [
          'Đảm bảo thiết bị có đủ dung lượng trống',
          'Kết nối WiFi để tải nhanh hơn',
          'Kiểm tra phiên bản Android tương thích'
        ]
      }
    },
    {
      title: 'Đăng ký tài khoản',
      description: 'Tạo tài khoản để sử dụng đầy đủ tính năng',
      icon: <UserOutlined />,
      content: {
        title: 'Đăng ký và đăng nhập',
        steps: [
          'Mở ứng dụng Mekong Pathfinder',
          'Chọn "Đăng ký tài khoản mới"',
          'Nhập thông tin cá nhân (họ tên, email, số điện thoại)',
          'Tạo mật khẩu mạnh',
          'Xác thực email qua link được gửi',
          'Đăng nhập với thông tin vừa tạo'
        ],
        tips: [
          'Sử dụng email thật để nhận thông báo quan trọng',
          'Mật khẩu nên có ít nhất 8 ký tự',
          'Lưu thông tin đăng nhập ở nơi an toàn'
        ]
      }
    },
    {
      title: 'Khám phá giao diện',
      description: 'Làm quen với các tính năng chính',
      icon: <MobileOutlined />,
      content: {
        title: 'Giao diện ứng dụng',
        features: [
          {
            name: 'Bản đồ chính',
            description: 'Hiển thị vị trí hiện tại và các điểm quan trọng',
            icon: <EnvironmentOutlined />
          },
          {
            name: 'Thời tiết',
            description: 'Dự báo thời tiết và cảnh báo lũ lụt',
            icon: <ClockCircleOutlined />
          },
          {
            name: 'Cộng đồng',
            description: 'Chia sẻ thông tin với người dùng khác',
            icon: <TeamOutlined />
          },
          {
            name: 'Cài đặt',
            description: 'Tùy chỉnh ứng dụng theo nhu cầu',
            icon: <SettingOutlined />
          }
        ]
      }
    },
    {
      title: 'Sử dụng tính năng',
      description: 'Hướng dẫn chi tiết từng tính năng',
      icon: <BulbOutlined />,
      content: {
        title: 'Các tính năng chính',
        features: [
          {
            title: 'Xem bản đồ thông minh',
            steps: [
              'Mở tab "Bản đồ" ở thanh điều hướng dưới',
              'Cho phép ứng dụng truy cập vị trí',
              'Xem vị trí hiện tại trên bản đồ',
              'Phóng to/thu nhỏ bằng cử chỉ',
              'Tìm kiếm địa điểm cụ thể'
            ]
          },
          {
            title: 'Theo dõi thời tiết',
            steps: [
              'Chọn tab "Thời tiết"',
              'Xem dự báo 7 ngày tới',
              'Kiểm tra cảnh báo lũ lụt',
              'Nhận thông báo thời tiết khắc nghiệt',
              'Xem radar mưa thời gian thực'
            ]
          },
          {
            title: 'Tham gia cộng đồng',
            steps: [
              'Vào tab "Cộng đồng"',
              'Đọc tin tức và thông báo',
              'Chia sẻ hình ảnh và trạng thái',
              'Tương tác với bài viết khác',
              'Báo cáo sự cố hoặc góp ý'
            ]
          }
        ]
      }
    },
    {
      title: 'Tối ưu hóa',
      description: 'Cài đặt để có trải nghiệm tốt nhất',
      icon: <SettingOutlined />,
      content: {
        title: 'Cài đặt và tối ưu hóa',
        settings: [
          {
            category: 'Thông báo',
            items: [
              'Bật thông báo thời tiết khắc nghiệt',
              'Nhận cảnh báo lũ lụt',
              'Thông báo tin tức cộng đồng',
              'Cập nhật ứng dụng'
            ]
          },
          {
            category: 'Bản đồ',
            items: [
              'Chọn loại bản đồ (vệ tinh, đường bộ)',
              'Bật/tắt hiển thị giao thông',
              'Lưu vị trí yêu thích',
              'Cài đặt đơn vị đo lường'
            ]
          },
          {
            category: 'Bảo mật',
            items: [
              'Thay đổi mật khẩu định kỳ',
              'Bật xác thực 2 lớp',
              'Kiểm soát quyền riêng tư',
              'Đăng xuất khỏi thiết bị khác'
            ]
          }
        ]
      }
    }
  ];

  const faqData = [
    {
      question: 'Ứng dụng có miễn phí không?',
      answer: 'Có, Mekong Pathfinder hoàn toàn miễn phí. Chúng tôi không thu phí sử dụng hay có quảng cáo.'
    },
    {
      question: 'Tôi có thể sử dụng offline không?',
      answer: 'Một số tính năng như xem bản đồ đã tải trước có thể hoạt động offline, nhưng để có trải nghiệm tốt nhất, bạn nên kết nối Internet.'
    },
    {
      question: 'Dữ liệu cá nhân có được bảo mật không?',
      answer: 'Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn. Dữ liệu được mã hóa và chỉ sử dụng để cải thiện dịch vụ.'
    },
    {
      question: 'Làm sao để báo lỗi hoặc góp ý?',
      answer: 'Bạn có thể gửi phản hồi qua tab "Cộng đồng" trong ứng dụng hoặc truy cập trang feedback trên website.'
    },
    {
      question: 'Ứng dụng có hỗ trợ tiếng địa phương không?',
      answer: 'Hiện tại ứng dụng hỗ trợ tiếng Việt và tiếng Anh. Chúng tôi đang phát triển thêm các ngôn ngữ khác.'
    }
  ];

  const troubleshooting = [
    {
      problem: 'Ứng dụng không mở được',
      solutions: [
        'Kiểm tra phiên bản Android (cần 6.0 trở lên)',
        'Khởi động lại thiết bị',
        'Gỡ cài đặt và cài lại ứng dụng',
        'Kiểm tra dung lượng trống'
      ]
    },
    {
      problem: 'Không định vị được vị trí',
      solutions: [
        'Bật GPS và dịch vụ định vị',
        'Cho phép ứng dụng truy cập vị trí',
        'Kiểm tra kết nối Internet',
        'Di chuyển đến nơi có tín hiệu tốt hơn'
      ]
    },
    {
      problem: 'Thông tin thời tiết không cập nhật',
      solutions: [
        'Kiểm tra kết nối Internet',
        'Làm mới ứng dụng (pull to refresh)',
        'Khởi động lại ứng dụng',
        'Kiểm tra cài đặt thông báo'
      ]
    },
    {
      problem: 'Không đăng nhập được',
      solutions: [
        'Kiểm tra email và mật khẩu',
        'Đặt lại mật khẩu nếu cần',
        'Kiểm tra kết nối Internet',
        'Liên hệ hỗ trợ nếu vẫn không được'
      ]
    }
  ];

  const nextStep = () => {
    if (currentStep < mainSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <>
      <HomePageHeader />
      <div style={{ padding: '100px 24px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <Space direction="vertical" size={24} style={{ width: '100%' }}>
        {/* Header */}
        <Card>
          <Row gutter={[24, 24]} align="middle">
            <Col xs={24} md={16}>
              <Space direction="vertical" size={16}>
                <Title level={1} style={{ margin: 0 }}>
                  <BookOutlined style={{ color: '#1890ff', marginRight: 12 }} />
                  Hướng dẫn sử dụng
                </Title>
                <Title level={3} type="secondary" style={{ margin: 0 }}>
                  Mekong Pathfinder
                </Title>
                <Paragraph style={{ fontSize: '16px', lineHeight: 1.6 }}>
                  Hướng dẫn chi tiết từng bước để bạn có thể sử dụng ứng dụng Mekong Pathfinder 
                  một cách hiệu quả nhất. Từ cài đặt đến các tính năng nâng cao.
                </Paragraph>
                <Space wrap>
                  <Tag color="blue" icon={<CheckCircleOutlined />}>
                    Hướng dẫn từng bước
                  </Tag>
                  <Tag color="green" icon={<InfoCircleOutlined />}>
                    Video minh họa
                  </Tag>
                  <Tag color="purple" icon={<QuestionCircleOutlined />}>
                    FAQ & Troubleshooting
                  </Tag>
                </Space>
              </Space>
            </Col>
            <Col xs={24} md={8}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '150px',
                  height: '150px',
                  backgroundColor: '#f0f0f0',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto',
                  border: '3px solid #1890ff'
                }}>
                  <BookOutlined style={{ fontSize: '60px', color: '#1890ff' }} />
                </div>
              </div>
            </Col>
          </Row>
        </Card>

        {/* Quick Actions */}
        <Card title="Bắt đầu nhanh">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={8}>
              <Card 
                hoverable 
                style={{ textAlign: 'center', height: '100%' }}
                onClick={() => navigate('/apk-download')}
              >
                <Space direction="vertical" size={16}>
                  <DownloadOutlined style={{ fontSize: '48px', color: '#52c41a' }} />
                  <Title level={4} style={{ margin: 0 }}>Tải ứng dụng</Title>
                  <Text type="secondary">Cài đặt Mekong Pathfinder</Text>
                </Space>
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card 
                hoverable 
                style={{ textAlign: 'center', height: '100%' }}
                onClick={() => setVideoModalVisible(true)}
              >
                <Space direction="vertical" size={16}>
                  <PlayCircleOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
                  <Title level={4} style={{ margin: 0 }}>Xem video</Title>
                  <Text type="secondary">Hướng dẫn bằng video</Text>
                </Space>
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card 
                hoverable 
                style={{ textAlign: 'center', height: '100%' }}
                onClick={() => navigate('/feedback')}
              >
                <Space direction="vertical" size={16}>
                  <HeartOutlined style={{ fontSize: '48px', color: '#ff4d4f' }} />
                  <Title level={4} style={{ margin: 0 }}>Góp ý</Title>
                  <Text type="secondary">Chia sẻ trải nghiệm</Text>
                </Space>
              </Card>
            </Col>
          </Row>
        </Card>

        {/* Interactive Guide */}
        <Card title="Hướng dẫn tương tác">
          <Space direction="vertical" size={24} style={{ width: '100%' }}>
            <Steps
              current={currentStep}
              items={mainSteps.map(step => ({
                title: step.title,
                description: step.description,
                icon: step.icon
              }))}
            />
            
            <Card>
              <Space direction="vertical" size={16} style={{ width: '100%' }}>
                <Title level={3}>{mainSteps[currentStep].content.title}</Title>
                
                {mainSteps[currentStep].content.steps && (
                  <List
                    dataSource={mainSteps[currentStep].content.steps}
                    renderItem={(item, index) => (
                      <List.Item>
                        <Space>
                          <Tag color="blue">{index + 1}</Tag>
                          <Text>{item}</Text>
                        </Space>
                      </List.Item>
                    )}
                  />
                )}

                {mainSteps[currentStep].content.features && (
                  <Row gutter={[16, 16]}>
                    {mainSteps[currentStep].content.features?.map((feature: any, index) => (
                      <Col xs={24} md={12} key={index}>
                        <Card size="small">
                          <Space direction="vertical" size={8} style={{ width: '100%' }}>
                            <Space>
                              <div style={{ color: '#1890ff' }}>{feature.icon || <BulbOutlined />}</div>
                              <Text strong>{feature.name || feature.title}</Text>
                            </Space>
                            <Text type="secondary">{feature.description || ''}</Text>
                          </Space>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                )}

                {mainSteps[currentStep].content.settings && (
                  <Collapse>
                    {mainSteps[currentStep].content.settings?.map((setting, index) => (
                      <Panel header={setting.category} key={index}>
                        <List
                          dataSource={setting.items}
                          renderItem={item => (
                            <List.Item>
                              <CheckCircleOutlined style={{ color: '#52c41a', marginRight: 8 }} />
                              {item}
                            </List.Item>
                          )}
                        />
                      </Panel>
                    ))}
                  </Collapse>
                )}

                {mainSteps[currentStep].content.tips && (
                  <Alert
                    message="Mẹo hữu ích"
                    description={
                      <List
                        dataSource={mainSteps[currentStep].content.tips}
                        renderItem={item => (
                          <List.Item>
                            <BulbOutlined style={{ color: '#faad14', marginRight: 8 }} />
                            {item}
                          </List.Item>
                        )}
                      />
                    }
                    type="info"
                    showIcon
                  />
                )}
              </Space>
            </Card>

            <Space style={{ width: '100%', justifyContent: 'space-between' }}>
              <Button 
                icon={<ArrowLeftOutlined />}
                onClick={prevStep}
                disabled={currentStep === 0}
              >
                Bước trước
              </Button>
              <Space>
                <Text type="secondary">
                  Bước {currentStep + 1} / {mainSteps.length}
                </Text>
                <Progress 
                  percent={Math.round(((currentStep + 1) / mainSteps.length) * 100)} 
                  style={{ width: 200 }}
                />
              </Space>
              <Button 
                type="primary"
                icon={<ArrowRightOutlined />}
                onClick={nextStep}
                disabled={currentStep === mainSteps.length - 1}
              >
                Bước tiếp
              </Button>
            </Space>
          </Space>
        </Card>

        {/* FAQ */}
        <Card title="Câu hỏi thường gặp">
          <Collapse>
            {faqData.map((faq, index) => (
              <Panel header={faq.question} key={index}>
                <Paragraph>{faq.answer}</Paragraph>
              </Panel>
            ))}
          </Collapse>
        </Card>

        {/* Troubleshooting */}
        <Card title="Khắc phục sự cố">
          <Timeline>
            {troubleshooting.map((item, index) => (
              <Timeline.Item
                key={index}
                dot={<WarningOutlined style={{ color: '#faad14' }} />}
              >
                <Title level={5}>{item.problem}</Title>
                <List
                  dataSource={item.solutions}
                  renderItem={solution => (
                    <List.Item>
                      <CheckCircleOutlined style={{ color: '#52c41a', marginRight: 8 }} />
                      {solution}
                    </List.Item>
                  )}
                />
              </Timeline.Item>
            ))}
          </Timeline>
        </Card>

        {/* Contact Support */}
        <Card title="Cần hỗ trợ thêm?">
          <Row gutter={[24, 24]}>
            <Col xs={24} md={12}>
              <Space direction="vertical" size={16} style={{ width: '100%' }}>
                <Title level={4}>Liên hệ hỗ trợ</Title>
                <List
                  dataSource={[
                    { icon: <InfoCircleOutlined />, text: 'Email: support@mekongpathfinder.com' },
                    { icon: <QuestionCircleOutlined />, text: 'Hotline: 1900-xxxx' },
                    { icon: <ClockCircleOutlined />, text: 'Thời gian: 8:00 - 17:00 (T2-T6)' }
                  ]}
                  renderItem={item => (
                    <List.Item>
                      <Space>
                        <div style={{ color: '#1890ff' }}>{item.icon}</div>
                        <Text>{item.text}</Text>
                      </Space>
                    </List.Item>
                  )}
                />
              </Space>
            </Col>
            <Col xs={24} md={12}>
              <Space direction="vertical" size={16} style={{ width: '100%' }}>
                <Title level={4}>Hành động nhanh</Title>
                <Space wrap>
                  <Button 
                    type="primary" 
                    icon={<HomeOutlined />}
                    onClick={() => navigate('/homepage')}
                  >
                    Về trang chủ
                  </Button>
                  <Button 
                    icon={<HeartOutlined />}
                    onClick={() => navigate('/feedback')}
                  >
                    Gửi góp ý
                  </Button>
                  <Button 
                    icon={<StarOutlined />}
                    onClick={() => navigate('/apk-download')}
                  >
                    Đánh giá ứng dụng
                  </Button>
                </Space>
                <Alert
                  message="Chúng tôi luôn sẵn sàng hỗ trợ!"
                  description="Nếu bạn gặp khó khăn, đừng ngần ngại liên hệ với chúng tôi. Chúng tôi sẽ phản hồi trong vòng 24 giờ."
                  type="success"
                  showIcon
                />
              </Space>
            </Col>
          </Row>
        </Card>
      </Space>

      {/* Video Modal */}
      <Modal
        title="Hướng dẫn bằng video"
        open={videoModalVisible}
        onCancel={() => setVideoModalVisible(false)}
        footer={null}
        width="80vw"
        style={{ top: 20 }}
      >
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <div style={{
            width: '100%',
            height: '400px',
            backgroundColor: '#f0f0f0',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px'
          }}>
            <PlayCircleOutlined style={{ fontSize: '80px', color: '#1890ff' }} />
          </div>
          <Title level={4}>Video hướng dẫn sử dụng</Title>
          <Paragraph>
            Video hướng dẫn chi tiết cách sử dụng ứng dụng Mekong Pathfinder 
            sẽ được cập nhật sớm nhất. Hiện tại bạn có thể tham khảo hướng dẫn 
            từng bước ở trên.
          </Paragraph>
          <Button 
            type="primary" 
            onClick={() => setVideoModalVisible(false)}
          >
            Đóng
          </Button>
        </div>
      </Modal>
      </div>
      <HomePageFooter />
    </>
  );
};

export default GuideLine;
