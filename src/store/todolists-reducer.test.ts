import {todoListsType, valueFilterType} from '../App';
import {v1} from 'uuid';
import todolistsReducer, {
    addTodoListAC,
    changeTodoLisFiltertAC, changeTodoLisTitletAC,
    removeTodoListAC
} from './todolists-reducer';

let todoLists: todoListsType[];
let todolistId1: string;
let todolistId2: string;

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    todoLists = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ];
})

test('Add new todoList object', () => {
    let newTitle: string = 'Holidays deals';
    let result = todolistsReducer(todoLists, addTodoListAC(newTitle))

    expect(result.length).toBe(todoLists.length + 1);
    expect(result[0].title).toBe('Holidays deals');

});

test('Remove todolist', () => {

    let result = todolistsReducer(todoLists, removeTodoListAC(todolistId1))

    expect(result.length).toBe(todoLists.length - 1);
    expect(result[0].id).not.toBe(todolistId1);

});

test('Change todolist title', () => {
    let newTitle = 'Super new title'
    let result = todolistsReducer(todoLists, changeTodoLisTitletAC(newTitle, todolistId1))

    expect(result[0].title).toBe('Super new title');

});

test('Change todolist filter', () => {
    let newFilter: valueFilterType = 'active';
    let result = todolistsReducer(todoLists, changeTodoLisFiltertAC(newFilter, todolistId1))

    expect(result[0].filter).toBe('active');

});

