import {todoListsType} from '../App';
import {v1} from 'uuid';
import todolistsReducer, {ADD_TODOLIST} from './todolists-reducer';

let todoLists:todoListsType[];
let todolistId1:string;
let todolistId2:string;

beforeEach(()=>{
    todolistId1 = v1();
    todolistId2 = v1();
    todoLists = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ];
})

test('Add new todoList object', ()=>{

    let reuslt = todolistsReducer(todoLists, {type: ADD_TODOLIST, title: 'Holidays deals'})
    expect(reuslt.length).toBe(todoLists.length+1);
    expect(reuslt[0].title).toBe('Holidays deals');

})

