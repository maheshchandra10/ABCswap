import { Divider, HStack, Text, VStack, Image, Button, InputGroup, Input, InputRightAddon } from '@chakra-ui/react';
import { useState } from 'react';
import { CheckCircleIcon, WarningTwoIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
// import CustomInput from '../../../../shared/src/presentation/components/CustomInput';
// import CustomInputRightAddon from '../../../../shared/src/presentation/components/CustomInputRightAddon';

export default function Home() {

    const [dao, setDao] = useState<string>("");
    const [userInteracted, setUserInteracted] = useState<boolean>(false);
    const [completed, setCompleted] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleDaoChange = (dao: string) => {
        setUserInteracted(true);
        setDao(dao);
        // Verify if the name is valid

        setCompleted(true);
    }

    return (
        <VStack bg="brand.100" pb="100px">
            <VStack spacing={0}>
                <Text color="brand.900" fontSize="72px" fontFamily="VictorSerifTrial">Welcome to ABC Swap</Text>
                <Text color="brand.900" fontSize="24px" pt="32px">Lorem ipsum</Text>
                <Text color="brand.900" fontSize="24px">sit amet.</Text>
                <Divider paddingTop="48px"
                    borderColor="brand.900"
                    borderBottomWidth="1px"
                    width="100%"
                    margin="0 auto"
                />
            </VStack>
            <HStack spacing={20} paddingTop="40px" >
                <HStack>
                    <Image src="/swap-home/ContinuousFunding.svg" />
                    <Text color="brand.900" fontSize="20px" fontWeight="500">Continuous funding</Text>
                </HStack>
                <HStack>
                    <Image src="/swap-home/MarketAccessibility.svg" />
                    <VStack spacing={0}>
                        <Text color="brand.900" fontSize="20px">Market accessibility</Text>
                        <Text color="brand.900" fontSize="20px">& lower volatility</Text>
                    </VStack>
                </HStack>
                <HStack>
                    <Image src="/swap-home/SustainableGrowth.svg" />
                    <Text color="brand.900" fontSize="20px">Sustainable growth</Text>
                </HStack>
            </HStack>
            <VStack spacing={4} mt="100px" >
                <Text color="brand.900" fontSize="40px" fontFamily="VictorSerifTrial">Select your DAO</Text>
                <InputGroup mt="55px">
                    <Input 
                        w="408px"
                        // rightAddon={true}
                        placeholder="Type an organization name"
                        value={dao ?? ''}
                        autoFocus={true}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            handleDaoChange(e.target.value);
                        }}
                    />
                    <InputRightAddon>
                        {userInteracted ? (dao.length > 0 ? <CheckCircleIcon color="brand.500" /> : <WarningTwoIcon color="red.500" />) : ""}
                    </InputRightAddon>
                </InputGroup>
                <Button mt="40px" disabled={!completed} w="310px" onClick={() => navigate(`/${dao}`)}>Next</Button>
            </VStack>
        </VStack>
    )
}