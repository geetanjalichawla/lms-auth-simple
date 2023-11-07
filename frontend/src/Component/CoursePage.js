import React, { useEffect, useState } from 'react';
import { Box, Heading, Image, Text, Badge, Button, Grid, VStack, Avatar, Input, Flex, Spinner, useToast, CheckboxIcon } from '@chakra-ui/react';
import axios from 'axios';
import { server } from '../Redux/store';
import { useParams } from 'react-router-dom';
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';

const Review = ({ reviewData }) => (
  <Box my={4} display="flex">
    <Avatar name={reviewData.author} src={`https://i.pravatar.cc/50?u=${reviewData.author}`} />
    <Box ml={4}>
      <Text fontSize="lg">Author: {reviewData.author}</Text>
      <Text fontSize="lg">Rating: {reviewData.rating}</Text>
      <Text fontSize="lg">Comment: {reviewData.comment}</Text>
    </Box>
  </Box>
);
const Reviews = ({ reviews }) => (
  <Box>
    <Heading as="h2" size="lg">Reviews</Heading>
    {reviews?.map((review, index) => (
      <Review key={index} reviewData={review} />
    ))}
  </Box>
);

const CourseDetails = () => {
  const [course, setCourse] = useState({});
  const [loading, setLoading] = useState(true);
  const {id}= useParams();
  useEffect(() => {
    fetch();
  }, [])
  

  const fetch = ()=>{
    axios
    .get(`${server}/courses/${id}`,{
    withCredentials: true
    })
    .then((res) => {
      setCourse(res.data);
      setLoading(false);
    })
    .catch((e) => {
        });
  }

  const toast = useToast()
  const [enroll, setEnroll] = useState(false)
  const enrollCourse = ()=>{
    setEnroll(true)
    axios
    .post(`${server}/enroll-the-course/${id}`,null,{
    withCredentials: true
    })
    .then((res) => {
      fetch();
      toast({
        title: 'Course enrolled',
        description:res.data.message|| 'You have liked the course!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setEnroll(false);
    
    })
    .catch((e) => {
      setEnroll(false);

        });
      
  }
  const markAsCompleted = ()=>{
    setEnroll(true)
    axios
    .put(`${server}/mark-as-completed/${id}`,null,{
    withCredentials: true
    })
    .then((res) => {
      fetch();
      toast({
        description:res.data.message|| 'You have liked the course!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setEnroll(false);
    
    })
    .catch((e) => {
      setEnroll(false);

        });
      
  }
  return (<>
{
  loading ? <Flex w="full" h="full" justifyItems={'center'} alignItems={'center'}>
      <Spinner/>
  </Flex>:
    <Box w="full"  maxW="1000px" m="auto" py={[4,8]}>
    <Grid templateColumns={{md:"3fr 2fr", sm:'1fr'}} gap={6}>
    <Box h="full">
      <Image my={'auto'} src={course.thumbnail} alt={course.name} maxH="400px" w="100%" borderRadius="4px" />
    </Box>
    <Box>
      <Heading as="h1" size="xl">
        {course.name}
      </Heading>
      <Text fontSize="lg" mt={2}>
        Instructor: {course.instructor}
      </Text>
      <Badge colorScheme="green" fontSize="lg" mt={2}>
        {course.category}
      </Badge>
      <Text fontSize="lg" mt={4}>
        {course.description}
      </Text>
      <Text fontSize="lg" mt={4}>
        Enrollment Status: {course.enrollmentStatus}
      </Text>
      <Text fontSize="lg" mt={2}>
        Duration: {course.duration} weeks
      </Text>
      <Text fontSize="lg" mt={4}>
        Prerequisites: {course.prerequisites?.join(', ')}
      </Text>
      <Text fontSize="lg" mt={2}>
        Skills Taught: {course.skills?.join(', ')}
      </Text>
     {course.isEnrolled ?
      <Button isLoading= {enroll} onClick={markAsCompleted} colorScheme="blackAlpha" bg={'black'} size="lg" mt={4} w="100%">
      Mark as {course.isCompleted ? 'Not Completed':"Completed"}
      {course.isCompleted ? <AiFillCloseCircle/>:<AiFillCheckCircle/>}
       
      </Button> 
     :
     <Button isLoading= {enroll} onClick={()=>enrollCourse()} colorScheme="blackAlpha" bg={'black'} size="lg" mt={4} w="100%">
        Enroll Now
      </Button>}
    </Box>
  </Grid>
        <Reviews reviews={course?.reviews} />
</Box>
  
}
</>
  );
};

export default CourseDetails;
