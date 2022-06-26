import {v1} from 'uuid';
import {tasksReducer} from './tasks-reducer';
import {TasksStateType} from '../App';
import {addTodolistAC, setTodolistsAC, TodolistDomainType, todolistsReducer} from './todolists-reducer';
import {TaskPriorities, TaskStatuses} from '../api/todolist-api';

let todoLists: TodolistDomainType[];
let todolistId1: string;
let todolistId2: string;
let tasksObj: TasksStateType;

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    todoLists = [
        {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}
    ];
    tasksObj = {
        [todolistId1]: [
            {
                id: v1(), title: 'CSS', status: TaskStatuses.Completed, todoListId: 'todolistId1', description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: v1(), title: 'JS', status: TaskStatuses.Completed, todoListId: 'todolistId1', description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: v1(), title: 'React', status: TaskStatuses.New, todoListId: 'todolistId1', description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: v1(), title: 'Babel', status: TaskStatuses.New, todoListId: 'todolistId1', description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: v1(), title: 'Mysql', status: TaskStatuses.Completed, todoListId: 'todolistId1', description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: v1(), title: 'NodeJS', status: TaskStatuses.New, todoListId: 'todolistId1', description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            }
        ],
        [todolistId2]: [
            {
                id: v1(), title: 'Bread', status: TaskStatuses.Completed, todoListId: 'todolistId1', description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: v1(), title: 'Milk', status: TaskStatuses.Completed, todoListId: 'todolistId1', description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: v1(), title: 'Cookie', status: TaskStatuses.Completed, todoListId: 'todolistId1', description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: '5WAD48-AD4dA',
                title: 'Chocolate',
                status: TaskStatuses.Completed,
                todoListId: 'todolistId1',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: v1(), title: 'Sugar222', status: TaskStatuses.Completed, todoListId: 'todolistId1', description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: v1(), title: 'Water3', status: TaskStatuses.Completed, todoListId: 'todolistId1', description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            }
        ]
    }

})

test('Ids of new todolist should be equal in todoList & tasks objects', () => {

    const action = addTodolistAC("new todolist");

    const endTasksState = tasksReducer(tasksObj, action)
    const endTodolistsState = todolistsReducer(todoLists, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[keys.length-1];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todolistId);
    expect(idFromTodolists).toBe(action.todolistId);

});

test('Empty arrays should be added what we set todolist', () => {

    const action = setTodolistsAC(todoLists);

    const endTasksState = tasksReducer({}, action)

    const keys = Object.keys(endTasksState);

    expect(keys.length).toBe(2);
    expect(endTasksState[todolistId1]).toStrictEqual([]);
    expect(endTasksState[todolistId2]).toStrictEqual([]);


});


