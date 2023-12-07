import Avatar from '@mui/material/Avatar';
import { nameAbbreviation } from '../../../utils/nameAbbreviation';

interface IAvatarProps {
  name: string;
  color: string;
  className?: string;
}

function UserAvatar({ name, color, className }: IAvatarProps) {
  return (
    <Avatar sx={{ bgcolor: color }} className={className}>
      {nameAbbreviation(name)}
    </Avatar>
  );
}

export default UserAvatar;
