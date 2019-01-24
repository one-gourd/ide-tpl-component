import styled from 'styled-components';

interface IContainer {
  visible?: boolean;
}

export const StyledContainer = styled.div.attrs({
  style: (props: any) => props.style || {}  // 优先级会高一些，行内样式
})`
  display: ${(props: IContainer) => props.visible ? 'block' : 'none'};
  border-radius: 5px;
  background: #ff9393;
  width: 200px;
  height: 100px;
  padding: 10px 20px;
`;

