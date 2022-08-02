import {v1} from 'uuid';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer,
    TodolistDomainType, FilterValuesType, SetTodolistActionType, setTodolistsAC, changeTodolistTEntityStatusAC
} from './todolists-reducer';
import {RequestStatusType} from '../../app/app-reducer';

let todoLists: Array<TodolistDomainType>;
let todolistId1: string;
let todolistId2: string;

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    todoLists = [
        {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'},
        {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'}
    ];
})

test('Add new todoList object', () => {
    let newTitle: string = 'Holidays deals';
    const action = addTodolistAC({id: 'my-test-id', title: newTitle, addedDate: '', order: 0},);
    let result = todolistsReducer(todoLists, action)

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
test('Change todolist entityStatus', () => {
    let newStatus: RequestStatusType = 'loading';
    let result = todolistsReducer(todoLists, changeTodolistTEntityStatusAC(todolistId1, newStatus))

    expect(result[0].entityStatus).toBe(newStatus);
    expect(result[1].entityStatus).toBe('idle');

});

test('Set todolists', () => {
    let action: SetTodolistActionType = setTodolistsAC(todoLists);
    let result = todolistsReducer([], action)

    expect(result.length).toBe(2);

});

