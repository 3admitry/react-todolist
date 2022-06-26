import {v1} from 'uuid';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer,
    TodolistDomainType, FilterValuesType, SetTodolistActionType, setTodolistsAC
} from './todolists-reducer';


let todoLists: TodolistDomainType[];
let todolistId1: string;
let todolistId2: string;

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    todoLists = [
        {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}
    ];
})

test('Add new todoList object', () => {
    let newTitle: string = 'Holidays deals';
    let result = todolistsReducer(todoLists, addTodolistAC(newTitle))

    expect(result.length).toBe(todoLists.length + 1);
    expect(result[0].title).toBe('Holidays deals');

});

test('Remove todolist', () => {

    let result = todolistsReducer(todoLists, removeTodolistAC(todolistId1))

    expect(result.length).toBe(todoLists.length - 1);
    expect(result[0].id).not.toBe(todolistId1);

});

test('Change todolist title', () => {
    let newTitle = 'Super new title'
    let result = todolistsReducer(todoLists, changeTodolistTitleAC(todolistId1, newTitle))

    expect(result[0].title).toBe('Super new title');

});

test('Change todolist filter', () => {
    let newFilter: FilterValuesType = 'active';
    let result = todolistsReducer(todoLists, changeTodolistFilterAC(todolistId1, newFilter))

    expect(result[0].filter).toBe('active');

});

test('Set todolists', () => {
    let action: SetTodolistActionType = setTodolistsAC(todoLists);
    let result = todolistsReducer([], action)

    expect(result.length).toBe(2);

});

