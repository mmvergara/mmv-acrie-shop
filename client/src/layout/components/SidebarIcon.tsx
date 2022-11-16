interface SidebarIconProps {
  icon: JSX.Element | JSX.Element[];
  text: string;
}

const SidebarIcon: React.FC<SidebarIconProps> = ({ icon, text }: SidebarIconProps) => {
  return (
    <div className='sidebar-icon group'>
      {icon}
      <span className='fixed bg-darkNavsecondary hidden sm:block p-2 text-sm left-[75px] rounded-md whitespace-nowrap scale-0 transition-all ease-in group-hover:scale-100 group-hover:text-pri_orange '>
        {text}
      </span>
    </div>
  );
};

export default SidebarIcon;
