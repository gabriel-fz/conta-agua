import React, { useState, useCallback, useEffect } from 'react';
import { StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { format, isToday } from 'date-fns';
import AsyncStorage from '@react-native-community/async-storage';

import {
  Container,
  Title,
  Card,
  TextCard,
  ButtonAdd,
  TextButton,
  ButtonDeleteCard,
} from './styles';

type List = {
  date: string;
  formattedHour: string;
};

const App: React.FC = () => {
  const [list, setList] = useState<List[]>([]);
  const [totalWater, setTotalWater] = useState<number>(0);
  const amountOfWater = 0.7;

  useEffect(() => {
    AsyncStorage.getItem('@contaagua:list').then(response => {
      if (response) {
        const formattedResponse: List[] = JSON.parse(response);

        if (
          formattedResponse.length > 0 &&
          isToday(new Date(formattedResponse[0].date))
        ) {
          const newTotalWater = formattedResponse.length * amountOfWater;

          setList(formattedResponse);
          setTotalWater(parseFloat(newTotalWater.toFixed(2)));
        }
      }
    });
  }, []);

  const handleAdd = useCallback(() => {
    const date = new Date();

    const newItemList = {
      date: date.toString(),
      formattedHour: format(date, 'HH:mm'),
    };

    const newTotalWater = totalWater + amountOfWater;

    setList(item => [...item, newItemList]);
    setTotalWater(parseFloat(newTotalWater.toFixed(2)));
    AsyncStorage.setItem(
      '@contaagua:list',
      JSON.stringify([...list, newItemList]),
    );
  }, [totalWater, list]);

  const handleRemove = useCallback(
    (date: string) => {
      const newList = list.filter(item => item.date !== date);

      const newTotalWater = totalWater - amountOfWater;

      setList(newList);
      setTotalWater(parseFloat(newTotalWater.toFixed(2)));
      AsyncStorage.setItem('@contaagua:list', JSON.stringify(newList));
    },
    [list, totalWater],
  );

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#003CBE" />
      <Container>
        <Title>Quantidade ingerida</Title>

        <Card>
          <TextCard>{totalWater} Litros</TextCard>
        </Card>

        <Title>Horários:</Title>

        {list.map(item => (
          <Card key={item.date}>
            <TextCard>{item.formattedHour}</TextCard>

            <ButtonDeleteCard onPress={() => handleRemove(item.date)}>
              <Icon name="trash" size={20} color="#fff" />
            </ButtonDeleteCard>
          </Card>
        ))}

        <ButtonAdd onPress={handleAdd}>
          <TextButton>Adicionar coqueteleira</TextButton>
        </ButtonAdd>
      </Container>
    </>
  );
};

export default App;
