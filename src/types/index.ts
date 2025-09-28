import { ReactNode } from "react";

// Order type 
export interface Order {
  _id: string;
  customerName: string;
  address: string;
  partner: string | null;
  statusHistory: { status: string; updatedAt: string }[];
  createdAt: string;
  PartnerData: Partner[];
}


// Partner type
export interface Partner {
  _id: string;
  partnerName: string;
  emailId: string;
  contactNo?: string | null;
  role: string;
  vehicleType: string;
}


// Coordinates type for map address Lookup
interface Coords {
  center: [number, number];
  atribution: string;
}


// Map props for Minimap component in order ID page
export interface MiniMapProps {
  address: string;
}

// Breadcrumb props for NextBreadCrumb component
export interface TBreadCrumbProps {
    homeElement: ReactNode,
    separator: ReactNode,
    containerClasses?: string,
    listClasses?: string,
    activeClasses?: string,
    capitalizeLinks?: boolean
}
