import React, { useState } from "react";
import { Container, Text, VStack, Button, IconButton, useToast } from "@chakra-ui/react";
import { FaMapMarkerAlt } from "react-icons/fa";

const Index = () => {
  const [location, setLocation] = useState(null);
  const toast = useToast();

  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          toast({
            title: "Location fetched successfully.",
            description: `Latitude: ${latitude}, Longitude: ${longitude}`,
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        },
        (error) => {
          toast({
            title: "Error fetching location.",
            description: error.message,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        },
      );
    } else {
      toast({
        title: "Geolocation not supported.",
        description: "Your browser does not support geolocation.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">GPS Device Location</Text>
        <IconButton aria-label="Fetch Location" icon={<FaMapMarkerAlt />} size="lg" onClick={fetchLocation} />
        {location && (
          <VStack spacing={2}>
            <Text>Latitude: {location.latitude}</Text>
            <Text>Longitude: {location.longitude}</Text>
          </VStack>
        )}
      </VStack>
    </Container>
  );
};

export default Index;
