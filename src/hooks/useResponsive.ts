import { useState, useEffect, useCallback } from 'react';

interface ResponsiveBreakpoints {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  screenWidth: number;
}

export const useResponsive = (): ResponsiveBreakpoints => {
  const [responsiveState, setResponsiveState] = useState<ResponsiveBreakpoints>({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    screenWidth: 0
  });

  const updateScreenSize = useCallback(() => {
    const width = window.innerWidth;
    const newState = {
      isMobile: width < 768,
      isTablet: width >= 768 && width < 1024,
      isDesktop: width >= 1024,
      screenWidth: width
    };
    
    setResponsiveState(prevState => {
      // Only update if values actually changed
      if (
        prevState.isMobile !== newState.isMobile ||
        prevState.isTablet !== newState.isTablet ||
        prevState.isDesktop !== newState.isDesktop ||
        prevState.screenWidth !== newState.screenWidth
      ) {
        return newState;
      }
      return prevState;
    });
  }, []);

  useEffect(() => {
    // Set initial value
    updateScreenSize();

    // Add event listener with throttling
    let timeoutId: NodeJS.Timeout;
    const throttledUpdate = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateScreenSize, 100);
    };

    window.addEventListener('resize', throttledUpdate);

    // Cleanup
    return () => {
      window.removeEventListener('resize', throttledUpdate);
      clearTimeout(timeoutId);
    };
  }, [updateScreenSize]);

  return responsiveState;
};
