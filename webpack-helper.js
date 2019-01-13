const LIB_MAP = {
  react: 'React',
  'react-dom': 'ReactDOM',
  antd: 'antd',
  mobx: 'mobx',
  'mobx-react': 'mobxReact',
  'mobx-state-tree': 'mobxStateTree',
  'ss-tree': 'ssTree',
  'styled-components': 'styled'
};

const COMMON_LIBS = [
  'react',
  'react-dom',
  'antd',
  'mobx',
  'mobx-react',
  'mobx-state-tree',
  'ss-tree'
];

module.exports = {
  getExternal: function (extraLibs = [], disableMap = false) {
    const libs = COMMON_LIBS.concat(extraLibs);
    const externals = {};
    libs.forEach(lib => {
      externals[lib] = disableMap ? lib : LIB_MAP[lib] || lib;
    });
    return externals;
  }
};
