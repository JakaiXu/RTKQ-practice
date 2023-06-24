import Student from "./Student";
import StudentsForm from "./StudentsForm";

export type STU = {
  stus: {
    id: number;
    attributes: {
      name: string;
      gender: string;
      age: number;
      address: string;
    };
  }[];
};
const StudentList = ({ stus}: STU) => {
 
  return (
    <table className="my-10 mx-4">
      <caption className="font-bold text-2xl mb-8">Student Form</caption>
      <thead>
        <tr className="border h-12">
          <th className="border px-4">Name</th>
          <th className="border px-4">Age</th>
          <th className="border px-4">Gender</th>
          <th className="border px-4">Address</th>
          <th className="border px-4">Actions</th>
        </tr>
      </thead>
      <tbody>
        {stus.map((student) => (
          <Student student={student} key={student.id} />
        ))}
      </tbody>
      <tfoot>
        <StudentsForm />
      </tfoot>
    </table>
  );
};

export default StudentList;
