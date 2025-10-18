// Performance optimizations for HomePage
// This file contains optimizations to improve loading speed

export const PERFORMANCE_OPTIMIZATIONS = {
  // Lazy load components
  lazyLoadComponents: true,
  
  // Reduce bundle size
  codeSplitting: true,
  
  // Optimize images
  imageOptimization: {
    useBase64: true,
    lazyLoading: true,
    errorHandling: true
  },
  
  // Carousel optimizations
  carouselOptimization: {
    autoplaySpeed: 5000,
    lazyLoad: 'ondemand',
    pauseOnHover: true
  },
  
  // Memory management
  memoryManagement: {
    cleanupOnUnmount: true,
    debounceScrollEvents: true
  }
};

// Base64 encoded SVG images for better performance
export const OPTIMIZED_IMAGES = {
  mekongPathfinder: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDgwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjMTg5MGZmIi8+Cjx0ZXh0IHg9IjQwMCIgeT0iMjAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNDgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+TWVrb25nIFBhdGhmaW5kZXI8L3RleHQ+Cjwvc3ZnPg==',
  
  weatherForecast: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDgwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjNTJjNDFhIi8+Cjx0ZXh0IHg9IjQwMCIgeT0iMjAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNDgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+V2VhdGhlciBGb3JlY2FzdDwvdGV4dD4KPC9zdmc+',
  
  community: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDgwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjNzIyZWQxIi8+Cjx0ZXh0IHg9IjQwMCIgeT0iMjAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNDgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+Q29tbXVuaXR5PC90ZXh0Pgo8L3N2Zz4='
};

// Performance monitoring
export const PERFORMANCE_METRICS = {
  // Track loading times
  trackLoadingTime: true,
  
  // Monitor bundle size
  monitorBundleSize: true,
  
  // Track user interactions
  trackUserInteractions: true
};
