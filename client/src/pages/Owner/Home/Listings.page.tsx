import { Button, Flex } from '@chakra-ui/react'
import React from 'react'
import { BsArrowBarRight } from 'react-icons/bs'
import { useHistory } from 'react-router-dom';

export default function Listings() {
    const history = useHistory();

    return (
        <div>
            <Flex justifyContent="space-between" mx="10">
                <h1 className="font-comfortaa font-bold text-2xl tracking-wide">Listings</h1>
                <Button colorScheme="brand" variant="outline"
                    rightIcon={<BsArrowBarRight />}
                onClick={()=>history.push("list/new")}>Add new</Button>
            </Flex>
            {/* <div className="bg-white shadow-lg h-40 w-3/6 rounded-sm mt-10">
                <h1>hhhhhhh</h1>
            </div>
            <div className="bg-white shadow-xl h-40 w-3/6 rounded-md mt-10">
                <h1>hhhhhhh</h1>
            </div>
            <div className="bg-white shadow-xl h-40 w-3/6 rounded-md mt-10">
                <h1>hhhhhhh</h1>
            </div>
            <div className="bg-white shadow-xl h-40 w-3/6 rounded-md mt-10">
                <h1>hhhhhhh</h1>
            </div>
            <div className="bg-white shadow-xl h-40 w-3/6 rounded-md mt-10">
                <h1>hhhhhhh</h1>
            </div>
            <div className="bg-white shadow-xl h-40 w-3/6 rounded-md mt-10">
                <h1>hhhhhhh</h1>
            </div>
            <div className="bg-white shadow-xl h-40 w-3/6 rounded-md mt-10">
                <h1>hhhhhhh</h1>
            </div> */}
        </div>
    )
}
