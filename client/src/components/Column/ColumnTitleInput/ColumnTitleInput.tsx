import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { useUpdateColumnMutation } from '../../../services/columnService';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import './ColumnTitleInput.scss';

interface IInputProps {
  boardId: string;
  id: string;
  title: string;
  columnName: string;
  onCloseInput: () => void;
  setColumnName: Dispatch<SetStateAction<string>>;
}

function ColumnTitleInput({
  id,
  boardId,
  title,
  columnName,
  onCloseInput,
  setColumnName,
}: IInputProps) {
  const [editColumnName, setEditColumnName] = useState(title);
  const [updateColumn] = useUpdateColumnMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCloseInput();

    if (editColumnName.length) {
      setColumnName(editColumnName);
      await updateColumn({ id, boardId, title });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="column__title-input"
        type="text"
        defaultValue={columnName}
        autoFocus={true}
        onChange={(e) => setEditColumnName(e.target.value)}
      />
      <Button className="column__title-confirm" type="submit">
        <CheckIcon />
      </Button>
      <Button className="column__title-cancel" onClick={onCloseInput}>
        <ClearIcon />
      </Button>
    </form>
  );
}

export default ColumnTitleInput;
