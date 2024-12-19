import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect } from 'react'
import Todo from './Todo'

function TodoList() {
    // tanstack query에 접근
    const queryClient = useQueryClient()
    const jcTxt = useRef(null)
  

    const getTodos = async()=>{
        //axios로 get이 와야 함
        const response = await axios.get("http://localhost:8080/todos")
        return response.data

    }
    // useQuery는 get방식 곧 읽기에 사용
    const {data} = useQuery({
         queryKey: ['todos']
         , queryFn: getTodos
         })
    console.log("쳌",data);

    const postTodo = async(todo) =>{
        //axios로 post가 와야함
       const response = await axios.post("http://localhost:8080/todos",todo)
       return response.data;
    }

    //추가 버튼 눌렀을 때
    const handleAdd = () =>{
        inmute.mutate({
            todoId: data.length+1,
            todoTitle: jcTxt.current.value
        })
        jcTxt.current.valus="";
        jcTxt.current.focus();
    }

    // useMutation은 post/put/delete에 사용
    const inmute = useMutation({
      mutationFn: postTodo,
      onSuccess: () => {
        // 리스트 가져오는 쿼리가 무효다 다시 가져와라 
        queryClient.invalidateQueries({ queryKey: ['todos'] })
      },
    })

    useEffect(()=>{
        jcTxt.current.focus();
    },[])
  
    return (
      <div>
        {data?.map((todo) => <Todo key={todo.todoId}>{todo.todoTitle} todo={todo}/>)}
        <input type='text' ref={jcTxt} defaultValue={"수민 할일 많음"} style={{border:"1px solid green"}}/>
        <button onClick={ handleAdd}> Add Todo  </button>
      </div>
    )
  }
  

export default TodoList