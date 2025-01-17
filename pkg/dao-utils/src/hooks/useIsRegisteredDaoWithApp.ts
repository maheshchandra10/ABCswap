import { parseAbi, keccak256, toHex } from 'viem';
import { namehash } from 'viem/ens';
import { useContractRead } from 'wagmi';
import { useDaoAddress } from './useDao';
import useDebounce from './useDebounce';
import { ZERO_ADDRESS } from '../constants';

function useIsRegisteredDaoWithApp(name: string, requiredApp?: string, delay?: number) {

  const [debouncedName, isDebouncing] = useDebounce(name, delay);

  const {
    address,
    error: daoError,
    isLoading: isFetching,
  } = useDaoAddress(debouncedName)

  const {
    data: appImpl,
    isLoading: isAppLoading,
    error: appError,
  } = useContractRead({
    address: address,
    abi: parseAbi([
      "function getApp(bytes32 _namespace, bytes32 _appId) public view returns (address)",
    ]),
    functionName: "getApp",
    args: requiredApp ? [keccak256(toHex('base')), namehash(requiredApp)] : undefined,
    enabled: !!requiredApp && !!address && address !== ZERO_ADDRESS,
  })

  const isLoading = isFetching || isAppLoading || isDebouncing;
  const error = daoError || appError;
  const daoExists = !isLoading && !!address && address !== ZERO_ADDRESS;
  const appExists = !!appImpl && appImpl !== ZERO_ADDRESS;
  const isRegistered = daoExists && (!requiredApp || appExists);
  return { isRegistered, error, isLoading };
}

export default useIsRegisteredDaoWithApp;
