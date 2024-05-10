export const abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_productId',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'string',
        name: '_productDetailId',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'string',
        name: '_resourcePayload',
        type: 'string',
      },
    ],
    name: 'ResourceAdded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'TransferOwnership',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_productId',
        type: 'address',
      },
      {
        internalType: 'string',
        name: '_productDetailId',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_detailPayload',
        type: 'string',
      },
    ],
    name: 'addProductDetails',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_productId',
        type: 'address',
      },
    ],
    name: 'getAllProduct',
    outputs: [
      {
        internalType: 'string[]',
        name: '',
        type: 'string[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getOwner',
    outputs: [
      {
        internalType: 'address',
        name: '_owner',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_productId',
        type: 'address',
      },
      {
        internalType: 'string',
        name: '_productDetailId',
        type: 'string',
      },
    ],
    name: 'getProduct',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
