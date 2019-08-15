const _ = require('fxjs/Strict');
const L = require('fxjs/Lazy');
const C = require('fxjs/Concurrency');
const log = console.log;

const Impt = {
    payments: {
        1: [
            { imp_id: 11, order_id: 1, amount: 15000 },
            { imp_id: 12, order_id: 2, amount: 25000 },
            { imp_id: 13, order_id: 3, amount: 10000 },
        ],
        2: [
            { imp_id: 14, order_id: 4, amount: 25000 },
            { imp_id: 14, order_id: 5, amount: 45000 },
            { imp_id: 16, order_id: 6, amount: 15000 },
        ],
        3: [
            { imp_id: 17, order_id: 7, amount: 20000 },
            { imp_id: 18, order_id: 8, amount: 30000 },
            // { imp_id: 18, order_id: 8, amount: 30000 },
        ],
        4: [],
        5: [],
    },
    getPayments: page => {
        console.log(`http://..?page=${page}`);
        // return _.delay(3000, Impt.payments[page]);
        return _.delay(1000, Impt.payments[page]);
    },
    cancelPayment: imp_id => Promise.resolve(`취소 완료: ${imp_id}`)
}

const DB = {
    getOrders: ids => _.delay(100, [
        { id: 1 },
        { id: 3 },
        { id: 7 },
    ])
};

async function job() {
    // 결제된 결제모듈 측 payments 조회
    // page 단위 데이터를 모두 조회하여 병합
    const payments = await _.go(
        L.range(1, Infinity),
        L.map(Impt.getPayments),
        // L.takeWhile(({ length }) => length),
        L.takeUntil(({ length }) => length < 3), // -> 요청 최소화
        L.filter(({ length }) => length),
        _.flat,
    );

    // 결제가 실제 완료된 가맹점 측 주문서 id 조회
    const order_ids = await _.go(
        payments,
        _.map(p => p.order_id),
        DB.getOrders,
        _.map(p => p.id),
    );

    // 결제모듈의 payments와 가맹점의 주문서 비교
    // 결제 취소할 id를 필터
    // 결제 취소 api 실행
    await _.go(
        payments,
        L.reject(p => order_ids.includes(p.order_id)),
        L.map(p => p.imp_id),
        L.map(Impt.cancelPayment),
        _.each(log)
    );
}

// 7초에 한번 수행
// 하지만 job의 시간이 5초 보다 더 걸린다면?
// job이 끝날 때 까지
(function recur() {
    Promise.all([
        _.delay(7000, undefined),
        job()
    ]).then(recur);
})(); 
// -> if문, date 비교가 필요없다. test도 필요 없다!