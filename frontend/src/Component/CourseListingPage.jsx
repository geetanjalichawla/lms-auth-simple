import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Center,
  Grid,
  GridItem,
  Image,
  Text,
  Heading,
  Stack,
  Flex,
  Spacer,
  Button,
  IconButton,
  useToast,
  Spinner,
  Input,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Select,
  Tag,
  TagCloseButton,
} from '@chakra-ui/react';

import { AiOutlineHeart, AiTwotoneHeart } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCourses } from '../Redux/Actions/Course';
import { server } from '../Redux/store';
import { Link, useNavigate, useParams } from 'react-router-dom';

function CourseListing() {
  const courses = useSelector((state) => state.course.courses);
  const loading = useSelector((state) => state.course.loading);

  const {category} = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCourses());
  }, []);


  const filteredCourses = courses.filter((course) => {
    if (category&&course.category !== category) {
      return false;
    }
 
    // if (uniqueString && !course.name.toLowerCase().includes(uniqueString.toLowerCase()) && !course.instructor.toLowerCase().includes(uniqueString.toLowerCase())  &&  !course.description.toLowerCase().includes(uniqueString.toLowerCase()) ) {
    //   return false;
    // }

    // const courseDuration = parseInt(course.duration, 10);
    // if (courseDuration > selectedDuration) {
    //   return false;
    // }

    return true;
  });

  return (
    <Center maxW={'container.xl'} mx={'auto'}>
      <Box p={4} w="full">
        <Heading as="h1" size="xl" textAlign="center" mb={4}>
          Explore Courses
        </Heading>
        {category&&
          <Tag as={Link} to={'/'} mb={5} size={'lg'}>
        {category} <TagCloseButton/>
        </Tag>
      }
        {(filteredCourses.length === 0 && loading) ? (
          <Flex w="full"  h="full" minH={'50vh'} alignItems={'center'} justifyContent={'center'} >
            <Spinner size={'xl'} />
          </Flex>
        ) : (
          <Grid templateColumns="repeat(3, 1fr)" gap={6} w="full">
            {filteredCourses.map((course) => (
              <GridItem key={course._id}>
                <CourseCard course={course} />
              </GridItem>
            ))}
          </Grid>
        )}
      </Box>
    </Center>
  );
}

export default CourseListing;



function CourseCard({course}) {
    const toast = useToast(); 
    const dispatch = useDispatch();
    const navigate = useNavigate();

 
    const handleLikeCourse = () => {
        axios
        .post(`${server}/like-course`, { courseId: course._id }, {
          withCredentials: true,
        })
        .then((res) => {
          dispatch(getAllCourses());
          // Notify the user that the course has been liked
          toast({
            description:res.data.message|| 'You have liked the course!',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
          // Update the 'liked' status in the component state if necessary
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            // Redirect to the login page when a 401 response is received
            navigate('/login');
          } else {
            console.error('Error liking the course:', error);

          }
        });
      };
    
  return (
    <Box
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="md"
      overflow="hidden"
      cursor="pointer"
      transition="transform 0.2s"
      _hover={{ transform: 'scale(1.05)' }}
    >
            <Link to={`/course/${course._id}`}>

      <Image
        src={course.thumbnail || 'https://via.placeholder.com/300x200'}
        alt={course.name}
        objectFit="cover"
        h="200px"
        w="100%"
      />
      <Text fontSize="xl" mt={4}>
        {course.name}
      </Text>
      <Text fontSize="md" color="gray.600">
        Instructor: {course.instructor}
      </Text>
      <Flex fontSize="md" color="gray.600" mt={2}>
        <Stack direction="row">
          <Text>{course.rating.toFixed(1)}</Text>
          <Text>({course.reviews.length} reviews)</Text>
        </Stack>
        <Spacer />
        <Text>{course.duration} weeks</Text>
      </Flex>
      </Link> 
      {/* Like button/icon */}
      <Button onClick={() => handleLikeCourse(course._id)} colorScheme="red"  variant = 'outline' size="sm" mt={4}>
       {
       !course.isLikedByUser ?  <AiOutlineHeart/> : <AiTwotoneHeart/>
       }
      </Button>
    </Box>
   )
}

