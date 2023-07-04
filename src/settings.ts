interface DefaultSettings {
  title: string;
  showSettings: boolean;
  tagsView: boolean;
  fixedHeader: boolean;
  sidebarLogo: boolean;
  errorLog: string;
}

const defaultSettings: DefaultSettings = {
  title: 'youlai-mall',
  showSettings: true,
  tagsView: false,
  fixedHeader: true,
  // 是否显示Logo
  sidebarLogo: true,
  errorLog: 'production',
};

export default defaultSettings;
