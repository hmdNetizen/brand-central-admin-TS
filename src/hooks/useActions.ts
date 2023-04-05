import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { authActions } from "src/services/actions";

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators({ ...authActions }, dispatch);
};
