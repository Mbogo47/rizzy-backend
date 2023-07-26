// orders.js
export const orders = [
    {
        orderId: 1,
        userId: 3002,
        created_at: "2023-07-20T12:34:56Z",
        totalAmount: 99.99,
        items: [
            { productId: 1, quantity: 2, unitPrice: 19.99 },
            { productId: 10, quantity: 1, unitPrice: 34.99 },
        ],
    },
    {
        orderId: 2,
        userId: 3002,
        created_at: "2023-07-19T10:23:45Z",
        totalAmount: 59.99,
        items: [
            { productId: 11, quantity: 1, unitPrice: 14.99 },
        ],
    },
    {
        orderId: 3,
        userId: 3002,
        created_at: "2023-07-18T09:15:30Z",
        totalAmount: 74.95,
        items: [
            { productId: 12, quantity: 3, unitPrice: 19.99 },
            { productId: 16, quantity: 1, unitPrice: 14.99 },
        ],
    },
    {
        orderId: 4,
        userId: 3002,
        created_at: "2023-07-17T08:12:59Z",
        totalAmount: 109.98,
        items: [
            { productId: 3, quantity: 2, unitPrice: 49.99 },
            { productId: 17, quantity: 1, unitPrice: 29.99 },
        ],
    },
    {
        orderId: 5,
        userId: 3002,
        created_at: "2023-07-16T07:03:20Z",
        totalAmount: 44.97,
        items: [
            { productId: 21, quantity: 1, unitPrice: 24.99 },
            { productId: 25, quantity: 1, unitPrice: 19.99 },
        ],
    },
];


