import {tasksObjcType, todoListsType, valueFilterType} from '../App';
import {v1} from 'uuid';
import {
    tasksReducer
} from './tasks-reducer';
import todolistsReducer, {addTodoListAC} from './todolists-reducer';

let todoLists: todoListsType[];
let todolistId1: string;
let todolistId2: string;
let tasksObjc: tasksObjcType;

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    todoLists = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ];
    tasksObjc = {
        [todolistId1]: [
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Babel', isDone: false},
            {id: v1(), title: 'Mysql', isDone: true},
            {id: v1(), title: 'NodeJS', isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: 'Bread', isDone: true},
            {id: v1(), title: 'Milk', isDone: false},
            {id: v1(), title: 'Cookie', isDone: false},
            {id: '5WAD48-AD4dA', title: 'Chocolate', isDone: true},
            {id: v1(), title: 'Sugar222', isDone: true},
            {id: v1(), title: 'Water3', isDone: false}
        ]
    }

})

test('Ids of new todolist should be equal in todoList & tasks objects', () => {


    const action = addTodoListAC("new todolist");

    const endTasksState = tasksReducer(tasksObjc, action)
    const endTodolistsState = todolistsReducer(todoLists, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todolistId);
    expect(idFromTodolists).toBe(action.todolistId);

});


