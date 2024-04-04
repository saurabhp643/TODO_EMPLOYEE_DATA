"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const EditEmployee = ({ params }) => {
  const router = useRouter();

  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    phone: "",
    hobbies: "",
  });

  const { employeeId } = params;

  const getEmployeeById = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/employee/${employeeId}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      }
    );

    const data = await res.json();
    console.log(data.getSingleEmployee);
    setEmployee({
      name: data.getSingleEmployee?.name,
      email: data.getSingleEmployee?.email,
      phone: data.getSingleEmployee?.phone,
      hobbies: data.getSingleEmployee?.hobbies,
    });
  };

  const updateEmployee = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/employee/${employeeId}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name: employee.name,
          email: employee.email,
          phone: employee.phone,
          hobbies: employee.hobbies,
        }),
      }
    );

    const data = await res.json();
    console.log(data);

    const { message, error } = data;
    if (error) {
      alert(error);
    } else {
      alert(message);
      router.push("/employee/employeelist");
    }
  };

  useEffect(() => {
    getEmployeeById();
  }, [employeeId]);
  return (
    <div className=" container mx-auto flex justify-center items-center h-screen">
      <div className="form shadow-md border border-gray-400 rounded-xl py-6 px-9  ">
        <div className="top">
          <div className="flex gap-[40px] mb-5 items-center">
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

            <h1 className="text-2xl font-semibold">Edit Employee Detail</h1>
          </div>
        </div>

        <div className="bottom">
          <div className="">
            <input
              type="text"
              name="employeeName"
              placeholder="Enter name"
              value={employee.name}
              onChange={(e) =>
                setEmployee({
                  ...employee,
                  name: e.target.value,
                })
              }
              className="border border-gray-400 hover:border-gray-700 w-96 px-1.5 py-1.5 rounded-md outline-none mb-5 placeholder-gray-400"
            />
          </div>

          <div className="">
            <input
              type="text"
              name="employeeEmail"
              placeholder="Enter email"
              value={employee.email}
              onChange={(e) =>
                setEmployee({
                  ...employee,
                  email: e.target.value,
                })
              }
              className="border border-gray-400 hover:border-gray-700 w-96 px-1.5 py-1.5 rounded-md outline-none mb-5 placeholder-gray-400"
            />
          </div>

          <div className="">
            <input
              type="text"
              name="employeephone"
              placeholder="Enter phone"
              value={employee.phone}
              onChange={(e) =>
                setEmployee({
                  ...employee,
                  phone: e.target.value,
                })
              }
              className="border border-gray-400 hover:border-gray-700 w-96 px-1.5 py-1.5 rounded-md outline-none mb-5 placeholder-gray-400"
            />
          </div>

          <div className="">
            <input
              type="number"
              name="employeehobbies"
              placeholder="Enter hobbies"
              value={employee.hobbies}
              onChange={(e) =>
                setEmployee({
                  ...employee,
                  hobbies: e.target.value,
                })
              }
              className="border border-gray-400 hover:border-gray-700 w-96 px-1.5 py-1.5 rounded-md outline-none mb-8 placeholder-gray-400"
            />
          </div>

          <div>
            <button
              onClick={updateEmployee}
              className=" bg-gray-100 bg-gradient-to-r from-blue-500 to-purple-500 hover:bg-gray-200 w-full py-1.5 border border-gray-400 rounded-md font-medium mb-5"
            >
              Edit Detail
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEmployee;
