import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../Redux/Actions/userActions';
import { VStack, Box, Image, Text, Input, Button } from '@chakra-ui/react';

export default function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });

  const { email, password, name } = formData;

  const dispatch = useDispatch();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(register(formData));
  };

  return (
    <VStack as="form" onSubmit={onSubmit} spacing={8} align="center" p={8} minH={'80vh'} maxW={'sm'} mx={'auto'}>
      <Box maxW="sm">
        <Image
          h="20"
          mx="auto"
          src="https://www.boloforms.com/_next/static/media/logo.a7bd82db.svg"
          alt="bolo forms"
        />
        <Text fontSize="xl" fontWeight="bold">
          Register with us
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
      <Box w="full">
        <Text>Name:</Text>
        <Input
          type="text"
          name="name"
          value={name}
          onChange={onChange}
          variant="filled"
        />
      </Box>
      <Button
        type="submit"
        size="lg"
        bgColor={'black'}
        variant={'solid'}
        _hover={{ bgColor: 'black' }}
        _active={{ bgColor: 'black' }}
        w="100%"
        color={'white'}
      >
        Register
      </Button>
    </VStack>
  );
}
