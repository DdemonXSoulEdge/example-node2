import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 20 },  // Ramp up
    { duration: '1m', target: 20 },   // Stay at 20 users
    { duration: '30s', target: 0 },   // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% < 500ms
    http_req_failed: ['rate<0.01'],   // <1% errors
  },
};

const BASE_URL = 'http://localhost:3000';

export default function () {
  let usersRes = http.get(`${BASE_URL}/users`);
  check(usersRes, {
    'Users status 200': (r) => r.status === 200,
  });

  sleep(1);

  let itemsRes = http.get(`${BASE_URL}/items`);
  check(itemsRes, {
    'Items status 200': (r) => r.status === 200,
  });

  sleep(1);
}