// This file contains placeholder data for seeding the database.

const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
  },
];

const zongtest = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'zongtest',
    email: 'zongtest@zongtest.com',
    password: '123456',
  },
];

const signals = [
  {
    id:'410544b2-4001-4271-9855-1111b6a6442a',
    name:'VehSpd',
    length:16,
    byteorder:'Intel',
    valuetype:'Unsigned',
    initialvalue:0,
    factor:0.001,
    sigoffset:0,
    minivalue:0,
    maxvalue:300,
    unit:'mps',
  },
];

export { users, signals, zongtest };
