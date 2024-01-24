import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API_URL} from "../../global-constants";
import {Photo} from "../models/models";

@Injectable({
  providedIn: 'root'
})
export class UnsplashService {

  constructor(private http: HttpClient) {
  }

  public getImagesByPageNumber(page: number) {
    return this.http.get<Array<Photo>>(API_URL + `?page=${page}`);
  }

}
