import { Box, Button, Center, Flex, Grid, GridItem, Heading, Image, Spacer, Spinner, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect } from 'react'
import { AiOutlineHeart, AiTwotoneHeart } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {  getAllEnrolledCourses } from '../Redux/Actions/Course'

function Dashboard() {
    const user = {
        createdAt: "2023-11-06T14:06:54.248Z",
        email: "geetanjalchawla1919@gmail.com",
        name : "Geetanjal Chawla",
        role :  "user",
        updatedAt: "2023-11-06T14:06:54.248Z"
    
    }

  return (
    <Box w="full" h="full"  p={[4,8]}>
        <CourseListing user={user}/> 
    </Box>
  )
}

export default Dashboard



function CourseListing({user}) {
    const courses = useSelector((state) => state.course.enrolledCourses);
    const loading = useSelector((state) => state.course.loading);

    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(getAllEnrolledCourses());
    }, [dispatch]);
  

    
    return (
      <Center maxW={'container.xl'} mx={'auto'}>
        <Box p={4} w="full">
        <Heading mb={4}>Good Morning {user.name}</Heading>
          {(courses.length === 0 && loading) ? (
            <Flex w="full" h="full" minH={'50vh'} alignItems={'center'} justifyContent={'center'} >
              <Spinner size={'xl'} />
            </Flex>
          ) : (
            <Tabs isFitted variant="enclosed" colorScheme='blackAlpha'>
            <TabList>
              <Tab >All</Tab>
              <Tab >Completed</Tab>
              <Tab>Not Completed</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Grid templateColumns="repeat(3, 1fr)" gap={6} w="full">
                  {courses.map((course) => (
                    <GridItem key={course._id}>
                      <CourseCard course={course.courseId} />
                    </GridItem>
                  ))}
                </Grid>
              </TabPanel>
              <TabPanel>
                <Grid templateColumns="repeat(3, 1fr)" gap={6} w="full">
                  {courses.filter(course=>course.isCompleted).map((course) => (
                    <GridItem key={course._id}>
                      <CourseCard course={course.courseId} />
                    </GridItem>
                  ))}
                </Grid>
              </TabPanel>
              <TabPanel>
                <Grid templateColumns="repeat(3, 1fr)" gap={6} w="full">
                  {courses.filter(course=>!course.isCompleted).map((course) => (
                    <GridItem key={course._id}>
                      <CourseCard course={course.courseId} />
                    </GridItem>
                  ))}
                </Grid>
              </TabPanel>
              {/* Additional TabPanels can be added if needed */}
            </TabPanels>
          </Tabs>
          )}
        </Box>
      </Center>
    );
  }


  function CourseCard({course}) {    
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
    </Box>
   )
}