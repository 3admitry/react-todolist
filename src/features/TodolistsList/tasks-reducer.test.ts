import {v1} from 'uuid';
import {TaskPriorities, TaskStatuses} from '../../api/todolist-api'
import {addTaskAC, removeTaskAC, setTasksAC, tasksReducer, TasksStateType, updateTaskAC} from './tasks-reducer';
import {addTodolistAC, removeTodolistAC} from './todolists-reducer';

let todolistId1: string;
let todolistId2: string;
let tasksObjc: TasksStateType;


beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    tasksObjc = {
        [todolistId1]: [
            {
                id: v1(), title: 'CSS', status: TaskStatuses.Completed, todoListId: 'todolistId1', description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: v1(), title: 'JS', status: TaskStatuses.Completed, todoListId: 'todolistId1', description: '',
                startDate: '', deadline: '', addedDate: '', order: 1, priority: TaskPriorities.Low
            },
            {
                id: v1(), title: 'React', status: TaskStatuses.New, todoListId: 'todolistId1', description: '',
                startDate: '', deadline: '', addedDate: '', order: 2, priority: TaskPriorities.Low
            },
            {
                id: v1(), title: 'Babel', status: TaskStatuses.New, todoListId: 'todolistId1', description: '',
                startDate: '', deadline: '', addedDate: '', order: 3, priority: TaskPriorities.Low
            },
            {
                id: v1(), title: 'Mysql', status: TaskStatuses.Completed, todoListId: 'todolistId1', description: '',
                startDate: '', deadline: '', addedDate: '', order: 4, priority: TaskPriorities.Low
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
                startDate: '', deadline: '', addedDate: '', order: 1, priority: TaskPriorities.Low
            },
            {
                id: v1(), title: 'Cookie', status: TaskStatuses.Completed, todoListId: 'todolistId1', description: '',
                startDate: '', deadline: '', addedDate: '', order: 2, priority: TaskPriorities.Low
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

test('Add new task', () => {
    let newTitle: string = 'Banana';
    let action = addTaskAC({
        title: newTitle,
        status: TaskStatuses.New,
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        id: 'id task',
        priority: TaskPriorities.Hi,
        startDate: '',
        todoListId: todolistId2,
    }, todolistId2)
    let result = tasksReducer(tasksObjc, action)

    expect(result[todolistId2].length).toBe(tasksObjc[todolistId2].length + 1);
    // @ts-ignore
    expect(result[todolistId2][0].title).toBe('Banana');

});

test('Remove task', () => {

    let result = tasksReducer(tasksObjc, removeTaskAC('5WAD48-AD4dA', todolistId2))

    expect(result[todolistId2].length).toBe(tasksObjc[todolistId2].length - 1);
    expect(result[todolistId2].every(t => t.id !== '5WAD48-AD4dA')).toBeTruthy();
    expect(result[todolistId1].length).toBe(6);

});

test('Change task title', () => {
    let newTitle = 'Candies'
    let action = updateTaskAC('5WAD48-AD4dA', {title: newTitle}, todolistId2)
    let result = tasksReducer(tasksObjc, action)

    expect(result[todolistId2][3].title).toBe(newTitle);


});

test('Change todolist status', () => {
    let action = updateTaskAC('5WAD48-AD4dA', {status: TaskStatuses.New}, todolistId2)
    let result = tasksReducer(tasksObjc, action)

    expect(result[todolistId2][3].status).toBe(TaskStatuses.New);

});

test('new array should be added when new todolist is added', () => {

    const action = addTodolistAC({id: 'my-test-id', title: 'What to learn', addedDate: '', order: 0},);

    const endState = tasksReducer(tasksObjc, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k !== todolistId1 && k !== todolistId2);
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {

    const action = removeTodolistAC(todolistId2);

    const endState = tasksReducer(tasksObjc, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState[todolistId2]).not.toBeDefined();
});


test('Set tasks', () => {

    const action = setTasksAC(tasksObjc[todolistId1], todolistId1);
    const endState = tasksReducer({
        [todolistId1]: [],
        [todolistId2]: [],
    }, action)

    expect(endState[todolistId1].length).toBe(6);
    expect(endState[todolistId2].length).toBe(0);
});



