const fp = require('./fp');
const log = console.log;

fp.takeWhile(
    a => a <= 3,
    [
        Promise.resolve(1),
        Promise.resolve(2),
        Promise.resolve(3),
        Promise.resolve(4),
        Promise.resolve(5),
    ]
);
// ).then(log);

/***
 * 아임포트 결제 누락 싱크
 *** 
 * - https://github.com/iamport/iamport-manual/blob/master/%EC%9D%B8%EC%A6%9D%EA%B2%B0%EC%A0%9C/README.md#23-notification-url%EA%B0%80%EC%83%81%EA%B3%84%EC%A2%8C-%EC%9E%85%EA%B8%88%ED%86%B5%EB%B3%B4-%ED%8F%AC%ED%95%A8
 * - https://api.iamport.kr/
 * - API 한계로 인해 한번에 최대 100개 까지만 불러옴
 */

const Impt = {
    payments: {
      0: [{ iid: 11, oid: 1 }, { iid: 12, oid: 2 }, { iid: 13, oid: 3 }],
      1: [{ iid: 14, oid: 4 }, { iid: 15, oid: 5 }, { iid: 16, oid: 6 }],
      2: [{ iid: 17, oid: 7 }, { iid: 18, oid: 8 }],
      3: [],
      4: [],
      //...
    },
    getPayments: page => {
      console.log(`http://..?page=${page}`);
      // !! : 아래 delay값이 가변하더라도 실패는 허용하지 않는다!
      return fp.delay(100, Impt.payments[page]);
    },
    cancelPayment: paymentId => Promise.resolve(`${paymentId}: 취소완료`)
};

// 3개만 결제됨
const getOrders = ids => fp.delay(100, [{ id: 1 }, { id: 3 }, { id: 7 }]);

async function job() {
    const payments = await fp.go(
        fp.L.range(Infinity),
        fp.L.map(Impt.getPayments),
        fp.takeWhile(ps => ps.length),
        fp.L.flat,
        fp.take(Infinity)
    );

    const orderIds = await fp.go(
        payments,
        fp.L.map(p => p.oid),
        fp.take(Infinity),
        getOrders,
        fp.L.map(o => o.id),
        fp.take(Infinity),
    );

    // 이미 Promise 스펙에 promise를
    // 값으로 다룬 흔적을 볼 수 있음 : Promise.all
    return Promise.all(fp.go(
        payments,
        fp.L.filter(p => !orderIds.includes(p.oid)),
        fp.L.map(p => p.iid),
        fp.L.map(Impt.cancelPayment),
        fp.take(Infinity),
    ));
}

/***
 * 테스트 상황 발생
 ***
 * 여러 제약이 있는 코드(주문건수가 엄청 많아지면? 네트워크 장애시?...)

async function recur() {
    await fp.delay(1000 * 3);
    return job().then(log).then(recur);
}
 */

/***
 * 아래의 코드는 테스트가 필요 없다!
 ***
 * - 그저 평가와 다름 없음 
 * - Math.max(2, 59)
 * - 쉽고 단순한 함수
 */
 async function recur() {
     return Promise.all([
        fp.delay(1000 * 3),
        job().then(log),
     ]).then(recur);
 }

 recur();
