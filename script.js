import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {

  stages: [
    { duration: '1m', target: 1 }, // below normal load
    { duration: '3m', target: 1 },
    { duration: '1m', target: 10 }, // normal load
    { duration: '3m', target: 10 },
    { duration: '1m', target: 100 }, // around breaking point of 200 users / second
    { duration: '3m', target: 100 },
    // { duration: '1m', target: 1000 }, // beyond the breaking point
    // { duration: '3m', target: 1000 },
    { duration: '1m', target: 0 }   // scale down. Recovery stage.
  ],

}
export default function () {
  let randomItemNum = Math.ceil(Math.random() * 10000000);
  let res = http.get(`http://127.0.0.1:3010/${randomItemNum}`);
  check(res,
    {
      'status was 201': r => r.status == 201,
      // 'transaction time OK': r => r.timings.duration < 500
    });
  sleep(1);
}
