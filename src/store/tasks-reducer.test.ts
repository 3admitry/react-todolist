import {tasksObjcType, todoListsType, valueFilterType} from '../App';
import {v1} from 'uuid';
import {addTaskAC, changeTaskStatusAC, changeTaskTitletAC, removeTaskAC, taskReducer} from './tasks-reducer';

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

test('Add new task', () => {
    let newTitle: string = 'Banana';
    let result = taskReducer(tasksObjc, addTaskAC(newTitle, todolistId2))

    expect(result[todolistId2].length).toBe(tasksObjc[todolistId2].length + 1);
    expect(result[todolistId2].at(-1).title).toBe('Banana');

});

test('Remove task', () => {

    let result = taskReducer(tasksObjc, removeTaskAC('5WAD48-AD4dA', todolistId2))

    expect(result[todolistId2].length).toBe(tasksObjc[todolistId2].length - 1);
    expect(result[todolistId2].every(t=>t.id !== '5WAD48-AD4dA')).toBeTruthy();
    expect(result[todolistId1].length).toBe(6);

});

test('Change task title', () => {
    let newTitle = 'Candies'
    let result = taskReducer(tasksObjc, changeTaskTitletAC(newTitle, '5WAD48-AD4dA', todolistId2))

    expect(result[todolistId2][3].title).toBe(newTitle);


});

test('Change todolist status', () => {

    let result = taskReducer(tasksObjc, changeTaskStatusAC(false, '5WAD48-AD4dA', todolistId2))

    expect(result[todolistId2][3].isDone).toBe(false);

});

