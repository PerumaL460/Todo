import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { TodoService } from '../../services/todo.service';


@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss'
})
export class TodosComponent {

  inputTodo : string = '';
  todoList: { content: string; completed: boolean; id : number }[] = [];
  constructor( private http : HttpClient , private todoService: TodoService){
    this.getTodoList();
  }
  getTodoList(){
    this.http.get("http://localhost:3000/todos").subscribe((res:any)=>{
      this.todoList = res;      
    })
  }
  addTodo(): void {
    let newTodo : any;
    newTodo = Date.now().toString(); // Or use any other logic to generate unique ids
    let newArr: { content: string; completed: boolean; id : number } 
    if(this.inputTodo != ""){
     newArr ={
      content : this.inputTodo,
      completed : false,
      id : newTodo
     } 
      this.todoService.addTodo(newArr).subscribe((res:any)=>{
        this.todoList = res;
        this.getTodoList();
        this.inputTodo =""
      });
      }
  }
  toogleDone(id : number){
    this.todoList.map((v,i)=>{
      console.log(i,id);
      if(i==id){
        v.completed = !v.completed;
      }
    })
  }
  loadTodos(): void {
    this.todoService.getTodos().subscribe((res:any)=>{
      console.log(res);
    })
  }

  onDelete(id:any) {
    console.log(id);
    this.todoService.deleteTodo(id).subscribe(
      (res: any) => {
        console.log(res, "deleted");
        this.todoList = this.todoList.filter((todo: any) => todo.id !== id);
        this.getTodoList();
      },
   
    );
  }
  

  }


