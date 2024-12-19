import { Box, Typography } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

function Todo({todo}) {

    const queryClient = useQueryClient()

    const handleDelete = ()=>{
        delmute.mutate()

    }


    const delTodo = async() =>{
        const response = await axios.delete(`http://localhost:8080/todos/${todo.todoId}`)
        return response.data
    }

    const delmute = useMutation({
        mutationFn: delTodo,
        onSuccess: () => {
          // 리스트 가져오는 쿼리가 무효다 다시 가져와라
          queryClient.invalidateQueries({ queryKey: ['todos'] })
        },
      })

  return (
    <Box display={"flex"} sx={{"justifyContent":"space-between"}} >
        <Typography variant='h6'>
            {todo.todoTitle}
        </Typography>
        <button variant='outlined' onClick={handleDelete}>삭제</button>
    </Box>
  )
}

export default Todo