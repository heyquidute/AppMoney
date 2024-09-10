import React, { useEffect } from 'react';
import { FlatList } from 'react-native';
import theme from '../../theme';
import { formattedValue, getTotalForTypes, ListCardType } from '../../helpers/formatted';
import { Total } from '../../components/Total';
import { Banner } from '../../components/Banner';
import { Header } from '../../components/Header';
import { Loading } from '../../components/Loading';
import { TransactionCard, TransactionCardProps} from '../../components/TransactionCard';
import { Container, ContainerBanners, Content, ContainerList } from './styles';
import { useIsFocused } from '@react-navigation/native';
import { useFetchTransaction } from '../../hooks/useFetchTransaction';

export function Home() {
  const isFocused = useIsFocused();
  const { transactions, loading,  fetchTransaction} = useFetchTransaction();
  const { total, totalDown, totalUp } = getTotalForTypes(transactions)
  
  function renderListTransactions(){
    return(
      <ContainerList>
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => 
            <TransactionCard 
              name={item.name}
              type={item.type}
              value={formattedValue(item.value)}
              category={item.category}
              date={item.date}
            />}
          showsVerticalScrollIndicator={false}
        />
      </ContainerList>
    ) 
  }

  useEffect(()=>{
    fetchTransaction()
  },[isFocused])

  return (
    <Container>
      <Header isHome type='up' screenName='MyMoney'/>

      <Content>
        <Total value= {total} />
        <ContainerBanners>
          <Banner title='Entradas' type='up' value= {totalUp} />
          <Banner title='Saídas' type='down' value= {totalDown} />
        </ContainerBanners>

      { loading ? <Loading background={theme.COLORS.BACKGROUND} loadColor={theme.COLORS.PRIMARY} /> : renderListTransactions()}
        
      </Content>
    </Container>
  );
}


