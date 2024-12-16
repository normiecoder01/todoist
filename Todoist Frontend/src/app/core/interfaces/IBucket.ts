export interface IBucket {
    bucketId: number; // Include the bucketId since every bucket will have an ID
    bucketName: string; // The name of the bucket
  }
  
  export interface IBucketCreate {
    bucketName: string; // The name of the bucket
    createdBy: number;  // The ID of the user who created the bucket
  }