import { sleep } from 'k6';
import { Rate } from 'k6/metrics';

export const BASE_URL = __ENV.BASE_URL || 'https://sit.auto2000.co.id';
export const AUTH_TOKEN = __ENV.AUTH_TOKEN || 'Bearer z1ubbTntPeYnwsroBitRRsYwFPQ';

// Global test configuration
export const defaultOptions = {
  // Test configuration using scenarios
  scenarios: {
    contacts: {
      executor: 'per-vu-iterations',
      vus: 50,        // 50 threads like JMeter
      iterations: 1,   // 1 loop like JMeter
      startTime: '0s',
      gracefulStop: '0s'
    },
  },

  // Performance thresholds
  thresholds: {
    http_req_duration: ['p(95)<5000'],  // 95% of requests should be below 5000ms
    errors: ['rate<20'],               // Error rate should be less than 10%
    http_req_failed: ['rate<0.1'],      // HTTP errors should be less than 10%
  },

  // Grafana/InfluxDB configuration
  ext: {
    loadimpact: {
      name: 'testing saja'
    },
  },
};

// Common headers
export const defaultHeaders = {
  'Content-Type': 'application/json',
  'Authorization': AUTH_TOKEN,
  'User-Agent': 'k6-load-test',
};

// Common metrics setup
export const setupMetrics = () => {
  const metrics = {
    errors: new Rate('errors'),
    custom_data: new Rate('custom_data'),
  };
  return metrics;
};

// Common check functions
export const commonChecks = {
  is200: (response) => response && response.status === 200,
  hasData: (response) => response && response.body && response.body.length > 0,
  responseTime: (response) => response && response.timings.duration < 5000,
};

// Sleep time configuration
export const defaultSleep = {
  min: 1,
  max: 3,
  rampUp: 60  // 60 seconds ramp-up time
};

// Helper function for random sleep
export const randomSleep = () => {
  sleep(Math.random() * (defaultSleep.max - defaultSleep.min) + defaultSleep.min);
};

// Helper function to calculate initial delay for each VU to simulate ramp-up
export const calculateInitialDelay = () => {
  // __VU is 1-based, so subtract 1 to start from 0
  const vuIndex = __VU - 1;
  const delayPerVU = defaultSleep.rampUp / 50; // 60 seconds / 50 VUs = delay between each VU
  const initialDelay = vuIndex * delayPerVU;
  sleep(initialDelay);
}; 