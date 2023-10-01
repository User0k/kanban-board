import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useErrorHandler } from '../../hooks/useErrorHandler';
import { useDeleteUserMutation } from '../../services/userService';
import { resetAuth } from '../../store/slices/authSlice';
import DeleteConfirmModal from '../../components/modals/DeleteConfirmModal';
import PageSpinner from '../../components/Spinners/PageSpinner';
import UserAvatar from '../../components/UserAvatar';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import './ProfilePage.scss';

function ProfilePage() {
  const { currentUser } = useAppSelector((state) => state.authReducer);
  const id = currentUser?.id || '';
  const name = currentUser?.name || ' ';
  const color = currentUser?.color || '';
  const email = currentUser?.email || '';
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [deleteUser, { isError: deleteProfileError }] = useDeleteUserMutation();

  const onDeleteUser = async () => {
    dispatch(resetAuth());
    localStorage.clear();
    await deleteUser(id);
    navigate('/login');
  };

  useErrorHandler(deleteProfileError, 'Unable to delete user');

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
              <Stack
                direction="row"
                justifyContent="space-between"
                className="profile__email">
                <Typography
                  variant="body1"
                  component="h2"
                  color="text.secondary">
                  Email: {email}
                </Typography>
                <Tooltip title="Edit email">
                  <EditIcon className="edit-credentials-icon" />
                </Tooltip>
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                className="profile__name">
                <Typography
                  variant="body1"
                  component="h2"
                  color="text.secondary">
                  Name: {name}
                </Typography>
                <Tooltip title="Edit name">
                  <EditIcon className="edit-credentials-icon" />
                </Tooltip>
              </Stack>
            </Stack>
          </Stack>
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
      )}
    </Container>
  );
}

export default ProfilePage;
