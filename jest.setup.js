import '@testing-library/jest-dom';

Object.defineProperty(window.HTMLElement.prototype, 'scrollIntoView', {
  writable: true,
  value: jest.fn(),
});

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ message: 'Test response' }),
  })
);
