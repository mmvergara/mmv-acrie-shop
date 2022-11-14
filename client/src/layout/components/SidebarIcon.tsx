interface SidebarIconProps {
  icon: JSX.Element | JSX.Element[];
}

const SidebarIcon: React.FC<SidebarIconProps> = ({ icon }: SidebarIconProps) => {
  return <div className='sidebar-icon'>{icon}</div>;
};

export default SidebarIcon;
