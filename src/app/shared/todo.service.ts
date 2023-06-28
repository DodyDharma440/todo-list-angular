import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { ITodoInput } from '../model/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  firestoreCollection: AngularFirestoreCollection;

  constructor(private firestore: AngularFirestore) {
    this.firestoreCollection = firestore.collection('todos');
  }

  addTodo(title: string) {
    const data: ITodoInput = {
      title,
      isDone: false,
    };

    this.firestoreCollection.add(data);
  }

  updateTodoStatus(id: string, status: boolean) {
    this.firestoreCollection.doc(id).update({ isDone: status });
  }

  deleteTodo(id: string) {
    this.firestoreCollection.doc(id).delete();
  }
}
