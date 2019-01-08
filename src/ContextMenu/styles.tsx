import styled from 'styled-components';
import { Menu } from 'antd';

const MenuItem = Menu.Item;

interface IMenuContainer {
  left?: number;
  top?: number;
}

interface IStyledMenu {
  width?: number;
}

export const MenuContainer = styled.div`
  position: fixed;
  left: ${(props: IMenuContainer) => props.left || 0}px;
  top: ${(props: IMenuContainer) => props.top || 0}px;
  background: white;
  box-shadow: 0px 2px 10px #999999;
`;

export const StyledMenu = styled(Menu)`
  width: ${(props: IStyledMenu) => props.width || 256}px;
`;

export const StyledMenuItem = styled(MenuItem)`
  .menuWrap & {
    display: flex;
    min-width: 160px;
    justify-content: space-between;
  }
`;
