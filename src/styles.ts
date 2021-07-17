import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 10px 40px;
  background: #003cbe;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #fff;
  font-family: 'Roboto-Medium';
  margin-top: 40px;
`;

export const Card = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  height: 50px;
  width: 100%;
  background: #008cef;
  margin-top: 15px;
  border-radius: 8px;
  padding: 0 20px;
`;

export const TextCard = styled.Text`
  font-size: 16px;
  color: #d5eeff;
  font-family: 'Roboto-Medium';
`;

export const ButtonAdd = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;

  height: 50px;
  background: transparent;
  border: 1px solid #0ed1ff;
  margin-top: auto;
  border-radius: 8px;
  padding: 0 20px;
  margin-bottom: 40px;
`;

export const ButtonDeleteCard = styled.TouchableOpacity`
  background: transparent;
`;

export const TextButton = styled.Text`
  font-size: 16px;
  color: #0ed1ff;
  font-family: 'Roboto-Medium';
`;
