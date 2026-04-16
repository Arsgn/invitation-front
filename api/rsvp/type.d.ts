// types/rsvp.ts
namespace RSVP {
  interface CreateReq {
    name: string;
    phone?: string;
    status: "ATTENDING" | "DECLINED" | "PENDING";
    plusOne?: boolean;
  }

  interface Guest {
    id: string;
    name: string;
    phone?: string;
    status: "ATTENDING" | "DECLINED" | "PENDING";
    plusOne: boolean;
  }

  interface CreateRes {
    id: string;
    name: string;
    phone?: string;
    status: "ATTENDING" | "DECLINED" | "PENDING";
    plusOne: boolean;
  }
}
