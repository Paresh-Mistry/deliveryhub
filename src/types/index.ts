
export type Order = {
  _id: string;
  customerName: string;
  address: string;
  partner?: string | null;
  statusHistory: string[];
  createdAt: string;
  PartnerData: Partner[]
};


export type Partner = {
  _id: string;
  partnerName: string;
  emailId: string;
  contactNo?: string | null;
  role: string;
  vehicleType: string;
};