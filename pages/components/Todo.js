//REACT IMPORTS
import React from 'react'
import { useState, useEffect } from 'react'

//FIREBASE IMPORTS
import {db} from '../../public/init-firebase'
import { COLLECTION } from '../../public/init-firebase';

//chakra UI imports
import {Input, Button, Flex, Alert, AlertIcon, AlertTitle, AlertDescription, Heading, Box, 
    CloseButton, Spacer, Slide, UnorderedList, ListItem, Link, Table, Thead, Tr, Td} from '@chakra-ui/react'
import { Icon } from '@iconify/react';

//chakra hook imports
import { useBoolean, useDisclosure } from '@chakra-ui/hooks'
import TodoListItem from './TodoListItem';


export default function Todo() {

    const [todo, setTodo] =  useState()  
    const [inputValue, setInputValue] = useState('')
    const [isEditable, setIsEditable] = useBoolean(false)
    const { isOpen, onToggle } = useDisclosure()
    const [alertFlag, setAlertFlag] = useState(false)

    const updateOn = false;
    
    useEffect(() => {

        getData(COLLECTION)
        

        return () => {
            console.log('useEffect cleanup returned')
        }
    }, [])


    function updateFlag(){
        setIsEditable.toggle()
    }

    /* 
        ~~~    GET FUNCTIONS    ~~~
    */

    //params: collection: name of current collection
    function getData(col) {
        
        db.collection(col).onSnapshot((querySnapshot) => {

            setTodo(
            querySnapshot.docs.map((doc) => ({    
                id: doc.id,
                task: doc.data().task
                               
            }))) 
            
    });
    }


    /*
        ~~~    CREATE FUNCTIONS    ~~
    */
    //This function CREATES a task within given collection based off of the arguments passed
    //Create Firestore task within collection
    function setData(collectionName, value) {

        db.collection(collectionName).doc().set({
            task: value
        })
    }

    //This function handles the CREATE button by evaluating input and calling the setData function
    //else : error handling via Alert
    const handleCreateClick = () => {

        //console.log(inputValue.length)
        inputValue.length > 0 ? setData('Todo', inputValue) : setAlertFlag(true)
        setInputValue('') //Input value cleared
        //console.log('input value is 0 now')
    }


    //UPDATE FUNCTIONS (To be passed through as props)
    const updateTodo = (id, value)  => {
        console.log('update Todo ran from parent component')
    db.collection(COLLECTION).doc(id).update({task: value})
        
    }

//error handling
    const alertClickHandle = () => {
        setAlertFlag(false)
    }


    return (
        <>     
       
        
       
    <Flex direction='column' align='center' justify='center' w='100vw' h='80vh'
        bg='white'>


      <Slide direction="top" in={isOpen} style={{ zIndex: 10 }}>
        <Box
          p="40px"
          color="white"
          mt="4"
          bg="#CAEBF2"
          rounded="lg"
          shadow="md"
          h='75vh'
          
        >
            <Flex direction='row'>
            <Heading className='headerText' color='black' marginBottom='30px' fontSize='2em'>Current Todo List: </Heading>
            <Spacer/>
            <CloseButton size='lg' color='black' onClick={onToggle}/>

            </Flex>
            
            <Flex direction='column' align='flex-start' color='black' marginLeft='25px'>
            {isOpen && todo.map((todo) => 
                
            

                <div variant='simple' borderRadius='lg' borderColor='black'>
 
                        
                    <div>
                    <TodoListItem id={todo.id} task={todo.task} 
                    setIsEditable={updateFlag} key={'akey'} updateTodo={updateTodo} /> 
                    </div>
                    
                </div> 
                
            )}
            </Flex>
        </Box>
      </Slide>
            
            <Icon icon="vscode-icons:file-type-firebase" width='150px' height='150px'/>
            
            
            <Heading mt='20px' bg='#CAEBF2' textAlign='center'>Firestore CRUD Operations Tool</Heading>

            

            <Input mt='20px' placeholder='Enter a todo...'  w='300px' bg='#CAEBF2' fontSize='1.3em' color='black' 
            onChange={(e) => {setInputValue(e.target.value)}}
            value={inputValue}
            />

            
            {/* This alert renders if there is no input value upon CREATE*/ 
            alertFlag && <Alert mt='20px' variant='solid' status='error' w='445.92px'>
                <Spacer/>
                <AlertIcon />
                <AlertTitle mr={2}>Invalid Input</AlertTitle>
                <AlertDescription>You must enter a value</AlertDescription>
                <Spacer/>
                <CloseButton onClick={alertClickHandle}/>
            </Alert>}

            <Button w='110px' mt='20px' color='#FF3B3F' variant='outline' bg='#CAEBF2' fontSize='1.2rem'
            onClick={handleCreateClick}
            >CREATE</Button>                
            
            <Button onClick={onToggle} w='110px' mt='10px' color='#FF3B3F' 
            bg='#CAEBF2' variant='outline' fontSize='1.2rem'>READ</Button>
            
            
            <Button w='110px' mt='10px' color='#FF3B3F' variant='outline' fontSize='1.2rem' bg='#CAEBF2'> UPDATE</Button>
            <Button onClick={onToggle} w='110px' mt='10px' color='#FF3B3F' variant='outline' fontSize='1.2rem' bg='#CAEBF2'>DELETE</Button>
        </Flex>
      
        <Flex direction='row' h='10vh' justify='center' mt='40px'>
        
        
        
        {/* Contact Links*/}
        <Link href='http://www.linkedin.com' isExternal>
            <Icon icon="openmoji:linkedin"  height='75px' width='75px'/>
        </Link>
        {/* Contact Links */}
        <Link href='http://www.github.com/gummyguppy' isExternal>
            <Icon icon="line-md:github-twotone" height='75px' width='75px' />
        </Link>
        </Flex>
        


        
        </>
    )
}