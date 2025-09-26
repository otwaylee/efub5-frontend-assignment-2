import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

export const SearchBar = styled.input`
  flex: 1;
  padding: 8px;
`;

export const ProductCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 500px;
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

export const ProductImage = styled.img`
  width: 70px;
  height: 70px;
  object-fit: contain;
  margin-right: 16px;
`;

export const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  gap: 6px;

  p {
    margin: 0;
    font-size: 14px;
    color: #333;

    &:first-child {
      font-weight: bold;
      font-size: 16px;
    }
  }
`;

export const LoadMoreButton = styled.div`
  margin: 20px;
  padding: 12px 24px;
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  border-radius: 10px;
  cursor: pointer;
  text-align: center;
  font-weight: bold;

  &:hover {
    background-color: #eee;
  }
`;
