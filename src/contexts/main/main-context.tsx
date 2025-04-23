"use client";

import { SkillApi } from "@/api/skill";
import useFunction, {
  DEFAULT_FUNCTION_RETURN,
  UseFunctionReturnType,
} from "@/hooks/use-function";
import { Skill } from "@/types/skill";
import { createContext, useContext, useEffect } from "react";

interface ContextValue {
  getSkillsApi: UseFunctionReturnType<void, Skill[]>;
}

const MainContext = createContext<ContextValue>({
  getSkillsApi: DEFAULT_FUNCTION_RETURN,
});

export const MainProvider = ({ children }: { children: React.ReactNode }) => {
  const getSkillsApi = useFunction(SkillApi.getSkills, {
    disableResetOnCall: true,
  });

  useEffect(() => {
    getSkillsApi.call({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainContext.Provider
      value={{
        getSkillsApi,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export const useMainContext = () => useContext(MainContext);
