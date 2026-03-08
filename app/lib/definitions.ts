// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};


export type SignalsTable = {
  id:string,
  name:string,
  description:string,
  length:number,
  byteorder:string,
  valuetype:string,
  startbyte:number,
  startbit:number,
  initialvalue:number,
  factor:number,
  sigoffset:number,
  minivalue:number,
  maxvalue:number,
  rawminivalue:number,
  rawmaxvalue:number,
  unit:string,
  valuedescription:string,
};




export type Message = {
  id: string;
  name: string;
  message_id: string;  // CAN message ID (hex format like 0x123)
  dlc: number;        // Data Length Code (CAN: 1-8, CAN FD: 12/16/20/24/32/48/64)
  cycle_time?: number; // Message transmission cycle in ms
  description?: string;
  signals: Signal[];  // Associated signals
  created_at: string;
};

export type MessageSignal = {
  id?: string;
  message_id: string;
  signal_id: string;
  start_bit: number;
  position: number;  // Order in the message
  created_at?: string;
};

// For creating new messages
export type CreateMessage = {
  name: string;
  message_id: string;
  dlc: number;
  cycle_time?: number;
  description?: string;
};

// For the message creation form state
export type MessageState = {
  errors?: {
    name?: string[];
    message_id?: string[];
    dlc?: string[];
    cycle_time?: string[];
    description?: string[];
  };
  message?: string | null;
};

// Signal fields definition for single source of truth
export const signalFields = [
  { name: 'name', type: 'string', label: 'Signal Name', group: 'Basic Info' },
  { name: 'description', type: 'string', label: 'Description', group: 'Basic Info' },
  { name: 'length', type: 'number', label: 'Length', group: 'Bit Configuration' },
  { name: 'byteorder', type: 'string', label: 'Byte Order', group: 'Bit Configuration' },
  { name: 'valuetype', type: 'string', label: 'Value Type', group: 'Bit Configuration' },
  { name: 'startbyte', type: 'number', label: 'Start Byte', group: 'Bit Configuration' },
  { name: 'startbit', type: 'number', label: 'Start Bit', group: 'Bit Configuration' },
  { name: 'initialvalue', type: 'number', label: 'Initial Value', group: 'Value Conversion' },
  { name: 'factor', type: 'number', label: 'Factor', group: 'Value Conversion' },
  { name: 'sigoffset', type: 'number', label: 'Offset', group: 'Value Conversion' },
  { name: 'minivalue', type: 'number', label: 'Min Value', group: 'Physical Range' },
  { name: 'maxvalue', type: 'number', label: 'Max Value', group: 'Physical Range' },
  { name: 'rawminivalue', type: 'number', label: 'Raw Min Value', group: 'Raw Range' },
  { name: 'rawmaxvalue', type: 'number', label: 'Raw Max Value', group: 'Raw Range' },
  { name: 'unit', type: 'string', label: 'Unit', group: 'Display' },
  { name: 'valuedescription', type: 'string', label: 'Value Description', group: 'Display' },
] as const;


type SignalField = typeof signalFields[number];
type SignalFieldName = SignalField['name'];

export type Signal = {
  [K in SignalFieldName]: Extract<SignalField, { name: K }>['type'] extends 'number'
    ? number
    : string
};

export type SignalWithId = Signal & { id: string };

export type ECU = {
  id: string;
  name: string;
  description?: string;
  created_at?: string;
  message_count?: number;
};

export type ECUState = {
  errors?: {
    name?: string[];
    description?: string[];
  };
  message?: string | null;
};