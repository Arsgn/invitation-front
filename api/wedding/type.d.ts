namespace WEDDING {
  interface IWedding {
    id: string;
    coupleNames: string;
    date: string;

    ceremonyVenue: string;      
    ceremonyAddress: string;

    ceremonyLat: number;       
    ceremonyLng: number;       

    banquetVenue: string;      
    banquetAddress: string;    
    banquetLat: number;        
    banquetLng: number;        
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