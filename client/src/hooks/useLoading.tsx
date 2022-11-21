import { useMemo, useState } from "react";
import LoadingSnackBar from "../components/LoadingSnackBar";

const useLoading = (initialState: boolean, loadingMessage: string) => {
  const [isLoading, setIsLoading] = useState(initialState);
  const isLoadingEl = isLoading && <LoadingSnackBar loadingMessage={loadingMessage} />;
  return useMemo(() => ({ setIsLoading, isLoadingEl }), [isLoading]);
};

export default useLoading;
