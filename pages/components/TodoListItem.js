import React, {useState, useEffect} from 'react'
import { Button, CloseButton, Flex, Input, Center, Editable } from '@chakra-ui/react'
import { useBoolean } from '@chakra-ui/hooks'

//import Firebase DB
import {db} from '../../public/init-firebase'

import { COLLECTION } from '../../public/init-firebase'

export default function TodoListItem({id, task, updateTodo}) {

    const [flag, setFlag] = useBoolean(false)
    const [value, setValue] = useState(task)

useEffect(() => {
    
    return () => {
        console.log('cleanup function ran')
    }
}, [value])

    /*
        ~~~    DELETE FUNCTIONS    ~~
    */
    const handleDelete = () => {

        db.collection(COLLECTION).doc(id).delete()
        .then(() => { console.log('deleted id ' + id)})

    }

    const prepareUpdate = () => {
        
        setFlag.toggle()
        console.log('prepare update fired')
        
    }

    const handleUpdate = () => {
        updateTodo(id, value)
        console.log('Todo updated')
        setFlag.toggle()
    }

    return (
        <>

            <Flex direction='row' justify='space-around'  margin='5px'>
                <Flex justify='center' align='center' w='250px'>
                    {flag ? <Input value={value}
                    onChange={e => setValue(e.target.value)} bg='white'/> : <Editable>{value}</Editable> }
                </Flex>
                <Center justify='center' align='center'>
                    {flag ? <Button onClick={handleUpdate}>Enter</Button>: <Button onClick={prepareUpdate}>Update</Button>}
                </Center>
                <Flex>
                    {!flag ? <CloseButton onClick={handleDelete}/> : null } 
                </Flex>
                
            </Flex>
            
        </>
    )
}
