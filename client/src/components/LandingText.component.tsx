import { Heading } from "@chakra-ui/layout";

const LandingText = () => {
   return (
      <Heading
         as='h1'
         fontSize={{
            sm: "5xl",
            md: "6xl",
            lg: "7xl",
         }}
         color='white'
         fontWeight='black'
         lineHeight='normal'>
         Discover a place
         <br />
         you&prime;ll love to live
      </Heading>
   );
};

export default LandingText;
