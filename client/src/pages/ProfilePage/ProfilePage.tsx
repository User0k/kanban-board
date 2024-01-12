import { useAppSelector } from '../../hooks/useAppSelector';
import { useDeleteProfile } from '../../hooks/useDeleteProfile';
import { useTranslation } from '../../hooks/useTranslation';
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
  const t = useTranslation('profilePage');

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
            {t?.header}
          </Typography>
          <Stack direction="row" className="profile__credentials-wrapper">
            <UserAvatar className="avatar-large" name={name} color={color} />
            <Stack>
              <Typography
                variant="body1"
                component="h2"
                color="text.secondary"
                className="profile__name">
                {t?.name}
                {name}
              </Typography>
              <Typography
                variant="body1"
                component="h2"
                color="text.secondary"
                className="profile__email">
                {t?.email}
                {email}
              </Typography>
            </Stack>
          </Stack>
          <Stack gap={2}>
            <EditProfileModal id={id} name={name} email={email}>
              <Button
                variant="contained"
                color="info"
                className="profile__btn-edit btn-min-height">
                {t?.edit}
              </Button>
            </EditProfileModal>
            <DeleteConfirmModal
              element={t?.element}
              provideTooltip={false}
              onDelete={onDeleteUser}>
              <Button
                variant="contained"
                color="error"
                className="profile__btn-delete btn-min-height">
                {t?.delete}
              </Button>
            </DeleteConfirmModal>
          </Stack>
        </Stack>
      )}
    </Container>
  );
}

export default ProfilePage;
