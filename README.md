
# Wallet System

Implementation of Wallet System in NodeJs

## API Reference

#### Get wallet details

```http
  GET /api/wallet/${id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. id of wallet |

Takes the *id* of wallet as *params* and returns wallet details. Response,

- Example

```json
  {
    "_id": "61c0689f52b8febdead6f99d",
    "name": "Jhon",
    "balance": 7872.8976,
    "createdAt": "2021-12-20T11:27:27.929+00:00",
    "updatedAt": "2021-12-20T11:31:58.660+00:00",
  }
```
#### Initialise wallet

```http
  POST /api/setup
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. name of User |
| `balance` | `number` | Initial balance in wallet |

Given *name* and *balance* of wallet as *body*, returns the following response

- Example

```json
  {
    "id": "61c0689f52b8febdead6f99d",
    "balance": 98.8976,
    "transactionId": "61c0689f52b8febdead6f99f",
    "name": "Jack",
    "date": "2021-12-20T11:31:58.660+00:00",
  }
```
- Default value for *balance* is `0`
#### Credit/Debit amount

```http
  POST /api/transact/${walletId}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. id of wallet |
| `amount` | `number` | **Required**. Amount for transaction |
| `description` | `string` | **Required**. Description of transaction |

Takes *id* as param and *amount* and *description* as body, returns the following response

- Example

```json
  {
    "balance": 946.6356,
    "transactionId": "61c068ff52b8febdead6f9a7",
  }
```
- Amount is **negative for debit** and a **positive number for credit**
- Here *balance* is the balance after transaction

#### Fetch transactions

```http
  GET /api//transactions?walletId={walletId}&skip={skip}&limit={limit}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `walletId` | `string` | **Required**. id of wallet |
| `skip` | `number` | No.of Transactions to skip |
| `limit` | `number` | No.of Transactions in response |

Takes the *id* of wallet as *params* and returns wallet details. Response,

- Example

```json
[
  {
    "_id": "61c0689f52b8febdead6f99d",
    "walletId": "Jhon",
    "balance": 7872.8976,
    "amount": 869.76,
    "type": "CREDIT",
    "createdAt": "2021-12-20T11:27:27.929+00:00",
    "updatedAt": "2021-12-20T11:31:58.660+00:00",
  },
  ....
]
```
