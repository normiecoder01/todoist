import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBucket, IBucketCreate } from '../interfaces/IBucket'; // Adjust path based on your folder structure
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class BucketService {
  private apiUrl = `${environment.apiUrl}/Bucket`; // Adjust API URL

  constructor(private http: HttpClient) {}

  // Get buckets by user ID
  getBucketsByUser(userId: number): Observable<IBucket[]> {
    return this.http.get<IBucket[]>(`${this.apiUrl}/getByUser/${userId}`);
  }

  // Get a single bucket by bucket ID
  getBucketById(bucketId: number): Observable<IBucket> {
    return this.http.get<IBucket>(`${this.apiUrl}/get/${bucketId}`);
  }

  // Add a new bucket
  addBucket(bucket: IBucketCreate): Observable<IBucket> {
    return this.http.post<IBucket>(`${this.apiUrl}/create`, bucket);
  }

  // Update an existing bucket
  updateBucket(bucketId: number, updatedBucket: { bucketName: string, createdBy: number }): Observable<IBucket> {
    return this.http.put<IBucket>(`${this.apiUrl}/update/${bucketId}`, updatedBucket);
  }

  // Delete a bucket by ID
  deleteBucket(bucketId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${bucketId}`, { responseType: 'text' });
  }
}
