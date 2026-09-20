import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type RequestStatus = 'PENDING_REVIEW' | 'QUOTED' | 'ACCEPTED' | 'REJECTED' | 'ORDERED';

export interface CustomRequest {
  id: string;
  title: string;
  description: string;
  referenceImageUrl?: string;
  measurements: {
    height: string;
    weight: string;
    chest: string;
    waist: string;
  };
  status: RequestStatus;
  quotedPrice?: number;
  adminNotes?: string;
  createdAt: number;
}

interface CustomRequestState {
  requests: CustomRequest[];
  submitRequest: (request: Omit<CustomRequest, 'id' | 'status' | 'createdAt'>) => string;
  updateRequestStatus: (id: string, status: RequestStatus, quotedPrice?: number, adminNotes?: string) => void;
  getRequestsByCustomer: () => CustomRequest[]; // Simplified for mock (returns all)
}

export const useCustomRequestStore = create<CustomRequestState>()(
  persist(
    (set, get) => ({
      requests: [],
      submitRequest: (req) => {
        const id = `req-${Date.now()}`;
        set((state) => ({
          requests: [
            {
              ...req,
              id,
              status: 'PENDING_REVIEW',
              createdAt: Date.now()
            },
            ...state.requests
          ]
        }));
        return id;
      },
      updateRequestStatus: (id, status, quotedPrice, adminNotes) => {
        set((state) => ({
          requests: state.requests.map(req => {
            if (req.id === id) {
              return {
                ...req,
                status,
                ...(quotedPrice !== undefined && { quotedPrice }),
                ...(adminNotes !== undefined && { adminNotes })
              };
            }
            return req;
          })
        }));
      },
      getRequestsByCustomer: () => get().requests
    }),
    {
      name: 'endew-custom-requests',
    }
  )
);
