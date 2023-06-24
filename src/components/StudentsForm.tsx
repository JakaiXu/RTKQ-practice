import React, { ChangeEvent, useState, useEffect,} from "react";
import {
  useCreateStudentsMutation,
  useGetStudentByIdQuery,
  useUpdateStudentMutation,
} from "../store";
type STU = {
  stu: { name: string; gender: string; age: number; address: string };
  cancelEdit: () => void;
  id: number;
};
const StudentsForm = ({ stu, cancelEdit, id }: STU) => {
  const { data: stuData, isSuccess } = useGetStudentByIdQuery(id, {
    skip: !id,
  });
  const initialState = {
    name: "",
    age: 0,
    gender: "",
    address: "",
  };
  const [createStudent, { isSuccess: isAddSuccess }] =
    useCreateStudentsMutation();
  const [updateStudent, { isSuccess: isUpdateSuccess }] =
    useUpdateStudentMutation();
  const [inputData, setInputData] = useState(initialState);
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputData((prevState) => ({ ...prevState, name: e.target.value }));
  };
  const handleAgeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputData((prevState) => ({ ...prevState, age: +e.target.value }));
  };
  const handleGenderChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setInputData((prevState) => ({ ...prevState, gender: e.target.value }));
  };
  const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputData((prevState) => ({ ...prevState, address: e.target.value }));
  };
  const submitHandler = () => {
    createStudent(inputData);
    setInputData(initialState);
  };
  const updateStudentHandler = () => {
    updateStudent({
      id: id,
      attributes: inputData,
    });
    cancelEdit();
  };
  useEffect(() => {
    if (isSuccess) {
      setInputData(stuData.attributes);
    }
  }, [isSuccess]);
  return (
    <>
      <tr className="border h-12">
        <td className="border  px-2 text-center">
          <input
            value={inputData.name}
            type="text"
            className="border w-12"
            onChange={handleNameChange}
          />
        </td>
        <td className="border px-2">
          <input
            value={inputData.age}
            type="text"
            className="border w-12"
            onChange={handleAgeChange}
          />
        </td>
        <td className="border text-center">
          <select value={inputData.gender} onChange={handleGenderChange}>
            <option disabled value="">
              Gender
            </option>
            <option value="male">male</option>
            <option value="female">female</option>
          </select>
        </td>
        <td className="border w-24 px-2 text-center">
          <input
            value={inputData.address}
            type="text"
            className="border"
            onChange={handleAddressChange}
          />
        </td>
        <td className="text-center border">
          {id && (
            <>
              <button
                onClick={() => {
                  cancelEdit();
                }}
                className="border px-2 mr-2 bg-orange-500 text-white"
              >
                Cancel
              </button>
              <button
                onClick={updateStudentHandler}
                className="border px-2 mr-2 bg-green-500 text-white"
              >
                Confirm
              </button>
            </>
          )}
          {!id && (
            <>
              <button className="border px-2 mr-2" onClick={submitHandler}>
                Add
              </button>
              <button className="border px-2">Cancel</button>
            </>
          )}
        </td>
      </tr>
    </>
  );
};

export default StudentsForm;
