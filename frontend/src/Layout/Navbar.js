import React, { useState } from 'react';
import { Box, Button, HStack, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverBody, VStack, Input, InputGroup, InputRightElement, Menu, MenuButton, MenuItem, MenuList, Avatar } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux'; // Assuming you're using Redux
import { AiOutlineSearch } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../Redux/Actions/userActions';

const Navbar = () => {
  const categoryOptions = useSelector((state) => state.course.categoryOptions);
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const dispatch = useDispatch();
  const closePopover = () => {
    setIsPopoverOpen(false);
  };
  const handleSearchSubmit = () => {
    // Handle the search action, e.g., navigate to search results page or perform search
    console.log(`Searching for: ${searchValue}`);
  };
  const isAuth = localStorage.getItem('isAuth');
const navigate = useNavigate()
  return (
    <Box as="nav" bg="gray.800" color="white" p={4}>
      <HStack spacing={4} justifyContent={'space-between'}>
        {/* Your logo or brand */}
        <HStack gap={8} w="full">

          <Button variant="link"  as={Link} to={'/'} color="white" >Logo</Button>

          {/* Categories popover */}
          <Menu isOpen={isPopoverOpen} onClose={closePopover}>
      <MenuButton onClick={()=>setIsPopoverOpen(!isPopoverOpen)}>
        <Button variant="link" color="white" _focus={{ color: "white" }} _hover={{ textDecoration: 'underline' }}>
          Categories
        </Button>
      </MenuButton>
      <MenuList bg="gray.800" color="white" bgColor={''}>
            {categoryOptions.map((category, index) => (
              <MenuItem
                key={index}
                as={Link}
                bg="gray.800"
                to={`/categories/${category}`}
                variant="link"
                _focus={{ color: "white" }}
                color="white"
                _hover={{ textDecoration: 'underline' }}
                onClick={closePopover} // Close popover on button click
              >
                {category}
              </MenuItem>
            ))}
      </MenuList>
    </Menu>

          {/* Search input */}
          <InputGroup p="0" maxW={'300px'}>
            <Input
              type="text"
              placeholder="Search courses"
              value={searchValue}
              focusBorderColor='white'
              onChange={handleSearchChange}

            />
            <InputRightElement h="full" width="4.5rem" ml={0}>
              <Button
                size={'lg'}
                color="white"
                fontSize={'large'}
                onClick={handleSearchSubmit}
                p='1'
                variant={'link'}
              >
                <AiOutlineSearch />
              </Button>
            </InputRightElement>
          </InputGroup>
        </HStack>
{
  isAuth?<Menu >
  <MenuButton >
    <Button variant="link" color="white" _focus={{ color: "white" }} _hover={{ textDecoration: 'underline' }}>
      <Avatar size={'sm'}/>
    </Button>
  </MenuButton>
  <MenuList bg="gray.800" color="white" >
    <MenuItem  bg="gray.800" color="white" as={Link} to={'/dashboard'}>Dashboard</MenuItem>
    <MenuItem  bg="gray.800" color="white" onClick={()=>{dispatch(logout(navigate))}}>Logout</MenuItem>
  </MenuList>
</Menu>:   <HStack gap={4} >

          <Button variant="link" _focus={{ color: "white" }} color="white" _hover={{ textDecoration: 'underline' }} as={Link} to="/login">
            Login
          </Button>
          <Button variant="solid"  colorScheme='al' as={Link} to="/register">
            Signup
          </Button>
        </HStack>}
      </HStack>
    </Box>
  );
};

export default Navbar;
