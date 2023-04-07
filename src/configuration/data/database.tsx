import React, { createContext, useContext, useState } from "react";
import { useAuth } from "../authentication/authentication";
import { InstanceInterface } from "./interface";

interface FirebaseDataStore {
  instancesList: InstanceInterface[],
  setInstancesList?: (data: InstanceInterface[]) => void;
}

const DataStore = createContext<FirebaseDataStore>({
  instancesList: []
});

function useFirebaseDataSource(): FirebaseDataStore {
  const auth = useAuth();
  const [instancesList, setInstancesList] = useState<InstanceInterface[]>([]);

  if (!auth?.user) return { setInstancesList, instancesList};

  


  return { instancesList,  setInstancesList }
}


export function useDatabase() {
  return useContext(DataStore)
}

export function DataProvider({ children }: { children: React.ReactNode}) {

  return <DataStore.Provider value={useFirebaseDataSource()}>
    {children}
  </DataStore.Provider>
}