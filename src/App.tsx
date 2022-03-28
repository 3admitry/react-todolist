import React from 'react';
import './App.css';
import {TaskType, Todolist} from './site/Todolist';
import {useState} from 'react';
import {v1} from 'uuid';

export type valueFilterType = 'all' | 'active' | 'completed'

type todoListsType = {
    id: string
    title: string
    filter: valueFilterType
}
type tasksObjcType = {
    [key: string]: Array<TaskType>
}

function App() {

    //let [valueFilter, setValueFilter] = useState<valueFilterType>('all')
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Babel', isDone: false},
        {id: v1(), title: 'Mysql', isDone: true},
        {id: v1(), title: 'NodeJS', isDone: false}
    ])

    let tasks2 = [
        {id: 1, title: 'Matrix', isDone: false},
        {id: 2, title: 'Terminator', isDone: true},
        {id: 3, title: 'Harry Potter', isDone: true}
    ]

    const removeTodoList = (todoListId: string) => {
        debugger
        let newTodoLists = todoLists.filter(tl => tl.id !== todoListId)
        delete tasksObjc[todoListId];
        setTodoLists(newTodoLists);
    }

    function removeTask(id: string, todoListId: string) {
        let removedTasks = tasksObjc[todoListId].filter(t => t.id !== id)
        // let removedTasks = tasksObjc.filter(t => t.id !== id)
        setTasksObjc({...tasksObjc, [todoListId]: removedTasks});
    }

    const changeStatus = (taskId: string, checked: boolean, todoListId: string) => {
        let changedTaskArray = tasksObjc[todoListId].map(el => (taskId === el.id ? {...el, isDone: checked} : el))
        setTasksObjc({...tasksObjc, [todoListId]: changedTaskArray})
    }

    function addTask(title: string, todoListId: string) {
        let newTask = {
            id: v1(),
            title: title,
            isDone: true
        }
        let newTasks = [newTask, ...tasksObjc[todoListId]]
        setTasksObjc({...tasksObjc, [todoListId]: newTasks})
    }

    function changeFilter(filter: valueFilterType, todoListId: string) {
        // let todoList = todoLists.find((t) => t.id === todoListId)
        // if (todoList)
        //     todoList.filter = filter
        // setTodoLists([...todoLists])

        let todoList = todoLists.map(t => t.id === todoListId ? {...t, filter: filter} : t)
        setTodoLists(todoList)
        // setValueFilter(value);
    }

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todoLists, setTodoLists] = useState<Array<todoListsType>>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ])

    let [tasksObjc, setTasksObjc] = useState<tasksObjcType>({
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
            {id: v1(), title: 'Chocolate', isDone: true},
            {id: v1(), title: 'Sugar', isDone: true},
            {id: v1(), title: 'Water', isDone: false}
        ]
    })


    return (
        <div className="App">

            {todoLists.map((tl) => {

                let tasksTodoList = tasksObjc[tl.id];
                if (tl.filter === 'active') {
                    tasksTodoList = tasksObjc[tl.id].filter(t => !t.isDone)
                }
                if (tl.filter === 'completed') {
                    tasksTodoList = tasksObjc[tl.id].filter(t => t.isDone)
                }

                return (
                    <Todolist
                        key={tl.id}
                        todoListId={tl.id}
                        title={tl.title}
                        tasks={tasksTodoList}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeStatus={changeStatus}
                        valueFilter={tl.filter}
                        removeTodoList={removeTodoList}
                    />
                )
            })}

            {/*<Bodies title={'Book'} countli={simpleData}/>*/}
        </div>
    );
}

export default App;

