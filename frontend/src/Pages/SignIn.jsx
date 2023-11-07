import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../Redux/Actions/userActions';
import { VStack, Box, Image, Text, Input, Button } from '@chakra-ui/react';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData.email, formData.password));
  };

  return (
    <VStack as="form" onSubmit={onSubmit} spacing={8} align="center" p={8} h={'80vh'} maxW={'sm'} mx={'auto'}>
      <Box maxW="sm">
        <Image
          h="20"
          mx="auto"
          src="https://www.boloforms.com/_next/static/media/logo.a7bd82db.svg"
          alt="bolo forms"
        />
        <Text fontSize="xl" fontWeight="bold">
          Welcome back
        </Text>
      </Box>
          <Box w="full">
            <Text>Email address:</Text>
            <Input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              variant="filled"
            />
          </Box>
          <Box w="full">
            <Text>Password:</Text>
            <Input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              variant="filled"
            />
          </Box>
          <Button
            type="submit"
            size="lg"
            bgColor={'black'}
            _hover={{bgColor:"black"}}
            _active={{bgColor:"black"}}
            w="100%"
            color={'white'}
          >
            Login
          </Button>
    </VStack>
  );
}
