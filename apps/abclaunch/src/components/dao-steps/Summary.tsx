import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Checkbox, Table, Tbody, Td, Text, Th, Thead, Tr, VStack } from "@chakra-ui/react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { newDaoNameState, newDaoVotingState, newDaoTokenState, newDaoTokenSupplyState, newDaoAbcState, newDaoCheckedState } from "../../recoil";
import { getCollateralTokenInfo } from "../../utils/token-info";

export default function Summary() {
    const daoName = useRecoilValue(newDaoNameState);
    const votingSettings = useRecoilValue(newDaoVotingState);
    const tokenSettings = useRecoilValue(newDaoTokenState);
    const initialTotalSupply = useRecoilValue(newDaoTokenSupplyState);
    const abcConfig = useRecoilValue(newDaoAbcState);
    const setChecked = useSetRecoilState(newDaoCheckedState);
    return (
        <Box pt="100px">
            <VStack spacing={4}>
                <Text fontFamily="VictorSerifTrial" fontSize="72px" color="brand.900">Launch your DAO</Text>
                <Text fontSize="24px" color="brand.900" >Make sure your settings are correct</Text>
                <Accordion width="80%">
                    <AccordionItem>
                        <AccordionButton borderBottom="1px solid" borderBottomColor="brand.900">
                            <Box flex='1' textAlign='left'>
                                <Text color="brand.900">Organization settings</Text>
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel pb={4}>
                            <Text>
                                Organization name: <Text as="b">{daoName}</Text>
                            </Text>
                        </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionButton borderBottom="1px solid" borderBottomColor="brand.900">
                            <Box flex='1' textAlign='left'>
                                <Text color="brand.900">Governance settings</Text>
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel pb={4}>
                            <Text>
                                Support: <Text as="b"> {votingSettings.supportRequired}%</Text>
                            </Text>
                            <Text>
                                Minimum approval: <Text as="b"> {votingSettings.minimumAcceptanceQuorum}%</Text>
                            </Text>
                            <Text>
                                Vote duration: <Text as="b"> {votingSettings.voteDurationDays} days {votingSettings.voteDurationHours} hours {votingSettings.voteDurationMinutes} minutes</Text>
                            </Text>
                        </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionButton borderBottom="1px solid" borderBottomColor="brand.900">
                            <Box flex='1' textAlign='left'>
                                <Text color="brand.900">Token settings</Text>
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel pb={4}>
                            <Text>
                                Token name: <Text as="b">{tokenSettings.tokenName}</Text>
                            </Text>
                            <Text>
                                Token symbol: <Text as="b">{tokenSettings.tokenSymbol}</Text>
                            </Text>
                            <Text>
                                Initial token supply: <Text as="b">{initialTotalSupply} {tokenSettings.tokenSymbol}</Text>
                            </Text>
                            <Table variant="simple" mt="20px" backgroundColor="brand.200" borderRadius="15px">
                                <Thead>
                                    <Tr>
                                        <Th><Text color="brand.900" fontSize="12px" fontFamily="Roboto">HOLDER ACCOUNT</Text></Th>
                                        <Th><Text color="brand.900" fontSize="12px" fontFamily="Roboto">BALANCE</Text></Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {tokenSettings.tokenHolders?.map((holder, index) => (
                                        <Tr key={index}>
                                            <Td>{holder[0] || "-"}</Td>
                                            <Td>{holder[1] !== null ? holder[1] : "-"}</Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionButton borderBottom="1px solid" borderBottomColor="brand.900">
                            <Box flex='1' textAlign='left'>
                                <Text color="brand.900">Augmented bonding curve settings</Text>
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel pb={4}>
                            <Text>
                                Reserve ratio: <Text as="b">{abcConfig.reserveRatio}%</Text>
                            </Text>
                            <Text>
                                Colateral token: <Text as="b">{getCollateralTokenInfo(abcConfig.collateralToken)?.tokenSymbol}</Text>
                            </Text>
                            <Text>
                                Initial reserve token: <Text as="b">{abcConfig.reserveInitialBalance} {getCollateralTokenInfo(abcConfig.collateralToken)?.tokenSymbol}</Text>
                            </Text>
                            <Text>
                                Entry tribute: <Text as="b">{abcConfig.entryTribute}%</Text>
                            </Text>
                            <Text>
                                Exit tribute: <Text as="b">{abcConfig.exitTribute}%</Text>
                            </Text>
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
                <VStack spacing={-1}>
                    <Text fontSize="16px">Review all the settings.</Text>
                    <Text fontSize="16px">If there are any mistakes, fix them before proceeding.</Text>
                </VStack>
                <Checkbox colorScheme="brand" onChange={(e) => setChecked(e.target.checked)}><Text as="b">I confirm that the above information is correct.</Text></Checkbox>
            </VStack>
        </Box>
    )
}