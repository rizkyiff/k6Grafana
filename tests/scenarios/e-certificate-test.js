import http from 'k6/http';
import { check } from 'k6';
import {
  BASE_URL,
  defaultOptions,
  defaultHeaders,
  setupMetrics,
  commonChecks,
  randomSleep,
} from '../config.js';

// Export test configuration
export const options = defaultOptions;

// Initialize metrics
const metrics = setupMetrics();

export default function () {
  // Make HTTP GET request to e-certificate endpoint
  const orderId = '02717967';
  const response = http.get(
    `${BASE_URL}/auto2000commercewebservices/v2/auto2000/orders/e-certificate/${orderId}/1`,
    { headers: defaultHeaders }
  );
  
  // Add checks
  const checkResult = check(response, {
    'status is 200': commonChecks.is200,
    'response has data': commonChecks.hasData,
    'response time is acceptable': commonChecks.responseTime,
  });

  // Update error rate metric
  metrics.errors.add(!checkResult);

} 