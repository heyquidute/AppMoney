import React, { useState } from 'react';
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native';
import { Header } from '../../components/Header';
import { SmallButton } from '../../components/SmallButton';
import { Input } from '../../components/Input';
import { CategorySelectButton } from '../../components/CategorySelectButton';
import { FieldValues, useForm } from 'react-hook-form';
import { api } from '../../server/api';
import { SelectModal } from '../SelectModal';
import { Container, Content, FormContainer, Title, ContainerButtons, ContentButton, Button, ButtonTitle} from './styles';
import { format } from 'date-fns';

type TypeRegister = "up" | "down"

type DataType = {
  name: string,
  value: number,
  type: TypeRegister
  category?: string,
  date: string,
}

export function RegisterScreen() {

  const [selectType, setSelectType] = useState<TypeRegister>("up")
  const [category, setCategory] = useState({key: "categoria", name: "Selecione a categoria"})
  const [isOpenModal, setIsOpenModal] = useState(false)

  const { control, handleSubmit, reset } = useForm();

  async function postTransactions(data: DataType){
    try {
      await api.post('/transactions', data)      
    } catch (error) {
      Alert.alert("Erro no servidor.")
    }
  }

  function handlePress(type: TypeRegister){
    setSelectType(type);
  }

  function handleOpenModal() {
    setIsOpenModal(true)
  }

  function handleCloseModal() {
    setIsOpenModal(false)
  }

  function clear(){
    setSelectType("up");
    setCategory({key: "categoria", name: "Selecione a categoria"})
    reset({
      name:'',
      amount:'',
    })
  }

  function handleRegister(form: FieldValues){

    const currentDate = format(new Date(), 'dd/MM/yy')

    const data: DataType = {
      name: form.name,
      value: form.value,
      type: selectType,
      category: category.key,
      date: currentDate
    }

    if(category.key !== 'categoria'){
      data.category = category.key
    }

    postTransactions(data)
    clear()
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
      <Container>
      <Header isHome={false} type={selectType} screenName='Cadastro de transações'/>

      <Content>

        <FormContainer>
          <Title>Tipo de Transação</Title>

          <ContainerButtons>
            <SmallButton title="Entrada" type='up' isSelected={selectType === "up"} onPress={() => handlePress("up")}/>
            <SmallButton title="Saída" type='down' isSelected={selectType === "down"} onPress={() => handlePress("down")}/>
          </ContainerButtons>

          <Title>Dados da Transação</Title>
          <Input 
          name="name" 
          control={control} 
          placeholder='Insira o nome' 
          autoCapitalize='sentences' 
          autoCorrect={false} 
          />

          <Input 
          name="value" 
          control={control} 
          placeholder='Insira o valor' 
          keyboardType='numeric'
          />

          {selectType === "down" && <CategorySelectButton title={category.name} onPress={handleOpenModal}/>}
        </FormContainer>
        
        <ContentButton>
          <Button type={selectType} onPress={handleSubmit(handleRegister)}>
            <ButtonTitle>Confirmar</ButtonTitle>
          </Button>
        </ContentButton>
        
      </Content>

        <Modal visible={isOpenModal}>
          <SelectModal setCategory={setCategory} close={handleCloseModal} />
        </Modal>
      </Container>


    </TouchableWithoutFeedback>

    
  );
}


