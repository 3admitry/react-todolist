import {tasksObjcType, todoListsType, valueFilterType} from '../AppWithReducer';
import {v1} from 'uuid';
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitletAC,
    removeTaskAC,
    tasksReducer
} from './tasks-reducer';
import {addTodoListAC, removeTodoListAC} from './todolists-reducer';

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
    let result = tasksReducer(tasksObjc, addTaskAC(newTitle, todolistId2))

    expect(result[todolistId2].length).toBe(tasksObjc[todolistId2].length + 1);
    // @ts-ignore
    expect(result[todolistId2].at(-1).title).toBe('Banana');

});

test('Remove task', () => {

    let result = tasksReducer(tasksObjc, removeTaskAC('5WAD48-AD4dA', todolistId2))

    expect(result[todolistId2].length).toBe(tasksObjc[todolistId2].length - 1);
    expect(result[todolistId2].every(t=>t.id !== '5WAD48-AD4dA')).toBeTruthy();
    expect(result[todolistId1].length).toBe(6);

});

test('Change task title', () => {
    let newTitle = 'Candies'
    let result = tasksReducer(tasksObjc, changeTaskTitletAC(newTitle, '5WAD48-AD4dA', todolistId2))

    expect(result[todolistId2][3].title).toBe(newTitle);


});

test('Change todolist status', () => {

    let result = tasksReducer(tasksObjc, changeTaskStatusAC(false, '5WAD48-AD4dA', todolistId2))

    expect(result[todolistId2][3].isDone).toBe(false);

});

test('new array should be added when new todolist is added', () => {

    const action = addTodoListAC("new todolist");

    const endState = tasksReducer(tasksObjc, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != todolistId1 && k != todolistId2);
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {

    const action = removeTodoListAC(todolistId2);

    const endState = tasksReducer(tasksObjc, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState[todolistId2]).not.toBeDefined();
});



