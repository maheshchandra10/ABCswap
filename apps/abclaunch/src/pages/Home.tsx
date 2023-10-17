import { Divider, HStack, Text, VStack, Image, Button } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

export default function Launchpad() {
    const navigate = useNavigate();
    return (
        <VStack bg="brand.100" pb="100px">
            <VStack spacing={0}>
                <Text color="brand.900" fontSize="72px" fontFamily="VictorSerifTrial">The ABC Launchpad!</Text>
                <Text color="brand.900" fontSize="24px" pt="32px">Build a regenerative economy with an</Text>
                <Text color="brand.900" fontSize="24px">Augmented Bonding Curve.</Text>
                <Divider paddingTop="48px"
                    borderColor="brand.900"
                    borderBottomWidth="1px"
                    width="100%"
                    margin="0 auto"
                />
            </VStack>
            <HStack spacing={20} paddingTop="40px" >
                <HStack>
                    <Image src="/launchpad/ContinuousFunding.svg" />
                    <Text color="brand.900" fontSize="20px" fontWeight="500">Continuous funding</Text>
                </HStack>
                <HStack>
                    <Image src="/launchpad/MarketAccessibility.svg" />
                    <VStack spacing={0}>
                        <Text color="brand.900" fontSize="20px">Market accessibility</Text>
                        <Text color="brand.900" fontSize="20px">& lower volatility</Text>
                    </VStack>
                </HStack>
                <HStack>
                    <Image src="/launchpad/SustainableGrowth.svg" />
                    <Text color="brand.900" fontSize="20px">Sustainable growth</Text>
                </HStack>
            </HStack>
            <HStack spacing={16} pt="46px">
                <VStack sx={{
                    padding: '46px 122px 44px 122px',
                    borderRadius: '30px',
                    boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.00)'
                }} bgColor="brand.300" spacing={0}>
                    <Text color="brand.900" fontSize="40px" fontFamily="VictorSerifTrial">New DAO</Text>
                    <Text color="brand.900" fontSize="20px" mt="34px">I want to create a new</Text>
                    <Text color="brand.900" fontSize="20px">DAO and launch an ABC.</Text>
                    <Button mt="29px" onClick={() => navigate('/new-dao')}>Launch on a new DAO <ArrowForwardIcon ml="5px" /></Button>
                </VStack>
            </HStack>
        </VStack>
    )
}
