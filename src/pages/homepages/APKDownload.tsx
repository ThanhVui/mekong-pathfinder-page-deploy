"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
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
  message,
  Tag,
  List,
  Carousel,
} from "antd"
import { useColorTheme } from "../../context/ColorThemeContext"
import { useLanguage } from "../../context/LanguageContext"
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
  RightOutlined,
} from "@ant-design/icons"
import AnimatedSection from "../../components/AnimatedSection"
import NavigationButton from "../../components/NavigationButton"
import { saveDownload, getDownloadStats } from "../../utils/downloadTracker"
import { getFeedbackStats } from "../../utils/feedbackTracker"
import community02 from "../../assets/images/application/community-02.png"
import repairShop from "../../assets/images/application/repair-shop.png"
import communityPost from "../../assets/images/application/community-post.png"
import viewMap from "../../assets/images/application/view-map.jpg"
import sosRequest from "../../assets/images/application/sos-request.png"
import viewAllCamera from "../../assets/images/application/view-all-camera.png"
import yourTimeline from "../../assets/images/application/your-timeline.png"
import applicationInterface from "../../assets/images/application/application-interface.png"
import appLogoIcon from "../../assets/images/logo_header/logo_icon.png"
import applicationBg from "../../assets/images/download-images/application-bg.png"

const { Title, Paragraph, Text } = Typography
const { TextArea } = Input

interface DownloadFormData {
  name: string
  email: string
}

