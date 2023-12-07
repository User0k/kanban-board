import { useAppSelector } from '../../hooks/useAppSelector';
import { useDeleteProfile } from '../../hooks/useDeleteProfile';
import EditProfileModal from '../../components/modals/EditProfileModal';
import DeleteConfirmModal from '../../components/modals/DeleteConfirmModal';
import PageSpinner from '../../components/Spinners/PageSpinner';
import UserAvatar from './UserAvatar';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import './ProfilePage.scss';

function ProfilePage() {
  const { currentUser } = useAppSelector((state) => state.authReducer);
  const id = currentUser?.id || '';
  const color = currentUser?.color || '';
  const name = currentUser?.name || ' ';
  const email = currentUser?.email || '';
  const onDeleteUser = useDeleteProfile(id);

  return (
    <Container id="profile" maxWidth="sm">
      {!currentUser ? (
        <PageSpinner />
      ) : (
        <Stack alignItems="center" className="profile__body">
          <Typography
            variant="h5"
            component="h1"
            color="text.secondary"
            className="profile__header">
            Welcome to your profile
          </Typography>
          <Stack direction="row" className="profile__credentials-wrapper">
            <UserAvatar className="avatar-large" name={name} color={color} />
            <Stack>
              <Typography
                variant="body1"
                component="h2"
                color="text.secondary"
                className="profile__name">
                Name: {name}
              </Typography>
              <Typography
                variant="body1"
                component="h2"
                color="text.secondary"
                className="profile__email">
                Email: {email}
              </Typography>
            </Stack>
          </Stack>
          <Stack gap={2}>
            <EditProfileModal id={id} name={name} email={email}>
              <Button
                variant="contained"
                color="info"
                className="profile__btn-edit">
                Edit profile
              </Button>
            </EditProfileModal>
            <DeleteConfirmModal
              element="profile"
              provideTooltip={false}
              onDelete={onDeleteUser}>
              <Button
                variant="contained"
                color="error"
                className="profile__btn-delete">
                Delete profile
              </Button>
            </DeleteConfirmModal>
          </Stack>
        </Stack>
      )}
    </Container>
  );
}

export default ProfilePage;
