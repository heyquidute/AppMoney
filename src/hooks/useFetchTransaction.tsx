import React, { useEffect, useState } from "react";
import { ListCardType } from "../helpers/formatted";
import { api } from "../server/api";
import { Alert } from "react-native";

export const useFetchTransaction = () => {
    
    const [transactions, setTransactions] = useState<ListCardType[]>([]);
    const [loading, setLoading] = useState(false);

    async function fetchTransaction(){
        try{
          setLoading(true);
          const { data } = await api.get('/transactions')
          setTransactions(data)
        }catch(erro){
          Alert.alert('Erro no servidor, tente novamente mais tarde')
        }finally{
          setLoading(false);
        }
      }

      useEffect(()=>{
        fetchTransaction()
      },[])

      return { transactions, loading, fetchTransaction }
}