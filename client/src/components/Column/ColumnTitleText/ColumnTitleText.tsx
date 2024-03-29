import { useDeleteColumnMutation } from '../../../services/columnService';
import { useErrorHandler } from '../../../hooks/useErrorHandler';
import { useTranslation } from '../../../hooks/useTranslation';
import GlobalSpinner from '../../Spinners/GlobalSpinner';
import DeleteConfirmModal from '../../modals/DeleteConfirmModal';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import './ColumnTitleText.scss';

interface ITitleProps {
  boardId: string;
  id: string;
  columnName: string;
  onOpenInput: () => void;
}

function ColumnTitleText({
  boardId,
  id,
  columnName,
  onOpenInput,
}: ITitleProps) {
  const [
    deleteColumn,
    { isLoading: isColumnDeleting, isError: deleteColumnError },
  ] = useDeleteColumnMutation();

  const onDelete = async () => {
    await deleteColumn({ boardId, id });
  };

  const t = useTranslation('column');
  useErrorHandler(deleteColumnError, t?.deleteError);

  return (
    <>
      {isColumnDeleting && <GlobalSpinner color="error" />}
      <Stack className="column-title__inner-wrapper" onClick={onOpenInput}>
        <Typography variant="h6" noWrap>
          {columnName}
        </Typography>
        <Tooltip title={t?.editName} id="column-title__edit-tooltip">
          <EditIcon />
        </Tooltip>
      </Stack>
      <DeleteConfirmModal element={t?.element} onDelete={onDelete}>
        <DeleteForeverIcon className="column__delete" />
      </DeleteConfirmModal>
    </>
  );
}

export default ColumnTitleText;
