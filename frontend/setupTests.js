
import '@testing-library/jest-dom';
// setupTests.js
global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
  