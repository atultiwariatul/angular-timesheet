import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Project} from "../model/Project";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private baseUrl = 'http://localhost:8080/projects';

  constructor(private http: HttpClient) { }

  getProjects(): Observable<Project> {
    return this.http.get<Project>(`${this.baseUrl}`);
  }

  createProject(project: Project): Observable<Project> {
    return this.http.post<Project>(`${this.baseUrl}`, project);
  }
  getProjectById(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.baseUrl}/${id}`);
  }
  updateProject(id: number, project: Project): Observable<Project> {
    return this.http.put<Project>(`${this.baseUrl}/${id}`, project);
  }
  deleteProject(id: number): Observable<Project> {
    return this.http.delete<Project>(`${this.baseUrl}/${id}`);
  }
}
