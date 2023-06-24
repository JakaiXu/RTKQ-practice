import { useState } from "react";
import StudentsForm from "./StudentsForm";
import { useDeleteStudentsMutation } from "../store";
type StuProps = {
  student: {
    id: number;
    attributes: {
      name: string;
      gender: string;
      age: number;
      address: string;
    };
  };
};
const Student = ({ student: { id, attributes } }: StuProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [deleteStudent, {isError,isLoading,isSuccess}] = useDeleteStudentsMutation();

  const handleDelete = () => {
    deleteStudent(id);
  };
  const handleUpdate = () => {
    setIsEdit(!isEdit);
  };
  const cancelEdit = () => {
    setIsEdit(false);
  };
  return (
    <>
      {!isEdit && !isSuccess && (
        <tr key={id} className="border h-12 text-center">
          <td>{attributes.name}</td>
          <td>{attributes.age}</td>
          <td>{attributes.gender}</td>
          <td>{attributes.address}</td>
          <td className="px-4">
            <button
              onClick={handleDelete}
              className="border px-2 rounded bg-red-500 text-white mr-4"
            >
              Delete
            </button>
            <button
              onClick={handleUpdate}
              className="border px-2 rounded bg-blue-500 text-white"
            >
              Modify
            </button>
          </td>
        </tr>
      )}
      {isSuccess && <tr><td colSpan={5}>data is deteled</td></tr>}
      {isEdit && <StudentsForm id={id} cancelEdit={cancelEdit} />}
    </>
  );
};

export default Student;
