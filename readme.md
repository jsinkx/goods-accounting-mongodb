# Goods accounting MongoDB
---

## Installation

1. [`Node.js`](https://nodejs.org/) `LTS`
2. [`npm`](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) or [`yarn`](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable)
3. [`git`](https://git-scm.com/)
4. Install all dependencies (see below)
5. Set MongoDB address in `.env`

```sh
cd goods-accounting-mongodb
npm i
# or
yarn install
```

## Documentation

#### async function `changeProductCount`
| Name          | Type          | Optional | Description |
|---------------|---------------|----------|-------------|
| `providerId`  | `string`      | No       | The id of product provider |
| `productId`   | `string`      | No       | The id of product |
| `count`       | `number`      | No       | The count `(integer)` of product changes in stock |

#### async function `changePurchaserBalance`
| Name          | Type          | Optional | Description |
|---------------|---------------|----------|-------------|
| `id`          | `string`      | No       |The id of purchaser |
| `value`       | `number`      | No       |The value `(float toFixed 2)` of purchaser balance changing |

#### async function `makeSupply`
| Name          | Type          | Optional | Description |
|---------------|---------------|----------|-------------|
| `providerId`  | `string`      | No       |The id of product provider |
| `productId`   | `string`      | No       |The id of product |
| `count`       | `number`      | No       |The count `(integer)` of product supplying to stock |

#### async function `makePurchase`
| Name          | Type          | Optional | Description |
|---------------|---------------|----------|-------------|
| `purchaserId` | `string`      | No       |The id of purchaser |
| `providerId`  | `string`      | No       |The id of product provider |
| `productId`   | `string`      | No       |The id of product |
| `count`       | `number`      | No       |The count `(integer)` of the purchase of the products by the purchaser |

#### async analytic function `productLifecycle`
| Name          | Type          | Optional | Description |
|---------------|---------------|----------|-------------|
| `periodStart` | `string`      | Yes      |The string in `date` format from what period |
| `periodEnd`   | `string`      | Yes      |The string in `date` format up to what period |