import styled from "@emotion/styled";

export const BoxPrincipal = styled.div`
  background: linear-gradient(
    90deg,
    rgba(145, 84, 247, 0.9697128851540616) 50%,
    rgba(177, 89, 224, 1) 100%,
    rgba(177, 89, 224, 1) 100%
  );
  width: 100%;
  height: 100%;
  padding: 30px;
`;

export const BoxText = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
`


export const BoxCards = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  grid-auto-rows: auto;
`;