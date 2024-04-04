"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const getEmployeeList = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/employee`,
        {
          method: "GET",
        }
      );
      const data = await res.json();
      setEmployees(data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteEmployee = async (_id) => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/employee/${_id}`,
        {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
          },
        }
      );
      getEmployeeList();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getEmployeeList();
  }, []);

  const handleCheckboxChange = (event, _id) => {
    if (event.target.checked) {
      setSelectedRows([...selectedRows, _id]);
    } else {
      setSelectedRows(selectedRows.filter((id) => id !== _id));
    }
  };

  const handleSendEmail = async () => {
    if (selectedRows.length === 0) {
      alert("Please select at least one employee.");
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/send-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ selectedRows }),
        }
      );

      if (res.ok) {
        alert("Email sent successfully.");
      } else {
        const data = await res.json();
        if (data && data.error) {
          alert(data.error);
        } else {
          alert("Failed to send email.");
        }
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("An error occurred while sending email.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="border rounded-lg shadow overflow-hidden ">
              <div className="p-2 bg-gray-50 border-b flex gap-2 items-center">
                <Link href="/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-7 h-7"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </Link>
                <h1 className=" text-center text-2xl font-semibold">
                  Employee Detail List
                </h1>
                <button
                  onClick={handleSendEmail}
                  className="ml-auto px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Send Email
                </button>
              </div>
              <table className="w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                    >
                      <input
                        type="checkbox"
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          setSelectedRows(
                            isChecked ? employees.map((emp) => emp._id) : []
                          );
                        }}
                      />
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                    >
                      S.No.
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                    >
                      Phone
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                    >
                      Hobbies
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase"
                    >
                      Update
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase"
                    >
                      Remove
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {employees.map((employee, index) => (
                    <tr key={employee._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                        <input
                          type="checkbox"
                          onChange={(e) =>
                            handleCheckboxChange(e, employee._id)
                          }
                          checked={selectedRows.includes(employee._id)}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                        {index + 1}.
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                        {employee.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {employee.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {employee.phone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {employee.hobbies}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                          href={`/${employee._id}`}
                          className="text-green-600"
                        >
                          Edit
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          className="text-red-600 cursor-pointer"
                          onClick={() => deleteEmployee(employee._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
