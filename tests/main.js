import { group } from 'k6';
import { defaultOptions } from './config.js';

// Import all test scenarios
import { default as eCertificateTest } from './scenarios/e-certificate-test.js';
import { default as tokopediaTest } from './scenarios/tokopedia-test.js';

// Export the options
export const options = defaultOptions;

export default function () {
  group('Tokopedia Tests', () => {
    tokopediaTest();
  });

  group('E-Certificate Tests', () => {
    eCertificateTest();
  });

} 