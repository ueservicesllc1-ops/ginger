export type Shipment = {
  id: string;
  fromAddress: string;
  toAddress: string;
  status: 'pending' | 'in_transit' | 'delivered' | 'cancelled';
  createdAt?: string;
  updatedAt?: string;
};

export type CreateShipmentRequest = {
  fromAddress: string;
  toAddress: string;
};


