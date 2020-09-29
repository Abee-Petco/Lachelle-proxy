import http from 'k6/http';
import { sleep, check } from 'k6';
//following notes per research
export let options = {

  stages: [
    { duration: '1m', target: 1 }, // below normal load
    { duration: '3m', target: 1 },
    { duration: '1m', target: 10 }, // normal load
    { duration: '3m', target: 10 },
    { duration: '1m', target: 100 }, // around breaking point of 200 users / second
    { duration: '3m', target: 100 },
    { duration: '1m', target: 1000 }, // beyond the breaking point
    { duration: '3m', target: 1000 },
    { duration: '1m', target: 100 }, // scale down. Recovery stage.
    { duration: '3m', target: 100 },
    { duration: '1m', target: 10 },
    { duration: '3m', target: 10 },
    { duration: '1m', target: 1 },
    { duration: '3m', target: 1 },
  ],

}
export default function () {
  let randomItemNum = Math.ceil(Math.random() * 3000000);
  let res = http.get(`http://127.0.0.1:3010/product?itemID=${randomItemNum}`);
  check(res,
    {
      'status was 201': r => r.status == 201,
    });
  sleep(1);
}

