export class SideMenuModel {
  menuTitle: string;
  menuIcon: string;
  isTabBarItem: boolean;
  isDefaultTabBarItem: boolean;

  constructor(
    menuTitle: string,
    menuIcon: string,
    isTabBarItem: boolean,
    isDefaultTabBarItem: boolean
  ) {
    this.menuTitle = menuTitle;
    this.menuIcon = menuIcon;
    this.isTabBarItem = isTabBarItem;
    this.isDefaultTabBarItem = isDefaultTabBarItem;
  }
}