const APKDownload: React.FC = () => {
  const { theme } = useColorTheme()
  const { t } = useLanguage()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [selectedMainImage, setSelectedMainImage] = useState<string>(applicationInterface)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [downloadStats, setDownloadStats] = useState({ totalDownloads: 0, lastUpdated: "" })
  const [feedbackStats, setFeedbackStats] = useState({ averageRating: 0 })
  const downloadFormRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<any>(null)
  const [screenshotsToShow, setScreenshotsToShow] = useState(5)

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth
      if (w <= 768) {
        setScreenshotsToShow(1)
      } else if (w <= 1024) {
        setScreenshotsToShow(3)
      } else {
        setScreenshotsToShow(5)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const stats = getDownloadStats()
    const feedbacks = getFeedbackStats()
    setDownloadStats({
      totalDownloads: stats.totalDownloads,
      lastUpdated: stats.lastUpdated,
    })
    setFeedbackStats({
      averageRating: feedbacks.averageRating,
    })
  }, [])

  const scrollToDownloadForm = () => {
    if (downloadFormRef.current) {
      downloadFormRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  const handleSlideChange = (current: number) => {
    setCurrentSlide(current)
    const images = [
      applicationInterface,
      viewMap,
      communityPost,
      sosRequest,
      viewAllCamera,
      yourTimeline,
      repairShop,
      community02,
    ]
    setSelectedMainImage(images[current])
  }

  const handleImageClick = (index: number) => {
    if (carouselRef.current) {
      carouselRef.current.goTo(index)
    }
    setCurrentSlide(index)
    const images = [
      applicationInterface,
      viewMap,
      communityPost,
      sosRequest,
      viewAllCamera,
      yourTimeline,
      repairShop,
      community02,
    ]
    setSelectedMainImage(images[index])
  }

  const handleDownload = async (values: DownloadFormData) => {
    setLoading(true)

    try {
      const saveResult = saveDownload(values.name, values.email)

      if (saveResult.success) {
        setDownloadStats((prev) => ({
          ...prev,
          totalDownloads: saveResult.totalDownloads,
          lastUpdated: new Date().toISOString(),
        }))
        message.success(`Thông tin đã được ghi nhận! Tổng lượt tải: ${saveResult.totalDownloads}`)
      } else {
        message.warning("Đã lưu thông tin nhưng có lỗi xảy ra với thống kê.")
      }

      await new Promise((resolve) => setTimeout(resolve, 1000))

      const link = document.createElement("a")
      link.href = "https://drive.google.com/uc?export=download&id=1weaBUn1T8M0km0Uf5FPAzVB-Q3eXdR-v"
      link.download = "MekongPathfinder-app-release.apk"
      link.style.display = "none"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      setTimeout(() => {
        message.success("Tải xuống APK hoàn tất! Cảm ơn bạn đã sử dụng ứng dụng Mekong Pathfinder.")
      }, 1000)
    } catch (error) {
      message.error("Có lỗi xảy ra. Vui lòng thử lại!")
    } finally {
      setLoading(false)
    }
  }

  const appFeatures = [
    {
      icon: <MobileOutlined style={{ color: "#1890ff" }} />,
      title: t("app.feature.friendly"),
      description: t("app.feature.friendly.desc"),
    },
    {
      icon: <SafetyOutlined style={{ color: "#52c41a" }} />,
      title: t("app.feature.secure"),
      description: t("app.feature.secure.desc"),
    },
    {
      icon: <ClockCircleOutlined style={{ color: "#faad14" }} />,
      title: t("app.feature.realtime"),
      description: t("app.feature.realtime.desc"),
    },
    {
      icon: <StarOutlined style={{ color: "#722ed1" }} />,
      title: t("app.feature.quality"),
      description: t("app.feature.quality.desc"),
    },
  ]

  const installationSteps = [
    {
      title: t("app.step.apk"),
      description: t("app.step.apk.desc"),
    },
    {
      title: t("app.step.install"),
      description: t("app.step.install.desc"),
    },
    {
      title: t("app.step.start"),
      description: t("app.step.start.desc"),
    },
    {
      title: t("app.step.use"),
      description: t("app.step.use.desc"),
    },
  ]

  return (
    <>
      <style>
        {`
        /* Enhanced carousel animations and transitions */
        .ant-carousel .slick-slide {
          display: block !important;
        }
        .ant-carousel .slick-slide > div {
          height: 100%;
        }
        .ant-carousel .slick-list {
          height: auto !important;
          margin: 0 auto;
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
          opacity: 1 !important;
          z-index: 10 !important;
          position: relative !important;
          transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
        }
        .ant-carousel .slick-slide:not(.slick-center) {
          opacity: 0.8 !important;
          z-index: 1 !important;
          transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
        }
        .ant-carousel .slick-slide.slick-center .carousel-item {
          height: clamp(320px, 40vw, 420px) !important;
          width: clamp(150px, 12vw, 200px) !important;
          margin: 0 5px !important;
        }
        .ant-carousel .slick-slide:not(.slick-center) .carousel-item {
          height: clamp(280px, 35vw, 360px) !important;
          width: clamp(130px, 10vw, 180px) !important;
          margin: 0 5px !important;
        }
        .main-image-container img {
          transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1) !important;
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

        /* Smooth card transitions and hover effects */
        .feature-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
          transform: translateY(0) !important;
        }
        .feature-card:hover {
          transform: translateY(-8px) scale(1.02) !important;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15) !important;
        }

        /* Smooth button transitions */
        .ant-btn {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        .ant-btn:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15) !important;
        }

        /* Smooth input focus transitions */
        .ant-input, .ant-input-number {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        .ant-input:focus, .ant-input-number:focus {
          box-shadow: 0 0 0 3px rgba(24, 144, 255, 0.1) !important;
          border-color: #1890ff !important;
        }

        /* Smooth tag transitions */
        .ant-tag {
          transition: all 0.3s ease !important;
        }

        /* Smooth list item transitions */
        .ant-list-item {
          transition: all 0.3s ease !important;
        }
        .ant-list-item:hover {
          padding-left: 8px !important;
        }

        /* Smooth divider transitions */
        .ant-divider {
          transition: all 0.3s ease !important;
        }

        /* Smooth stat number animations */
        @keyframes slideInNumber {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .stat-number {
          animation: slideInNumber 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards !important;
        }

        /* Smooth card entrance animations */
        @keyframes cardSlideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .card-entrance {
          animation: cardSlideIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards !important;
        }

        /* Smooth image transitions */
        .main-image-container {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }

        /* Smooth arrow button transitions */
        .carousel-arrow-btn {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        .carousel-arrow-btn:hover {
          transform: scale(1.15) !important;
          box-shadow: 0 8px 20px rgba(24, 144, 255, 0.25) !important;
        }

        /* Smooth text transitions */
        .smooth-text {
          transition: all 0.3s ease !important;
        }
        .ant-carousel .slick-slide .carousel-item {
          height: clamp(220px, 21vw, 320px) !important;
          width: clamp(125px, 15vw, 220px) !important;
          margin: 0 8px !important;
          box-shadow: none !important;
          background: white !important; /* Prevent see-through/anti-overlap */
        }
        .ant-carousel .slick-slide {
          padding-left: 8px !important;
          padding-right: 8px !important;
        }
        .ant-carousel .slick-list {
          margin-left: -8px !important;
          margin-right: -8px !important;
        }
        .carousel-item:active,
        .carousel-item:hover,
        .carousel-item img:hover {
          transform: none !important;
          box-shadow: none !important;
        }
        .ant-carousel .slick-slide:not(.slick-center) {
          opacity: 0.8 !important;
          z-index: 1 !important;
        }
        .ant-carousel .slick-slide.slick-center {
          opacity: 1 !important;
          z-index: 10 !important;
        }
        /* Clean up any weird image overflow/bleed for all carousel images */
        .carousel-item img {
          border-radius: 15px;
          background: #f5f5f5;
          box-sizing: border-box;
          width: 100% !important;
          height: 100% !important;
          object-fit: cover;
          margin: 0;
          display: block;
        }
        /* Responsive: cut margin on smallest screens */
        @media (max-width: 600px) {
          .ant-carousel .slick-slide .carousel-item {
            margin: 0 4px !important;
          }
          .ant-carousel .slick-slide { padding-left:4px !important; padding-right:4px !important; }
          .ant-carousel .slick-list { margin-left: -4px !important; margin-right: -4px !important; }
        }
      `}
      </style>

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
        {t('app.intro.title')}
      </Text>
      <div
        style={{
          width: "100%",
          margin: "10px 0",
          background: theme.background.page,
          minHeight: "100vh",
        }}
      >
        <div
          style={{
            height: "clamp(260px, 45vw, 600px)",
            borderRadius: "20px",
            backgroundImage: `url(${applicationBg})`,
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.12)",
            marginBottom: "20px",
            objectFit: "fill",
          }}
        />
        <Space direction="vertical" size={24} style={{ width: "100%", padding: "0 24px" }}>
          <AnimatedSection animationType="fadeInUp" delay={100}>
            <Card
              style={{
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(230, 245, 255, 0.8) 100%)",
                border: "1px solid rgba(131, 181, 252, 0.5)",
                borderRadius: "24px",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
                backdropFilter: "blur(10px)",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                width: "calc(100% + 48px)",
                marginLeft: "-24px",
                marginRight: "-24px",
                minHeight: "clamp(300px, 40vh, 500px)",
              }}
              bodyStyle={{
                padding: "24px",
              }}
            >
              <Row gutter={[16, 16]} align="middle" justify="space-between">
                <Col xs={24} sm={24} md={12}>
                  <Space direction="vertical" size={12} style={{ alignItems: "flex-start", width: "100%" }}>
                    <Title
                      level={2}
                      style={{ marginRight: '20px', color: "#000", fontSize: "28px", transition: "all 0.3s ease" }}
                    >
                      <AndroidOutlined style={{ color: "#52c41a", marginRight: 8, transition: "all 0.3s ease" }} />
                      {t('app.intro.name')}
                    </Title>
                    <Title
                      level={4}
                      style={{ margin: 0, color: "#666", fontSize: "18px", transition: "all 0.3s ease" }}
                    >
                      {t('app.intro.subtitle')}
                    </Title>
                    <Paragraph
                      style={{
                        fontSize: "16px",
                        lineHeight: 1.75,
                        color: "#333",
                        margin: "0 0 12px 0",
                        transition: "all 0.3s ease",
                        maxWidth: "720px",
                      }}
                    >
                      {t('app.intro.description')}
                    </Paragraph>
                    <Space wrap size={[12, 8]}>
                      <Tag color="green" icon={<CheckCircleOutlined />} style={{ fontSize: 13 }}>
                        {t('app.intro.free')}
                      </Tag>
                      <Tag color="blue" icon={<InfoCircleOutlined />} style={{ fontSize: 13 }}>
                        {t('app.intro.no.ads')}
                      </Tag>
                      <Tag color="purple" icon={<SafetyOutlined />} style={{ fontSize: 13 }}>
                        {t('app.intro.secure')}
                      </Tag>
                    </Space>
                  </Space>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <div style={{ textAlign: "center" }}>
                    <div
                      style={{
                        width: "clamp(72px, 10vw, 100px)",
                        height: "clamp(72px, 10vw, 100px)",
                        backgroundColor: "rgba(240, 240, 240, 0.8)",
                        borderRadius: "16px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto",
                        border: "2px solid rgba(131, 181, 252, 0.3)",
                        transition: "all 0.3s ease",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                      }}
                    >
                      <img
                        src={appLogoIcon || "/placeholder.svg"}
                        alt="App Logo"
                        style={{
                          width: "clamp(36px, 6vw, 90px)",
                          height: "clamp(36px, 6vw, 90px)",
                          objectFit: "contain",
                          transition: "all 0.3s ease",
                        }}
                      />
                    </div>
                    <Text
                      style={{
                        marginTop: 6,
                        display: "block",
                        color: "#666",
                        fontSize: "12px",
                        transition: "all 0.3s ease",
                      }}
                    >
                      {t('app.intro.download')}
                    </Text>
                    <Button
                      type="primary"
                      size={"middle"}
                      icon={<DownloadOutlined />}
                      onClick={scrollToDownloadForm}
                      style={{
                        marginTop: 6,
                        background: "linear-gradient(135deg, #52c41a 0%, #73d13d 100%)",
                        border: "none",
                        borderRadius: "16px",
                        height: "36px",
                        padding: "0 16px",
                        fontSize: "12px",
                        fontWeight: "600",
                        boxShadow: "0 4px 12px rgba(82, 196, 26, 0.3)",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
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
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(197, 226, 255, 0.4) 100%)",
                border: "1px solid rgba(131, 181, 252, 0.5)",
                borderRadius: "24px",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
                backdropFilter: "blur(10px)",
                minHeight: "400px",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                width: "calc(100% + 48px)",
                marginLeft: "-24px",
                marginRight: "-24px",
              }}
              headStyle={{
                background: "transparent",
                borderBottom: "1px solid rgba(131, 181, 252, 0.2)",
                color: "#000",
                fontSize: "28px",
                fontWeight: "700",
                textAlign: "center",
              }}
            >
              <Row gutter={[24, 24]} align="stretch">
                {/* MOBILE & TABLET: CONTENT -> IMAGE -> GALLERY */}
                <Col xs={24} md={0}>
                  {/* Main Content */}
                  <div>
                    <Title
                      level={2}
                      style={{
                        color: "#000",
                        margin: "0 0 16px 0",
                        fontSize: "clamp(20px, 3vw, 24px)",
                        fontWeight: "700",
                        transition: "all 0.3s ease",
                      }}
                    >
                      {t('app.intro.name')}
                    </Title>
                    <Paragraph
                      style={{
                        color: "#333",
                        fontSize: "16px",
                        lineHeight: 1.7,
                        marginBottom: "20px",
                        transition: "all 0.3s ease",
                      }}
                    >
                      {t('apkdownload.intro.desc')}
                    </Paragraph>
                    <Row gutter={[16, 8]}>
                      <Col xs={24} sm={12}>
                        <List
                          dataSource={[
                            t('apkdownload.feature.ai'),
                            t('apkdownload.feature.realtime'),
                            t('apkdownload.feature.community'),
                          ]}
                          renderItem={(item) => (
                            <List.Item
                              style={{
                                color: "#333",
                                padding: "8px 0",
                                borderBottom: "none",
                                justifyContent: "flex-start",
                              }}
                            >
                              <CheckCircleOutlined style={{ color: "#52c41a", marginRight: 12, fontSize: "16px" }} />
                              <span style={{ fontSize: "15px", fontWeight: "500" }}>{item}</span>
                            </List.Item>
                          )}
                        />
                      </Col>
                      <Col xs={24} sm={12}>
                        <List
                          dataSource={[
                            t('apkdownload.feature.weather'),
                            t('apkdownload.feature.camera'),
                            t('apkdownload.feature.sos'),
                          ]}
                          renderItem={(item) => (
                            <List.Item
                              style={{
                                color: "#333",
                                padding: "8px 0",
                                borderBottom: "none",
                                justifyContent: "flex-start",
                              }}
                            >
                              <CheckCircleOutlined style={{ color: "#52c41a", marginRight: 12, fontSize: "16px" }} />
                              <span style={{ fontSize: "15px", fontWeight: "500" }}>{item}</span>
                            </List.Item>
                          )}
                        />
                      </Col>
                    </Row>
                  </div>
                  {/* Main Image */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "20px 0",
                    }}
                  >
                    <div className="main-image-container" style={{ textAlign: "center" }}>
                      <img
                        src={selectedMainImage || "/placeholder.svg"}
                        alt="Selected Application Image"
                        style={{
                          width: "100%",
                          maxWidth: "clamp(250px, 70vw, 350px)",
                          borderRadius: "20px",
                          boxShadow: "0 15px 35px rgba(0, 0, 0, 0.12)",
                          transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                      />
                    </div>
                  </div>
                  {/* Gallery */}
                  <div>
                    <Title
                      level={4}
                      style={{
                        color: "#000",
                        margin: "24px 0 16px 0",
                        fontSize: "18px",
                        fontWeight: "600",
                        textAlign: "center",
                      }}
                    >
                      {t('app.screenshots')}
                    </Title>
                    <Carousel
                      ref={carouselRef}
                      dots={false}
                      arrows={true}
                      slidesToShow={screenshotsToShow}
                      infinite={true}
                      centerMode={true}
                      centerPadding="0px"
                      speed={0}
                      afterChange={handleSlideChange}
                      prevArrow={<NavigationButton direction="left" onClick={() => {}} style={{ left: "-8px" }} />}
                      nextArrow={<NavigationButton direction="right" onClick={() => {}} style={{ right: "-8px" }} />}
                    >
                      {[
                        { src: applicationInterface, alt: "Giao diện ứng dụng", title: "Giao diện chính" },
                        { src: viewMap, alt: "Xem bản đồ", title: "Bản đồ thông minh" },
                        { src: communityPost, alt: "Cộng đồng", title: "Cộng đồng người dùng" },
                        { src: sosRequest, alt: "SOS Request", title: "Yêu cầu cứu trợ" },
                        { src: viewAllCamera, alt: "Camera", title: "Hệ thống camera" },
                        { src: yourTimeline, alt: "Timeline", title: "Dòng thời gian" },
                        { src: repairShop, alt: "Repair Shop", title: "Tìm cửa hàng sửa chữa" },
                        { src: community02, alt: "Community 2", title: "Cộng đồng tương tác" },
                      ].map((image, index) => (
                        <div key={index} style={{ padding: "0 10px" }}>
                          <div
                            className="carousel-item"
                            style={{
                              position: "relative",
                              borderRadius: "16px",
                              overflow: "hidden",
                              height: "clamp(220px, 30vw, 300px)",
                            }}
                            onClick={() => handleImageClick(index)}
                          >
                            <img
                              src={image.src || "/placeholder.svg"}
                              alt={image.alt}
                              style={{ width: "100%", height: "100%", objectFit: "cover", backgroundColor: "#f5f5f5" }}
                            />
                            <div
                              style={{
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                right: 0,
                                background: "linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.2), transparent)",
                                padding: "10px 8px 8px",
                                color: "white",
                                minHeight: "38px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Text style={{ fontSize: "12px", fontWeight: "700", color: "white" }}>{image.title}</Text>
                            </div>
                          </div>
                        </div>
                      ))}
                    </Carousel>
                  </div>
                </Col>

                {/* DESKTOP: IMAGE | (CONTENT + GALLERY) */}
                <Col xs={0} md={10}>
                  <div
                    style={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      minHeight: "100px",
                      padding: "20px",
                    }}
                  >
                    <div
                      className="main-image-container"
                      style={{
                        textAlign: "center",
                        padding: "20px",
                      }}
                    >
                      <img
                        src={selectedMainImage || "/placeholder.svg"}
                        alt="Selected Application Image"
                        style={{
                          width: "100%",
                          maxWidth: "clamp(250px, 30vw, 350px)",
                          height: "80%",
                          borderRadius: "20px",
                          boxShadow: "0 15px 35px rgba(0, 0, 0, 0.12)",
                          transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "scale(1.05) translateY(-4px)"
                          e.currentTarget.style.boxShadow = "0 20px 45px rgba(0, 0, 0, 0.2)"
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "scale(1) translateY(0)"
                          e.currentTarget.style.boxShadow = "0 15px 35px rgba(0, 0, 0, 0.12)"
                        }}
                        onClick={() => {}}
                      />
                    </div>
                  </div>
                </Col>
                <Col xs={0} md={14}>
                  <Space direction="vertical" size={24} style={{ width: "100%" }}>
                    {/* Main Content */}
                    <div>
                      <Title
                        level={2}
                        style={{
                          color: "#000",
                          margin: "0 0 16px 0",
                          fontSize: "clamp(20px, 3vw, 24px)",
                          fontWeight: "700",
                          transition: "all 0.3s ease",
                        }}
                      >
                        {t('app.intro.name')}
                      </Title>
                      <Paragraph
                        style={{
                          color: "#333",
                          fontSize: "16px",
                          lineHeight: 1.7,
                          marginBottom: "20px",
                          transition: "all 0.3s ease",
                        }}
                      >
                        {t('apkdownload.intro.desc')}
                      </Paragraph>

                      {/* Features List */}
                      <Row gutter={[16, 8]}>
                        <Col xs={24} sm={12}>
                          <List
                            dataSource={[
                              t('apkdownload.feature.ai'),
                              t('apkdownload.feature.realtime'),
                              t('apkdownload.feature.community'),
                            ]}
                            renderItem={(item) => (
                              <List.Item
                                style={{
                                  color: "#333",
                                  padding: "8px 0",
                                  borderBottom: "none",
                                  justifyContent: "flex-start",
                                  transition: "all 0.3s ease",
                                }}
                              >
                                <CheckCircleOutlined
                                  style={{
                                    color: "#52c41a",
                                    marginRight: 12,
                                    fontSize: "16px",
                                    transition: "all 0.3s ease",
                                  }}
                                />
                                <span style={{ fontSize: "15px", fontWeight: "500", transition: "all 0.3s ease" }}>
                                  {item}
                                </span>
                              </List.Item>
                            )}
                          />
                        </Col>
                        <Col xs={24} sm={12}>
                          <List
                            dataSource={[
                              t('apkdownload.feature.weather'),
                              t('apkdownload.feature.camera'),
                              t('apkdownload.feature.sos'),
                            ]}
                            renderItem={(item) => (
                              <List.Item
                                style={{
                                  color: "#333",
                                  padding: "8px 0",
                                  borderBottom: "none",
                                  justifyContent: "flex-start",
                                  transition: "all 0.3s ease",
                                }}
                              >
                                <CheckCircleOutlined
                                  style={{
                                    color: "#52c41a",
                                    marginRight: 12,
                                    fontSize: "16px",
                                    transition: "all 0.3s ease",
                                  }}
                                />
                                <span style={{ fontSize: "15px", fontWeight: "500", transition: "all 0.3s ease" }}>
                                  {item}
                                </span>
                              </List.Item>
                            )}
                          />
                        </Col>
                      </Row>
                    </div>

                    {/* Screenshots Gallery */}
                    <div style={{ overflow: "hidden" }}>
                      <Title
                        level={4}
                        style={{
                          color: "#000",
                          margin: "0 0 16px 0",
                          fontSize: "18px",
                          fontWeight: "600",
                          textAlign: "center",
                          transition: "all 0.3s ease",
                        }}
                      >
                        {t('app.screenshots')}
                      </Title>
                      <Carousel
                        ref={carouselRef}
                        autoplay={false}
                        dots={false}
                        arrows={true}
                        slidesToShow={screenshotsToShow}
                        slidesToScroll={1}
                        infinite={true}
                        centerMode={true}
                        centerPadding="0px"
                        speed={0}
                        afterChange={handleSlideChange}
                        prevArrow={<NavigationButton direction="left" onClick={() => {}} style={{ left: "-8px" }} />}
                        nextArrow={<NavigationButton direction="right" onClick={() => {}} style={{ right: "-8px" }} />}
                      >
                        {[
                          { src: applicationInterface, alt: "Giao diện ứng dụng", title: "Giao diện chính" },
                          { src: viewMap, alt: "Xem bản đồ", title: "Bản đồ thông minh" },
                          { src: communityPost, alt: "Cộng đồng", title: "Cộng đồng người dùng" },
                          { src: sosRequest, alt: "SOS Request", title: "Yêu cầu cứu trợ" },
                          { src: viewAllCamera, alt: "Camera", title: "Hệ thống camera" },
                          { src: yourTimeline, alt: "Timeline", title: "Dòng thời gian" },
                          { src: repairShop, alt: "Repair Shop", title: "Tìm cửa hàng sửa chữa" },
                          { src: community02, alt: "Community 2", title: "Cộng đồng tương tác" },
                        ].map((image, index) => (
                          <div key={index} style={{ padding: "0 10px" }}>
                            <div
                              className="carousel-item"
                              style={{
                                position: "relative",
                                borderRadius: "16px",
                                overflow: "hidden",
                                transition:
                                  "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
                                height: "clamp(220px, 28vw, 320px)",
                                display: "flex",
                                flexDirection: "column",
                                maxHeight: "320px",
                                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
                              }}
                              onClick={() => handleImageClick(index)}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-12px) scale(1.03)"
                                e.currentTarget.style.boxShadow = "0 16px 32px rgba(0, 0, 0, 0.15)"
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0) scale(1)"
                                e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.1)"
                              }}
                            >
                              <div
                                style={{
                                  flex: 1,
                                  position: "relative",
                                  overflow: "hidden",
                                }}
                              >
                                <img
                                  src={image.src || "/placeholder.svg"}
                                  alt={image.alt}
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    objectPosition: "center",
                                    backgroundColor: "#f5f5f5",
                                    transition: "all 0.3s ease",
                                  }}
                                  onError={(e) => {
                                    e.currentTarget.style.display = "none"
                                  }}
                                />
                              </div>
                              <div
                                style={{
                                  position: "absolute",
                                  bottom: 0,
                                  left: 0,
                                  right: 0,
                                  background: "linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.2), transparent)",
                                  padding: "10px 8px 8px",
                                  color: "white",
                                  minHeight: "38px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  transition: "all 0.3s ease",
                                }}
                              >
                                <Text
                                  style={{
                                    fontSize: "12px",
                                    fontWeight: "700",
                                    color: "white",
                                    textShadow: "1px 1px 3px rgba(0,0,0,0.8)",
                                    textAlign: "center",
                                    lineHeight: "1.3",
                                    margin: 0,
                                    transition: "all 0.3s ease",
                                  }}
                                >
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
              <AnimatedSection animationType="fadeInUp" delay={400} style={{ marginTop: "40px" }}>
                <Card
                  title={t('app.features.title')}
                  style={{
                    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(230, 245, 255, 0.6) 100%)",
                    border: "1px solid rgba(131, 181, 252, 0.5)",
                    borderRadius: "24px",
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
                    backdropFilter: "blur(10px)",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                  headStyle={{
                    background: "transparent",
                    borderBottom: "1px solid rgba(131, 181, 252, 0.2)",
                    color: "#000",
                    fontSize: "24px",
                    fontWeight: "700",
                  }}
                >
                  <Row gutter={[12, 12]}>
                    {appFeatures.map((feature, index) => (
                      <Col xs={24} sm={12} md={6} key={index}>
                        <Card
                          size="small"
                          className="feature-card"
                          style={{
                            height: "clamp(180px, 25vh, 200px)",
                            display: "flex",
                            flexDirection: "column",
                            background:
                              "linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(240, 248, 255, 0.6) 100%)",
                            border: "1px solid rgba(131, 181, 252, 0.4)",
                            borderRadius: "20px",
                            backdropFilter: "blur(10px)",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                          }}
                          bodyStyle={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            padding: "20px",
                            background: "transparent",
                          }}
                        >
                          <Space
                            direction="vertical"
                            align="center"
                            style={{ width: "100%", textAlign: "center", height: "100%", justifyContent: "center" }}
                          >
                            <div style={{ fontSize: "32px", marginBottom: "12px", transition: "all 0.3s ease" }}>
                              {feature.icon}
                            </div>
                            <Title
                              level={5}
                              style={{
                                margin: "0 0 8px 0",
                                color: "#000",
                                fontSize: "16px",
                                fontWeight: "600",
                                transition: "all 0.3s ease",
                              }}
                            >
                              {feature.title}
                            </Title>
                            <Text
                              style={{
                                fontSize: "12px",
                                color: "#666",
                                lineHeight: "1.5",
                                margin: 0,
                                transition: "all 0.3s ease",
                              }}
                            >
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
                <AnimatedSection animationType="fadeInUp" delay={800} style={{ marginTop: "40px" }}>
                  <Card
                    title={t('app.download.title')}
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(230, 245, 255, 0.6) 100%)",
                      border: "1px solid rgba(131, 181, 252, 0.5)",
                      borderRadius: "24px",
                      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
                      backdropFilter: "blur(10px)",
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                    headStyle={{
                      background: "transparent",
                      borderBottom: "1px solid rgba(131, 181, 252, 0.2)",
                      color: "#000",
                      fontSize: "clamp(20px, 3vw, 24px)",
                      fontWeight: "700",
                    }}
                  >
                    <Row gutter={[16, 16]}>
                      <Col xs={24} sm={24} md={12}>
                        <Space direction="vertical" size={16} style={{ width: "100%" }}>
                          <Title level={4} style={{ color: "#000", transition: "all 0.3s ease" }}>
                            {t('app.download.personal')}
                          </Title>
                          <Paragraph style={{ color: "#333", transition: "all 0.3s ease" }}>
                            {t('app.download.desc')}
                          </Paragraph>

                          <Form form={form} layout="vertical" onFinish={handleDownload} requiredMark={false}>
                            <Form.Item
                              name="name"
                              label="Họ và tên"
                              rules={[
                                { required: true, message: "Vui lòng nhập họ và tên!" },
                                { min: 2, message: "Họ và tên phải có ít nhất 2 ký tự!" },
                              ]}
                            >
                              <Input
                                prefix={<UserOutlined />}
                                placeholder="Nhập họ và tên của bạn"
                                size="large"
                                style={{ transition: "all 0.3s ease" }}
                              />
                            </Form.Item>

                            <Form.Item
                              name="email"
                              label="Email"
                              rules={[
                                { required: true, message: "Vui lòng nhập email!" },
                                { type: "email", message: "Email không hợp lệ!" },
                              ]}
                            >
                              <Input
                                prefix={<MailOutlined />}
                                placeholder="Nhập địa chỉ email của bạn"
                                size="large"
                                style={{ transition: "all 0.3s ease" }}
                              />
                            </Form.Item>

                            <Form.Item>
                              <Button
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                                size="large"
                                icon={<DownloadOutlined />}
                                style={{ width: "100%", transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)" }}
                              >
                                {t('app.download.button')}
                              </Button>
                            </Form.Item>
                          </Form>
                        </Space>
                      </Col>

                      <Col xs={24} sm={24} md={12}>
                        <Card
                          title={t('app.download.stats')}
                          size="small"
                          style={{
                            background:
                              "linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(240, 248, 255, 0.6) 100%)",
                            border: "1px solid rgba(131, 181, 252, 0.4)",
                            borderRadius: "20px",
                            backdropFilter: "blur(10px)",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                            transition: "all 0.3s ease",
                          }}
                          headStyle={{
                            background: "transparent",
                            borderBottom: "1px solid rgba(131, 181, 252, 0.2)",
                            color: "#000",
                            fontSize: "clamp(16px, 2.5vw, 18px)",
                            fontWeight: "600",
                          }}
                        >
                          <Space direction="vertical" size={16} style={{ width: "100%" }}>
                            <Row gutter={[8, 8]}>
                              <Col xs={12} sm={12} md={12}>
                                <div style={{ textAlign: "center", transition: "all 0.3s ease" }}>
                                  <Title
                                    level={2}
                                    className="stat-number"
                                    style={{ margin: 0, color: "#52c41a", transition: "all 0.3s ease" }}
                                  >
                                    {downloadStats.totalDownloads}
                                  </Title>
                                  <Text
                                    style={{
                                      color: "#666",
                                      fontSize: "clamp(14px, 2vw, 16px)",
                                      transition: "all 0.3s ease",
                                    }}
                                  >
                                    {t('app.download.downloads')}
                                  </Text>
                                </div>
                              </Col>
                              <Col xs={12} sm={12} md={12}>
                                <div style={{ textAlign: "center", transition: "all 0.3s ease" }}>
                                  <Title
                                    level={2}
                                    className="stat-number"
                                    style={{ margin: 0, color: "#1890ff", transition: "all 0.3s ease" }}
                                  >
                                    {feedbackStats.averageRating.toFixed(1)}
                                  </Title>
                                  <Text
                                    style={{
                                      color: "#666",
                                      fontSize: "clamp(14px, 2vw, 16px)",
                                      transition: "all 0.3s ease",
                                    }}
                                  >
                                    {t('app.download.rating')}
                                  </Text>
                                </div>
                              </Col>
                            </Row>

                            <Divider style={{ borderColor: "rgba(131, 181, 252, 0.2)", transition: "all 0.3s ease" }} />

                            <div style={{ transition: "all 0.3s ease" }}>
                              <Text strong style={{ color: "#000", transition: "all 0.3s ease" }}>
                                {t('app.download.version')}
                              </Text>
                              <Tag color="blue" style={{ marginLeft: 8, transition: "all 0.3s ease" }}>
                                v1.0.0
                              </Tag>
                            </div>

                            <div style={{ transition: "all 0.3s ease" }}>
                              <Text strong style={{ color: "#000", transition: "all 0.3s ease" }}>
                                {t('app.download.updated')}
                              </Text>
                              <Text style={{ marginLeft: 8, color: "#666", transition: "all 0.3s ease" }}>
                                31/10/2025
                              </Text>
                            </div>

                            <div style={{ transition: "all 0.3s ease" }}>
                              <Text strong style={{ color: "#000", transition: "all 0.3s ease" }}>
                                {t('app.download.size')}
                              </Text>
                              <Text style={{ marginLeft: 8, color: "#666", transition: "all 0.3s ease" }}>45.2 MB</Text>
                            </div>
                          </Space>
                        </Card>
                      </Col>
                    </Row>
                  </Card>
                </AnimatedSection>

                {/* User Guide Section */}
                <Card
                  title={t('app.guide.title')}
                  style={{
                    marginTop: "40px",
                    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(230, 245, 255, 0.6) 100%)",
                    border: "1px solid rgba(131, 181, 252, 0.5)",
                    borderRadius: "24px",
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
                    backdropFilter: "blur(10px)",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                  headStyle={{
                    background: "transparent",
                    borderBottom: "1px solid rgba(131, 181, 252, 0.2)",
                    color: "#000",
                    fontSize: "24px",
                    fontWeight: "700",
                  }}
                >
                  <Row gutter={[24, 24]}>
                    <Col xs={24} md={12}>
                      <Space direction="vertical" size={16} style={{ width: "100%" }}>
                        <Title level={4} style={{ transition: "all 0.3s ease" }}>
                          {t('app.guide.install')}
                        </Title>
                        <Steps
                          direction="vertical"
                          current={-1}
                          items={installationSteps.map((step) => ({
                            title: step.title,
                            description: step.description,
                          }))}
                        />
                      </Space>
                    </Col>
                    <Col xs={24} md={12}>
                      <Space direction="vertical" size={16} style={{ width: "100%" }}>
                        <Title level={4} style={{ transition: "all 0.3s ease" }}>
                          {t('app.guide.features')}
                        </Title>
                        <List
                          dataSource={[
                            t('app.guide.feature1'),
                            t('app.guide.feature2'),
                            t('app.guide.feature3'),
                            t('app.guide.feature4'),
                            t('app.guide.feature5'),
                            t('app.guide.feature6'),
                          ]}
                          renderItem={(item) => (
                            <List.Item style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', borderBottom: 'none', justifyContent: 'flex-start', textAlign: 'left' }}>
                              <CheckCircleOutlined
                                style={{ color: '#52c41a', marginRight: 8, minWidth: 16 }}
                              />
                              <span style={{ textAlign: 'left' }}>{item}</span>
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
  )
}

export default APKDownload
