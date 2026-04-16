namespace DASHBOARD {
  interface Stats {
    total: number;
    attending: number;
    declined: number;
    pending: number;
  }

  interface GetRes {
    guests: any[];
    stats: Stats;
  }
}
