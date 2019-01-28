import styled from 'styled-components';
import { desaturate } from 'polished';
import { I[CLASSNAME]Props } from './index';

interface IStyledProps extends I[CLASSNAME]Props {
  style?: React.CSSProperties;
  className?: string;
  [prop: string]: any;
}

export const StyledContainer = styled.div.attrs({
  style: (props: IStyledProps) => props.style || {}  // 优先级会高一些，行内样式
})`
  display: ${(props: IStyledProps) => props.visible ? 'block' : 'none'};
  border-radius: 5px;
  background: #ff9393;
  width: 200px;
  height: 100px;
  padding: 10px 20px;
  &.ant-btn-primary {
    background-color: ${(props: IStyledProps) => props.theme.main};
    border-color: ${(props: IStyledProps) => props.theme.main};
    &:hover {
      background-color: ${(props: IStyledProps) =>
    props.theme.main ? desaturate(0.2, props.theme.main) : 'inherit'};
    }
  }
`;

