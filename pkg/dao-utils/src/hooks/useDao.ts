import { normalize, namehash } from "viem/ens";
import { parseAbi } from "viem";
import { useContractRead } from "wagmi";
import useInstalledApp from "./useInstalledApp";
import { ARAGON_ENS_CONTRACT, ZERO_ADDRESS } from "../constants";


export class DAONotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DAONotFoundError";
  }
}

export function useDaoAddress(name: string = "") {
  let normalizedName: string = "";
  let error: Error | null = null;

  try {
    normalizedName = name.length > 0 ? normalize(`${name}.aragonid.eth`) : "";
  } catch (e: unknown) {
    error = e as Error;
  }

  const {
    data: publicResolver,
    error: ensError,
    isLoading: ensIsLoading,
  } = useContractRead({
    address: ARAGON_ENS_CONTRACT,
    abi: parseAbi(["function resolver(bytes32 _node) view returns (address)"]),
    functionName: "resolver",
    args: [namehash(normalizedName)],
    enabled: !!normalizedName,
  });

  const {
    data: address,
    error: resolverError,
    isLoading: resolverIsLoading,
  } = useContractRead({
    address: publicResolver,
    abi: parseAbi(["function addr(bytes32 _node) view returns (address)"]),
    functionName: "addr",
    args: [namehash(normalizedName)],
    enabled: publicResolver !== ZERO_ADDRESS,
  });

  error = error || ensError || resolverError;
  const isLoading = ensIsLoading || resolverIsLoading;

  if (!isLoading && !error && (!address || address === ZERO_ADDRESS)) {
    error = new DAONotFoundError("DAO not found");
  }

  return { address, error, isLoading };
}

export default function useDao(name?: string, app?: string) {

    const { address: daoAddress, error: daoError, isLoading: isDaoLoading } = useDaoAddress(name);
    const { address: appAddress, error: appError, isLoading: isAppLoading } = useInstalledApp(daoAddress, app);

    const error = daoError || appError;
    const isLoading = isDaoLoading || isAppLoading;
    
    return { address: daoAddress, appAddress, error, isLoading };
  
}
