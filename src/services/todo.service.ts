import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'http://localhost:3000/todos';

  constructor(private http: HttpClient) { }

  // Get all todos
  getTodos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Add a new todo
  addTodo(items : any): Observable<any> {
    return this.http.post<any>(this.apiUrl, items);
  }

  // Update a todo
  updateTodo(id: number, todo: { content: string, completed: boolean }): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, todo);
  }

  // Delete a todo
  deleteTodo(content: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${content}`);
  }
}
