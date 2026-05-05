// jest-dom adds custom jest matchers 
import '@testing-library/jest-dom/extend-expect';

// Mock matchmedia-  ferramenta de teste que simula a API window.matchMedia do navegador em ambientes Node.js 
window.matchMedia = window.matchMedia || function() {
  return {
      matches: false,
      addListener: function() {},
      removeListener: function() {}
  };
};
