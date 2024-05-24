// import { useState, useCallback } from "react";
import CustomSelect from "../../Helpers/customSelect";
import * as yup from "yup";
import PropTypes from "prop-types";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Loading from "../Loading";

const AddTask = ({ onsubmit, setOpenTaskForm }) => {
  const taskCreatingRef = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!taskCreatingRef.current?.contains(e.target) && !isSubmitting) {
        setOpenTaskForm(false);
      }
    };
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setOpenTaskForm(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [setOpenTaskForm, isSubmitting]);

  return (
    <>
      <Formik
        initialValues={{
          title: "",
          status: "",
          priority: "",
          category: "",
        }}
        onSubmit={(values, actions) => {
          setIsSubmitting(true);
          setTimeout(() => {
            onsubmit(values);
            actions.resetForm();
            actions.setSubmitting(false);
            setIsSubmitting(false);
          }, 10000);
        }}
        onChange={(values) => {
          console.log(values);
        }}
        validationSchema={yup.object().shape({
          title: yup
            .string()
            .required("Title is required")
            .min(3, "Title must be at least 3 characters"),
          status: yup.string().required(),
          priority: yup.string().required(),
          category: yup.string().required(),
        })}
        setFieldValue={(field, value) => {
          console.log(field, value);
        }}
      >
        {({ setFieldValue, touched, errors, handleChange, isSubmitting }) => {
          return (
            <>
              {isSubmitting ? (
                <Loading />
              ) : (
                <div
                  ref={taskCreatingRef}
                  className=" bg-slate-950 py-32 border-[1px] border-white/40 w-9/12 rounded-lg relative dark:text-white"
                >
                  <span
                    onClick={() => setOpenTaskForm(false)}
                    className="absolute flex justify-center items-center cursor-pointer top-5 right-10 hover:bg-white/10 rounded-full p-2"
                  >
                    <IoMdClose size={28} />
                  </span>
                  <div className="flex w-full flex-col justify-center items-center ">
                    <Form className="grid sm:grid-cols-1 md:grid-cols-2 px-16 w-full gap-2">
                      <div>
                        <label className="pl-2">Title</label>
                        <input
                          className="w-full mt-2  dark:border-gray-950 dark:text-black   bg-transparent text-white border-[1px] border-white/10   px-4 py-2 rounded-lg focus-visible:ring-offset-8 focus-visible:outline-1"
                          type="text"
                          name="title"
                          onChange={handleChange}
                        />
                        {errors.title && touched.title ? (
                          <p className="text-red-400 pl-2">
                            <ErrorMessage name="title" />
                          </p>
                        ) : null}
                      </div>

                      <div>
                        <label className="pl-2">Status</label>
                        <Field
                          name="status"
                          defaultValue="Any"
                          options={["Any", "Todo", "In Progress", "Done"]}
                          as={CustomSelect}
                          onChange={(event) => {
                            console.log(event);
                            const value = event.target.value;
                            setFieldValue("status", value);
                          }}
                        />
                        {errors.status && touched.status ? (
                          <p className="text-red-400 pl-2">
                            <ErrorMessage name="status" />
                          </p>
                        ) : null}
                      </div>
                      <div>
                        <label className="pl-2">Priority</label>
                        <Field
                          name="priority"
                          defaultValue="Any"
                          options={["Any", "High", "Medium", "Low"]}
                          as={CustomSelect}
                          onChange={(event) => {
                            console.log(event);
                            const value = event.target.value;
                            setFieldValue("priority", value);
                          }}
                        />{" "}
                        {errors.priority && touched.priority ? (
                          <p className="text-red-400 pl-2">
                            <ErrorMessage name="priority" />
                          </p>
                        ) : null}
                      </div>
                      <div>
                        <label className="pl-2">Category</label>
                        <Field
                          name="category"
                          defaultValue="Any"
                          options={["Any", "Personal", "Work"]}
                          as={CustomSelect}
                          onChange={(event) => {
                            console.log(event);
                            const value = event.target.value;
                            setFieldValue("category", value);
                          }}
                        />
                        {errors.category && touched.category ? (
                          <p className="text-red-400 pl-2">
                            <ErrorMessage name="category" />
                          </p>
                        ) : null}
                      </div>
                      <button
                        className="md:col-span-2  w-1/3 max-md:w-1/2 mx-auto  bg-slate-900 cursor-pointer disabled:cursor-not-allowed px-3 py-2 rounded-md mt-6 hover:bg-slate-800 hover:text-white active:scale-95"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        Create Task
                      </button>
                    </Form>
                  </div>
                </div>
              )}
            </>
          );
        }}
      </Formik>
    </>
  );
};

AddTask.propTypes = {
  onsubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func,
  values: PropTypes.object,
  touched: PropTypes.object,
  props: PropTypes.object,
  errors: PropTypes.object,
  setOpenTaskForm: PropTypes.func.isRequired,
};
export default AddTask;