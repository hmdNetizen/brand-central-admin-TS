import { useSelector, TypedUseSelectorHook } from "react-redux";
import { RootState } from "src/services";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
