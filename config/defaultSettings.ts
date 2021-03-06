import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  primaryColor: 'rgb(24, 144, 255)',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: '融职书城',
  pwa: false,
  logo: 'https://www.eduwork.cn/images/logo.png',
  iconfontUrl: '',
};

export default Settings;
