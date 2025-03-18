# K6 Performance Testing Project

This project contains performance tests using K6 with Grafana integration for visualization.

## Project Structure

```
├── tests/                  # Main test scripts
│   ├── scenarios/         # Test scenarios for different features
│   ├── libs/             # Shared libraries and utilities
│   └── data/             # Test data files
├── config/                # Configuration files
│   ├── environments/     # Environment-specific configs
│   └── thresholds/      # Performance thresholds
├── results/              # Test results and reports
└── scripts/              # Helper scripts for running tests
```

## Setup

1. Install K6: https://k6.io/docs/getting-started/installation
2. Set up Grafana: https://grafana.com/docs/grafana/latest/setup-grafana/installation/

## Running Tests

To run a test:
```bash
k6 run tests/scenarios/your-test.js
```

To run with Grafana output:
```bash
k6 run --out influxdb=http://localhost:8086/k6 tests/scenarios/your-test.js
```

## Best Practices

1. Each test script should focus on a specific scenario
2. Use shared libs for common functionality
3. Keep configuration separate from test logic
4. Define clear thresholds for pass/fail criteria
5. Use tags for better metrics organization in Grafana 