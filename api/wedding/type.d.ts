namespace WEDDING {
  interface IWedding {
    id: string;
    coupleNames: string;
    date: string;

    ceremonyVenue: string;     // 👈 ДОБАВЬ
    ceremonyAddress: string;

    ceremonyLat: number;       // 👈 ДОБАВЬ
    ceremonyLng: number;       // 👈 ДОБАВЬ

    banquetVenue: string;      // 👈 ДОБАВЬ
    banquetAddress: string;    // 👈 ДОБАВЬ
    banquetLat: number;        // 👈 ДОБАВЬ
    banquetLng: number;        // 👈 ДОБАВЬ
  }

  interface GetWeddingsRes {
    success: boolean;
    data: IWedding[];
  }

  interface GetWeddingRes {
    success: boolean;
    data: IWedding;
  }
}