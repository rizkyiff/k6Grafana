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
export const options = {
  ...defaultOptions,
  thresholds: {
    http_req_failed: ['rate<0.1'], // Allow up to 10% failed requests
  },
};

// Initialize metrics
const metrics = setupMetrics();

export default function () {
  // Make HTTP GET request to Tokopedia homepage with more realistic browser headers
  const response = http.get(
    'https://www.tokopedia.com/',
    { 
      headers: {
        ...defaultHeaders,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-User': '?1',
        'Cache-Control': 'max-age=0',
      }
    }
  );
  
  // Add checks with better error handling
  const checkResult = check(response, {
    'status is 200': (r) => r.status === 200,
    'response has data': (r) => r.body && r.body.length > 0,
    'response time is acceptable': commonChecks.responseTime,
    'homepage loads successfully': (r) => r.body && r.body.includes('Tokopedia'),
  });

  // Update error rate metric
  metrics.errors.add(!checkResult);

  // Add random sleep between requests to simulate real user behavior
  randomSleep();
} 